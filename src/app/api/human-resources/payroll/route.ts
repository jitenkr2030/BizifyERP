import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const employeeId = searchParams.get('employeeId')
    const period = searchParams.get('period')

    const skip = (page - 1) * limit

    // Build where clause
    let where: any = {}
    
    if (employeeId) {
      where.employeeId = employeeId
    }

    if (period) {
      where.period = period
    }

    const [payrollRecords, total] = await Promise.all([
      db.payrollRecord.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          employee: {
            select: { id: true, firstName: true, lastName: true, email: true }
          },
          payrollItems: true
        }
      }),
      db.payrollRecord.count({ where })
    ])

    return NextResponse.json({
      payrollRecords,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching payroll records:', error)
    return NextResponse.json(
      { error: 'Failed to fetch payroll records' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const payrollRecord = await db.payrollRecord.create({
      data: {
        employeeId: body.employeeId,
        period: body.period,
        grossSalary: body.grossSalary,
        deductions: body.deductions || 0,
        netSalary: body.netSalary,
        payDate: body.payDate ? new Date(body.payDate) : null,
        status: body.status || 'draft',
        notes: body.notes,
        payrollItems: {
          create: body.payrollItems || []
        }
      },
      include: {
        employee: {
          select: { id: true, firstName: true, lastName: true, email: true }
        },
        payrollItems: true
      }
    })

    return NextResponse.json(payrollRecord, { status: 201 })
  } catch (error) {
    console.error('Error creating payroll record:', error)
    return NextResponse.json(
      { error: 'Failed to create payroll record' },
      { status: 500 }
    )
  }
}