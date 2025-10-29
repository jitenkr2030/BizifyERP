import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { customer: { name: { contains: search, mode: 'insensitive' } } }
      ]
    }

    if (status && status !== 'all') {
      where.status = status
    }

    // Get projects with related data
    const [projects, totalCount] = await Promise.all([
      db.project.findMany({
        where,
        include: {
          customer: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true
            }
          },
          manager: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          tasks: {
            select: {
              id: true,
              name: true,
              status: true,
              estimatedHours: true,
              actualHours: true
            }
          },
          timeEntries: {
            select: {
              id: true,
              hours: true,
              billable: true,
              rate: true,
              date: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: [
          { status: 'asc' },
          { createdAt: 'desc' }
        ]
      }),
      db.project.count({ where })
    ])

    // Calculate additional metrics for each project
    const projectsWithMetrics = projects.map(project => {
      const totalEstimatedHours = project.tasks.reduce((sum, task) => sum + (task.estimatedHours || 0), 0)
      const totalActualHours = project.tasks.reduce((sum, task) => sum + task.actualHours, 0)
      const totalBillableHours = project.timeEntries
        .filter(entry => entry.billable)
        .reduce((sum, entry) => sum + entry.hours, 0)
      const totalCost = project.timeEntries.reduce((sum, entry) => sum + (entry.hours * (entry.rate || 0)), 0)
      const completedTasks = project.tasks.filter(task => task.status === 'done').length
      const progress = totalEstimatedHours > 0 ? Math.round((totalActualHours / totalEstimatedHours) * 100) : 0

      return {
        ...project,
        metrics: {
          totalEstimatedHours,
          totalActualHours,
          totalBillableHours,
          totalCost,
          completedTasks,
          progress,
          taskCount: project.tasks.length
        }
      }
    })

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      success: true,
      data: projectsWithMetrics,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages
      }
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      description,
      customerId,
      startDate,
      endDate,
      budget,
      status = 'planning',
      managerId
    } = body

    // Validate required fields
    if (!name || !startDate || !customerId) {
      return NextResponse.json(
        { success: false, error: 'Name, start date, and customer are required' },
        { status: 400 }
      )
    }

    // Check if customer exists
    const customer = await db.customer.findUnique({
      where: { id: customerId }
    })

    if (!customer) {
      return NextResponse.json(
        { success: false, error: 'Customer not found' },
        { status: 404 }
      )
    }

    // Check if manager exists (if provided)
    if (managerId) {
      const manager = await db.user.findUnique({
        where: { id: managerId }
      })

      if (!manager) {
        return NextResponse.json(
          { success: false, error: 'Project manager not found' },
          { status: 404 }
        )
      }
    }

    // Create project
    const project = await db.project.create({
      data: {
        name,
        description,
        customerId,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        budget: budget ? parseFloat(budget) : null,
        status,
        managerId
      },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        },
        manager: {
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
      data: project,
      message: 'Project created successfully'
    })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    )
  }
}