import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const type = searchParams.get('type')
    const period = searchParams.get('period')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (type && type !== 'all') {
      where.type = type
    }

    if (period) {
      where.period = period
    }

    // For this demo, we'll generate reports dynamically based on analytic data
    // In a real implementation, you would store reports in the database
    const reports = await generateAnalyticReports(type, period)

    const filteredReports = reports.filter(report => {
      const matchesSearch = !search || 
        report.name.toLowerCase().includes(search.toLowerCase()) ||
        report.type.toLowerCase().includes(search.toLowerCase())
      const matchesType = !type || type === 'all' || report.type === type
      const matchesPeriod = !period || report.period === period
      
      return matchesSearch && matchesType && matchesPeriod
    })

    const totalCount = filteredReports.length
    const paginatedReports = filteredReports.slice(skip, skip + limit)
    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      success: true,
      data: paginatedReports,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages
      }
    })
  } catch (error) {
    console.error('Error fetching analytic reports:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytic reports' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      type,
      period,
      filters = {}
    } = body

    // Validate required fields
    if (!name || !type || !period) {
      return NextResponse.json(
        { success: false, error: 'Name, type, and period are required' },
        { status: 400 }
      )
    }

    // Generate the report based on type and filters
    const report = await generateAnalyticReport(type, period, filters)

    return NextResponse.json({
      success: true,
      data: report,
      message: 'Analytic report generated successfully'
    })
  } catch (error) {
    console.error('Error generating analytic report:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate analytic report' },
      { status: 500 }
    )
  }
}

// Helper function to generate analytic reports
async function generateAnalyticReports(type?: string, period?: string) {
  // Get all analytic accounts with their lines
  const accounts = await db.analyticAccount.findMany({
    include: {
      analyticLines: {
        include: {
          accountTransaction: {
            include: {
              account: true,
              transaction: true
            }
          }
        }
      }
    }
  })

  const reports = []

  // Generate expense analysis report
  if (!type || type === 'expense' || type === 'all') {
    const expenseData = accounts.map(account => {
      const expenseLines = account.analyticLines.filter(line => 
        line.accountTransaction.account.type === 'expense'
      )
      const totalExpenses = expenseLines.reduce((sum, line) => sum + line.amount, 0)
      
      return {
        accountName: account.name,
        accountCode: account.code,
        accountType: account.type,
        totalExpenses,
        transactionCount: expenseLines.length
      }
    }).filter(item => item.totalExpenses > 0)

    reports.push({
      id: `expense-${period || 'current'}`,
      name: `${period || 'Current'} Expense Analysis`,
      type: 'expense',
      period: period || 'current',
      totalAmount: expenseData.reduce((sum, item) => sum + item.totalExpenses, 0),
      accountCount: expenseData.length,
      data: expenseData,
      createdAt: new Date().toISOString()
    })
  }

  // Generate revenue analysis report
  if (!type || type === 'revenue' || type === 'all') {
    const revenueData = accounts.map(account => {
      const revenueLines = account.analyticLines.filter(line => 
        line.accountTransaction.account.type === 'revenue'
      )
      const totalRevenue = revenueLines.reduce((sum, line) => sum + line.amount, 0)
      
      return {
        accountName: account.name,
        accountCode: account.code,
        accountType: account.type,
        totalRevenue,
        transactionCount: revenueLines.length
      }
    }).filter(item => item.totalRevenue > 0)

    reports.push({
      id: `revenue-${period || 'current'}`,
      name: `${period || 'Current'} Revenue Analysis`,
      type: 'revenue',
      period: period || 'current',
      totalAmount: revenueData.reduce((sum, item) => sum + item.totalRevenue, 0),
      accountCount: revenueData.length,
      data: revenueData,
      createdAt: new Date().toISOString()
    })
  }

  return reports
}

