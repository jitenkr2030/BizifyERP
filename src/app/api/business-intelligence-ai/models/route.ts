import { NextRequest, NextResponse } from 'next/server'

// Mock data for ML models
const mockMLModels = [
  { 
    id: 1, 
    name: 'Customer Churn Prediction', 
    type: 'Classification', 
    accuracy: 92.3, 
    precision: 89.7, 
    recall: 94.1, 
    f1Score: 91.8,
    status: 'Deployed',
    trainingData: '2.5M records',
    lastTrained: '2024-01-10',
    features: 45,
    algorithm: 'Random Forest',
    version: 'v2.1.0',
    description: 'Predicts customer churn likelihood based on behavior and transaction patterns',
    hyperparameters: {
      n_estimators: 100,
      max_depth: 10,
      min_samples_split: 2
    },
    performanceMetrics: {
      auc_roc: 0.947,
      log_loss: 0.234,
      training_time: '45 minutes'
    },
    deploymentInfo: {
      endpoint: '/api/models/churn-prediction',
      lastDeployed: '2024-01-10T15:30:00Z',
      environment: 'production'
    },
    createdAt: '2023-10-15T00:00:00Z',
    updatedAt: '2024-01-10T15:30:00Z'
  },
  { 
    id: 2, 
    name: 'Demand Forecasting', 
    type: 'Regression', 
    accuracy: 88.9, 
    precision: 87.2, 
    recall: 90.1, 
    f1Score: 88.6,
    status: 'Training',
    trainingData: '1.8M records',
    lastTrained: '2024-01-12',
    features: 32,
    algorithm: 'XGBoost',
    version: 'v1.5.0',
    description: 'Forecasts product demand based on historical data and external factors',
    hyperparameters: {
      learning_rate: 0.1,
      n_estimators: 200,
      max_depth: 6
    },
    performanceMetrics: {
      rmse: 12.34,
      mae: 8.91,
      training_time: '2 hours 15 minutes'
    },
    deploymentInfo: {
      endpoint: '/api/models/demand-forecast',
      lastDeployed: null,
      environment: 'staging'
    },
    createdAt: '2023-11-20T00:00:00Z',
    updatedAt: '2024-01-12T14:20:00Z'
  },
  { 
    id: 3, 
    name: 'Fraud Detection', 
    type: 'Anomaly Detection', 
    accuracy: 95.7, 
    precision: 93.4, 
    recall: 97.8, 
    f1Score: 95.5,
    status: 'Deployed',
    trainingData: '5.2M records',
    lastTrained: '2024-01-08',
    features: 78,
    algorithm: 'Isolation Forest',
    version: 'v3.0.0',
    description: 'Detects fraudulent transactions and suspicious activities',
    hyperparameters: {
      contamination: 0.1,
      n_estimators: 100,
      max_samples: 'auto'
    },
    performanceMetrics: {
      precision_recall_auc: 0.962,
      training_time: '3 hours 45 minutes'
    },
    deploymentInfo: {
      endpoint: '/api/models/fraud-detection',
      lastDeployed: '2024-01-08T16:45:00Z',
      environment: 'production'
    },
    createdAt: '2023-09-10T00:00:00Z',
    updatedAt: '2024-01-08T16:45:00Z'
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
    let filteredData = mockMLModels

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
      { success: false, error: 'Failed to fetch ML models' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'type', 'algorithm', 'features']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Create new ML model
    const newMLModel = {
      id: mockMLModels.length + 1,
      name: body.name,
      type: body.type,
      accuracy: body.accuracy || 0,
      precision: body.precision || 0,
      recall: body.recall || 0,
      f1Score: body.f1Score || 0,
      status: body.status || 'Training',
      trainingData: body.trainingData || '0 records',
      lastTrained: body.lastTrained || new Date().toISOString().split('T')[0],
      features: body.features,
      algorithm: body.algorithm,
      version: body.version || 'v1.0.0',
      description: body.description || '',
      hyperparameters: body.hyperparameters || {},
      performanceMetrics: body.performanceMetrics || {},
      deploymentInfo: body.deploymentInfo || {
        endpoint: `/api/models/${body.name.toLowerCase().replace(/\s+/g, '-')}`,
        lastDeployed: null,
        environment: 'development'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    mockMLModels.push(newMLModel)

    return NextResponse.json({
      success: true,
      data: newMLModel,
      message: 'ML model created successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create ML model' },
      { status: 500 }
    )
  }
}