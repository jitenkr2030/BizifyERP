import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    let whereClause: any = {}

    if (status && status !== 'all') {
      whereClause.status = status
    }

    if (category && category !== 'all') {
      whereClause.category = category
    }

    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    const projects = await db.rDProject.findMany({
      where: whereClause,
      include: {
        createdBy: {
          select: { id: true, name: true, email: true }
        },
        milestones: true,
        budgetAllocations: true,
        teamMembers: {
          include: {
            user: {
              select: { id: true, name: true, email: true }
            },
            team: {
              select: { id: true, name: true }
            }
          }
        },
        intellectualProperty: true,
        publications: true,
        _count: {
          select: {
            milestones: true,
            teamMembers: true,
            intellectualProperty: true,
            publications: true
          }
        }
      },
      orderBy: [
        { status: 'asc' },
        { priority: 'desc' },
        { createdAt: 'desc' }
      ]
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching R&D projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch R&D projects' },
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
      category,
      budget,
      teamSize,
      startDate,
      endDate,
      priority = 'medium',
      objectives,
      deliverables,
      risks,
      successCriteria,
      createdById
    } = body

    // Validate required fields
    if (!name || !description || !category || !budget || !teamSize || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const project = await db.rDProject.create({
      data: {
        name,
        description,
        category,
        budget: parseFloat(budget),
        teamSize: parseInt(teamSize),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        priority,
        objectives: objectives ? JSON.stringify(objectives) : null,
        deliverables: deliverables ? JSON.stringify(deliverables) : null,
        risks: risks ? JSON.stringify(risks) : null,
        successCriteria: successCriteria ? JSON.stringify(successCriteria) : null,
        createdById
      },
      include: {
        createdBy: {
          select: { id: true, name: true, email: true }
        },
        milestones: true,
        budgetAllocations: true,
        teamMembers: {
          include: {
            user: {
              select: { id: true, name: true, email: true }
            },
            team: {
              select: { id: true, name: true }
            }
          }
        }
      }
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Error creating R&D project:', error)
    return NextResponse.json(
      { error: 'Failed to create R&D project' },
      { status: 500 }
    )
  }
}