import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const channelId = searchParams.get('channelId')
    const type = searchParams.get('type')

    const skip = (page - 1) * limit

    const where: any = {}
    if (channelId) where.channelId = channelId
    if (type) where.type = type

    const [syncLogs, total] = await Promise.all([
      db.syncLog.findMany({
        where,
        include: {
          channel: true
        },
        orderBy: { startTime: 'desc' },
        skip,
        take: limit
      }),
      db.syncLog.count({ where })
    ])

    return NextResponse.json({
      syncLogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching sync logs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sync logs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      channelId,
      type,
      recordsProcessed = 0,
      errors = 0,
      status = 'running'
    } = body

    const syncLog = await db.syncLog.create({
      data: {
        channelId,
        type,
        startTime: new Date(),
        endTime: status === 'completed' || status === 'failed' ? new Date() : null,
        recordsProcessed,
        errors,
        status
      },
      include: {
        channel: true
      }
    })

    return NextResponse.json(syncLog, { status: 201 })
  } catch (error) {
    console.error('Error creating sync log:', error)
    return NextResponse.json(
      { error: 'Failed to create sync log' },
      { status: 500 }
    )
  }
}