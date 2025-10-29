import { NextRequest, NextResponse } from 'next/server'

// Mock data for success playbooks
const mockPlaybooks = [
  { id: 1, name: 'High-Touch Customer Success', customers: 15, success: 92, status: 'Active' },
  { id: 2, name: 'Tech-First Onboarding', customers: 28, success: 78, status: 'Active' },
  { id: 3, name: 'Renewal Outreach', customers: 12, success: 85, status: 'Active' },
  { id: 4, name: 'Customer Advocacy', customers: 8, success: 67, status: 'Draft' },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status') || ''

    // Filter data based on status
    let filteredData = mockPlaybooks

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
      { success: false, error: 'Failed to fetch playbooks' },
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

    // Create new playbook
    const newPlaybook = {
      id: mockPlaybooks.length + 1,
      name: body.name,
      customers: body.customers || 0,
      success: body.success || 0,
      status: body.status,
      createdAt: new Date().toISOString()
    }

    mockPlaybooks.push(newPlaybook)

    return NextResponse.json({
      success: true,
      data: newPlaybook,
      message: 'Playbook created successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create playbook' },
      { status: 500 }
    )
  }
}