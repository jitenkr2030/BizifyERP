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
        { number: { contains: search, mode: 'insensitive' } },
        { product: { name: { contains: search, mode: 'insensitive' } } },
        { product: { code: { contains: search, mode: 'insensitive' } } }
      ]
    }

    if (status && status !== 'all') {
      where.status = status
    }

    // Get work orders with related data
    const [workOrders, totalCount] = await Promise.all([
      db.workOrder.findMany({
        where,
        include: {
          product: {
            select: {
              id: true,
              code: true,
              name: true,
              unit: true
            }
          },
          bom: {
            select: {
              id: true,
              code: true,
              name: true
            }
          },
          workOrderItems: {
            include: {
              product: {
                select: {
                  id: true,
                  code: true,
                  name: true,
                  unit: true
                }
              }
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
      db.workOrder.count({ where })
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      success: true,
      data: workOrders,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages
      }
    })
  } catch (error) {
    console.error('Error fetching work orders:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch work orders' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      number,
      productId,
      bomId,
      quantity,
      startDate,
      endDate,
      status = 'draft',
      notes,
      items = []
    } = body

    // Validate required fields
    if (!number || !productId || !quantity) {
      return NextResponse.json(
        { success: false, error: 'Number, product, and quantity are required' },
        { status: 400 }
      )
    }

    // Check if work order number already exists
    const existingWorkOrder = await db.workOrder.findUnique({
      where: { number }
    })

    if (existingWorkOrder) {
      return NextResponse.json(
        { success: false, error: 'Work order number already exists' },
        { status: 400 }
      )
    }

    // Check if product exists
    const product = await db.product.findUnique({
      where: { id: productId }
    })

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }

    // Check if BOM exists (if provided)
    if (bomId) {
      const bom = await db.billOfMaterial.findUnique({
        where: { id: bomId }
      })

      if (!bom) {
        return NextResponse.json(
          { success: false, error: 'Bill of Materials not found' },
          { status: 404 }
        )
      }
    }

    // Create work order with items
    const workOrder = await db.workOrder.create({
      data: {
        number,
        productId,
        bomId,
        quantity,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        status,
        notes,
        workOrderItems: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity
          }))
        }
      },
      include: {
        product: {
          select: {
            id: true,
            code: true,
            name: true,
            unit: true
          }
        },
        bom: {
          select: {
            id: true,
            code: true,
            name: true
          }
        },
        workOrderItems: {
          include: {
            product: {
              select: {
                id: true,
                code: true,
                name: true,
                unit: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: workOrder,
      message: 'Work order created successfully'
    })
  } catch (error) {
    console.error('Error creating work order:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create work order' },
      { status: 500 }
    )
  }
}