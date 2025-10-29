import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/grc/risks - Get all risks
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const level = searchParams.get('level')
    const search = searchParams.get('search')

    // Build where clause based on filters
    const where: any = {}
    
    if (category && category !== 'all') {
      where.category = category
    }
    
    if (status && status !== 'all') {
      where.status = status
    }
    
    if (level && level !== 'all') {
      where.riskLevel = level
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    const risks = await db.risk.findMany({
      where,
      include: {
        owner: true,
        mitigations: {
          include: {
            assignedTo: true
          }
        },
        riskAssessments: {
          orderBy: { assessedAt: 'desc' },
          take: 1
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ success: true, data: risks })
  } catch (error) {
    console.error('Error fetching risks:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch risks' },
      { status: 500 }
    )
  }
}

// POST /api/grc/risks - Create new risk
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      category,
      description,
      riskLevel,
      owner,
      dueDate,
      probability,
      impact,
      mitigationStrategy
    } = body

    // Validate required fields
    if (!title || !category || !riskLevel || !owner) {
      return NextResponse.json(
        { success: false, error: 'Title, category, risk level, and owner are required' },
        { status: 400 }
      )
    }

    // Create the risk
    const risk = await db.risk.create({
      data: {
        title,
        category,
        description,
        riskLevel,
        ownerId: owner,
        dueDate: dueDate ? new Date(dueDate) : null,
        probability: probability || 5,
        impact: impact || 5,
        mitigationStrategy,
        status: 'Open'
      },
      include: {
        owner: true,
        mitigations: true,
        riskAssessments: true
      }
    })

    // Create initial risk assessment
    await db.riskAssessment.create({
      data: {
        riskId: risk.id,
        assessedBy: owner,
        inherentRisk: (probability || 5) * (impact || 5),
        residualRisk: (probability || 5) * (impact || 5) * 0.8, // Assume 20% mitigation
        assessmentDate: new Date(),
        notes: 'Initial risk assessment'
      }
    })

    return NextResponse.json({ success: true, data: risk }, { status: 201 })
  } catch (error) {
    console.error('Error creating risk:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create risk' },
      { status: 500 }
    )
  }
}