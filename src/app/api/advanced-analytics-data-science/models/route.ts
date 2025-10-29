import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/advanced-analytics-data-science/models - Get all ML models
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    // Build where clause based on filters
    const where: any = {}
    
    if (type && type !== 'all') {
      where.type = type
    }
    
    if (status && status !== 'all') {
      where.status = status
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    const models = await db.mLModel.findMany({
      where,
      include: {
        dataSource: true,
        predictions: {
          take: 5,
          orderBy: { createdAt: 'desc' }
        }
      },
      orderBy: { updatedAt: 'desc' }
    })

    return NextResponse.json({ success: true, data: models })
  } catch (error) {
    console.error('Error fetching ML models:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch ML models' },
      { status: 500 }
    )
  }
}

// POST /api/advanced-analytics-data-science/models - Create new ML model
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      type,
      description,
      dataSourceId,
      algorithm,
      parameters,
      accuracyThreshold
    } = body

    // Validate required fields
    if (!name || !type || !dataSourceId) {
      return NextResponse.json(
        { success: false, error: 'Name, type, and data source are required' },
        { status: 400 }
      )
    }

    // Check if data source exists
    const dataSource = await db.dataSource.findUnique({
      where: { id: dataSourceId }
    })

    if (!dataSource) {
      return NextResponse.json(
        { success: false, error: 'Data source not found' },
        { status: 404 }
      )
    }

    // Create the ML model
    const model = await db.mLModel.create({
      data: {
        name,
        type,
        description,
        dataSourceId,
        algorithm: algorithm || 'auto',
        parameters: parameters || {},
        accuracyThreshold: accuracyThreshold || 0.8,
        status: 'training',
        version: '1.0.0'
      },
      include: {
        dataSource: true
      }
    })

    // Trigger model training (in a real system, this would be a background job)
    // For now, we'll simulate training completion
    setTimeout(async () => {
      await db.mLModel.update({
        where: { id: model.id },
        data: {
          status: 'active',
          accuracy: 0.85 + Math.random() * 0.1, // Random accuracy between 85-95%
          lastTrained: new Date()
        }
      })
    }, 5000)

    return NextResponse.json({ success: true, data: model }, { status: 201 })
  } catch (error) {
    console.error('Error creating ML model:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create ML model' },
      { status: 500 }
    )
  }
}