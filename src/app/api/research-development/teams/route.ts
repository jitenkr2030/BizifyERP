import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const isActive = searchParams.get('isActive')

    let whereClause: any = {}

    if (isActive === 'true') {
      whereClause.isActive = true
    } else if (isActive === 'false') {
      whereClause.isActive = false
    }

    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { specializations: { contains: search, mode: 'insensitive' } }
      ]
    }

    const teams = await db.rDTeam.findMany({
      where: whereClause,
      include: {
        lead: {
          select: { id: true, name: true, email: true }
        },
        members: {
          include: {
            user: {
              select: { id: true, name: true, email: true }
            },
            project: {
              select: { id: true, name: true }
            }
          }
        },
        _count: {
          select: {
            members: true
          }
        }
      },
      orderBy: [
        { isActive: 'desc' },
        { name: 'asc' }
      ]
    })

    // Parse JSON fields for response
    const parsedTeams = teams.map(team => ({
      ...team,
      specializations: team.specializations ? JSON.parse(team.specializations) : []
    }))

    return NextResponse.json(parsedTeams)
  } catch (error) {
    console.error('Error fetching R&D teams:', error)
    return NextResponse.json(
      { error: 'Failed to fetch R&D teams' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      description,
      leadId,
      specializations,
      budget
    } = body

    // Validate required fields
    if (!name || !leadId || !specializations || !budget) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const team = await db.rDTeam.create({
      data: {
        name,
        description,
        leadId,
        specializations: JSON.stringify(specializations),
        budget: parseFloat(budget)
      },
      include: {
        lead: {
          select: { id: true, name: true, email: true }
        },
        members: {
          include: {
            user: {
              select: { id: true, name: true, email: true }
            },
            project: {
              select: { id: true, name: true }
            }
          }
        }
      }
    })

    // Parse JSON fields for response
    const parsedTeam = {
      ...team,
      specializations: team.specializations ? JSON.parse(team.specializations) : []
    }

    return NextResponse.json(parsedTeam, { status: 201 })
  } catch (error) {
    console.error('Error creating R&D team:', error)
    return NextResponse.json(
      { error: 'Failed to create R&D team' },
      { status: 500 }
    )
  }
}