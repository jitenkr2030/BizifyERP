import { NextRequest, NextResponse } from 'next/server'

// Mock data for anomaly detection
const mockAnomalies = [
  { 
    id: 1, 
    type: 'Financial Transaction', 
    severity: 'High', 
    confidence: 96.3, 
    detected: '2024-01-15 14:30', 
    description: 'Unusual large transaction detected',
    status: 'Under Review',
    action: 'Immediate investigation required',
    category: 'Financial',
    dataSource: 'transaction_logs',
    anomalyScore: 0.963,
    affectedRecords: 1,
    assignedTo: 'finance-team@company.com',
    resolvedAt: null,
    createdAt: '2024-01-15T14:30:00Z'
  },
  { 
    id: 2, 
    type: 'User Behavior', 
    severity: 'Medium', 
    confidence: 78.5, 
    detected: '2024-01-15 10:15', 
    description: 'Abnormal login pattern detected',
    status: 'Investigating',
    action: 'Security team notified',
    category: 'Security',
    dataSource: 'auth_logs',
    anomalyScore: 0.785,
    affectedRecords: 15,
    assignedTo: 'security-team@company.com',
    resolvedAt: null,
    createdAt: '2024-01-15T10:15:00Z'
  },
  { 
    id: 3, 
    type: 'Sales Pattern', 
    severity: 'Low', 
    confidence: 65.2, 
    detected: '2024-01-14 16:45', 
    description: 'Unusual sales spike detected',
    status: 'Resolved',
    action: 'Validated as legitimate promotion',
    category: 'Sales',
    dataSource: 'sales_data',
    anomalyScore: 0.652,
    affectedRecords: 45,
    assignedTo: 'sales-team@company.com',
    resolvedAt: '2024-01-14T18:30:00Z',
    createdAt: '2024-01-14T16:45:00Z'
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const severity = searchParams.get('severity') || ''
    const status = searchParams.get('status') || ''
    const category = searchParams.get('category') || ''

    // Filter data based on severity, status, and category
    let filteredData = mockAnomalies

    if (severity) {
      filteredData = filteredData.filter(item => 
        item.severity.toLowerCase() === severity.toLowerCase()
      )
    }

    if (status) {
      filteredData = filteredData.filter(item => 
        item.status.toLowerCase() === status.toLowerCase()
      )
    }

    if (category) {
      filteredData = filteredData.filter(item => 
        item.category.toLowerCase() === category.toLowerCase()
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
      { success: false, error: 'Failed to fetch anomalies' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['type', 'severity', 'description', 'category']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Create new anomaly
    const newAnomaly = {
      id: mockAnomalies.length + 1,
      type: body.type,
      severity: body.severity,
      confidence: body.confidence || 0,
      detected: new Date().toISOString().replace('T', ' ').substring(0, 16),
      description: body.description,
      status: body.status || 'New',
      action: body.action || '',
      category: body.category,
      dataSource: body.dataSource || 'unknown',
      anomalyScore: body.anomalyScore || 0,
      affectedRecords: body.affectedRecords || 0,
      assignedTo: body.assignedTo || 'unassigned',
      resolvedAt: null,
      createdAt: new Date().toISOString()
    }

    mockAnomalies.push(newAnomaly)

    return NextResponse.json({
      success: true,
      data: newAnomaly,
      message: 'Anomaly created successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create anomaly' },
      { status: 500 }
    )
  }
}