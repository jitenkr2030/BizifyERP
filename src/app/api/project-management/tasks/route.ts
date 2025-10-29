import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status')
    const projectId = searchParams.get('projectId')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (status && status !== 'all') {
      where.status = status
    }

    if (projectId) {
      where.projectId = projectId
    }

    // Get tasks with related data
    const [tasks, totalCount] = await Promise.all([
      db.task.findMany({
        where,
        include: {
          project: {
            select: {
              id: true,
              name: true,
              customerId: true
            }
          },
          assignee: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          timeEntries: {
            select: {
              id: true,
              hours: true,
              date: true,
              billable: true,
              rate: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: [
          { priority: 'desc' },
          { status: 'asc' },
          { createdAt: 'desc' }
        ]
      }),
      db.task.count({ where })
    ])

    // Calculate additional metrics for each task
    const tasksWithMetrics = tasks.map(task => {
      const totalLoggedHours = task.timeEntries.reduce((sum, entry) => sum + entry.hours, 0)
      const progress = task.estimatedHours ? Math.round((totalLoggedHours / task.estimatedHours) * 100) : 0

      return {
        ...task,
        metrics: {
          totalLoggedHours,
          progress
        }
      }
    })

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      success: true,
      data: tasksWithMetrics,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages
      }
    })
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tasks' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      projectId,
      name,
      description,
      startDate,
      endDate,
      status = 'todo',
      priority = 'medium',
      estimatedHours,
      assigneeId
    } = body

    // Validate required fields
    if (!projectId || !name) {
      return NextResponse.json(
        { success: false, error: 'Project and task name are required' },
        { status: 400 }
      )
    }

    // Check if project exists
    const project = await db.project.findUnique({
      where: { id: projectId }
    })

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }

    // Check if assignee exists (if provided)
    if (assigneeId) {
      const assignee = await db.user.findUnique({
        where: { id: assigneeId }
      })

      if (!assignee) {
        return NextResponse.json(
          { success: false, error: 'Assignee not found' },
          { status: 404 }
        )
      }
    }

    // Create task
    const task = await db.task.create({
      data: {
        projectId,
        name,
        description,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        status,
        priority,
        estimatedHours: estimatedHours ? parseFloat(estimatedHours) : null,
        assigneeId
      },
      include: {
        project: {
          select: {
            id: true,
            name: true
          }
        },
        assignee: {
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
      data: task,
      message: 'Task created successfully'
    })
  } catch (error) {
    console.error('Error creating task:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create task' },
      { status: 500 }
    )
  }
}