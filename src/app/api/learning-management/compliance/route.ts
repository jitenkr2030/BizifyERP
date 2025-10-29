import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/learning-management/compliance - Get compliance training data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const type = searchParams.get('type')
    const status = searchParams.get('status')
    const required = searchParams.get('required')
    const departmentId = searchParams.get('departmentId')
    const overdueOnly = searchParams.get('overdueOnly') === 'true'

    const offset = (page - 1) * limit

    // Build where clause
    const where: any = {}
    if (type) where.type = type
    if (status) where.status = status
    if (required !== undefined) where.required = required === 'true'
    if (overdueOnly) {
      where.dueDate = { lt: new Date() }
      where.status = { not: 'completed' }
    }

    // Get compliance trainings with assignment data
    const [trainings, total] = await Promise.all([
      db.complianceTraining.findMany({
        where,
        include: {
          assignments: departmentId ? {
            where: {
              employee: {
                departmentId: departmentId
              }
            },
            include: {
              employee: {
                select: {
                  firstName: true,
                  lastName: true,
                  department: {
                    select: {
                      name: true
                    }
                  }
                }
              }
            }
          } : {
            include: {
              employee: {
                select: {
                  firstName: true,
                  lastName: true,
                  department: {
                    select: {
                      name: true
                    }
                  }
                }
              }
            }
          },
          content: {
            select: {
              id: true,
              title: true,
              duration: true,
              type: true
            }
          },
          _count: {
            select: {
              assignments: true
            }
          }
        },
        skip: offset,
        take: limit,
        orderBy: [
          { required: 'desc' },
          { dueDate: 'asc' },
          { createdAt: 'desc' }
        ]
      }),
      db.complianceTraining.count({ where })
    ])

    // Calculate statistics for each training
    const trainingsWithStats = trainings.map(training => {
      const totalAssignments = training.assignments.length
      const completedAssignments = training.assignments.filter(a => a.status === 'completed').length
      const overdueAssignments = training.assignments.filter(a => 
        a.status !== 'completed' && new Date(a.dueDate) < new Date()
      ).length
      const inProgressAssignments = training.assignments.filter(a => a.status === 'in_progress').length

      const completionRate = totalAssignments > 0 
        ? Math.round((completedAssignments / totalAssignments) * 100) 
        : 0

      const overdueRate = totalAssignments > 0 
        ? Math.round((overdueAssignments / totalAssignments) * 100) 
        : 0

      // Determine overall status
      let overallStatus: 'compliant' | 'at_risk' | 'non_compliant' = 'compliant'
      if (overdueAssignments > 0) {
        overallStatus = 'non_compliant'
      } else if (completionRate < 80) {
        overallStatus = 'at_risk'
      }

      return {
        ...training,
        statistics: {
          totalAssignments,
          completedAssignments,
          overdueAssignments,
          inProgressAssignments,
          completionRate,
          overdueRate,
          overallStatus
        }
      }
    })

    // Get overall statistics
    const stats = await Promise.all([
      db.complianceTraining.groupBy({
        by: ['type'],
        _count: { id: true }
      }),
      db.complianceTraining.groupBy({
        by: ['status'],
        _count: { id: true }
      }),
      db.complianceAssignment.groupBy({
        by: ['status'],
        _count: { id: true }
      }),
      db.complianceAssignment.count({
        where: { status: 'completed' }
      }),
      db.complianceAssignment.count({
        where: {
          status: { not: 'completed' },
          dueDate: { lt: new Date() }
        }
      }),
      db.complianceTraining.count({
        where: { required: true }
      })
    ])

    // Get department-wise compliance status
    const departmentStats = await db.department.findMany({
      include: {
        employees: {
          include: {
            complianceAssignments: {
              include: {
                training: {
                  select: {
                    id: true,
                    title: true,
                    type: true,
                    required: true
                  }
                }
              }
            }
          }
        }
      }
    })

    const departmentCompliance = departmentStats.map(dept => {
      const allAssignments = dept.employees.flatMap(e => e.complianceAssignments)
      const completedAssignments = allAssignments.filter(a => a.status === 'completed')
      const overdueAssignments = allAssignments.filter(a => 
        a.status !== 'completed' && new Date(a.dueDate) < new Date()
      )

      return {
        departmentId: dept.id,
        departmentName: dept.name,
        totalEmployees: dept.employees.length,
        totalAssignments: allAssignments.length,
        completedAssignments: completedAssignments.length,
        overdueAssignments: overdueAssignments.length,
        completionRate: allAssignments.length > 0 
          ? Math.round((completedAssignments.length / allAssignments.length) * 100) 
          : 0,
        overdueRate: allAssignments.length > 0 
          ? Math.round((overdueAssignments.length / allAssignments.length) * 100) 
          : 0
      }
    })

    // Get upcoming deadlines
    const upcomingDeadlines = await db.complianceTraining.findMany({
      where: {
        dueDate: {
          gte: new Date(),
          lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Next 30 days
        },
        status: { not: 'completed' }
      },
      include: {
        assignments: {
          where: {
            status: { not: 'completed' }
          },
          include: {
            employee: {
              select: {
                firstName: true,
                lastName: true,
                department: {
                  select: {
                    name: true
                  }
                }
              }
            }
          }
        },
        _count: {
          select: {
            assignments: true
          }
        }
      },
      orderBy: { dueDate: 'asc' },
      take: 10
    })

    return NextResponse.json({
      success: true,
      data: trainingsWithStats,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      stats: {
        byType: stats[0].reduce((acc, stat) => {
          acc[stat.type] = stat._count.id
          return acc
        }, {} as Record<string, number>),
        byStatus: stats[1].reduce((acc, stat) => {
          acc[stat.status] = stat._count.id
          return acc
        }, {} as Record<string, number>),
        assignmentStatus: stats[2].reduce((acc, stat) => {
          acc[stat.status] = stat._count.id
          return acc
        }, {} as Record<string, number>),
        totalCompletedAssignments: stats[3],
        totalOverdueAssignments: stats[4],
        totalRequiredTrainings: stats[5],
        overallComplianceRate: stats[2].reduce((total, stat) => total + stat._count.id, 0) > 0 
          ? Math.round((stats[3] / stats[2].reduce((total, stat) => total + stat._count.id, 0)) * 100) 
          : 0
      },
      departmentCompliance,
      upcomingDeadlines
    })
  } catch (error) {
    console.error('Error fetching compliance data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch compliance data' },
      { status: 500 }
    )
  }
}

