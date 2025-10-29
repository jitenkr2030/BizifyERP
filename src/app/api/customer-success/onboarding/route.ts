import { NextRequest, NextResponse } from 'next/server'

// Mock data for onboarding workflows
const mockOnboardingWorkflows = [
  { id: 1, name: 'New Customer Onboarding', customers: 45, completion: 78, status: 'Active' },
  { id: 2, name: 'Premium Feature Setup', customers: 12, completion: 92, status: 'Active' },
  { id: 3, name: 'Integration Setup', customers: 8, completion: 65, status: 'Active' },
  { id: 4, name: 'Training Program', customers: 23, completion: 45, status: 'Paused' },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status') || ''

    // Filter data based on status
    let filteredData = mockOnboardingWorkflows

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
      { success: false, error: 'Failed to fetch onboarding workflows' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'status']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Create new onboarding workflow
    const newWorkflow = {
      id: mockOnboardingWorkflows.length + 1,
      name: body.name,
      customers: body.customers || 0,
      completion: body.completion || 0,
      status: body.status,
      createdAt: new Date().toISOString()
    }

    mockOnboardingWorkflows.push(newWorkflow)

    return NextResponse.json({
      success: true,
      data: newWorkflow,
      message: 'Onboarding workflow created successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create onboarding workflow' },
      { status: 500 }
    )
  }
}