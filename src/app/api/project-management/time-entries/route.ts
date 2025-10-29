import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const projectId = searchParams.get('projectId')
    const userId = searchParams.get('userId')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.OR = [
        { description: { contains: search, mode: 'insensitive' } },
        { user: { name: { contains: search, mode: 'insensitive' } } },
        { project: { name: { contains: search, mode: 'insensitive' } } },
        { task: { name: { contains: search, mode: 'insensitive' } } }
      ]
    }

    if (projectId) {
      where.projectId = projectId
    }

    if (userId) {
      where.userId = userId
    }

    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      }
    }

    // Get time entries with related data
    const [timeEntries, totalCount] = await Promise.all([
      db.timeEntry.findMany({
        where,
        include: {
          project: {
            select: {
              id: true,
              name: true,
              customerId: true
            }
          },
          task: {
            select: {
              id: true,
              name: true
            }
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: [
          { date: 'desc' },
          { createdAt: 'desc' }
        ]
      }),
      db.timeEntry.count({ where })
    ])

    // Calculate total amount for each entry
    const timeEntriesWithAmount = timeEntries.map(entry => ({
      ...entry,
      totalAmount: entry.hours * (entry.rate || 0)
    }))

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      success: true,
      data: timeEntriesWithAmount,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages
      }
    })
  } catch (error) {
    console.error('Error fetching time entries:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch time entries' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      projectId,
      taskId,
      userId,
      date,
      hours,
      description,
      billable = true,
      rate
    } = body

    // Validate required fields
    if (!userId || !date || !hours) {
      return NextResponse.json(
        { success: false, error: 'User, date, and hours are required' },
        { status: 400 }
      )
    }

    // Check if user exists
    const user = await db.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if project exists (if provided)
    if (projectId) {
      const project = await db.project.findUnique({
        where: { id: projectId }
      })

      if (!project) {
        return NextResponse.json(
          { success: false, error: 'Project not found' },
          { status: 404 }
        )
      }
    }

    // Check if task exists (if provided)
    if (taskId) {
      const task = await db.task.findUnique({
        where: { id: taskId }
      })

      if (!task) {
        return NextResponse.json(
          { success: false, error: 'Task not found' },
          { status: 404 }
        )
      }
    }

    // Create time entry
    const timeEntry = await db.timeEntry.create({
      data: {
        projectId,
        taskId,
        userId,
        date: new Date(date),
        hours: parseFloat(hours),
        description,
        billable,
        rate: rate ? parseFloat(rate) : null
      },
      include: {
        project: {
          select: {
            id: true,
            name: true
          }
        },
        task: {
          select: {
            id: true,
            name: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        ...timeEntry,
        totalAmount: timeEntry.hours * (timeEntry.rate || 0)
      },
      message: 'Time entry created successfully'
    })
  } catch (error) {
    console.error('Error creating time entry:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create time entry' },
      { status: 500 }
    )
  }
}