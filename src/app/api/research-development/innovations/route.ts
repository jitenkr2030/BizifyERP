import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const stage = searchParams.get('stage')
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    let whereClause: any = {}

    if (stage && stage !== 'all') {
      whereClause.stage = stage
    }

    if (category && category !== 'all') {
      whereClause.category = category
    }

    if (status && status !== 'all') {
      whereClause.status = status
    }

    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    const innovations = await db.rDInnovation.findMany({
      where: whereClause,
      include: {
        createdBy: {
          select: { id: true, name: true, email: true }
        }
      },
      orderBy: [
        { stage: 'asc' },
        { priority: 'desc' },
        { probability: 'desc' },
        { createdAt: 'desc' }
      ]
    })

    // Parse JSON fields for response
    const parsedInnovations = innovations.map(innovation => ({
      ...innovation,
      teamMembers: innovation.teamMembers ? JSON.parse(innovation.teamMembers) : [],
      dependencies: innovation.dependencies ? JSON.parse(innovation.dependencies) : [],
      risks: innovation.risks ? JSON.parse(innovation.risks) : [],
      opportunities: innovation.opportunities ? JSON.parse(innovation.opportunities) : []
    }))

    return NextResponse.json(parsedInnovations)
  } catch (error) {
    console.error('Error fetching R&D innovations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch R&D innovations' },
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
      stage,
      category,
      potentialValue,
      probability,
      timeline,
      investmentNeeded,
      teamMembers,
      dependencies,
      risks,
      opportunities,
      priority = 'medium',
      createdById
    } = body

    // Validate required fields
    if (!name || !description || !category || !potentialValue) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const innovation = await db.rDInnovation.create({
      data: {
        name,
        description,
        stage: stage || 'idea',
        category,
        potentialValue: parseFloat(potentialValue),
        probability: probability ? parseFloat(probability) : 0,
        timeline,
        investmentNeeded: investmentNeeded ? parseFloat(investmentNeeded) : null,
        teamMembers: teamMembers ? JSON.stringify(teamMembers) : '[]',
        dependencies: dependencies ? JSON.stringify(dependencies) : '[]',
        risks: risks ? JSON.stringify(risks) : null,
        opportunities: opportunities ? JSON.stringify(opportunities) : null,
        priority,
        createdById
      },
      include: {
        createdBy: {
          select: { id: true, name: true, email: true }
        }
      }
    })

    // Parse JSON fields for response
    const parsedInnovation = {
      ...innovation,
      teamMembers: innovation.teamMembers ? JSON.parse(innovation.teamMembers) : [],
      dependencies: innovation.dependencies ? JSON.parse(innovation.dependencies) : [],
      risks: innovation.risks ? JSON.parse(innovation.risks) : [],
      opportunities: innovation.opportunities ? JSON.parse(innovation.opportunities) : []
    }

    return NextResponse.json(parsedInnovation, { status: 201 })
  } catch (error) {
    console.error('Error creating R&D innovation:', error)
    return NextResponse.json(
      { error: 'Failed to create R&D innovation' },
      { status: 500 }
    )
  }
}