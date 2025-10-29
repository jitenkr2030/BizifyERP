import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    let whereClause: any = {}

    if (type && type !== 'all') {
      whereClause.type = type
    }

    if (status && status !== 'all') {
      whereClause.status = status
    }

    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { inventors: { contains: search, mode: 'insensitive' } }
      ]
    }

    const intellectualProperty = await db.rDIntellectualProperty.findMany({
      where: whereClause,
      include: {
        project: {
          select: { id: true, name: true }
        },
        createdBy: {
          select: { id: true, name: true, email: true }
        }
      },
      orderBy: [
        { status: 'asc' },
        { filingDate: 'desc' },
        { createdAt: 'desc' }
      ]
    })

    return NextResponse.json(intellectualProperty)
  } catch (error) {
    console.error('Error fetching R&D intellectual property:', error)
    return NextResponse.json(
      { error: 'Failed to fetch R&D intellectual property' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      type,
      description,
      inventors,
      projectId,
      value,
      jurisdiction,
      category,
      filingDate,
      createdById
    } = body

    // Validate required fields
    if (!title || !type || !description || !inventors) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const ip = await db.rDIntellectualProperty.create({
      data: {
        title,
        type,
        description,
        inventors: JSON.stringify(inventors),
        projectId: projectId || null,
        value: value ? parseFloat(value) : null,
        jurisdiction,
        category,
        filingDate: filingDate ? new Date(filingDate) : null,
        createdById
      },
      include: {
        project: {
          select: { id: true, name: true }
        },
        createdBy: {
          select: { id: true, name: true, email: true }
        }
      }
    })

    return NextResponse.json(ip, { status: 201 })
  } catch (error) {
    console.error('Error creating R&D intellectual property:', error)
    return NextResponse.json(
      { error: 'Failed to create R&D intellectual property' },
      { status: 500 }
    )
  }
}