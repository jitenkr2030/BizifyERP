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

    const invoices = await db.invoice.findMany({
      where: whereClause,
      include: {
        customer: true,
        salesOrder: true,
        invoiceItems: {
          include: {
            product: true
          }
        },
        payments: true
      },
      orderBy: { date: 'desc' }
    })

    return NextResponse.json(invoices)
  } catch (error) {
    console.error('Error fetching invoices:', error)
    return NextResponse.json(
      { error: 'Failed to fetch invoices' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { number, customerId, salesOrderId, date, dueDate, invoiceItems } = body

    // Check if invoice number already exists
    const existingInvoice = await db.invoice.findUnique({
      where: { number }
    })

    if (existingInvoice) {
      return NextResponse.json(
        { error: 'Invoice number already exists' },
        { status: 400 }
      )
    }

    // Calculate totals
    const subtotal = invoiceItems.reduce((sum: number, item: any) => sum + (item.quantity * item.unitPrice), 0)
    const tax = invoiceItems.reduce((sum: number, item: any) => sum + (item.quantity * item.unitPrice * (item.taxRate / 100)), 0)
    const total = subtotal + tax

    const invoice = await db.invoice.create({
      data: {
        number,
        customerId,
        salesOrderId: salesOrderId || null,
        date: new Date(date),
        dueDate: new Date(dueDate),
        subtotal,
        tax,
        total,
        paidAmount: 0,
        invoiceItems: {
          create: invoiceItems.map((item: any) => ({
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
        salesOrder: true,
        invoiceItems: {
          include: {
            product: true
          }
        },
        payments: true
      }
    })

    return NextResponse.json(invoice, { status: 201 })
  } catch (error) {
    console.error('Error creating invoice:', error)
    return NextResponse.json(
      { error: 'Failed to create invoice' },
      { status: 500 }
    )
  }
}