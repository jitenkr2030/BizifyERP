import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const channelId = searchParams.get('channelId')
    const search = searchParams.get('search')
    const status = searchParams.get('status')

    const skip = (page - 1) * limit

    const where: any = {}
    if (channelId) where.channelId = channelId
    if (status) where.status = status
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } }
      ]
    }

    const [products, total] = await Promise.all([
      db.ecommerceProduct.findMany({
        where,
        include: {
          channel: true,
          inventory: true
        },
        orderBy: { updatedAt: 'desc' },
        skip,
        take: limit
      }),
      db.ecommerceProduct.count({ where })
    ])

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching e-commerce products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      sku,
      name,
      description,
      price,
      cost,
      channelId,
      status,
      images,
      variants
    } = body

    const product = await db.ecommerceProduct.create({
      data: {
        sku,
        name,
        description,
        price,
        cost,
        channelId,
        status,
        images: images || [],
        variants: {
          create: variants?.map((variant: any) => ({
            sku: variant.sku,
            name: variant.name,
            price: variant.price,
            inventory: variant.inventory
          })) || []
        },
        inventory: {
          create: {
            quantity: 0,
            lowStockThreshold: 10,
            reorderPoint: 5
          }
        }
      },
      include: {
        channel: true,
        inventory: true,
        variants: true
      }
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating e-commerce product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}