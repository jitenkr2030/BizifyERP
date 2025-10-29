import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'all'
    const journalId = searchParams.get('journalId')

    let whereClause: any = {}
    
    if (status !== 'all') {
      whereClause.status = status
    }
    
    if (journalId) {
      whereClause.journalId = journalId
    }

    const transactions = await db.transaction.findMany({
      where: whereClause,
      include: {
        journal: true,
        accountTransactions: {
          include: {
            account: true
          }
        }
      },
      orderBy: { date: 'desc' }
    })

    return NextResponse.json(transactions)
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { reference, date, description, journalId, accountTransactions } = body

    // Check if reference already exists
    const existingTransaction = await db.transaction.findUnique({
      where: { reference }
    })

    if (existingTransaction) {
      return NextResponse.json(
        { error: 'Transaction reference already exists' },
        { status: 400 }
      )
    }

    // Calculate totals
    const totalDebit = accountTransactions.reduce((sum: number, item: any) => sum + (item.debit || 0), 0)
    const totalCredit = accountTransactions.reduce((sum: number, item: any) => sum + (item.credit || 0), 0)

    // Validate double-entry accounting
    if (Math.abs(totalDebit - totalCredit) > 0.01) {
      return NextResponse.json(
        { error: 'Debit and credit amounts must be equal' },
        { status: 400 }
      )
    }

    // Create transaction with account transactions
    const transaction = await db.transaction.create({
      data: {
        reference,
        date: new Date(date),
        description,
        journalId,
        totalDebit,
        totalCredit,
        status: 'draft',
        accountTransactions: {
          create: accountTransactions.map((item: any) => ({
            accountId: item.accountId,
            debit: item.debit || 0,
            credit: item.credit || 0,
            description: item.description
          }))
        }
      },
      include: {
        journal: true,
        accountTransactions: {
          include: {
            account: true
          }
        }
      }
    })

    return NextResponse.json(transaction, { status: 201 })
  } catch (error) {
    console.error('Error creating transaction:', error)
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    )
  }
}