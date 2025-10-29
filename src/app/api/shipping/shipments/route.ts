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
        { trackingNumber: { contains: search, mode: 'insensitive' } },
        { salesOrder: { number: { contains: search, mode: 'insensitive' } } },
        { salesOrder: { customer: { name: { contains: search, mode: 'insensitive' } } } }
      ]
    }

    if (status && status !== 'all') {
      where.status = status
    }

    // Get shipments with related data
    const [shipments, totalCount] = await Promise.all([
      db.shipment.findMany({
        where,
        include: {
          salesOrder: {
            include: {
              customer: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  phone: true
                }
              }
            }
          },
          carrier: {
            select: {
              id: true,
              name: true,
              trackingUrl: true
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
      db.shipment.count({ where })
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      success: true,
      data: shipments,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages
      }
    })
  } catch (error) {
    console.error('Error fetching shipments:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch shipments' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      number,
      salesOrderId,
      carrierId,
      trackingNumber,
      shipDate,
      deliveryDate,
      status = 'draft',
      notes
    } = body

    // Validate required fields
    if (!number || !salesOrderId || !carrierId) {
      return NextResponse.json(
        { success: false, error: 'Number, sales order, and carrier are required' },
        { status: 400 }
      )
    }

    // Check if shipment number already exists
    const existingShipment = await db.shipment.findUnique({
      where: { number }
    })

    if (existingShipment) {
      return NextResponse.json(
        { success: false, error: 'Shipment number already exists' },
        { status: 400 }
      )
    }

    // Check if sales order exists
    const salesOrder = await db.salesOrder.findUnique({
      where: { id: salesOrderId },
      include: {
        customer: true
      }
    })

    if (!salesOrder) {
      return NextResponse.json(
        { success: false, error: 'Sales order not found' },
        { status: 404 }
      )
    }

    // Check if carrier exists
    const carrier = await db.carrier.findUnique({
      where: { id: carrierId }
    })

    if (!carrier) {
      return NextResponse.json(
        { success: false, error: 'Carrier not found' },
        { status: 404 }
      )
    }

    // Create shipment
    const shipment = await db.shipment.create({
      data: {
        number,
        salesOrderId,
        carrierId,
        trackingNumber,
        shipDate: shipDate ? new Date(shipDate) : null,
        deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
        status,
        notes
      },
      include: {
        salesOrder: {
          include: {
            customer: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true
              }
            }
          }
        },
        carrier: {
          select: {
            id: true,
            name: true,
            trackingUrl: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: shipment,
      message: 'Shipment created successfully'
    })
  } catch (error) {
    console.error('Error creating shipment:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create shipment' },
      { status: 500 }
    )
  }
}