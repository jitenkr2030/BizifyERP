import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status')
    const subscriptionId = searchParams.get('subscriptionId')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.OR = [
        { subscription: { name: { contains: search, mode: 'insensitive' } } },
        { subscription: { customer: { name: { contains: search, mode: 'insensitive' } } } },
        { invoice: { number: { contains: search, mode: 'insensitive' } } }
      ]
    }

    if (status && status !== 'all') {
      where.status = status
    }

    if (subscriptionId) {
      where.subscriptionId = subscriptionId
    }

    // Get subscription invoices with related data
    const [subscriptionInvoices, totalCount] = await Promise.all([
      db.subscriptionInvoice.findMany({
        where,
        include: {
          subscription: {
            include: {
              customer: {
                select: {
                  id: true,
                  name: true,
                  email: true
                }
              }
            }
          },
          invoice: {
            select: {
              id: true,
              number: true,
              status: true,
              paidAmount: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: [
          { status: 'asc' },
          { date: 'desc' }
        ]
      }),
      db.subscriptionInvoice.count({ where })
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      success: true,
      data: subscriptionInvoices,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages
      }
    })
  } catch (error) {
    console.error('Error fetching subscription invoices:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch subscription invoices' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      subscriptionId,
      date,
      dueDate,
      amount,
      status = 'draft',
      generateInvoice = false
    } = body

    // Validate required fields
    if (!subscriptionId || !date || !dueDate || !amount) {
      return NextResponse.json(
        { success: false, error: 'Subscription, date, due date, and amount are required' },
        { status: 400 }
      )
    }

    // Check if subscription exists
    const subscription = await db.subscription.findUnique({
      where: { id: subscriptionId },
      include: {
        customer: true
      }
    })

    if (!subscription) {
      return NextResponse.json(
        { success: false, error: 'Subscription not found' },
        { status: 404 }
      )
    }

    let invoice = null

    // Generate regular invoice if requested
    if (generateInvoice) {
      // Create invoice
      invoice = await db.invoice.create({
        data: {
          number: `SUB-${Date.now()}`,
          customerId: subscription.customerId,
          date: new Date(date),
          dueDate: new Date(dueDate),
          status: status === 'draft' ? 'draft' : 'sent',
          subtotal: parseFloat(amount),
          tax: 0,
          total: parseFloat(amount)
        }
      })
    }

    // Create subscription invoice
    const subscriptionInvoice = await db.subscriptionInvoice.create({
      data: {
        subscriptionId,
        invoiceId: invoice?.id,
        date: new Date(date),
        dueDate: new Date(dueDate),
        amount: parseFloat(amount),
        status
      },
      include: {
        subscription: {
          include: {
            customer: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        },
        invoice: {
          select: {
            id: true,
            number: true,
            status: true
          }
        }
      }
    })

    // Update subscription's next invoice date
    if (status === 'paid') {
      let nextInvoiceDate = new Date(date)
      
      switch (subscription.frequency) {
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

      await db.subscription.update({
        where: { id: subscriptionId },
        data: {
          nextInvoiceDate,
          lastInvoiceDate: new Date(date)
        }
      })
    }

    return NextResponse.json({
      success: true,
      data: subscriptionInvoice,
      message: 'Subscription invoice created successfully'
    })
  } catch (error) {
    console.error('Error creating subscription invoice:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create subscription invoice' },
      { status: 500 }
    )
  }
}

// Generate recurring invoices for all active subscriptions
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { invoiceDate, dueDate, sendEmail = false } = body

    if (!invoiceDate || !dueDate) {
      return NextResponse.json(
        { success: false, error: 'Invoice date and due date are required' },
        { status: 400 }
      )
    }

    // Get all active subscriptions that need invoicing
    const subscriptions = await db.subscription.findMany({
      where: {
        status: 'active',
        nextInvoiceDate: {
          lte: new Date(invoiceDate)
        }
      },
      include: {
        customer: true
      }
    })

    const generatedInvoices = []

    for (const subscription of subscriptions) {
      // Create invoice
      const invoice = await db.invoice.create({
        data: {
          number: `SUB-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          customerId: subscription.customerId,
          date: new Date(invoiceDate),
          dueDate: new Date(dueDate),
          status: 'sent',
          subtotal: subscription.amount,
          tax: 0,
          total: subscription.amount
        }
      })

      // Create subscription invoice
      const subscriptionInvoice = await db.subscriptionInvoice.create({
        data: {
          subscriptionId: subscription.id,
          invoiceId: invoice.id,
          date: new Date(invoiceDate),
          dueDate: new Date(dueDate),
          amount: subscription.amount,
          status: 'sent'
        }
      })

      // Calculate next invoice date
      let nextInvoiceDate = new Date(invoiceDate)
      
      switch (subscription.frequency) {
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

      // Update subscription
      await db.subscription.update({
        where: { id: subscription.id },
        data: {
          nextInvoiceDate,
          lastInvoiceDate: new Date(invoiceDate)
        }
      })

      generatedInvoices.push({
        subscription: subscription.name,
        customer: subscription.customer.name,
        invoice: invoice.number,
        amount: subscription.amount
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        generatedCount: generatedInvoices.length,
        invoices: generatedInvoices
      },
      message: `Generated ${generatedInvoices.length} recurring invoices`
    })
  } catch (error) {
    console.error('Error generating recurring invoices:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate recurring invoices' },
      { status: 500 }
    )
  }
}