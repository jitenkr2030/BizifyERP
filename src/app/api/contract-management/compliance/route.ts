import { NextRequest, NextResponse } from 'next/server'

// Mock data for compliance monitoring
const mockComplianceItems = [
  { 
    id: 1, 
    contractId: 1,
    contract: 'Software License Agreement', 
    requirement: 'GDPR Compliance', 
    status: 'Compliant', 
    lastChecked: '2024-01-15',
    nextCheck: '2024-04-15',
    details: 'All data processing clauses comply with GDPR requirements',
    evidence: ['Data Processing Agreement', 'Privacy Policy'],
    assignedTo: 'Jane Smith',
    severity: 'High',
    category: 'Data Protection'
  },
  { 
    id: 2, 
    contractId: 3,
    contract: 'Vendor Contract', 
    requirement: 'SOX Compliance', 
    status: 'Non-Compliant', 
    lastChecked: '2024-01-10',
    nextCheck: '2024-02-10',
    details: 'Missing financial reporting requirements for SOX compliance',
    evidence: ['Audit Report'],
    assignedTo: 'Mike Johnson',
    severity: 'Critical',
    category: 'Financial'
  },
  { 
    id: 3, 
    contractId: 2,
    contract: 'Service Level Agreement', 
    requirement: 'Data Protection', 
    status: 'Under Review', 
    lastChecked: '2024-01-12',
    nextCheck: '2024-04-12',
    details: 'Reviewing data protection clauses for completeness',
    evidence: ['Contract Draft', 'Legal Review Notes'],
    assignedTo: 'John Doe',
    severity: 'High',
    category: 'Data Protection'
  },
  { 
    id: 4, 
    contractId: 4,
    contract: 'Employment Agreement', 
    requirement: 'Labor Laws', 
    status: 'Not Reviewed', 
    lastChecked: '2024-01-08',
    nextCheck: '2024-04-08',
    details: 'Pending review against current labor regulations',
    evidence: [],
    assignedTo: 'Sarah Wilson',
    severity: 'Medium',
    category: 'Legal'
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status') || ''
    const category = searchParams.get('category') || ''

    // Filter data based on status and category
    let filteredData = mockComplianceItems

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
      { success: false, error: 'Failed to fetch compliance items' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['contractId', 'requirement', 'category', 'severity']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Create new compliance item
    const newComplianceItem = {
      id: mockComplianceItems.length + 1,
      contractId: body.contractId,
      contract: body.contract || 'Unknown Contract',
      requirement: body.requirement,
      status: body.status || 'Not Reviewed',
      lastChecked: body.lastChecked || new Date().toISOString().split('T')[0],
      nextCheck: body.nextCheck || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      details: body.details || '',
      evidence: body.evidence || [],
      assignedTo: body.assignedTo || 'Unassigned',
      severity: body.severity,
      category: body.category
    }

    mockComplianceItems.push(newComplianceItem)

    return NextResponse.json({
      success: true,
      data: newComplianceItem,
      message: 'Compliance item created successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create compliance item' },
      { status: 500 }
    )
  }
}