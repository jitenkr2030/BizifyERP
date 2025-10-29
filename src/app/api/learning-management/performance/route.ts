import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/learning-management/performance - Get learning-performance integration data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const employeeId = searchParams.get('employeeId')
    const departmentId = searchParams.get('departmentId')
    const period = searchParams.get('period') || 'current' // current, quarter, year

    // Build date range based on period
    const now = new Date()
    let startDate: Date
    let endDate: Date

    switch (period) {
      case 'quarter':
        startDate = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1)
        endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 3, 0)
        break
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1)
        endDate = new Date(now.getFullYear(), 11, 31)
        break
      default: // current month
        startDate = new Date(now.getFullYear(), now.getMonth(), 1)
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    }

    // Build where clause
    const where: any = {
      createdAt: {
        gte: startDate,
        lte: endDate
      }
    }
    if (employeeId) where.employeeId = employeeId
    if (departmentId) {
      where.employee = {
        departmentId: departmentId
      }
    }

    // Get learning performance data
    const [
      trainingCompletions,
      skillProgress,
      complianceStatus,
      learningGoals,
      performanceReviews
    ] = await Promise.all([
      // Training completions
      db.trainingParticipant.findMany({
        where: {
          ...where,
          status: 'completed'
        },
        include: {
          employee: {
            include: {
              department: true,
              position: true
            }
          },
          program: {
            select: {
              title: true,
              category: true,
              duration: true
            }
          }
        }
      }),

      // Skill progress
      db.employeeSkill.findMany({
        where: {
          ...where,
          progress: {
            gte: 0
          }
        },
        include: {
          employee: {
            include: {
              department: true,
              position: true
            }
          },
          skill: {
            select: {
              name: true,
              category: true,
              level: true
            }
          }
        }
      }),

      // Compliance status
      db.complianceAssignment.findMany({
        where: {
          ...where,
          OR: [
            { status: 'completed' },
            { status: 'overdue' }
          ]
        },
        include: {
          employee: {
            include: {
              department: true,
              position: true
            }
          },
          training: {
            select: {
              title: true,
              type: true,
              required: true
            }
          }
        }
      }),

      // Learning goals
      db.learningGoal.findMany({
        where: {
          ...where,
          OR: [
            { status: 'active' },
            { status: 'completed' }
          ]
        },
        include: {
          employee: {
            include: {
              department: true,
              position: true
            }
          },
          relatedSkill: {
            select: {
              name: true,
              category: true
            }
          },
          relatedTraining: {
            select: {
              title: true,
              category: true
            }
          }
        }
      }),

      // Performance reviews with learning impact
      db.performanceReview.findMany({
        where: {
          ...where,
          reviewType: 'learning_development'
        },
        include: {
          employee: {
            include: {
              department: true,
              position: true
            }
          },
          reviewer: {
            select: {
              firstName: true,
              lastName: true
            }
          },
          goals: true,
          competencies: true
        }
      })
    ])

    // Calculate aggregated metrics
    const totalEmployees = new Set([
      ...trainingCompletions.map(t => t.employeeId),
      ...skillProgress.map(s => s.employeeId),
      ...complianceStatus.map(c => c.employeeId),
      ...learningGoals.map(g => g.employeeId)
    ]).size

    const metrics = {
      trainingCompletionRate: trainingCompletions.length > 0 ? 
        Math.round((trainingCompletions.filter(t => t.status === 'completed').length / trainingCompletions.length) * 100) : 0,
      
      averageSkillProgress: skillProgress.length > 0 ?
        Math.round(skillProgress.reduce((sum, s) => sum + s.progress, 0) / skillProgress.length) : 0,
      
      complianceRate: complianceStatus.length > 0 ?
        Math.round((complianceStatus.filter(c => c.status === 'completed').length / complianceStatus.length) * 100) : 0,
      
      goalCompletionRate: learningGoals.length > 0 ?
        Math.round((learningGoals.filter(g => g.status === 'completed').length / learningGoals.length) * 100) : 0,
      
      totalTrainingHours: trainingCompletions
        .filter(t => t.completionDate)
        .reduce((sum, t) => {
          const duration = parseInt(t.program.duration) || 0
          return sum + duration
        }, 0),
      
      skillsDeveloped: new Set(skillProgress.map(s => s.skillId)).size,
      
      complianceOverdue: complianceStatus.filter(c => c.status === 'overdue').length
    }

    // Department-wise breakdown
    const departmentMetrics = trainingCompletions.reduce((acc, completion) => {
      const deptName = completion.employee.department?.name || 'Unassigned'
      if (!acc[deptName]) {
        acc[deptName] = {
          totalEmployees: 0,
          trainingCompletions: 0,
          skillProgress: 0,
          complianceCompleted: 0,
          complianceOverdue: 0
        }
      }
      acc[deptName].totalEmployees++
      if (completion.status === 'completed') acc[deptName].trainingCompletions++
      return acc
    }, {} as Record<string, any>)

    // Add skill progress and compliance data to department metrics
    skillProgress.forEach(skill => {
      const deptName = skill.employee.department?.name || 'Unassigned'
      if (departmentMetrics[deptName]) {
        departmentMetrics[deptName].skillProgress += skill.progress
      }
    })

    complianceStatus.forEach(compliance => {
      const deptName = compliance.employee.department?.name || 'Unassigned'
      if (departmentMetrics[deptName]) {
        if (compliance.status === 'completed') {
          departmentMetrics[deptName].complianceCompleted++
        } else if (compliance.status === 'overdue') {
          departmentMetrics[deptName].complianceOverdue++
        }
      }
    })

    // Calculate rates for each department
    Object.keys(departmentMetrics).forEach(dept => {
      const metrics = departmentMetrics[dept]
      metrics.trainingCompletionRate = metrics.totalEmployees > 0 ?
        Math.round((metrics.trainingCompletions / metrics.totalEmployees) * 100) : 0
      metrics.averageSkillProgress = metrics.totalEmployees > 0 ?
        Math.round(metrics.skillProgress / metrics.totalEmployees) : 0
      metrics.complianceRate = (metrics.complianceCompleted + metrics.complianceOverdue) > 0 ?
        Math.round((metrics.complianceCompleted / (metrics.complianceCompleted + metrics.complianceOverdue)) * 100) : 0
    })

    // Learning impact on performance
    const learningImpact = performanceReviews.map(review => {
      const relatedTraining = trainingCompletions.filter(t => 
        t.employeeId === review.employeeId && 
        t.completionDate && 
        new Date(t.completionDate) >= new Date(review.reviewDate.getTime() - 90 * 24 * 60 * 60 * 1000) // Within 90 days
      )

      const relatedSkills = skillProgress.filter(s => 
        s.employeeId === review.employeeId &&
        s.progress >= 80 // High progress
      )

      return {
        review,
        trainingCount: relatedTraining.length,
        skillsCount: relatedSkills.length,
        overallRating: review.overallRating,
        learningImpactScore: Math.round(((relatedTraining.length * 0.3) + (relatedSkills.length * 0.7)) * 10) / 10
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        metrics,
        departmentMetrics,
        learningImpact,
        period: {
          start: startDate,
          end: endDate,
          type: period
        },
        rawData: {
          trainingCompletions,
          skillProgress,
          complianceStatus,
          learningGoals,
          performanceReviews
        }
      }
    })
  } catch (error) {
    console.error('Error fetching learning performance data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch learning performance data' },
      { status: 500 }
    )
  }
}

// POST /api/learning-management/performance - Create learning-performance link
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      employeeId,
      type, // 'training_goal', 'skill_development', 'compliance_requirement'
      targetId,
      performanceGoalId,
      description,
      targetDate,
      metrics
    } = body

    // Validate required fields
    if (!employeeId || !type || !targetId || !performanceGoalId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create learning-performance link
    const link = await db.learningPerformanceLink.create({
      data: {
        employeeId,
        type,
        targetId,
        performanceGoalId,
        description,
        targetDate: targetDate ? new Date(targetDate) : null,
        metrics: metrics || {},
        status: 'active'
      },
      include: {
        employee: {
          include: {
            department: true,
            position: true
          }
        },
        performanceGoal: true
      }
    })

    return NextResponse.json({
      success: true,
      data: link,
      message: 'Learning-performance link created successfully'
    })
  } catch (error) {
    console.error('Error creating learning-performance link:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create learning-performance link' },
      { status: 500 }
    )
  }
}