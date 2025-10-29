import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const severity = searchParams.get('severity')
    const type = searchParams.get('type')
    const status = searchParams.get('status')

    const skip = (page - 1) * limit

    // Build where clause
    let where: any = {}
    
    if (severity) {
      where.severity = severity
    }

    if (type) {
      where.type = type
    }

    if (status) {
      where.status = status
    }

    const [nonConformances, total] = await Promise.all([
      db.nonConformance.findMany({
        where,
        skip,
        take: limit,
        orderBy: { detectedDate: 'desc' },
        include: {
          inspection: {
            select: { id: true, reference: true }
          },
          reportedByUser: {
            select: { id: true, name: true }
          },
          correctiveActions: true
        }
      }),
      db.nonConformance.count({ where })
    ])

    return NextResponse.json({
      nonConformances,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching non-conformances:', error)
    return NextResponse.json(
      { error: 'Failed to fetch non-conformances' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const nonConformance = await db.nonConformance.create({
      data: {
        reference: body.reference,
        inspectionId: body.inspectionId,
        severity: body.severity,
        type: body.type,
        description: body.description,
        detectedDate: new Date(body.detectedDate),
        reportedBy: body.reportedBy,
        status: body.status || 'open',
        rootCause: body.rootCause
      },
      include: {
        inspection: {
          select: { id: true, reference: true }
        },
        reportedByUser: {
          select: { id: true, name: true }
        },
        correctiveActions: true
      }
    })

    return NextResponse.json(nonConformance, { status: 201 })
  } catch (error) {
    console.error('Error creating non-conformance:', error)
    return NextResponse.json(
      { error: 'Failed to create non-conformance' },
      { status: 500 }
    )
  }
}