import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const inspectionType = searchParams.get('inspectionType')
    const status = searchParams.get('status')

    const skip = (page - 1) * limit

    // Build where clause
    let where: any = {}
    
    if (inspectionType) {
      where.inspectionType = inspectionType
    }

    if (status) {
      where.status = status
    }

    const [qualityInspections, total] = await Promise.all([
      db.qualityInspection.findMany({
        where,
        skip,
        take: limit,
        orderBy: { date: 'desc' },
        include: {
          product: {
            select: { id: true, name: true, code: true }
          },
          purchaseOrder: {
            select: { id: true, number: true }
          },
          workOrder: {
            select: { id: true, number: true }
          },
          inspector: {
            select: { id: true, name: true }
          }
        }
      }),
      db.qualityInspection.count({ where })
    ])

    return NextResponse.json({
      qualityInspections,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching quality inspections:', error)
    return NextResponse.json(
      { error: 'Failed to fetch quality inspections' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const qualityInspection = await db.qualityInspection.create({
      data: {
        reference: body.reference,
        inspectionType: body.inspectionType,
        productId: body.productId,
        purchaseOrderId: body.purchaseOrderId,
        workOrderId: body.workOrderId,
        date: new Date(body.date),
        inspectorId: body.inspectorId,
        status: body.status || 'pending',
        result: body.result,
        notes: body.notes
      },
      include: {
        product: {
          select: { id: true, name: true, code: true }
        },
        purchaseOrder: {
          select: { id: true, number: true }
        },
        workOrder: {
          select: { id: true, number: true }
        },
        inspector: {
          select: { id: true, name: true }
        }
      }
    })

    return NextResponse.json(qualityInspection, { status: 201 })
  } catch (error) {
    console.error('Error creating quality inspection:', error)
    return NextResponse.json(
      { error: 'Failed to create quality inspection' },
      { status: 500 }
    )
  }
}