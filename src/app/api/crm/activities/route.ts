import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const type = searchParams.get('type') || 'all'
    const completed = searchParams.get('completed')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (type !== 'all') {
      where.type = type
    }

    if (completed !== null && completed !== undefined) {
      where.completed = completed === 'true'
    }

    const [activities, total] = await Promise.all([
      db.activity.findMany({
        where,
        include: {
          lead: true,
          opportunity: true,
          contact: true,
          assignedToUser: true
        },
        skip,
        take: limit,
        orderBy: [
          { completed: 'asc' },
          { dueDate: 'asc' },
          { createdAt: 'desc' }
        ]
      }),
      db.activity.count({ where })
    ])

    return NextResponse.json({
      activities,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching activities:', error)
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      type,
      subject,
      description,
      dueDate,
      leadId,
      opportunityId,
      contactId,
      assignedTo,
      completed = false
    } = body

    // Validate required fields
    if (!type || !subject) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate activity type
    const validTypes = ['call', 'email', 'meeting', 'task']
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: 'Invalid activity type' },
        { status: 400 }
      )
    }

    // Validate that only one entity type is associated
    const entityCount = [leadId, opportunityId, contactId].filter(Boolean).length
    if (entityCount > 1) {
      return NextResponse.json(
        { error: 'Activity can be associated with only one entity type' },
        { status: 400 }
      )
    }

    const activity = await db.activity.create({
      data: {
        type,
        subject,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        leadId,
        opportunityId,
        contactId,
        assignedTo,
        completed
      },
      include: {
        lead: true,
        opportunity: true,
        contact: true,
        assignedToUser: true
      }
    })

    return NextResponse.json(activity, { status: 201 })
  } catch (error) {
    console.error('Error creating activity:', error)
    return NextResponse.json(
      { error: 'Failed to create activity' },
      { status: 500 }
    )
  }
}