import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const channelId = searchParams.get('channelId')
    const status = searchParams.get('status')

    const skip = (page - 1) * limit

    const where: any = {}
    if (channelId) where.channelId = channelId
    if (status) where.status = status

    const [orders, total] = await Promise.all([
      db.ecommerceOrder.findMany({
        where,
        include: {
          channel: true,
          customer: true
        },
        orderBy: { orderDate: 'desc' },
        skip,
        take: limit
      }),
      db.ecommerceOrder.count({ where })
    ])

    return NextResponse.json({
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching e-commerce orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      orderNumber,
      channelId,
      customerId,
      amount,
      status,
      fulfillmentStatus,
      items
    } = body

    const order = await db.ecommerceOrder.create({
      data: {
        orderNumber,
        channelId,
        customerId,
        amount,
        status,
        fulfillmentStatus,
        items: {
          create: items?.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            total: item.total
          })) || []
        }
      },
      include: {
        channel: true,
        customer: true,
        items: {
          include: {
            product: true
          }
        }
      }
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Error creating e-commerce order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}