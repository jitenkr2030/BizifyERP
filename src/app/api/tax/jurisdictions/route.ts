import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const taxJurisdictionSchema = z.object({
  code: z.string().min(2),
  name: z.string().min(2),
  country: z.string().min(2),
  region: z.string().optional(),
  taxType: z.enum(['vat', 'gst', 'sales_tax', 'income_tax', 'corporate_tax', 'other']),
  rate: z.number().min(0).max(100),
  isActive: z.boolean().default(true),
  rules: z.string().optional(),
})

// GET /api/tax/jurisdictions - List all tax jurisdictions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const country = searchParams.get('country')
    const taxType = searchParams.get('taxType')
    const isActive = searchParams.get('isActive')

    const skip = (page - 1) * limit

    const where: any = {}
    if (country) where.country = country
    if (taxType) where.taxType = taxType
    if (isActive !== null) where.isActive = isActive === 'true'

    const [jurisdictions, total] = await Promise.all([
      db.taxJurisdiction.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          taxRules: true,
          taxReturns: true,
        },
      }),
      db.taxJurisdiction.count({ where }),
    ])

    return NextResponse.json({
      jurisdictions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching tax jurisdictions:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/tax/jurisdictions - Create new tax jurisdiction
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = taxJurisdictionSchema.parse(body)

    // Check if jurisdiction code already exists
    const existingJurisdiction = await db.taxJurisdiction.findUnique({
      where: { code: validatedData.code },
    })

    if (existingJurisdiction) {
      return NextResponse.json(
        { error: 'Tax jurisdiction with this code already exists' },
        { status: 400 }
      )
    }

    const jurisdiction = await db.taxJurisdiction.create({
      data: {
        ...validatedData,
        tenantId: 'default', // In real app, get from authenticated user
      },
      include: {
        taxRules: true,
        taxReturns: true,
      },
    })

    return NextResponse.json(jurisdiction, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating tax jurisdiction:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}