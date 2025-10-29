import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search')
    const loyaltyStatus = searchParams.get('loyaltyStatus')

    const skip = (page - 1) * limit

    const where: any = {}
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ]
    }
    if (loyaltyStatus) where.loyaltyStatus = loyaltyStatus

    const [customers, total] = await Promise.all([
      db.unifiedCustomer.findMany({
        where,
        include: {
          channels: {
            include: {
              channel: true
            }
          },
          orders: {
            orderBy: { orderDate: 'desc' },
            take: 1
          }
        },
        orderBy: { lastOrderDate: 'desc' },
        skip,
        take: limit
      }),
      db.unifiedCustomer.count({ where })
    ])

    // Calculate aggregated data for each customer
    const customersWithStats = customers.map(customer => ({
      ...customer,
      totalOrders: customer.orders.length,
      totalSpent: customer.orders.reduce((sum, order) => sum + order.amount, 0),
      channels: customer.channels.map(c => c.channel.name)
    }))

    return NextResponse.json({
      customers: customersWithStats,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching unified customers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch customers' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      phone,
      location,
      loyaltyStatus = 'Bronze'
    } = body

    // Check if customer already exists by email
    const existingCustomer = await db.unifiedCustomer.findUnique({
      where: { email }
    })

    if (existingCustomer) {
      return NextResponse.json(
        { error: 'Customer with this email already exists' },
        { status: 400 }
      )
    }

    const customer = await db.unifiedCustomer.create({
      data: {
        name,
        email,
        phone,
        location,
        loyaltyStatus,
        joinedDate: new Date(),
        lastOrderDate: null
      }
    })

    return NextResponse.json(customer, { status: 201 })
  } catch (error) {
    console.error('Error creating unified customer:', error)
    return NextResponse.json(
      { error: 'Failed to create customer' },
      { status: 500 }
    )
  }
}