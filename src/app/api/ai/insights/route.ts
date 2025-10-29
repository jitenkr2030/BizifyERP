import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const aiInsightSchema = z.object({
  type: z.enum([
    'demand_forecast',
    'price_optimization',
    'customer_behavior',
    'anomaly',
    'inventory_optimization',
    'risk_assessment'
  ]),
  title: z.string().min(2),
  description: z.string().min(2),
  confidence: z.number().min(0).max(1),
  data: z.string(),
  recommendations: z.string().optional(),
})

// AI Insights Service
class AIInsightsService {
  async generateInsight(data: {
    type: string
    title: string
    description: string
    data: any
    recommendations?: any
  }) {
    const insight = await db.aIInsight.create({
      data: {
        type: data.type,
        title: data.title,
        description: data.description,
        confidence: 0.7 + Math.random() * 0.3,
        data: JSON.stringify(data.data),
        recommendations: data.recommendations ? JSON.stringify(data.recommendations) : null,
      },
    })

    return insight
  }

  async analyzeBusinessData(tenantId: string) {
    const insights = []

    // Analyze sales data for demand forecasting
    const salesInsight = await this.analyzeSalesData(tenantId)
    if (salesInsight) insights.push(salesInsight)

    // Analyze pricing data
    const pricingInsight = await this.analyzePricingData(tenantId)
    if (pricingInsight) insights.push(pricingInsight)

    // Analyze customer behavior
    const customerInsight = await this.analyzeCustomerData(tenantId)
    if (customerInsight) insights.push(customerInsight)

    // Analyze inventory for anomalies
    const inventoryInsight = await this.analyzeInventoryData(tenantId)
    if (inventoryInsight) insights.push(inventoryInsight)

    return insights
  }

  private async analyzeSalesData(tenantId: string) {
    // Mock sales analysis
    const salesTrend = Math.random() > 0.5 ? 'increasing' : 'decreasing'
    const growthRate = (Math.random() - 0.5) * 0.3 // -15% to +15%

    if (Math.abs(growthRate) > 0.1) {
      return await this.generateInsight({
        type: 'demand_forecast',
        title: 'Sales Trend Analysis',
        description: `Sales are ${salesTrend} with ${Math.abs(growthRate * 100).toFixed(1)}% ${growthRate > 0 ? 'growth' : 'decline'}`,
        data: {
          trend: salesTrend,
          growthRate,
          period: 'last_30_days',
        },
        recommendations: [
          growthRate > 0 ? 'Consider increasing inventory to meet demand' : 'Review pricing strategy',
          'Analyze customer feedback',
          'Monitor competitor activities',
        ],
      })
    }

    return null
  }

  private async analyzePricingData(tenantId: string) {
    // Mock pricing analysis
    const optimalPrice = 100 + Math.random() * 50
    const currentPrice = 100 + Math.random() * 60
    const priceDifference = Math.abs(optimalPrice - currentPrice) / currentPrice

    if (priceDifference > 0.1) {
      return await this.generateInsight({
        type: 'price_optimization',
        title: 'Price Optimization Opportunity',
        description: `Current price is ${currentPrice.toFixed(2)}, optimal price estimated at ${optimalPrice.toFixed(2)}`,
        data: {
          currentPrice,
          optimalPrice,
          potentialRevenueIncrease: (optimalPrice - currentPrice) * 1000, // Mock calculation
        },
        recommendations: [
          currentPrice < optimalPrice ? 'Consider increasing price' : 'Consider decreasing price',
          'A/B test price changes',
          'Monitor competitor pricing',
        ],
      })
    }

    return null
  }

  private async analyzeCustomerData(tenantId: string) {
    // Mock customer behavior analysis
    const churnRisk = Math.random()
    const segments = ['high_value', 'regular', 'at_risk']
    const segment = segments[Math.floor(Math.random() * segments.length)]

    if (churnRisk > 0.7) {
      return await this.generateInsight({
        type: 'customer_behavior',
        title: 'High Customer Churn Risk Detected',
        description: `${(churnRisk * 100).toFixed(1)}% of customers show signs of churn risk`,
        data: {
          churnRisk,
          atRiskCustomers: Math.floor(churnRisk * 100),
          segment,
        },
        recommendations: [
          'Launch retention campaign',
          'Offer personalized discounts',
          'Improve customer support',
          'Gather customer feedback',
        ],
      })
    }

    return null
  }

  private async analyzeInventoryData(tenantId: string) {
    // Mock inventory anomaly detection
    const hasAnomaly = Math.random() > 0.7

    if (hasAnomaly) {
      const anomalyTypes = ['stockout', 'overstock', 'spoilage', 'theft']
      const anomalyType = anomalyTypes[Math.floor(Math.random() * anomalyTypes.length)]

      return await this.generateInsight({
        type: 'anomaly',
        title: 'Inventory Anomaly Detected',
        description: `${anomalyType.replace('_', ' ').toUpperCase()} detected in inventory`,
        data: {
          anomalyType,
          severity: Math.random(),
          affectedProducts: Math.floor(Math.random() * 10) + 1,
        },
        recommendations: [
          'Investigate anomaly immediately',
          'Review inventory procedures',
          'Implement additional controls',
          'Consider automated monitoring',
        ],
      })
    }

    return null
  }
}

const insightsService = new AIInsightsService()

// GET /api/ai/insights - List AI insights
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const type = searchParams.get('type')
    const status = searchParams.get('status')

    const skip = (page - 1) * limit

    const where: any = {}
    if (type) where.type = type
    if (status) where.status = status

    const [insights, total] = await Promise.all([
      db.aIInsight.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      db.aIInsight.count({ where }),
    ])

    return NextResponse.json({
      insights,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching AI insights:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/ai/insights - Create AI insight
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = aiInsightSchema.parse(body)

    const data = JSON.parse(validatedData.data)
    const recommendations = validatedData.recommendations ? JSON.parse(validatedData.recommendations) : undefined

    const insight = await insightsService.generateInsight({
      type: validatedData.type,
      title: validatedData.title,
      description: validatedData.description,
      data,
      recommendations,
    })

    return NextResponse.json(insight, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating AI insight:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/ai/insights/analyze - Analyze business data
export async function analyzeBusinessData(request: NextRequest) {
  try {
    const body = await request.json()
    const { tenantId } = body

    if (!tenantId) {
      return NextResponse.json(
        { error: 'Tenant ID required' },
        { status: 400 }
      )
    }

    const insights = await insightsService.analyzeBusinessData(tenantId)

    return NextResponse.json({
      tenantId,
      insights,
      count: insights.length,
      generatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error analyzing business data:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH /api/ai/insights/[id]/status - Update insight status
export async function updateInsightStatus(request: NextRequest) {
  try {
    const insightId = request.url.split('/').pop()
    
    if (!insightId || insightId === 'status') {
      return NextResponse.json(
        { error: 'Insight ID required' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { status } = body

    if (!status || !['new', 'reviewed', 'implemented', 'dismissed'].includes(status)) {
      return NextResponse.json(
        { error: 'Valid status required: new, reviewed, implemented, dismissed' },
        { status: 400 }
      )
    }

    const insight = await db.aIInsight.update({
      where: { id: insightId },
      data: { status },
    })

    return NextResponse.json({
      insight,
      message: `Insight status updated to ${status}`,
    })
  } catch (error) {
    console.error('Error updating insight status:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}