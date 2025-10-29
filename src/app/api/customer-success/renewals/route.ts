import { NextRequest, NextResponse } from 'next/server'

// Mock data for renewals
const mockRenewals = [
  { id: 1, customer: 'Acme Corp', amount: '$12,000', date: '2024-02-15', probability: 85, status: 'On Track' },
  { id: 2, customer: 'Tech Solutions Inc', amount: '$8,500', date: '2024-03-01', probability: 92, status: 'On Track' },
  { id: 3, customer: 'Global Enterprises', amount: '$25,000', date: '2024-02-28', probability: 45, status: 'At Risk' },
  { id: 4, customer: 'Startup Co', amount: '$5,000', date: '2024-03-15', probability: 78, status: 'On Track' },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status') || ''

    // Filter data based on status
    let filteredData = mockRenewals

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
      { success: false, error: 'Failed to fetch renewals' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['customer', 'amount', 'date', 'status']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Create new renewal
    const newRenewal = {
      id: mockRenewals.length + 1,
      customer: body.customer,
      amount: body.amount,
      date: body.date,
      probability: body.probability || 50,
      status: body.status,
      createdAt: new Date().toISOString()
    }

    mockRenewals.push(newRenewal)

    return NextResponse.json({
      success: true,
      data: newRenewal,
      message: 'Renewal created successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create renewal' },
      { status: 500 }
    )
  }
}