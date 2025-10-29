import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/grc/policies - Get all policies
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Build where clause based on filters
    const where: any = {}
    
    if (category && category !== 'all') {
      where.category = category
    }
    
    if (status && status !== 'all') {
      where.status = status
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    const [policies, total] = await Promise.all([
      db.policy.findMany({
        where,
        include: {
          owner: true,
          approvals: {
            include: {
              approvedBy: true
            }
          },
          distributions: {
            include: {
              department: true
            }
          }
        },
        orderBy: { lastReviewed: 'desc' },
        take: limit,
        skip: offset
      }),
      db.policy.count({ where })
    ])

    return NextResponse.json({ 
      success: true, 
      data: policies,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    })
  } catch (error) {
    console.error('Error fetching policies:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch policies' },
      { status: 500 }
    )
  }
}

// POST /api/grc/policies - Create new policy
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      category,
      description,
      content,
      owner,
      version,
      distributionScope,
      reviewFrequency
    } = body

    // Validate required fields
    if (!title || !category || !owner || !content) {
      return NextResponse.json(
        { success: false, error: 'Title, category, owner, and content are required' },
        { status: 400 }
      )
    }

    // Create the policy
    const policy = await db.policy.create({
      data: {
        title,
        category,
        description,
        content,
        ownerId: owner,
        version: version || '1.0',
        distributionScope,
        reviewFrequency: reviewFrequency || 'annual',
        status: 'Draft',
        lastReviewed: new Date(),
        nextReview: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year from now
      },
      include: {
        owner: true,
        approvals: true,
        distributions: true
      }
    })

    return NextResponse.json({ success: true, data: policy }, { status: 201 })
  } catch (error) {
    console.error('Error creating policy:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create policy' },
      { status: 500 }
    )
  }
}