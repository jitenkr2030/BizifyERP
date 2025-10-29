import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || 'all'

    let whereClause: any = {}
    
    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { code: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ]
    }
    
    if (status !== 'all') {
      whereClause.isActive = status === 'active'
    }

    const customers = await db.customer.findMany({
      where: whereClause,
      include: {
        company: true,
        _count: {
          select: {
            salesOrders: true,
            invoices: true
          }
        }
      },
      orderBy: { name: 'asc' }
    })

    return NextResponse.json(customers)
  } catch (error) {
    console.error('Error fetching customers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch customers' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { code, name, email, phone, address, taxId, companyId } = body

    // Check if customer code already exists
    const existingCustomer = await db.customer.findUnique({
      where: { code }
    })

    if (existingCustomer) {
      return NextResponse.json(
        { error: 'Customer code already exists' },
        { status: 400 }
      )
    }

    const customer = await db.customer.create({
      data: {
        code,
        name,
        email,
        phone,
        address,
        taxId,
        companyId: companyId || null
      },
      include: {
        company: true
      }
    })

    return NextResponse.json(customer, { status: 201 })
  } catch (error) {
    console.error('Error creating customer:', error)
    return NextResponse.json(
      { error: 'Failed to create customer' },
      { status: 500 }
    )
  }
}