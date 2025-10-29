import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const signatureRequestSchema = z.object({
  documentId: z.string(),
  documentType: z.string(),
  signers: z.string(), // JSON array of signer objects
  expiresAt: z.string().optional(),
  provider: z.string().optional(),
  metadata: z.string().optional(),
})

// eSignature service
class SignatureService {
  async createSignatureRequest(data: {
    documentId: string
    documentType: string
    signers: Array<{
      email: string
      name: string
      order?: number
    }>
    expiresAt?: Date
    provider?: string
    metadata?: any
  }) {
    const signersJson = JSON.stringify(data.signers)
    
    const signatureRequest = await db.signatureRequest.create({
      data: {
        documentId: data.documentId,
        documentType: data.documentType,
        signers: signersJson,
        expiresAt: data.expiresAt,
        provider: data.provider,
        metadata: data.metadata ? JSON.stringify(data.metadata) : null,
      },
    })

    // In a real implementation, this would integrate with external signature providers
    // like DocuSign, Adobe Sign, etc.
    await this.sendSignatureRequests(signatureRequest, data.signers)

    return signatureRequest
  }

  async sendSignatureRequests(request: any, signers: any[]) {
    // Mock implementation - in production, integrate with signature providers
    for (const signer of signers) {
      console.log(`Sending signature request to ${signer.email} for document ${request.documentId}`)
      
      // Create signature response records
      await db.signatureResponse.create({
        data: {
          requestId: request.id,
          signerEmail: signer.email,
          signerName: signer.name,
          status: 'pending',
        },
      })
    }
  }

  async updateSignatureStatus(responseId: string, status: string, signatureData?: any) {
    const updateData: any = {
      status,
    }

    if (status === 'signed') {
      updateData.signedAt = new Date()
      updateData.signatureData = JSON.stringify(signatureData)
    }

    return await db.signatureResponse.update({
      where: { id: responseId },
      data: updateData,
    })
  }

  async getDocumentSignatureStatus(documentId: string) {
    const request = await db.signatureRequest.findFirst({
      where: { documentId },
      include: {
        signatureResponses: true,
      },
    })

    if (!request) {
      return null
    }

    const allSigned = request.signatureResponses.every(
      response => response.status === 'signed'
    )

    return {
      request,
      allSigned,
      status: allSigned ? 'completed' : request.status,
    }
  }
}

const signatureService = new SignatureService()

// GET /api/signature/requests - List signature requests
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const documentId = searchParams.get('documentId')
    const status = searchParams.get('status')

    const skip = (page - 1) * limit

    const where: any = {}
    if (documentId) where.documentId = documentId
    if (status) where.status = status

    const [requests, total] = await Promise.all([
      db.signatureRequest.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          signatureResponses: true,
        },
      }),
      db.signatureRequest.count({ where }),
    ])

    return NextResponse.json({
      requests,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching signature requests:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/signature/requests - Create signature request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = signatureRequestSchema.parse(body)

    const signers = JSON.parse(validatedData.signers)
    const metadata = validatedData.metadata ? JSON.parse(validatedData.metadata) : undefined

    const signatureRequest = await signatureService.createSignatureRequest({
      documentId: validatedData.documentId,
      documentType: validatedData.documentType,
      signers,
      expiresAt: validatedData.expiresAt ? new Date(validatedData.expiresAt) : undefined,
      provider: validatedData.provider,
      metadata,
    })

    return NextResponse.json(signatureRequest, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating signature request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET /api/signature/requests/[id]/status - Get signature request status
export async function getSignatureStatus(request: NextRequest) {
  try {
    const requestId = request.url.split('/').pop()
    
    if (!requestId || requestId === 'status') {
      return NextResponse.json(
        { error: 'Request ID required' },
        { status: 400 }
      )
    }

    const signatureRequest = await db.signatureRequest.findUnique({
      where: { id: requestId },
      include: {
        signatureResponses: true,
      },
    })

    if (!signatureRequest) {
      return NextResponse.json(
        { error: 'Signature request not found' },
        { status: 404 }
      )
    }

    const allSigned = signatureRequest.signatureResponses.every(
      response => response.status === 'signed'
    )

    return NextResponse.json({
      request: signatureRequest,
      allSigned,
      status: allSigned ? 'completed' : signatureRequest.status,
    })
  } catch (error) {
    console.error('Error fetching signature status:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/signature/requests/[id]/sign - Mock signing endpoint
export async function signDocument(request: NextRequest) {
  try {
    const requestId = request.url.split('/').pop()
    
    if (!requestId || requestId === 'sign') {
      return NextResponse.json(
        { error: 'Request ID required' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { signerEmail, signatureData } = body

    if (!signerEmail) {
      return NextResponse.json(
        { error: 'Signer email required' },
        { status: 400 }
      )
    }

    // Find the signature response
    const signatureResponse = await db.signatureResponse.findFirst({
      where: {
        requestId,
        signerEmail,
      },
    })

    if (!signatureResponse) {
      return NextResponse.json(
        { error: 'Signature response not found' },
        { status: 404 }
      )
    }

    // Update the signature status
    const updatedResponse = await signatureService.updateSignatureStatus(
      signatureResponse.id,
      'signed',
      signatureData
    )

    // Check if all signers have signed
    const requestWithResponses = await db.signatureRequest.findUnique({
      where: { id: requestId },
      include: {
        signatureResponses: true,
      },
    })

    const allSigned = requestWithResponses!.signatureResponses.every(
      response => response.status === 'signed'
    )

    // Update request status if all signed
    if (allSigned) {
      await db.signatureRequest.update({
        where: { id: requestId },
        data: {
          status: 'signed',
          signedAt: new Date(),
        },
      })
    }

    return NextResponse.json({
      response: updatedResponse,
      allSigned,
      requestStatus: allSigned ? 'completed' : 'pending',
    })
  } catch (error) {
    console.error('Error signing document:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}