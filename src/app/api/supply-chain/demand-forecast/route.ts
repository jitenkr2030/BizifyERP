import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status') || 'all'
    const category = searchParams.get('category') || 'all'

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (category !== 'all') {
      where.category = category
    }

    const products = await db.product.findMany({
      where,
      include: {
        stockMovements: {
          orderBy: { date: 'desc' },
          take: 100 // Get recent movements for analysis
        }
      }
    })

    const forecastData = products.map(product => {
      // Calculate current stock from stock movements
      const currentStock = product.stockMovements.reduce((total, movement) => {
        if (movement.type === 'in') return total + movement.quantity
        if (movement.type === 'out') return total - movement.quantity
        return total
      }, 0)

      // Mock forecast calculation (in real implementation, this would use ML algorithms)
      const forecastedDemand = Math.round(Math.random() * 200 + 50)
      const confidence = Math.round(Math.random() * 20 + 75) // 75-95% confidence

      // Calculate recommended order quantity
      let recommendedOrder = 0
      let status = 'optimal'

      if (currentStock < forecastedDemand * 0.3) {
        status = 'critical'
        recommendedOrder = Math.round(forecastedDemand - currentStock)
      } else if (currentStock < forecastedDemand * 0.6) {
        status = 'low'
        recommendedOrder = Math.round(forecastedDemand * 0.8 - currentStock)
      } else if (currentStock > forecastedDemand * 1.5) {
        status = 'excess'
        recommendedOrder = 0
      }

      return {
        id: product.id,
        productId: product.id,
        productName: product.name,
        category: product.category || 'Uncategorized',
        currentStock,
        forecastedDemand,
        period: 'Q1 2024', // Mock period
        confidence,
        recommendedOrder,
        status
      }
    })

    // Apply filters
    let filteredData = forecastData
    if (status !== 'all') {
      filteredData = filteredData.filter(item => item.status === status)
    }

    // Apply pagination
    const paginatedData = filteredData.slice(skip, skip + limit)
    const total = filteredData.length

    return NextResponse.json({
      demandForecasts: paginatedData,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching demand forecasts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch demand forecasts' },
      { status: 500 }
    )
  }
}