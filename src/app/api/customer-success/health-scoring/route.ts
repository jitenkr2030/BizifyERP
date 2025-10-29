import { NextRequest, NextResponse } from 'next/server'

// Mock data for customer health scores
const mockHealthScores = [
  { id: 1, name: 'Acme Corp', score: 92, status: 'Excellent', trend: 'up', lastInteraction: '2 days ago' },
  { id: 2, name: 'Tech Solutions Inc', score: 78, status: 'Good', trend: 'stable', lastInteraction: '1 week ago' },
  { id: 3, name: 'Global Enterprises', score: 45, status: 'At Risk', trend: 'down', lastInteraction: '3 weeks ago' },
  { id: 4, name: 'Startup Co', score: 88, status: 'Excellent', trend: 'up', lastInteraction: '1 day ago' },
  { id: 5, name: 'Mega Corp', score: 62, status: 'Fair', trend: 'down', lastInteraction: '2 weeks ago' },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''

    // Filter data based on search and status
    let filteredData = mockHealthScores

    if (search) {
      filteredData = filteredData.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase())
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
      { success: false, error: 'Failed to fetch health scores' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'score', 'status']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Create new health score record
    const newHealthScore = {
      id: mockHealthScores.length + 1,
      name: body.name,
      score: body.score,
      status: body.status,
      trend: body.trend || 'stable',
      lastInteraction: body.lastInteraction || 'Just now',
      createdAt: new Date().toISOString()
    }

    mockHealthScores.push(newHealthScore)

    return NextResponse.json({
      success: true,
      data: newHealthScore,
      message: 'Health score created successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create health score' },
      { status: 500 }
    )
  }
}