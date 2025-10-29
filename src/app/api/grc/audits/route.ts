import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/grc/audits - Get all audits
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    // Build where clause based on filters
    const where: any = {}
    
    if (type && type !== 'all') {
      where.type = type
    }
    
    if (status && status !== 'all') {
      where.status = status
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { scope: { contains: search, mode: 'insensitive' } }
      ]
    }

    const audits = await db.audit.findMany({
      where,
      include: {
        leadAuditor: true,
        teamMembers: {
          include: {
            user: true
          }
        },
        findings: {
          include: {
            assignedTo: true
          }
        }
      },
      orderBy: { startDate: 'desc' }
    })

    return NextResponse.json({ success: true, data: audits })
  } catch (error) {
    console.error('Error fetching audits:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch audits' },
      { status: 500 }
    )
  }
}

// POST /api/grc/audits - Create new audit
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      type,
      scope,
      description,
      leadAuditor,
      startDate,
      endDate,
      teamMembers
    } = body

    // Validate required fields
    if (!title || !type || !scope || !leadAuditor || !startDate || !endDate) {
      return NextResponse.json(
        { success: false, error: 'Title, type, scope, lead auditor, and dates are required' },
        { status: 400 }
      )
    }

    // Create the audit
    const audit = await db.audit.create({
      data: {
        title,
        type,
        scope,
        description,
        leadAuditorId: leadAuditor,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status: 'Scheduled'
      },
      include: {
        leadAuditor: true,
        teamMembers: {
          include: {
            user: true
          }
        },
        findings: true
      }
    })

    // Add team members if provided
    if (teamMembers && teamMembers.length > 0) {
      await db.auditTeamMember.createMany({
        data: teamMembers.map((memberId: string) => ({
          auditId: audit.id,
          userId: memberId,
          role: 'Team Member'
        }))
      })
    }

    return NextResponse.json({ success: true, data: audit }, { status: 201 })
  } catch (error) {
    console.error('Error creating audit:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create audit' },
      { status: 500 }
    )
  }
}