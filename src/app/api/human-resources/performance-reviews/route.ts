import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const employeeId = searchParams.get('employeeId')
    const status = searchParams.get('status')

    const skip = (page - 1) * limit

    // Build where clause
    let where: any = {}
    
    if (employeeId) {
      where.employeeId = employeeId
    }

    if (status) {
      where.status = status
    }

    const [performanceReviews, total] = await Promise.all([
      db.performanceReview.findMany({
        where,
        skip,
        take: limit,
        orderBy: { reviewDate: 'desc' },
        include: {
          employee: {
            select: { id: true, firstName: true, lastName: true, email: true }
          },
          reviewer: {
            select: { id: true, name: true }
          }
        }
      }),
      db.performanceReview.count({ where })
    ])

    return NextResponse.json({
      performanceReviews,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching performance reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch performance reviews' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const performanceReview = await db.performanceReview.create({
      data: {
        employeeId: body.employeeId,
        reviewerId: body.reviewerId,
        reviewDate: new Date(body.reviewDate),
        period: body.period,
        overallRating: body.overallRating,
        goals: body.goals,
        achievements: body.achievements,
        improvements: body.improvements,
        comments: body.comments,
        status: body.status || 'draft'
      },
      include: {
        employee: {
          select: { id: true, firstName: true, lastName: true, email: true }
        },
        reviewer: {
          select: { id: true, name: true }
        }
      }
    })

    return NextResponse.json(performanceReview, { status: 201 })
  } catch (error) {
    console.error('Error creating performance review:', error)
    return NextResponse.json(
      { error: 'Failed to create performance review' },
      { status: 500 }
    )
  }
}