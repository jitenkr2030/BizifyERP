import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const nonConformanceId = searchParams.get('nonConformanceId')
    const status = searchParams.get('status')

    const skip = (page - 1) * limit

    // Build where clause
    let where: any = {}
    
    if (nonConformanceId) {
      where.nonConformanceId = nonConformanceId
    }

    if (status) {
      where.status = status
    }

    const [correctiveActions, total] = await Promise.all([
      db.correctiveAction.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          nonConformance: {
            select: { id: true, reference: true }
          },
          assignedToUser: {
            select: { id: true, name: true }
          }
        }
      }),
      db.correctiveAction.count({ where })
    ])

    return NextResponse.json({
      correctiveActions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching corrective actions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch corrective actions' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const correctiveAction = await db.correctiveAction.create({
      data: {
        nonConformanceId: body.nonConformanceId,
        description: body.description,
        assignedTo: body.assignedTo,
        dueDate: body.dueDate ? new Date(body.dueDate) : null,
        status: body.status || 'pending',
        effectiveness: body.effectiveness,
        completedDate: body.completedDate ? new Date(body.completedDate) : null
      },
      include: {
        nonConformance: {
          select: { id: true, reference: true }
        },
        assignedToUser: {
          select: { id: true, name: true }
        }
      }
    })

    return NextResponse.json(correctiveAction, { status: 201 })
  } catch (error) {
    console.error('Error creating corrective action:', error)
    return NextResponse.json(
      { error: 'Failed to create corrective action' },
      { status: 500 }
    )
  }
}