import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const assetId = searchParams.get('assetId')

    const skip = (page - 1) * limit

    // Build where clause
    let where: any = {}
    
    if (assetId) {
      where.assetId = assetId
    }

    const [depreciationRecords, total] = await Promise.all([
      db.depreciationRecord.findMany({
        where,
        skip,
        take: limit,
        orderBy: { date: 'desc' },
        include: {
          asset: {
            select: { id: true, name: true, code: true }
          }
        }
      }),
      db.depreciationRecord.count({ where })
    ])

    return NextResponse.json({
      depreciationRecords,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching depreciation records:', error)
    return NextResponse.json(
      { error: 'Failed to fetch depreciation records' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const depreciationRecord = await db.depreciationRecord.create({
      data: {
        assetId: body.assetId,
        date: new Date(body.date),
        method: body.method,
        amount: body.amount,
        accumulatedValue: body.accumulatedValue,
        bookValue: body.bookValue
      },
      include: {
        asset: {
          select: { id: true, name: true, code: true }
        }
      }
    })

    return NextResponse.json(depreciationRecord, { status: 201 })
  } catch (error) {
    console.error('Error creating depreciation record:', error)
    return NextResponse.json(
      { error: 'Failed to create depreciation record' },
      { status: 500 }
    )
  }
}