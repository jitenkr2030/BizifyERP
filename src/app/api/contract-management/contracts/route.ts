import { NextRequest, NextResponse } from 'next/server'

// Mock data for contracts
const mockContracts = [
  { 
    id: 1, 
    title: 'Software License Agreement', 
    type: 'License', 
    status: 'Active', 
    value: 50000, 
    currency: 'USD',
    startDate: '2024-01-01', 
    endDate: '2024-12-31', 
    renewalDate: '2024-11-01',
    riskLevel: 'Low',
    compliance: 'Compliant',
    description: 'Standard software licensing agreement for enterprise use',
    parties: ['TechCorp Inc.', 'Our Company'],
    createdBy: 'john.doe@company.com',
    createdAt: '2024-01-01T00:00:00Z'
  },
  { 
    id: 2, 
    title: 'Service Level Agreement', 
    type: 'SLA', 
    status: 'Pending Approval', 
    value: 25000, 
    currency: 'USD',
    startDate: '2024-02-01', 
    endDate: '2025-01-31', 
    renewalDate: '2024-12-01',
    riskLevel: 'Medium',
    compliance: 'Under Review',
    description: 'Service level agreement for IT support services',
    parties: ['ServicePro LLC', 'Our Company'],
    createdBy: 'jane.smith@company.com',
    createdAt: '2024-01-15T00:00:00Z'
  },
  { 
    id: 3, 
    title: 'Vendor Contract', 
    type: 'Procurement', 
    status: 'Active', 
    value: 100000, 
    currency: 'USD',
    startDate: '2023-06-01', 
    endDate: '2024-05-31', 
    renewalDate: '2024-04-01',
    riskLevel: 'High',
    compliance: 'Non-Compliant',
    description: 'Vendor contract for office supplies and equipment',
    parties: ['SupplyChain Co.', 'Our Company'],
    createdBy: 'mike.johnson@company.com',
    createdAt: '2023-05-15T00:00:00Z'
  },
  { 
    id: 4, 
    title: 'Employment Agreement', 
    type: 'HR', 
    status: 'Draft', 
    value: 75000, 
    currency: 'USD',
    startDate: '2024-03-01', 
    endDate: '2025-02-28', 
    renewalDate: '2025-01-01',
    riskLevel: 'Low',
    compliance: 'Not Reviewed',
    description: 'Executive employment agreement',
    parties: ['John Executive', 'Our Company'],
    createdBy: 'hr@company.com',
    createdAt: '2024-01-20T00:00:00Z'
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status') || ''
    const type = searchParams.get('type') || ''

    // Filter data based on status and type
    let filteredData = mockContracts

    if (status) {
      filteredData = filteredData.filter(item => 
        item.status.toLowerCase() === status.toLowerCase()
      )
    }

    if (type) {
      filteredData = filteredData.filter(item => 
        item.type.toLowerCase() === type.toLowerCase()
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
      { success: false, error: 'Failed to fetch contracts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['title', 'type', 'value', 'startDate', 'endDate']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Create new contract
    const newContract = {
      id: mockContracts.length + 1,
      title: body.title,
      type: body.type,
      status: body.status || 'Draft',
      value: body.value,
      currency: body.currency || 'USD',
      startDate: body.startDate,
      endDate: body.endDate,
      renewalDate: body.renewalDate,
      riskLevel: body.riskLevel || 'Medium',
      compliance: body.compliance || 'Not Reviewed',
      description: body.description || '',
      parties: body.parties || [],
      createdBy: body.createdBy || 'system',
      createdAt: new Date().toISOString()
    }

    mockContracts.push(newContract)

    return NextResponse.json({
      success: true,
      data: newContract,
      message: 'Contract created successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create contract' },
      { status: 500 }
    )
  }
}