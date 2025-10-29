import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status') || 'all'

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (status !== 'all') {
      where.status = status
    }

    // Calculate supplier performance metrics
    const suppliers = await db.supplier.findMany({
      where: {
        isActive: true
      },
      include: {
        purchaseOrders: {
          include: {
            purchaseOrderItems: true
          }
        },
        requestForQuotations: true
      }
    })

    const performanceData = suppliers.map(supplier => {
      // Calculate on-time delivery rate
      const completedPOs = supplier.purchaseOrders.filter(po => po.status === 'received')
      const onTimeDeliveries = completedPOs.filter(po => {
        if (po.expectedDeliveryDate) {
          const expectedDate = new Date(po.expectedDeliveryDate)
          const currentDate = new Date()
          return currentDate <= expectedDate
        }
        return false
      })
      const onTimeDeliveryRate = completedPOs.length > 0 
        ? Math.round((onTimeDeliveries.length / completedPOs.length) * 100)
        : 0

      // Calculate quality rating (based on completed RFQs and POs)
      const qualityRating = Math.round(Math.random() * 20 + 80) // Mock calculation

      // Calculate price competitiveness (based on comparison with market rates)
      const priceCompetitiveness = Math.round(Math.random() * 20 + 80) // Mock calculation

      // Calculate responsiveness (based on RFQ response time)
      const responsiveness = Math.round(Math.random() * 20 + 80) // Mock calculation

      // Calculate total score
      const totalScore = Math.round((onTimeDeliveryRate + qualityRating + priceCompetitiveness + responsiveness) / 4)

      // Determine status
      let status = 'average'
      if (totalScore >= 90) status = 'excellent'
      else if (totalScore >= 80) status = 'good'
      else if (totalScore < 70) status = 'poor'

      return {
        id: supplier.id,
        supplierId: supplier.id,
        supplierName: supplier.name,
        onTimeDelivery: onTimeDeliveryRate,
        qualityRating,
        priceCompetitiveness,
        responsiveness,
        totalScore,
        lastEvaluation: supplier.updatedAt.toISOString().split('T')[0],
        status
      }
    })

    // Apply pagination
    const paginatedData = performanceData.slice(skip, skip + limit)
    const total = performanceData.length

    return NextResponse.json({
      supplierPerformance: paginatedData,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching supplier performance:', error)
    return NextResponse.json(
      { error: 'Failed to fetch supplier performance' },
      { status: 500 }
    )
  }
}