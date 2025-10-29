import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const employeeId = searchParams.get('employeeId')
    const date = searchParams.get('date')

    const skip = (page - 1) * limit

    // Build where clause
    let where: any = {}
    
    if (employeeId) {
      where.employeeId = employeeId
    }

    if (date) {
      where.date = new Date(date)
    }

    const [attendances, total] = await Promise.all([
      db.attendance.findMany({
        where,
        skip,
        take: limit,
        orderBy: { date: 'desc' },
        include: {
          employee: {
            select: { id: true, firstName: true, lastName: true, email: true }
          }
        }
      }),
      db.attendance.count({ where })
    ])

    return NextResponse.json({
      attendances,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching attendance records:', error)
    return NextResponse.json(
      { error: 'Failed to fetch attendance records' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const attendance = await db.attendance.create({
      data: {
        employeeId: body.employeeId,
        date: new Date(body.date),
        clockIn: body.clockIn ? new Date(body.clockIn) : null,
        clockOut: body.clockOut ? new Date(body.clockOut) : null,
        breakHours: body.breakHours || 0,
        totalHours: body.totalHours,
        status: body.status || 'pending',
        notes: body.notes
      },
      include: {
        employee: {
          select: { id: true, firstName: true, lastName: true, email: true }
        }
      }
    })

    return NextResponse.json(attendance, { status: 201 })
  } catch (error) {
    console.error('Error creating attendance record:', error)
    return NextResponse.json(
      { error: 'Failed to create attendance record' },
      { status: 500 }
    )
  }
}