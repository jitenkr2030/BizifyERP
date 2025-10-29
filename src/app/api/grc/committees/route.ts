import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/grc/committees - Get all committees
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const search = searchParams.get('search')

    // Build where clause based on filters
    const where: any = {}
    
    if (type && type !== 'all') {
      where.type = type
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    const committees = await db.committee.findMany({
      where,
      include: {
        chairperson: true,
        members: {
          include: {
            user: true
          }
        },
        meetings: {
          orderBy: { scheduledDate: 'desc' },
          take: 5
        }
      },
      orderBy: { name: 'asc' }
    })

    return NextResponse.json({ success: true, data: committees })
  } catch (error) {
    console.error('Error fetching committees:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch committees' },
      { status: 500 }
    )
  }
}

// POST /api/grc/committees - Create new committee
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      type,
      description,
      chairperson,
      meetingFrequency,
      responsibilities,
      members
    } = body

    // Validate required fields
    if (!name || !type || !chairperson) {
      return NextResponse.json(
        { success: false, error: 'Name, type, and chairperson are required' },
        { status: 400 }
      )
    }

    // Create the committee
    const committee = await db.committee.create({
      data: {
        name,
        type,
        description,
        chairpersonId: chairperson,
        meetingFrequency,
        responsibilities
      },
      include: {
        chairperson: true,
        members: {
          include: {
            user: true
          }
        },
        meetings: true
      }
    })

    // Add members if provided
    if (members && members.length > 0) {
      await db.committeeMember.createMany({
        data: members.map((memberId: string) => ({
          committeeId: committee.id,
          userId: memberId,
          role: 'Member'
        }))
      })
    }

    return NextResponse.json({ success: true, data: committee }, { status: 201 })
  } catch (error) {
    console.error('Error creating committee:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create committee' },
      { status: 500 }
    )
  }
}