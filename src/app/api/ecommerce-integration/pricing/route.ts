import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const pricingRules = await db.pricingRule.findMany({
      include: {
        channel: true,
        productType: true
      },
      orderBy: { updatedAt: 'desc' }
    })

    return NextResponse.json(pricingRules)
  } catch (error) {
    console.error('Error fetching pricing rules:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pricing rules' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      channelId,
      productTypeId,
      basePrice,
      strategy,
      margin,
      competitionPrice,
      isActive = true,
      conditions
    } = body

    const pricingRule = await db.pricingRule.create({
      data: {
        name,
        channelId,
        productTypeId,
        basePrice,
        currentPrice: basePrice,
        strategy,
        margin,
        competitionPrice,
        isActive,
        conditions: conditions || {}
      },
      include: {
        channel: true,
        productType: true
      }
    })

    return NextResponse.json(pricingRule, { status: 201 })
  } catch (error) {
    console.error('Error creating pricing rule:', error)
    return NextResponse.json(
      { error: 'Failed to create pricing rule' },
      { status: 500 }
    )
  }
}