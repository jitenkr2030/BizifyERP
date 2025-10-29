import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const taxCalculationSchema = z.object({
  referenceId: z.string(),
  referenceType: z.enum(['invoice', 'sales_order', 'purchase_order', 'other']),
  jurisdictionId: z.string(),
  ruleId: z.string().optional(),
  taxType: z.string(),
  taxableAmount: z.number().min(0),
  taxRate: z.number().min(0).max(100),
  taxAmount: z.number().min(0),
  calculationData: z.string().optional(),
})

// Tax calculation engine
class TaxCalculationEngine {
  async calculateTax(data: {
    amount: number
    jurisdictionId: string
    referenceType: string
  }) {
    const jurisdiction = await db.taxJurisdiction.findUnique({
      where: { id: data.jurisdictionId },
      include: { taxRules: true },
    })

    if (!jurisdiction) {
      throw new Error('Jurisdiction not found')
    }

    let taxAmount = 0
    let appliedRules = []

    // Apply tax rules in order of priority
    for (const rule of jurisdiction.taxRules
      .filter(r => r.isActive)
      .sort((a, b) => a.priority - b.priority)) {
      
      const conditions = JSON.parse(rule.conditions || '{}')
      const actions = JSON.parse(rule.actions || '{}')

      // Check if rule conditions are met
      if (this.evaluateConditions(conditions, data)) {
        const result = this.applyActions(actions, {
          amount: data.amount,
          currentTax: taxAmount,
          rate: jurisdiction.rate,
        })

        taxAmount = result.taxAmount
        appliedRules.push(rule.id)
      }
    }

    // Default calculation if no rules apply
    if (appliedRules.length === 0) {
      taxAmount = data.amount * (jurisdiction.rate / 100)
    }

    return {
      taxAmount,
      appliedRules,
      jurisdiction: {
        id: jurisdiction.id,
        name: jurisdiction.name,
        rate: jurisdiction.rate,
      },
    }
  }

  private evaluateConditions(conditions: any, data: any): boolean {
    // Simple condition evaluation - in production, use a proper rules engine
    if (conditions.minAmount && data.amount < conditions.minAmount) {
      return false
    }
    if (conditions.maxAmount && data.amount > conditions.maxAmount) {
      return false
    }
    if (conditions.referenceType && data.referenceType !== conditions.referenceType) {
      return false
    }
    return true
  }

  private applyActions(actions: any, context: any): { taxAmount: number } {
    let taxAmount = context.currentTax

    if (actions.type === 'percentage') {
      taxAmount = context.amount * (actions.rate / 100)
    } else if (actions.type === 'fixed') {
      taxAmount = actions.amount
    } else if (actions.type === 'tiered') {
      // Implement tiered tax calculation
      const tiers = actions.tiers || []
      for (const tier of tiers) {
        if (context.amount <= tier.max) {
          taxAmount = context.amount * (tier.rate / 100)
          break
        }
      }
    }

    return { taxAmount }
  }
}

const taxEngine = new TaxCalculationEngine()

// GET /api/tax/calculations - List tax calculations
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const referenceId = searchParams.get('referenceId')
    const referenceType = searchParams.get('referenceType')

    const skip = (page - 1) * limit

    const where: any = {}
    if (referenceId) where.referenceId = referenceId
    if (referenceType) where.referenceType = referenceType

    const [calculations, total] = await Promise.all([
      db.taxCalculation.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          jurisdiction: true,
          rule: true,
        },
      }),
      db.taxCalculation.count({ where }),
    ])

    return NextResponse.json({
      calculations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching tax calculations:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/tax/calculations - Create tax calculation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (body.action === 'calculate') {
      // Handle tax calculation request
      const { amount, jurisdictionId, referenceType } = body
      
      if (!amount || !jurisdictionId || !referenceType) {
        return NextResponse.json(
          { error: 'Missing required fields: amount, jurisdictionId, referenceType' },
          { status: 400 }
        )
      }

      const result = await taxEngine.calculateTax({
        amount: parseFloat(amount),
        jurisdictionId,
        referenceType,
      })

      return NextResponse.json(result)
    }

    // Handle manual tax calculation entry
    const validatedData = taxCalculationSchema.parse(body)

    const calculation = await db.taxCalculation.create({
      data: {
        ...validatedData,
        calculationData: JSON.stringify({
          method: 'manual',
          timestamp: new Date().toISOString(),
        }),
      },
      include: {
        jurisdiction: true,
        rule: true,
      },
    })

    return NextResponse.json(calculation, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating tax calculation:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}