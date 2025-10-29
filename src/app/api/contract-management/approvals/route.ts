import { NextRequest, NextResponse } from 'next/server'

// Mock data for approval workflows
const mockApprovalWorkflows = [
  { 
    id: 1, 
    name: 'Standard Contract Approval', 
    contractId: 1,
    contract: 'Software License Agreement', 
    currentStage: 'Legal Review', 
    totalStages: 4, 
    progress: 75, 
    status: 'In Progress',
    assignedTo: 'John Doe',
    stages: [
      { name: 'Initial Review', status: 'Completed', completedBy: 'Jane Smith', completedAt: '2024-01-02T10:00:00Z' },
      { name: 'Legal Review', status: 'In Progress', assignedTo: 'John Doe' },
      { name: 'Management Approval', status: 'Pending' },
      { name: 'Final Approval', status: 'Pending' }
    ],
    createdAt: '2024-01-01T09:00:00Z',
    updatedAt: '2024-01-02T14:30:00Z'
  },
  { 
    id: 2, 
    name: 'High-Value Contract Approval', 
    contractId: 3,
    contract: 'Vendor Contract', 
    currentStage: 'Executive Approval', 
    totalStages: 5, 
    progress: 80, 
    status: 'In Progress',
    assignedTo: 'Jane Smith',
    stages: [
      { name: 'Initial Review', status: 'Completed', completedBy: 'Mike Johnson', completedAt: '2024-01-10T09:00:00Z' },
      { name: 'Legal Review', status: 'Completed', completedBy: 'John Doe', completedAt: '2024-01-11T15:00:00Z' },
      { name: 'Finance Review', status: 'Completed', completedBy: 'Sarah Wilson', completedAt: '2024-01-12T11:00:00Z' },
      { name: 'Executive Approval', status: 'In Progress', assignedTo: 'Jane Smith' },
      { name: 'Board Approval', status: 'Pending' }
    ],
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-12T16:00:00Z'
  },
  { 
    id: 3, 
    name: 'Emergency Approval', 
    contractId: 2,
    contract: 'Service Level Agreement', 
    currentStage: 'Completed', 
    totalStages: 3, 
    progress: 100, 
    status: 'Approved',
    assignedTo: 'Mike Johnson',
    stages: [
      { name: 'Initial Review', status: 'Completed', completedBy: 'John Doe', completedAt: '2024-01-15T09:00:00Z' },
      { name: 'Legal Review', status: 'Completed', completedBy: 'Jane Smith', completedAt: '2024-01-15T14:00:00Z' },
      { name: 'Management Approval', status: 'Completed', completedBy: 'Mike Johnson', completedAt: '2024-01-16T10:00:00Z' }
    ],
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z'
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status') || ''

    // Filter data based on status
    let filteredData = mockApprovalWorkflows

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
      { success: false, error: 'Failed to fetch approval workflows' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'contractId', 'stages']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Create new approval workflow
    const newWorkflow = {
      id: mockApprovalWorkflows.length + 1,
      name: body.name,
      contractId: body.contractId,
      contract: body.contract || 'Unknown Contract',
      currentStage: body.stages[0]?.name || 'Initial Review',
      totalStages: body.stages.length,
      progress: 0,
      status: 'In Progress',
      assignedTo: body.stages[0]?.assignedTo || 'Unassigned',
      stages: body.stages,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    mockApprovalWorkflows.push(newWorkflow)

    return NextResponse.json({
      success: true,
      data: newWorkflow,
      message: 'Approval workflow created successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create approval workflow' },
      { status: 500 }
    )
  }
}