// Helper function to generate a single analytic report
async function generateAnalyticReport(type: string, period: string, filters: any = {}) {
  const accounts = await db.analyticAccount.findMany({
    where: filters.accountType ? { type: filters.accountType } : {},
    include: {
      analyticLines: {
        include: {
          accountTransaction: {
            include: {
              account: true,
              transaction: true
            }
          }
        },
        where: filters.dateRange ? {
          accountTransaction: {
            transaction: {
              date: {
                gte: new Date(filters.dateRange.start),
                lte: new Date(filters.dateRange.end)
              }
            }
          }
        } : {}
      }
    }
  })

  let reportData: any[] = []
  let totalAmount = 0

  switch (type) {
    case 'expense':
      reportData = accounts.map(account => {
        const expenseLines = account.analyticLines.filter(line => 
          line.accountTransaction.account.type === 'expense'
        )
        const totalExpenses = expenseLines.reduce((sum, line) => sum + line.amount, 0)
        
        return {
          accountName: account.name,
          accountCode: account.code,
          accountType: account.type,
          totalExpenses,
          transactionCount: expenseLines.length,
          averageTransaction: expenseLines.length > 0 ? totalExpenses / expenseLines.length : 0
        }
      }).filter(item => item.totalExpenses > 0)
      
      totalAmount = reportData.reduce((sum, item) => sum + item.totalExpenses, 0)
      break

    case 'revenue':
      reportData = accounts.map(account => {
        const revenueLines = account.analyticLines.filter(line => 
          line.accountTransaction.account.type === 'revenue'
        )
        const totalRevenue = revenueLines.reduce((sum, line) => sum + line.amount, 0)
        
        return {
          accountName: account.name,
          accountCode: account.code,
          accountType: account.type,
          totalRevenue,
          transactionCount: revenueLines.length,
          averageTransaction: revenueLines.length > 0 ? totalRevenue / revenueLines.length : 0
        }
      }).filter(item => item.totalRevenue > 0)
      
      totalAmount = reportData.reduce((sum, item) => sum + item.totalRevenue, 0)
      break

    case 'profit_loss':
      reportData = accounts.map(account => {
        const expenseLines = account.analyticLines.filter(line => 
          line.accountTransaction.account.type === 'expense'
        )
        const revenueLines = account.analyticLines.filter(line => 
          line.accountTransaction.account.type === 'revenue'
        )
        
        const totalExpenses = expenseLines.reduce((sum, line) => sum + line.amount, 0)
        const totalRevenue = revenueLines.reduce((sum, line) => sum + line.amount, 0)
        const netProfit = totalRevenue - totalExpenses
        
        return {
          accountName: account.name,
          accountCode: account.code,
          accountType: account.type,
          totalRevenue,
          totalExpenses,
          netProfit,
          profitMargin: totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0,
          transactionCount: expenseLines.length + revenueLines.length
        }
      }).filter(item => item.totalRevenue > 0 || item.totalExpenses > 0)
      
      totalAmount = reportData.reduce((sum, item) => sum + item.netProfit, 0)
      break

    case 'budget_variance':
      // This would require budget data to be stored
      reportData = accounts.map(account => {
        const allLines = account.analyticLines
        const totalSpent = allLines.reduce((sum, line) => sum + line.amount, 0)
        
        // Mock budget calculation - in real implementation, this would come from budget data
        const budget = totalSpent * 1.1 // Assume 10% budget buffer
        const variance = ((totalSpent - budget) / budget) * 100
        
        return {
          accountName: account.name,
          accountCode: account.code,
          accountType: account.type,
          budget,
          actual: totalSpent,
          variance,
          variancePercentage: Math.abs(variance),
          transactionCount: allLines.length
        }
      })
      
      totalAmount = reportData.reduce((sum, item) => sum + item.variance, 0)
      break
  }

  return {
    id: `report-${Date.now()}`,
    name: `${type.replace('_', ' ').toUpperCase()} Analysis - ${period}`,
    type,
    period,
    totalAmount,
    accountCount: reportData.length,
    data: reportData,
    generatedAt: new Date().toISOString(),
    filters
  }
}