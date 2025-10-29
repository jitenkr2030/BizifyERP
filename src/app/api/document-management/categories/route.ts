import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const categories = await db.documentCategory.findMany({
      include: {
        children: true,
        _count: {
          select: {
            documents: true
          }
        }
      },
      where: {
        isActive: true
      },
      orderBy: [
        { parentId: 'asc' },
        { name: 'asc' }
      ]
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching document categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch document categories' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, parentId } = body

    const category = await db.documentCategory.create({
      data: {
        name,
        description,
        parentId
      },
      include: {
        parent: true,
        children: true
      }
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error('Error creating document category:', error)
    return NextResponse.json(
      { error: 'Failed to create document category' },
      { status: 500 }
    )
  }
}