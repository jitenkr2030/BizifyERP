import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'all'
    const customerId = searchParams.get('customerId')

    let whereClause: any = {}
    
    if (status !== 'all') {
      whereClause.status = status
    }
    
    if (customerId) {
      whereClause.customerId = customerId
    }

    const salesOrders = await db.salesOrder.findMany({
      where: whereClause,
      include: {
        customer: true,
        quote: true,
        createdBy: true,
        salesOrderItems: {
          include: {
            product: true
          }
        },
        invoices: true,
        shipments: true
      },
      orderBy: { date: 'desc' }
    })

    return NextResponse.json(salesOrders)
  } catch (error) {
    console.error('Error fetching sales orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sales orders' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { number, customerId, quoteId, date, salesOrderItems, createdById } = body

    // Check if sales order number already exists
    const existingSalesOrder = await db.salesOrder.findUnique({
      where: { number }
    })

    if (existingSalesOrder) {
      return NextResponse.json(
        { error: 'Sales order number already exists' },
        { status: 400 }
      )
    }

    // Calculate totals
    const subtotal = salesOrderItems.reduce((sum: number, item: any) => sum + (item.quantity * item.unitPrice), 0)
    const tax = salesOrderItems.reduce((sum: number, item: any) => sum + (item.quantity * item.unitPrice * (item.taxRate / 100)), 0)
    const total = subtotal + tax

    const salesOrder = await db.salesOrder.create({
      data: {
        number,
        customerId,
        quoteId: quoteId || null,
        date: new Date(date),
        subtotal,
        tax,
        total,
        createdById: createdById || null,
        salesOrderItems: {
          create: salesOrderItems.map((item: any) => ({
            productId: item.productId || null,
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            taxRate: item.taxRate || 0,
            subtotal: item.quantity * item.unitPrice,
            tax: item.quantity * item.unitPrice * (item.taxRate / 100),
            total: item.quantity * item.unitPrice * (1 + (item.taxRate / 100))
          }))
        }
      },
      include: {
        customer: true,
        quote: true,
        createdBy: true,
        salesOrderItems: {
          include: {
            product: true
          }
        }
      }
    })

    return NextResponse.json(salesOrder, { status: 201 })
  } catch (error) {
    console.error('Error creating sales order:', error)
    return NextResponse.json(
      { error: 'Failed to create sales order' },
      { status: 500 }
    )
  }
}