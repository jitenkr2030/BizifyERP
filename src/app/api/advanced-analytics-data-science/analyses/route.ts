import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/advanced-analytics-data-science/analyses - Get all analyses
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
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    const analyses = await db.dataAnalysis.findMany({
      where,
      include: {
        dataSources: true,
        createdBy: true,
        insights: {
          take: 10,
          orderBy: { createdAt: 'desc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ success: true, data: analyses })
  } catch (error) {
    console.error('Error fetching analyses:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analyses' },
      { status: 500 }
    )
  }
}

// POST /api/advanced-analytics-data-science/analyses - Create new analysis
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      type,
      description,
      dataSourceIds,
      parameters,
      createdBy
    } = body

    // Validate required fields
    if (!title || !type || !dataSourceIds || dataSourceIds.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Title, type, and data sources are required' },
        { status: 400 }
      )
    }

    // Check if all data sources exist
    const dataSources = await db.dataSource.findMany({
      where: { id: { in: dataSourceIds } }
    })

    if (dataSources.length !== dataSourceIds.length) {
      return NextResponse.json(
        { success: false, error: 'One or more data sources not found' },
        { status: 404 }
      )
    }

    // Create the analysis
    const analysis = await db.dataAnalysis.create({
      data: {
        title,
        type,
        description,
        status: 'processing',
        parameters: parameters || {},
        createdBy: createdBy || 'system',
        dataSources: {
          connect: dataSourceIds.map((id: string) => ({ id }))
        }
      },
      include: {
        dataSources: true,
        insights: true
      }
    })

    // Simulate analysis processing (in a real system, this would be a background job)
    setTimeout(async () => {
      // Generate mock insights based on analysis type
      const mockInsights = []
      const insightCount = Math.floor(Math.random() * 5) + 3
      
      for (let i = 0; i < insightCount; i++) {
        mockInsights.push({
          title: `Insight ${i + 1}`,
          description: `Generated insight for ${analysis.title}`,
          type: 'statistical',
          confidence: 0.7 + Math.random() * 0.3,
          data: {}
        })
      }

      await db.dataAnalysis.update({
        where: { id: analysis.id },
        data: {
          status: 'completed',
          insights: {
            create: mockInsights
          }
        }
      })
    }, 3000)

    return NextResponse.json({ success: true, data: analysis }, { status: 201 })
  } catch (error) {
    console.error('Error creating analysis:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create analysis' },
      { status: 500 }
    )
  }
}