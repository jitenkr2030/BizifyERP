import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const analyticAccountId = searchParams.get('analyticAccountId')
    const accountTransactionId = searchParams.get('accountTransactionId')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.OR = [
        { analyticAccount: { name: { contains: search, mode: 'insensitive' } } },
        { accountTransaction: { description: { contains: search, mode: 'insensitive' } } }
      ]
    }

    if (analyticAccountId) {
      where.analyticAccountId = analyticAccountId
    }

    if (accountTransactionId) {
      where.accountTransactionId = accountTransactionId
    }

    // Get analytic lines with related data
    const [analyticLines, totalCount] = await Promise.all([
      db.analyticLine.findMany({
        where,
        include: {
          analyticAccount: {
            select: {
              id: true,
              code: true,
              name: true,
              type: true
            }
          },
          accountTransaction: {
            include: {
              account: {
                select: {
                  id: true,
                  code: true,
                  name: true
                }
              },
              transaction: {
                select: {
                  id: true,
                  reference: true,
                  date: true,
                  description: true
                }
              }
            }
          }
        },
        skip,
        take: limit,
        orderBy: [
          { createdAt: 'desc' }
        ]
      }),
      db.analyticLine.count({ where })
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      success: true,
      data: analyticLines,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages
      }
    })
  } catch (error) {
    console.error('Error fetching analytic lines:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytic lines' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      analyticAccountId,
      accountTransactionId,
      amount,
      percentage = 100
    } = body

    // Validate required fields
    if (!analyticAccountId || !accountTransactionId || !amount) {
      return NextResponse.json(
        { success: false, error: 'Analytic account, account transaction, and amount are required' },
        { status: 400 }
      )
    }

    // Check if analytic account exists
    const analyticAccount = await db.analyticAccount.findUnique({
      where: { id: analyticAccountId }
    })

    if (!analyticAccount) {
      return NextResponse.json(
        { success: false, error: 'Analytic account not found' },
        { status: 404 }
      )
    }

    // Check if account transaction exists
    const accountTransaction = await db.accountTransaction.findUnique({
      where: { id: accountTransactionId },
      include: {
        transaction: true,
        account: true
      }
    })

    if (!accountTransaction) {
      return NextResponse.json(
        { success: false, error: 'Account transaction not found' },
        { status: 404 }
      )
    }

    // Validate percentage
    if (percentage < 0 || percentage > 100) {
      return NextResponse.json(
        { success: false, error: 'Percentage must be between 0 and 100' },
        { status: 400 }
      )
    }

    // Calculate the allocated amount
    const allocatedAmount = (parseFloat(amount.toString()) * percentage) / 100

    // Create analytic line
    const analyticLine = await db.analyticLine.create({
      data: {
        analyticAccountId,
        accountTransactionId,
        amount: allocatedAmount,
        percentage
      },
      include: {
        analyticAccount: {
          select: {
            id: true,
            code: true,
            name: true,
            type: true
          }
        },
        accountTransaction: {
          include: {
            account: {
              select: {
                id: true,
                code: true,
                name: true
              }
            },
            transaction: {
              select: {
                id: true,
                reference: true,
                date: true,
                description: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: analyticLine,
      message: 'Analytic line created successfully'
    })
  } catch (error) {
    console.error('Error creating analytic line:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create analytic line' },
      { status: 500 }
    )
  }
}