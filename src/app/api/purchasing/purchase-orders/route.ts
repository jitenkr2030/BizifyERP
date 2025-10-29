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

    const [purchaseOrders, total] = await Promise.all([
      db.purchaseOrder.findMany({
        where,
        include: {
          supplier: true,
          rfq: true,
          purchaseOrderItems: {
            include: {
              product: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      db.purchaseOrder.count({ where })
    ])

    return NextResponse.json({
      purchaseOrders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching purchase orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch purchase orders' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      supplierId,
      rfqId,
      date,
      expectedDeliveryDate,
      status = 'draft',
      notes,
      items = []
    } = body

    // Validate required fields
    if (!supplierId || !date || !expectedDeliveryDate || !items || items.length === 0) {
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

    // Check if RFQ exists if provided
    if (rfqId) {
      const rfq = await db.requestForQuotation.findUnique({
        where: { id: rfqId }
      })

      if (!rfq) {
        return NextResponse.json(
          { error: 'RFQ not found' },
          { status: 404 }
        )
      }
    }

    // Calculate totals
    let subtotal = 0
    let totalTax = 0

    const processedItems = items.map((item: any) => {
      const itemSubtotal = parseFloat(item.quantity) * parseFloat(item.unitPrice)
      const itemTax = itemSubtotal * (parseFloat(item.taxRate) || 0) / 100
      const itemTotal = itemSubtotal + itemTax

      subtotal += itemSubtotal
      totalTax += itemTax

      return {
        productId: item.productId,
        description: item.description,
        quantity: parseFloat(item.quantity),
        unitPrice: parseFloat(item.unitPrice),
        taxRate: parseFloat(item.taxRate) || 0,
        subtotal: itemSubtotal,
        tax: itemTax,
        total: itemTotal
      }
    })

    const total = subtotal + totalTax

    // Generate PO number
    const poCount = await db.purchaseOrder.count()
    const poNumber = `PO-${new Date().getFullYear()}-${String(poCount + 1).padStart(3, '0')}`

    // Create purchase order with items
    const purchaseOrder = await db.purchaseOrder.create({
      data: {
        number: poNumber,
        supplierId,
        rfqId,
        date: new Date(date),
        expectedDeliveryDate: new Date(expectedDeliveryDate),
        status,
        subtotal,
        tax: totalTax,
        total,
        notes,
        purchaseOrderItems: {
          create: processedItems
        }
      },
      include: {
        supplier: true,
        rfq: true,
        purchaseOrderItems: {
          include: {
            product: true
          }
        }
      }
    })

    return NextResponse.json(purchaseOrder, { status: 201 })
  } catch (error) {
    console.error('Error creating purchase order:', error)
    return NextResponse.json(
      { error: 'Failed to create purchase order' },
      { status: 500 }
    )
  }
}