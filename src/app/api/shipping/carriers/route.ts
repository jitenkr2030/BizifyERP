import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const isActive = searchParams.get('isActive')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (isActive !== null && isActive !== undefined) {
      where.isActive = isActive === 'true'
    }

    // Get carriers with related data
    const [carriers, totalCount] = await Promise.all([
      db.carrier.findMany({
        where,
        include: {
          shipments: {
            select: {
              id: true,
              number: true,
              status: true,
              createdAt: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: [
          { isActive: 'desc' },
          { name: 'asc' }
        ]
      }),
      db.carrier.count({ where })
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      success: true,
      data: carriers,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages
      }
    })
  } catch (error) {
    console.error('Error fetching carriers:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch carriers' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      trackingUrl,
      isActive = true
    } = body

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Carrier name is required' },
        { status: 400 }
      )
    }

    // Check if carrier name already exists
    const existingCarrier = await db.carrier.findFirst({
      where: { name: { equals: name, mode: 'insensitive' } }
    })

    if (existingCarrier) {
      return NextResponse.json(
        { success: false, error: 'Carrier with this name already exists' },
        { status: 400 }
      )
    }

    // Create carrier
    const carrier = await db.carrier.create({
      data: {
        name,
        trackingUrl,
        isActive
      },
      include: {
        shipments: {
          select: {
            id: true,
            number: true,
            status: true,
            createdAt: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: carrier,
      message: 'Carrier created successfully'
    })
  } catch (error) {
    console.error('Error creating carrier:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create carrier' },
      { status: 500 }
    )
  }
}