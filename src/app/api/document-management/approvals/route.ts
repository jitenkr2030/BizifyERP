import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const documentId = searchParams.get('documentId')
    const assignedTo = searchParams.get('assignedTo')
    const status = searchParams.get('status')

    const where: any = {}
    
    if (documentId) {
      where.documentId = documentId
    }
    
    if (assignedTo) {
      where.assignedTo = assignedTo
    }
    
    if (status) {
      where.status = status
    }

    const workflows = await db.documentApprovalWorkflow.findMany({
      where,
      include: {
        document: {
          select: {
            id: true,
            title: true,
            fileName: true
          }
        },
        assignedToUser: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: [
        { documentId: 'asc' },
        { sequence: 'asc' }
      ]
    })

    return NextResponse.json(workflows)
  } catch (error) {
    console.error('Error fetching approval workflows:', error)
    return NextResponse.json(
      { error: 'Failed to fetch approval workflows' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      documentId,
      sequence,
      assignedTo,
      dueDate,
      comments
    } = body

    const workflow = await db.documentApprovalWorkflow.create({
      data: {
        documentId,
        sequence,
        assignedTo,
        dueDate,
        comments
      },
      include: {
        document: {
          select: {
            id: true,
            title: true,
            fileName: true
          }
        },
        assignedToUser: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json(workflow, { status: 201 })
  } catch (error) {
    console.error('Error creating approval workflow:', error)
    return NextResponse.json(
      { error: 'Failed to create approval workflow' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status, comments } = body

    const workflow = await db.documentApprovalWorkflow.update({
      where: { id },
      data: {
        status,
        comments,
        approvedAt: status === 'approved' ? new Date() : null
      },
      include: {
        document: {
          select: {
            id: true,
            title: true,
            fileName: true
          }
        },
        assignedToUser: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    // Update document status if all workflows are approved
    if (status === 'approved') {
      const pendingWorkflows = await db.documentApprovalWorkflow.count({
        where: {
          documentId: workflow.documentId,
          status: 'pending'
        }
      })

      if (pendingWorkflows === 0) {
        await db.document.update({
          where: { id: workflow.documentId },
          data: { status: 'approved' }
        })
      }
    }

    return NextResponse.json(workflow)
  } catch (error) {
    console.error('Error updating approval workflow:', error)
    return NextResponse.json(
      { error: 'Failed to update approval workflow' },
      { status: 500 }
    )
  }
}