import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/learning-management/skills - Get all skills with tracking data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const level = searchParams.get('level')
    const demand = searchParams.get('demand')
    const employeeId = searchParams.get('employeeId')
    const departmentId = searchParams.get('departmentId')

    const offset = (page - 1) * limit

    // Build where clause
    const where: any = {}
    if (category) where.category = category
    if (level) where.level = level
    if (demand) where.demand = demand

    // Get skills with employee tracking data
    const [skills, total] = await Promise.all([
      db.skill.findMany({
        where,
        include: {
          employeeSkills: employeeId ? {
            where: { employeeId },
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
          prerequisites: {
            include: {
              prerequisite: true
            }
          },
          relatedTraining: {
            include: {
              program: {
                select: {
                  title: true,
                  category: true,
                  status: true
                }
              }
            }
          },
          _count: {
            select: {
              employeeSkills: true,
              relatedTraining: true
            }
          }
        },
        skip: offset,
        take: limit,
        orderBy: [
          { demand: 'desc' },
          { category: 'asc' },
          { name: 'asc' }
        ]
      }),
      db.skill.count({ where })
    ])

    // Calculate statistics for each skill
    const skillsWithStats = skills.map(skill => {
      const totalEmployees = skill.employeeSkills.length
      const averageProgress = totalEmployees > 0 
        ? skill.employeeSkills.reduce((sum, es) => sum + es.progress, 0) / totalEmployees 
        : 0
      const certifiedCount = skill.employeeSkills.filter(es => es.certified).length
      const inProgressCount = skill.employeeSkills.filter(es => 
        es.progress > 0 && es.progress < 100 && !es.certified
      ).length

      return {
        ...skill,
        statistics: {
          totalEmployees,
          averageProgress: Math.round(averageProgress),
          certifiedCount,
          inProgressCount,
          completionRate: totalEmployees > 0 ? Math.round((certifiedCount / totalEmployees) * 100) : 0,
          totalTrainingPrograms: skill.relatedTraining.length,
          activeTrainingPrograms: skill.relatedTraining.filter(rt => 
            rt.program.status === 'active'
          ).length
        }
      }
    })

    // Get overall statistics
    const stats = await Promise.all([
      db.skill.groupBy({
        by: ['category'],
        _count: { id: true }
      }),
      db.skill.groupBy({
        by: ['level'],
        _count: { id: true }
      }),
      db.skill.groupBy({
        by: ['demand'],
        _count: { id: true }
      }),
      db.employeeSkill.aggregate({
        _avg: { progress: true },
        _count: { id: true }
      }),
      db.employeeSkill.count({
        where: { certified: true }
      })
    ])

    // Get popular skills (most employees)
    const popularSkills = await db.skill.findMany({
      include: {
        _count: {
          select: {
            employeeSkills: true
          }
        }
      },
      orderBy: {
        employeeSkills: {
          _count: 'desc'
        }
      },
      take: 5
    })

    // Get skills in high demand
    const highDemandSkills = await db.skill.findMany({
      where: { demand: 'high' },
      orderBy: { name: 'asc' },
      take: 10
    })

    return NextResponse.json({
      success: true,
      data: skillsWithStats,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      stats: {
        byCategory: stats[0].reduce((acc, stat) => {
          acc[stat.category] = stat._count.id
          return acc
        }, {} as Record<string, number>),
        byLevel: stats[1].reduce((acc, stat) => {
          acc[stat.level] = stat._count.id
          return acc
        }, {} as Record<string, number>),
        byDemand: stats[2].reduce((acc, stat) => {
          acc[stat.demand] = stat._count.id
          return acc
        }, {} as Record<string, number>),
        averageProgress: Math.round((stats[3]._avg.progress || 0)),
        totalSkillAssignments: stats[3]._count.id,
        totalCertifications: stats[4]
      },
      popularSkills: popularSkills.map(skill => ({
        id: skill.id,
        name: skill.name,
        category: skill.category,
        employeeCount: skill._count.employeeSkills
      })),
      highDemandSkills
    })
  } catch (error) {
    console.error('Error fetching skills:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch skills' },
      { status: 500 }
    )
  }
}

// POST /api/learning-management/skills - Create new skill
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      description,
      category,
      level,
      demand,
      prerequisites,
      relatedTraining,
      competencyLevels,
      certificationRequirements
    } = body

    // Validate required fields
    if (!name || !category || !level) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create skill
    const skill = await db.skill.create({
      data: {
        name,
        description,
        category,
        level,
        demand: demand || 'medium',
        prerequisites: prerequisites || [],
        competencyLevels: competencyLevels || [],
        certificationRequirements: certificationRequirements || [],
        relatedTraining: {
          create: relatedTraining?.map((trainingId: string) => ({
            programId: trainingId
          })) || []
        }
      },
      include: {
        prerequisites: {
          include: {
            prerequisite: true
          }
        },
        relatedTraining: {
          include: {
            program: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: skill,
      message: 'Skill created successfully'
    })
  } catch (error) {
    console.error('Error creating skill:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create skill' },
      { status: 500 }
    )
  }
}