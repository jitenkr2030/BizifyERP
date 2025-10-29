import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const categoryId = searchParams.get('categoryId')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    const skip = (page - 1) * limit

    const where: any = {}
    
    if (categoryId) {
      where.categoryId = categoryId
    }
    
    if (status) {
      where.status = status
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { fileName: { contains: search, mode: 'insensitive' } },
        { tags: { contains: search, mode: 'insensitive' } }
      ]
    }

    const [documents, total] = await Promise.all([
      db.document.findMany({
        where,
        include: {
          category: true,
          uploadedBy: {
            select: { id: true, name: true, email: true }
          },
          approvedBy: {
            select: { id: true, name: true, email: true }
          },
          _count: {
            select: {
              documentVersions: true,
              approvalWorkflows: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      db.document.count({ where })
    ])

    return NextResponse.json({
      documents,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching documents:', error)
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      fileName,
      filePath,
      fileSize,
      mimeType,
      categoryId,
      description,
      tags,
      uploadedById
    } = body

    const document = await db.document.create({
      data: {
        title,
        fileName,
        filePath,
        fileSize,
        mimeType,
        categoryId,
        description,
        tags,
        uploadedById,
        status: 'draft'
      },
      include: {
        category: true,
        uploadedBy: {
          select: { id: true, name: true, email: true }
        }
      }
    })

    // Create initial version
    await db.documentVersion.create({
      data: {
        documentId: document.id,
        version: 1,
        fileName,
        filePath,
        fileSize,
        mimeType,
        createdById: uploadedById
      }
    })

    return NextResponse.json(document, { status: 201 })
  } catch (error) {
    console.error('Error creating document:', error)
    return NextResponse.json(
      { error: 'Failed to create document' },
      { status: 500 }
    )
  }
}