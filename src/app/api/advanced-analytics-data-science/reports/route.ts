import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/advanced-analytics-data-science/reports - Get all reports
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Build where clause based on filters
    const where: any = {}
    
    if (type && type !== 'all') {
      where.type = type
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    const [reports, total] = await Promise.all([
      db.analyticsReport.findMany({
        where,
        include: {
          generatedBy: true,
          relatedModels: true,
          relatedAnalyses: true
        },
        orderBy: { generatedAt: 'desc' },
        take: limit,
        skip: offset
      }),
      db.analyticsReport.count({ where })
    ])

    return NextResponse.json({ 
      success: true, 
      data: reports,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    })
  } catch (error) {
    console.error('Error fetching reports:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reports' },
      { status: 500 }
    )
  }
}

// POST /api/advanced-analytics-data-science/reports - Generate new report
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      type,
      description,
      modelIds,
      analysisIds,
      format,
      generatedBy
    } = body

    // Validate required fields
    if (!name || !type || !format) {
      return NextResponse.json(
        { success: false, error: 'Name, type, and format are required' },
        { status: 400 }
      )
    }

    // Verify models and analyses exist if provided
    if (modelIds && modelIds.length > 0) {
      const models = await db.mLModel.findMany({
        where: { id: { in: modelIds } }
      })
      if (models.length !== modelIds.length) {
        return NextResponse.json(
          { success: false, error: 'One or more models not found' },
          { status: 404 }
        )
      }
    }

    if (analysisIds && analysisIds.length > 0) {
      const analyses = await db.dataAnalysis.findMany({
        where: { id: { in: analysisIds } }
      })
      if (analyses.length !== analysisIds.length) {
        return NextResponse.json(
          { success: false, error: 'One or more analyses not found' },
          { status: 404 }
        )
      }
    }

    // Create the report
    const report = await db.analyticsReport.create({
      data: {
        name,
        type,
        description,
        format,
        status: 'generating',
        generatedBy: generatedBy || 'system',
        size: 0,
        relatedModels: modelIds ? {
          connect: modelIds.map((id: string) => ({ id }))
        } : undefined,
        relatedAnalyses: analysisIds ? {
          connect: analysisIds.map((id: string) => ({ id }))
        } : undefined
      },
      include: {
        generatedBy: true,
        relatedModels: true,
        relatedAnalyses: true
      }
    })

    // Simulate report generation (in a real system, this would be a background job)
    setTimeout(async () => {
      const mockSize = Math.floor(Math.random() * 10) + 1 // 1-10 MB
      await db.analyticsReport.update({
        where: { id: report.id },
        data: {
          status: 'completed',
          size: mockSize,
          downloadUrl: `/api/advanced-analytics-data-science/reports/${report.id}/download`
        }
      })
    }, 2000)

    return NextResponse.json({ success: true, data: report }, { status: 201 })
  } catch (error) {
    console.error('Error creating report:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create report' },
      { status: 500 }
    )
  }
}