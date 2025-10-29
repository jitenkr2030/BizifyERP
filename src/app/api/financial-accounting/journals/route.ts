import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'all'

    let whereClause: any = {}
    
    if (type !== 'all') {
      whereClause.type = type
    }

    const journals = await db.journal.findMany({
      where: whereClause,
      include: {
        _count: {
          select: {
            transactions: true
          }
        }
      },
      orderBy: { code: 'asc' }
    })

    // Format the response to include transaction count
    const formattedJournals = journals.map(journal => ({
      ...journal,
      transactionCount: journal._count.transactions
    }))

    return NextResponse.json(formattedJournals)
  } catch (error) {
    console.error('Error fetching journals:', error)
    return NextResponse.json(
      { error: 'Failed to fetch journals' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { code, name, type } = body

    // Check if journal code already exists
    const existingJournal = await db.journal.findUnique({
      where: { code }
    })

    if (existingJournal) {
      return NextResponse.json(
        { error: 'Journal code already exists' },
        { status: 400 }
      )
    }

    const journal = await db.journal.create({
      data: {
        code,
        name,
        type
      }
    })

    return NextResponse.json(journal, { status: 201 })
  } catch (error) {
    console.error('Error creating journal:', error)
    return NextResponse.json(
      { error: 'Failed to create journal' },
      { status: 500 }
    )
  }
}