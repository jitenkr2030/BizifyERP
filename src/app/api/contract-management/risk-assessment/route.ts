import { NextRequest, NextResponse } from 'next/server'

// Mock data for risk assessments
const mockRiskAssessments = [
  { 
    id: 1, 
    contractId: 1,
    contract: 'Software License Agreement', 
    riskLevel: 'Low', 
    score: 25, 
    factors: ['Standard terms', 'Established vendor', 'Clear deliverables', 'Low financial impact'],
    mitigation: 'Standard review process sufficient',
    likelihood: 'Low',
    impact: 'Low',
    category: 'Operational',
    assessedBy: 'John Doe',
    assessedAt: '2024-01-15T10:00:00Z',
    nextReview: '2024-04-15',
    recommendations: ['Continue standard monitoring', 'Annual review sufficient']
  },
  { 
    id: 2, 
    contractId: 3,
    contract: 'Vendor Contract', 
    riskLevel: 'High', 
    score: 85, 
    factors: ['High value', 'Complex terms', 'International jurisdiction', 'Single source dependency', 'Regulatory changes'],
    mitigation: 'Enhanced monitoring required, consider alternative vendors',
    likelihood: 'High',
    impact: 'High',
    category: 'Financial',
    assessedBy: 'Jane Smith',
    assessedAt: '2024-01-10T14:00:00Z',
    nextReview: '2024-02-10',
    recommendations: ['Quarterly reviews', 'Develop backup vendor', 'Legal review of international terms', 'Monitor regulatory changes']
  },
  { 
    id: 3, 
    contractId: 2,
    contract: 'Service Level Agreement', 
    riskLevel: 'Medium', 
    score: 55, 
    factors: ['Service guarantees', 'Penalty clauses', 'Performance metrics', 'Third-party dependencies'],
    mitigation: 'Regular performance reviews and monitoring',
    likelihood: 'Medium',
    impact: 'Medium',
    category: 'Service',
    assessedBy: 'Mike Johnson',
    assessedAt: '2024-01-12T09:00:00Z',
    nextReview: '2024-04-12',
    recommendations: ['Monthly performance reviews', 'Monitor third-party dependencies', 'Review penalty clauses quarterly']
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const riskLevel = searchParams.get('riskLevel') || ''

    // Filter data based on risk level
    let filteredData = mockRiskAssessments

    if (riskLevel) {
      filteredData = filteredData.filter(item => 
        item.riskLevel.toLowerCase() === riskLevel.toLowerCase()
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
      { success: false, error: 'Failed to fetch risk assessments' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['contractId', 'riskLevel', 'score', 'factors']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Create new risk assessment
    const newRiskAssessment = {
      id: mockRiskAssessments.length + 1,
      contractId: body.contractId,
      contract: body.contract || 'Unknown Contract',
      riskLevel: body.riskLevel,
      score: body.score,
      factors: body.factors,
      mitigation: body.mitigation || '',
      likelihood: body.likelihood || 'Medium',
      impact: body.impact || 'Medium',
      category: body.category || 'General',
      assessedBy: body.assessedBy || 'System',
      assessedAt: new Date().toISOString(),
      nextReview: body.nextReview || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      recommendations: body.recommendations || []
    }

    mockRiskAssessments.push(newRiskAssessment)

    return NextResponse.json({
      success: true,
      data: newRiskAssessment,
      message: 'Risk assessment created successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create risk assessment' },
      { status: 500 }
    )
  }
}