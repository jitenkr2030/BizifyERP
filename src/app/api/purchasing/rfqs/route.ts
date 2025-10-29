import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status') || 'all'
    const supplierId = searchParams.get('supplierId')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (status !== 'all') {
      where.status = status
    }

    if (supplierId) {
      where.supplierId = supplierId
    }

    const [rfqs, total] = await Promise.all([
      db.requestForQuotation.findMany({
        where,
        include: {
          supplier: true,
          rfqItems: {
            include: {
              product: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      db.requestForQuotation.count({ where })
    ])

    return NextResponse.json({
      rfqs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching RFQs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch RFQs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      supplierId,
      date,
      expiryDate,
      status = 'draft',
      notes,
      items = []
    } = body

    // Validate required fields
    if (!supplierId || !date || !expiryDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if supplier exists
    const supplier = await db.supplier.findUnique({
      where: { id: supplierId }
    })

    if (!supplier) {
      return NextResponse.json(
        { error: 'Supplier not found' },
        { status: 404 }
      )
    }

    // Generate RFQ number
    const rfqCount = await db.requestForQuotation.count()
    const rfqNumber = `RFQ-${new Date().getFullYear()}-${String(rfqCount + 1).padStart(3, '0')}`

    // Create RFQ with items
    const rfq = await db.requestForQuotation.create({
      data: {
        number: rfqNumber,
        supplierId,
        date: new Date(date),
        expiryDate: new Date(expiryDate),
        status,
        notes,
        rfqItems: {
          create: items.map((item: any) => ({
            productId: item.productId,
            description: item.description,
            quantity: parseFloat(item.quantity)
          }))
        }
      },
      include: {
        supplier: true,
        rfqItems: {
          include: {
            product: true
          }
        }
      }
    })

    return NextResponse.json(rfq, { status: 201 })
  } catch (error) {
    console.error('Error creating RFQ:', error)
    return NextResponse.json(
      { error: 'Failed to create RFQ' },
      { status: 500 }
    )
  }
}