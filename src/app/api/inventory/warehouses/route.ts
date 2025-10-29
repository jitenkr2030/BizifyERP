import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const skip = (page - 1) * limit

    const [warehouses, total] = await Promise.all([
      db.warehouse.findMany({
        skip,
        take: limit,
        orderBy: { name: 'asc' }
      }),
      db.warehouse.count()
    ])

    return NextResponse.json({
      warehouses,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching warehouses:', error)
    return NextResponse.json(
      { error: 'Failed to fetch warehouses' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      code,
      name,
      address,
      companyId,
      status = 'active'
    } = body

    // Validate required fields
    if (!code || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if code already exists
    const existingWarehouse = await db.warehouse.findUnique({
      where: { code }
    })

    if (existingWarehouse) {
      return NextResponse.json(
        { error: 'Warehouse with this code already exists' },
        { status: 400 }
      )
    }

    const warehouse = await db.warehouse.create({
      data: {
        code,
        name,
        address,
        companyId,
        status
      }
    })

    return NextResponse.json(warehouse, { status: 201 })
  } catch (error) {
    console.error('Error creating warehouse:', error)
    return NextResponse.json(
      { error: 'Failed to create warehouse' },
      { status: 500 }
    )
  }
}