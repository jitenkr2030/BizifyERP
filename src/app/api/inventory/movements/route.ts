import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const productId = searchParams.get('productId')
    const type = searchParams.get('type')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (productId) {
      where.productId = productId
    }

    if (type && ['in', 'out', 'transfer'].includes(type)) {
      where.type = type
    }

    const [movements, total] = await Promise.all([
      db.stockMovement.findMany({
        where,
        include: {
          product: true,
          warehouse: true
        },
        skip,
        take: limit,
        orderBy: { date: 'desc' }
      }),
      db.stockMovement.count({ where })
    ])

    return NextResponse.json({
      movements,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching stock movements:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stock movements' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      productId,
      warehouseId,
      type,
      quantity,
      reference,
      notes
    } = body

    // Validate required fields
    if (!productId || !warehouseId || !type || !quantity) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate movement type
    if (!['in', 'out', 'transfer'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid movement type' },
        { status: 400 }
      )
    }

    // Get product details
    const product = await db.product.findUnique({
      where: { id: productId }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Get warehouse details
    const warehouse = await db.warehouse.findUnique({
      where: { id: warehouseId }
    })

    if (!warehouse) {
      return NextResponse.json(
        { error: 'Warehouse not found' },
        { status: 404 }
      )
    }

    // Create stock movement
    const movement = await db.stockMovement.create({
      data: {
        productId,
        warehouseId,
        type,
        quantity: parseFloat(quantity),
        reference,
        notes,
        date: new Date()
      },
      include: {
        product: true,
        warehouse: true
      }
    })

    return NextResponse.json(movement, { status: 201 })
  } catch (error) {
    console.error('Error creating stock movement:', error)
    return NextResponse.json(
      { error: 'Failed to create stock movement' },
      { status: 500 }
    )
  }
}