import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const stage = searchParams.get('stage') || 'all'

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (stage !== 'all') {
      where.stage = stage
    }

    const [opportunities, total] = await Promise.all([
      db.opportunity.findMany({
        where,
        include: {
          lead: true,
          customer: true,
          assignedToUser: true
        },
        skip,
        take: limit,
        orderBy: { expectedCloseDate: 'asc' }
      }),
      db.opportunity.count({ where })
    ])

    return NextResponse.json({
      opportunities,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching opportunities:', error)
    return NextResponse.json(
      { error: 'Failed to fetch opportunities' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      leadId,
      customerId,
      amount,
      probability = 50,
      expectedCloseDate,
      stage = 'prospecting',
      assignedTo,
      notes
    } = body

    // Validate required fields
    if (!name || !amount || !expectedCloseDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate that either leadId or customerId is provided
    if (!leadId && !customerId) {
      return NextResponse.json(
        { error: 'Either leadId or customerId must be provided' },
        { status: 400 }
      )
    }

    // Validate probability range
    if (probability < 0 || probability > 100) {
      return NextResponse.json(
        { error: 'Probability must be between 0 and 100' },
        { status: 400 }
      )
    }

    // Validate stage
    const validStages = ['prospecting', 'qualification', 'proposal', 'negotiation', 'closed_won', 'closed_lost']
    if (!validStages.includes(stage)) {
      return NextResponse.json(
        { error: 'Invalid stage' },
        { status: 400 }
      )
    }

    const opportunity = await db.opportunity.create({
      data: {
        name,
        leadId,
        customerId,
        amount: parseFloat(amount),
        probability: parseInt(probability),
        expectedCloseDate: new Date(expectedCloseDate),
        stage,
        assignedTo,
        notes
      },
      include: {
        lead: true,
        customer: true,
        assignedToUser: true
      }
    })

    return NextResponse.json(opportunity, { status: 201 })
  } catch (error) {
    console.error('Error creating opportunity:', error)
    return NextResponse.json(
      { error: 'Failed to create opportunity' },
      { status: 500 }
    )
  }
}