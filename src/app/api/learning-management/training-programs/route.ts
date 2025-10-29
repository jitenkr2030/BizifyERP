import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/learning-management/training-programs - Get all training programs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const instructor = searchParams.get('instructor')

    const offset = (page - 1) * limit

    // Build where clause
    const where: any = {}
    if (category) where.category = category
    if (status) where.status = status
    if (instructor) where.instructor = instructor

    // Get training programs with pagination
    const [programs, total] = await Promise.all([
      db.trainingProgram.findMany({
        where,
        include: {
          participants: {
            include: {
              employee: true
            }
          },
          modules: true,
          assessments: true
        },
        skip: offset,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      db.trainingProgram.count({ where })
    ])

    // Calculate statistics
    const stats = await db.trainingProgram.groupBy({
      by: ['status'],
      _count: {
        id: true
      }
    })

    return NextResponse.json({
      success: true,
      data: programs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      stats: stats.reduce((acc, stat) => {
        acc[stat.status] = stat._count.id
        return acc
      }, {} as Record<string, number>)
    })
  } catch (error) {
    console.error('Error fetching training programs:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch training programs' },
      { status: 500 }
    )
  }
}

// POST /api/learning-management/training-programs - Create new training program
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      category,
      duration,
      startDate,
      endDate,
      instructor,
      maxParticipants,
      prerequisites,
      learningObjectives,
      modules
    } = body

    // Validate required fields
    if (!title || !description || !category || !startDate || !endDate || !instructor) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create training program
    const program = await db.trainingProgram.create({
      data: {
        title,
        description,
        category,
        duration,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        instructor,
        maxParticipants,
        prerequisites: prerequisites || [],
        learningObjectives: learningObjectives || [],
        status: 'draft',
        modules: {
          create: modules?.map((module: any) => ({
            title: module.title,
            description: module.description,
            duration: module.duration,
            order: module.order,
            content: module.content,
            resources: module.resources || []
          })) || []
        }
      },
      include: {
        modules: true,
        participants: true,
        assessments: true
      }
    })

    return NextResponse.json({
      success: true,
      data: program,
      message: 'Training program created successfully'
    })
  } catch (error) {
    console.error('Error creating training program:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create training program' },
      { status: 500 }
    )
  }
}