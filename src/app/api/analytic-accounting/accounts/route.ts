import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const type = searchParams.get('type')
    const isActive = searchParams.get('isActive')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.OR = [
        { code: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (type && type !== 'all') {
      where.type = type
    }

    if (isActive !== null && isActive !== undefined) {
      where.isActive = isActive === 'true'
    }

    // Get analytic accounts with related data
    const [accounts, totalCount] = await Promise.all([
      db.analyticAccount.findMany({
        where,
        include: {
          parent: {
            select: {
              id: true,
              code: true,
              name: true
            }
          },
          children: {
            select: {
              id: true,
              code: true,
              name: true,
              type: true
            }
          },
          analyticLines: {
            select: {
              id: true,
              amount: true,
              createdAt: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: [
          { isActive: 'desc' },
          { type: 'asc' },
          { code: 'asc' }
        ]
      }),
      db.analyticAccount.count({ where })
    ])

    // Calculate additional metrics for each account
    const accountsWithMetrics = accounts.map(account => {
      const totalAmount = account.analyticLines.reduce((sum, line) => sum + line.amount, 0)
      const transactionCount = account.analyticLines.length

      return {
        ...account,
        metrics: {
          totalAmount,
          transactionCount
        }
      }
    })

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      success: true,
      data: accountsWithMetrics,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages
      }
    })
  } catch (error) {
    console.error('Error fetching analytic accounts:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytic accounts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      code,
      name,
      type,
      parentId,
      isActive = true
    } = body

    // Validate required fields
    if (!code || !name || !type) {
      return NextResponse.json(
        { success: false, error: 'Code, name, and type are required' },
        { status: 400 }
      )
    }

    // Check if account code already exists
    const existingAccount = await db.analyticAccount.findUnique({
      where: { code }
    })

    if (existingAccount) {
      return NextResponse.json(
        { success: false, error: 'Account code already exists' },
        { status: 400 }
      )
    }

    // Check if parent exists (if provided)
    if (parentId) {
      const parent = await db.analyticAccount.findUnique({
        where: { id: parentId }
      })

      if (!parent) {
        return NextResponse.json(
          { success: false, error: 'Parent account not found' },
          { status: 404 }
        )
      }
    }

    // Create analytic account
    const account = await db.analyticAccount.create({
      data: {
        code,
        name,
        type,
        parentId,
        isActive
      },
      include: {
        parent: {
          select: {
            id: true,
            code: true,
            name: true
          }
        },
        children: {
          select: {
            id: true,
            code: true,
            name: true,
            type: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: account,
      message: 'Analytic account created successfully'
    })
  } catch (error) {
    console.error('Error creating analytic account:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create analytic account' },
      { status: 500 }
    )
  }
}