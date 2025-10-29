import { NextRequest, NextResponse } from 'next/server'

// Mock data for customer feedback
const mockFeedback = [
  { id: 1, customer: 'Acme Corp', rating: 4.8, sentiment: 'Positive', feedback: 'Excellent service and support', date: '2024-01-15' },
  { id: 2, customer: 'Tech Solutions Inc', rating: 3.2, sentiment: 'Neutral', feedback: 'Good product but needs more features', date: '2024-01-10' },
  { id: 3, customer: 'Global Enterprises', rating: 2.1, sentiment: 'Negative', feedback: 'Response time could be improved', date: '2024-01-08' },
  { id: 4, customer: 'Startup Co', rating: 4.9, sentiment: 'Positive', feedback: 'Perfect for our needs!', date: '2024-01-12' },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const sentiment = searchParams.get('sentiment') || ''

    // Filter data based on sentiment
    let filteredData = mockFeedback

    if (sentiment) {
      filteredData = filteredData.filter(item => 
        item.sentiment.toLowerCase() === sentiment.toLowerCase()
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
      { success: false, error: 'Failed to fetch feedback' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['customer', 'rating', 'sentiment', 'feedback']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Create new feedback
    const newFeedback = {
      id: mockFeedback.length + 1,
      customer: body.customer,
      rating: body.rating,
      sentiment: body.sentiment,
      feedback: body.feedback,
      date: body.date || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    }

    mockFeedback.push(newFeedback)

    return NextResponse.json({
      success: true,
      data: newFeedback,
      message: 'Feedback created successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create feedback' },
      { status: 500 }
    )
  }
}