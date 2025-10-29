import { NextRequest, NextResponse } from 'next/server'

// Mock data for predictive analytics
const mockPredictions = [
  { 
    id: 1, 
    type: 'Sales Forecast', 
    model: 'Time Series ARIMA', 
    accuracy: 94.5, 
    period: 'Next 6 Months', 
    status: 'Active',
    lastRun: '2024-01-15',
    nextRun: '2024-01-22',
    prediction: '+12.5% growth',
    confidence: 0.945,
    dataPoints: 18250,
    features: ['historical_sales', 'seasonality', 'market_trends', 'economic_indicators'],
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-15T14:30:00Z'
  },
  { 
    id: 2, 
    type: 'Inventory Demand', 
    model: 'LSTM Neural Network', 
    accuracy: 89.2, 
    period: 'Next 3 Months', 
    status: 'Active',
    lastRun: '2024-01-14',
    nextRun: '2024-01-21',
    prediction: 'Optimal stock levels maintained',
    confidence: 0.892,
    dataPoints: 8760,
    features: ['historical_demand', 'seasonal_patterns', 'lead_times', 'supplier_performance'],
    createdAt: '2024-01-08T00:00:00Z',
    updatedAt: '2024-01-14T16:45:00Z'
  },
  { 
    id: 3, 
    type: 'Cash Flow', 
    model: 'Prophet Forecasting', 
    accuracy: 91.8, 
    period: 'Next 12 Months', 
    status: 'Training',
    lastRun: '2024-01-13',
    nextRun: '2024-01-20',
    prediction: 'Positive cash flow expected',
    confidence: 0.918,
    dataPoints: 3650,
    features: ['historical_cash_flow', 'accounts_receivable', 'accounts_payable', 'seasonal_trends'],
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-13T11:20:00Z'
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const type = searchParams.get('type') || ''
    const status = searchParams.get('status') || ''

    // Filter data based on type and status
    let filteredData = mockPredictions

    if (type) {
      filteredData = filteredData.filter(item => 
        item.type.toLowerCase().includes(type.toLowerCase())
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
      { success: false, error: 'Failed to fetch predictions' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['type', 'model', 'period', 'features']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Create new prediction model
    const newPrediction = {
      id: mockPredictions.length + 1,
      type: body.type,
      model: body.model,
      accuracy: body.accuracy || 0,
      period: body.period,
      status: body.status || 'Training',
      lastRun: new Date().toISOString().split('T')[0],
      nextRun: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      prediction: body.prediction || 'Training in progress',
      confidence: body.confidence || 0,
      dataPoints: body.dataPoints || 0,
      features: body.features,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    mockPredictions.push(newPrediction)

    return NextResponse.json({
      success: true,
      data: newPrediction,
      message: 'Prediction model created successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create prediction model' },
      { status: 500 }
    )
  }
}