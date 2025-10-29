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

    const [leaveRequests, total] = await Promise.all([
      db.leaveRequest.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          employee: {
            select: { id: true, firstName: true, lastName: true, email: true }
          },
          approvedByUser: {
            select: { id: true, name: true }
          }
        }
      }),
      db.leaveRequest.count({ where })
    ])

    return NextResponse.json({
      leaveRequests,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching leave requests:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leave requests' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const leaveRequest = await db.leaveRequest.create({
      data: {
        employeeId: body.employeeId,
        leaveType: body.leaveType,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        totalDays: body.totalDays,
        reason: body.reason,
        status: body.status || 'pending'
      },
      include: {
        employee: {
          select: { id: true, firstName: true, lastName: true, email: true }
        },
        approvedByUser: {
          select: { id: true, name: true }
        }
      }
    })

    return NextResponse.json(leaveRequest, { status: 201 })
  } catch (error) {
    console.error('Error creating leave request:', error)
    return NextResponse.json(
      { error: 'Failed to create leave request' },
      { status: 500 }
    )
  }
}