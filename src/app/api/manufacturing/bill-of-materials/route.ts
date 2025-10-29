import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const isActive = searchParams.get('isActive')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.OR = [
        { code: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
        { product: { name: { contains: search, mode: 'insensitive' } } }
      ]
    }

    if (isActive !== null && isActive !== undefined) {
      where.isActive = isActive === 'true'
    }

    // Get BOMs with related data
    const [boms, totalCount] = await Promise.all([
      db.billOfMaterial.findMany({
        where,
        include: {
          product: {
            select: {
              id: true,
              code: true,
              name: true,
              unit: true
            }
          },
          billOfMaterialItems: {
            include: {
              product: {
                select: {
                  id: true,
                  code: true,
                  name: true,
                  unit: true
                }
              }
            }
          },
          workOrders: {
            select: {
              id: true,
              number: true,
              status: true,
              quantity: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: [
          { isActive: 'desc' },
          { createdAt: 'desc' }
        ]
      }),
      db.billOfMaterial.count({ where })
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      success: true,
      data: boms,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages
      }
    })
  } catch (error) {
    console.error('Error fetching bill of materials:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bill of materials' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      code,
      name,
      productId,
      version = 1,
      isActive = true,
      items = []
    } = body

    // Validate required fields
    if (!code || !name || !productId) {
      return NextResponse.json(
        { success: false, error: 'Code, name, and product are required' },
        { status: 400 }
      )
    }

    // Check if BOM code already exists
    const existingBOM = await db.billOfMaterial.findUnique({
      where: { code }
    })

    if (existingBOM) {
      return NextResponse.json(
        { success: false, error: 'BOM code already exists' },
        { status: 400 }
      )
    }

    // Check if product exists
    const product = await db.product.findUnique({
      where: { id: productId }
    })

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }

    // Create BOM with items
    const bom = await db.billOfMaterial.create({
      data: {
        code,
        name,
        productId,
        version,
        isActive,
        billOfMaterialItems: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity
          }))
        }
      },
      include: {
        product: {
          select: {
            id: true,
            code: true,
            name: true,
            unit: true
          }
        },
        billOfMaterialItems: {
          include: {
            product: {
              select: {
                id: true,
                code: true,
                name: true,
                unit: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: bom,
      message: 'Bill of Materials created successfully'
    })
  } catch (error) {
    console.error('Error creating bill of materials:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create bill of materials' },
      { status: 500 }
    )
  }
}