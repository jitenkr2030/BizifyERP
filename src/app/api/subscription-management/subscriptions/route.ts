import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { customer: { name: { contains: search, mode: 'insensitive' } } }
      ]
    }

    if (status && status !== 'all') {
      where.status = status
    }

    // Get subscriptions with related data
    const [subscriptions, totalCount] = await Promise.all([
      db.subscription.findMany({
        where,
        include: {
          customer: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true
            }
          },
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          subscriptionInvoices: {
            select: {
              id: true,
              date: true,
              amount: true,
              status: true,
              invoiceId: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: [
          { status: 'asc' },
          { createdAt: 'desc' }
        ]
      }),
      db.subscription.count({ where })
    ])

    // Calculate additional metrics for each subscription
    const subscriptionsWithMetrics = subscriptions.map(subscription => {
      const totalRevenue = subscription.subscriptionInvoices
        .filter(invoice => invoice.status === 'paid')
        .reduce((sum, invoice) => sum + invoice.amount, 0)
      
      const lastInvoice = subscription.subscriptionInvoices
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
      
      const nextInvoiceDate = subscription.nextInvoiceDate
      const invoiceCount = subscription.subscriptionInvoices.length

      return {
        ...subscription,
        metrics: {
          totalRevenue,
          lastInvoiceDate: lastInvoice?.date,
          nextInvoiceDate,
          invoiceCount
        }
      }
    })

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      success: true,
      data: subscriptionsWithMetrics,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages
      }
    })
  } catch (error) {
    console.error('Error fetching subscriptions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch subscriptions' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      customerId,
      name,
      description,
      startDate,
      endDate,
      frequency,
      amount,
      status = 'active',
      createdById
    } = body

    // Validate required fields
    if (!customerId || !name || !startDate || !frequency || !amount) {
      return NextResponse.json(
        { success: false, error: 'Customer, name, start date, frequency, and amount are required' },
        { status: 400 }
      )
    }

    // Check if customer exists
    const customer = await db.customer.findUnique({
      where: { id: customerId }
    })

    if (!customer) {
      return NextResponse.json(
        { success: false, error: 'Customer not found' },
        { status: 404 }
      )
    }

    // Calculate next invoice date based on frequency
    const startDateObj = new Date(startDate)
    let nextInvoiceDate = new Date(startDateObj)
    
    switch (frequency) {
      case 'monthly':
        nextInvoiceDate.setMonth(nextInvoiceDate.getMonth() + 1)
        break
      case 'quarterly':
        nextInvoiceDate.setMonth(nextInvoiceDate.getMonth() + 3)
        break
      case 'yearly':
        nextInvoiceDate.setFullYear(nextInvoiceDate.getFullYear() + 1)
        break
    }

    // Create subscription
    const subscription = await db.subscription.create({
      data: {
        customerId,
        name,
        description,
        startDate: startDateObj,
        endDate: endDate ? new Date(endDate) : null,
        frequency,
        amount: parseFloat(amount),
        status,
        nextInvoiceDate,
        createdById
      },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        },
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: subscription,
      message: 'Subscription created successfully'
    })
  } catch (error) {
    console.error('Error creating subscription:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create subscription' },
      { status: 500 }
    )
  }
}