import { NextRequest, NextResponse } from 'next/server'

// Mock data for automated reports
const mockReports = [
  { 
    id: 1, 
    name: 'Monthly Sales Report', 
    type: 'Scheduled', 
    frequency: 'Monthly', 
    lastGenerated: '2024-01-01', 
    nextGeneration: '2024-02-01', 
    status: 'Active',
    recipients: 12,
    insights: 'Sales growth of 15% compared to last month',
    format: 'PDF',
    size: '2.4 MB',
    generatedBy: 'ai_system',
    template: 'sales_report_template',
    distribution: ['email', 'dashboard'],
    createdAt: '2023-12-01T00:00:00Z',
    updatedAt: '2024-01-01T09:00:00Z'
  },
  { 
    id: 2, 
    name: 'Customer Churn Analysis', 
    type: 'AI-Powered', 
    frequency: 'Weekly', 
    lastGenerated: '2024-01-14', 
    nextGeneration: '2024-01-21', 
    status: 'Active',
    recipients: 8,
    insights: 'Churn risk decreased by 8% this week',
    format: 'Interactive Dashboard',
    size: '1.8 MB',
    generatedBy: 'ml_model_001',
    template: 'churn_analysis_template',
    distribution: ['dashboard', 'api'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-14T14:30:00Z'
  },
  { 
    id: 3, 
    name: 'Inventory Optimization', 
    type: 'On-Demand', 
    frequency: 'As Needed', 
    lastGenerated: '2024-01-13', 
    nextGeneration: 'Manual', 
    status: 'Paused',
    recipients: 5,
    insights: 'Recommendation to reduce stock levels by 15%',
    format: 'Excel',
    size: '856 KB',
    generatedBy: 'inventory_ai',
    template: 'inventory_optimization_template',
    distribution: ['email', 'download'],
    createdAt: '2023-11-15T00:00:00Z',
    updatedAt: '2024-01-13T11:45:00Z'
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const type = searchParams.get('type') || ''
    const status = searchParams.get('status') || ''

    // Filter data based on type and status
    let filteredData = mockReports

    if (type) {
      filteredData = filteredData.filter(item => 
        item.type.toLowerCase().includes(type.toLowerCase())
      )
    }

    if (status) {
      filteredData = filteredData.filter(item => 
        item.status.toLowerCase() === status.toLowerCase()
      )
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedData = filteredData.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: paginatedData,
      pagination: {
        current: page,
        total: Math.ceil(filteredData.length / limit),
        count: filteredData.length,
        limit
      }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reports' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'type', 'frequency']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Calculate next generation date based on frequency
    let nextGeneration = new Date()
    switch (body.frequency.toLowerCase()) {
      case 'daily':
        nextGeneration.setDate(nextGeneration.getDate() + 1)
        break
      case 'weekly':
        nextGeneration.setDate(nextGeneration.getDate() + 7)
        break
      case 'monthly':
        nextGeneration.setMonth(nextGeneration.getMonth() + 1)
        break
      case 'quarterly':
        nextGeneration.setMonth(nextGeneration.getMonth() + 3)
        break
      default:
        nextGeneration = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Default to 1 week
    }

    // Create new report
    const newReport = {
      id: mockReports.length + 1,
      name: body.name,
      type: body.type,
      frequency: body.frequency,
      lastGenerated: body.lastGenerated || new Date().toISOString().split('T')[0],
      nextGeneration: body.frequency.toLowerCase() === 'as needed' ? 'Manual' : nextGeneration.toISOString().split('T')[0],
      status: body.status || 'Active',
      recipients: body.recipients || 0,
      insights: body.insights || '',
      format: body.format || 'PDF',
      size: body.size || '0 MB',
      generatedBy: body.generatedBy || 'system',
      template: body.template || 'default_template',
      distribution: body.distribution || ['email'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    mockReports.push(newReport)

    return NextResponse.json({
      success: true,
      data: newReport,
      message: 'Report created successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create report' },
      { status: 500 }
    )
  }
}