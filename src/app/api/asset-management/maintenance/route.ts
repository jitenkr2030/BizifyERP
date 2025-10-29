import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const assetId = searchParams.get('assetId')
    const status = searchParams.get('status')

    const skip = (page - 1) * limit

    // Build where clause
    let where: any = {}
    
    if (assetId) {
      where.assetId = assetId
    }

    if (status) {
      where.status = status
    }

    const [maintenanceRecords, total] = await Promise.all([
      db.maintenanceRecord.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          asset: {
            select: { id: true, name: true, code: true }
          }
        }
      }),
      db.maintenanceRecord.count({ where })
    ])

    return NextResponse.json({
      maintenanceRecords,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching maintenance records:', error)
    return NextResponse.json(
      { error: 'Failed to fetch maintenance records' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const maintenanceRecord = await db.maintenanceRecord.create({
      data: {
        assetId: body.assetId,
        maintenanceType: body.maintenanceType,
        description: body.description,
        cost: body.cost,
        performedBy: body.performedBy,
        performedDate: body.performedDate ? new Date(body.performedDate) : null,
        status: body.status || 'scheduled',
        nextMaintenanceDate: body.nextMaintenanceDate ? new Date(body.nextMaintenanceDate) : null
      },
      include: {
        asset: {
          select: { id: true, name: true, code: true }
        }
      }
    })

    return NextResponse.json(maintenanceRecord, { status: 201 })
  } catch (error) {
    console.error('Error creating maintenance record:', error)
    return NextResponse.json(
      { error: 'Failed to create maintenance record' },
      { status: 500 }
    )
  }
}