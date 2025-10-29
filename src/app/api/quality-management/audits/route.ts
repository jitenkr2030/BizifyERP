import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const auditType = searchParams.get('auditType')
    const status = searchParams.get('status')

    const skip = (page - 1) * limit

    // Build where clause
    let where: any = {}
    
    if (auditType) {
      where.auditType = auditType
    }

    if (status) {
      where.status = status
    }

    const [qualityAudits, total] = await Promise.all([
      db.qualityAudit.findMany({
        where,
        skip,
        take: limit,
        orderBy: { startDate: 'desc' },
        include: {
          auditor: {
            select: { id: true, name: true }
          },
          auditFindings: true
        }
      }),
      db.qualityAudit.count({ where })
    ])

    return NextResponse.json({
      qualityAudits,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching quality audits:', error)
    return NextResponse.json(
      { error: 'Failed to fetch quality audits' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const qualityAudit = await db.qualityAudit.create({
      data: {
        reference: body.reference,
        auditType: body.auditType,
        scope: body.scope,
        auditorId: body.auditorId,
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
        status: body.status || 'planned',
        findings: body.findings,
        recommendations: body.recommendations
      },
      include: {
        auditor: {
          select: { id: true, name: true }
        },
        auditFindings: true
      }
    })

    return NextResponse.json(qualityAudit, { status: 201 })
  } catch (error) {
    console.error('Error creating quality audit:', error)
    return NextResponse.json(
      { error: 'Failed to create quality audit' },
      { status: 500 }
    )
  }
}