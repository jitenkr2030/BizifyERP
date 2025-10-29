import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status') || 'all'
    const carrier = searchParams.get('carrier') || 'all'

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (status !== 'all') {
      where.status = status
    }

    if (carrier !== 'all') {
      where.carrier = carrier
    }

    // Note: In a real implementation, you would have a Shipments model in the schema
    // For now, we'll return mock data that matches the frontend structure
    const mockShipments = [
      {
        id: '1',
        trackingNumber: 'TRK001234567',
        carrier: 'FedEx',
        origin: 'Silicon Valley, CA',
        destination: 'New York, NY',
        status: 'in_transit',
        estimatedDeparture: '2024-01-15T10:00:00',
        estimatedArrival: '2024-01-18T15:00:00',
        cost: 250.00,
        contents: 'Laptop computers - 10 units'
      },
      {
        id: '2',
        trackingNumber: 'TRK002345678',
        carrier: 'UPS',
        origin: 'Chicago, IL',
        destination: 'Los Angeles, CA',
        status: 'delivered',
        estimatedDeparture: '2024-01-12T09:00:00',
        estimatedArrival: '2024-01-14T12:00:00',
        actualDeparture: '2024-01-12T09:15:00',
        actualArrival: '2024-01-14T11:45:00',
        cost: 150.00,
        contents: 'Office supplies'
      },
      {
        id: '3',
        trackingNumber: 'TRK003456789',
        carrier: 'DHL',
        origin: 'Miami, FL',
        destination: 'Seattle, WA',
        status: 'delayed',
        estimatedDeparture: '2024-01-16T14:00:00',
        estimatedArrival: '2024-01-19T16:00:00',
        cost: 320.00,
        contents: 'Industrial equipment',
        notes: 'Weather delay'
      }
    ]

    // Apply filters
    let filteredShipments = mockShipments
    if (status !== 'all') {
      filteredShipments = filteredShipments.filter(s => s.status === status)
    }
    if (carrier !== 'all') {
      filteredShipments = filteredShipments.filter(s => s.carrier === carrier)
    }

    // Apply pagination
    const paginatedData = filteredShipments.slice(skip, skip + limit)
    const total = filteredShipments.length

    return NextResponse.json({
      shipments: paginatedData,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching shipments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch shipments' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      trackingNumber,
      carrier,
      origin,
      destination,
      estimatedDeparture,
      estimatedArrival,
      cost,
      contents,
      notes
    } = body

    // Validate required fields
    if (!trackingNumber || !carrier || !origin || !destination || !estimatedDeparture || !estimatedArrival || !cost || !contents) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Note: In a real implementation, you would save to a Shipments table
    // For now, we'll return the created shipment data
    const shipment = {
      id: Math.random().toString(36).substr(2, 9),
      trackingNumber,
      carrier,
      origin,
      destination,
      status: 'preparing',
      estimatedDeparture,
      estimatedArrival,
      cost: parseFloat(cost),
      contents,
      notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json(shipment, { status: 201 })
  } catch (error) {
    console.error('Error creating shipment:', error)
    return NextResponse.json(
      { error: 'Failed to create shipment' },
      { status: 500 }
    )
  }
}