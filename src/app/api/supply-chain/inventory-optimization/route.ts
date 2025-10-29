import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const skip = (page - 1) * limit

    const products = await db.product.findMany({
      include: {
        stockMovements: {
          orderBy: { date: 'desc' },
          take: 50
        }
      }
    })

    const optimizationData = products.map(product => {
      // Calculate current stock
      const currentStock = product.stockMovements.reduce((total, movement) => {
        if (movement.type === 'in') return total + movement.quantity
        if (movement.type === 'out') return total - movement.quantity
        return total
      }, 0)

      // Mock EOQ (Economic Order Quantity) calculation
      const annualDemand = Math.round(Math.random() * 1000 + 200) // Mock annual demand
      const orderingCost = 25 + Math.random() * 25 // $25-$50 per order
      const holdingCostRate = 0.2 + Math.random() * 0.1 // 20-30% holding cost rate
      const holdingCost = product.purchasePrice * holdingCostRate
      
      // EOQ formula: √(2DS/H) where D=Annual Demand, S=Ordering Cost, H=Holding Cost per unit
      const eoq = Math.round(Math.sqrt((2 * annualDemand * orderingCost) / holdingCost))
      
      // Calculate reorder point
      const leadTime = 3 + Math.round(Math.random() * 7) // 3-10 days lead time
      const dailyDemand = annualDemand / 365
      const safetyStock = Math.round(dailyDemand * 2) // 2 days safety stock
      const reorderPoint = Math.round(dailyDemand * leadTime + safetyStock)

      // Calculate costs
      const totalHoldingCost = (eoq / 2) * holdingCost
      const totalOrderingCost = (annualDemand / eoq) * orderingCost
      const stockoutCost = Math.round(Math.random() * 500 + 100) // Mock stockout cost

      // Generate recommendation
      let recommendation = 'Optimal stock level'
      let potentialSavings = 0

      if (currentStock < reorderPoint) {
        recommendation = `Order ${eoq} units immediately`
        potentialSavings = Math.round(stockoutCost * 0.8)
      } else if (currentStock > eoq * 2) {
        recommendation = 'Reduce stock to optimal level'
        potentialSavings = Math.round((currentStock - eoq) * holdingCost * 0.5)
      } else if (currentStock > eoq * 1.5) {
        recommendation = 'Consider reducing stock level'
        potentialSavings = Math.round((currentStock - eoq) * holdingCost * 0.3)
      }

      return {
        id: product.id,
        productId: product.id,
        productName: product.name,
        currentStock: Math.round(currentStock),
        reorderPoint,
        economicOrderQuantity: eoq,
        leadTime,
        holdingCost: Math.round(holdingCost * 100) / 100,
        orderingCost: Math.round(orderingCost * 100) / 100,
        stockoutCost,
        recommendation,
        potentialSavings
      }
    })

    // Apply pagination
    const paginatedData = optimizationData.slice(skip, skip + limit)
    const total = optimizationData.length

    return NextResponse.json({
      inventoryOptimization: paginatedData,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching inventory optimization:', error)
    return NextResponse.json(
      { error: 'Failed to fetch inventory optimization data' },
      { status: 500 }
    )
  }
}