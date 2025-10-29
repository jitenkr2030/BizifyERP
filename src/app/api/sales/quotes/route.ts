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

    const quotes = await db.quote.findMany({
      where: whereClause,
      include: {
        customer: true,
        quoteItems: {
          include: {
            product: true
          }
        },
        salesOrders: true
      },
      orderBy: { date: 'desc' }
    })

    return NextResponse.json(quotes)
  } catch (error) {
    console.error('Error fetching quotes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch quotes' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { number, customerId, date, expiryDate, quoteItems } = body

    // Check if quote number already exists
    const existingQuote = await db.quote.findUnique({
      where: { number }
    })

    if (existingQuote) {
      return NextResponse.json(
        { error: 'Quote number already exists' },
        { status: 400 }
      )
    }

    // Calculate totals
    const subtotal = quoteItems.reduce((sum: number, item: any) => sum + (item.quantity * item.unitPrice), 0)
    const tax = quoteItems.reduce((sum: number, item: any) => sum + (item.quantity * item.unitPrice * (item.taxRate / 100)), 0)
    const total = subtotal + tax

    const quote = await db.quote.create({
      data: {
        number,
        customerId,
        date: new Date(date),
        expiryDate: new Date(expiryDate),
        subtotal,
        tax,
        total,
        quoteItems: {
          create: quoteItems.map((item: any) => ({
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
        quoteItems: {
          include: {
            product: true
          }
        }
      }
    })

    return NextResponse.json(quote, { status: 201 })
  } catch (error) {
    console.error('Error creating quote:', error)
    return NextResponse.json(
      { error: 'Failed to create quote' },
      { status: 500 }
    )
  }
}