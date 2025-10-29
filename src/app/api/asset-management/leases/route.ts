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

    const [assetLeases, total] = await Promise.all([
      db.assetLease.findMany({
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
      db.assetLease.count({ where })
    ])

    return NextResponse.json({
      assetLeases,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching asset leases:', error)
    return NextResponse.json(
      { error: 'Failed to fetch asset leases' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const assetLease = await db.assetLease.create({
      data: {
        assetId: body.assetId,
        lessor: body.lessor,
        leaseNumber: body.leaseNumber,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        monthlyPayment: body.monthlyPayment,
        status: body.status || 'active',
        terms: body.terms
      },
      include: {
        asset: {
          select: { id: true, name: true, code: true }
        }
      }
    })

    return NextResponse.json(assetLease, { status: 201 })
  } catch (error) {
    console.error('Error creating asset lease:', error)
    return NextResponse.json(
      { error: 'Failed to create asset lease' },
      { status: 500 }
    )
  }
}