// POST /api/learning-management/compliance - Create new compliance training
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      type,
      required,
      dueDate,
      frequency,
      audience,
      content,
      assessmentRequired,
      passingScore,
      notifications
    } = body

    // Validate required fields
    if (!title || !type || !dueDate) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create compliance training
    const training = await db.complianceTraining.create({
      data: {
        title,
        description,
        type,
        required: required || false,
        dueDate: new Date(dueDate),
        frequency,
        audience: audience || [],
        content: {
          create: content || []
        },
        assessmentRequired: assessmentRequired || false,
        passingScore: passingScore || 80,
        notifications: notifications || {
          reminders: [7, 3, 1], // Days before due date
          overdue: true,
          completion: true
        },
        status: 'active'
      },
      include: {
        content: true,
        assignments: {
          include: {
            employee: {
              select: {
                firstName: true,
                lastName: true,
                department: {
                  select: {
                    name: true
                  }
                }
              }
            }
          }
        }
      }
    })

    // Auto-assign to employees based on audience
    if (audience && audience.length > 0) {
      const employeesToAssign = await db.employee.findMany({
        where: {
          OR: audience.map((aud: any) => ({
            [aud.type]: aud.value
          }))
        }
      })

      await db.complianceAssignment.createMany({
        data: employeesToAssign.map(employee => ({
          trainingId: training.id,
          employeeId: employee.id,
          dueDate: training.dueDate,
          status: 'pending'
        }))
      })
    }

    return NextResponse.json({
      success: true,
      data: training,
      message: 'Compliance training created successfully'
    })
  } catch (error) {
    console.error('Error creating compliance training:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create compliance training' },
      { status: 500 }
    )
  }
}