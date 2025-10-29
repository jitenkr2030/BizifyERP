import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const integrationId = searchParams.get('integrationId')
    const isActive = searchParams.get('isActive')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.OR = [
        { url: { contains: search, mode: 'insensitive' } },
        { integration: { name: { contains: search, mode: 'insensitive' } } }
      ]
    }

    if (integrationId) {
      where.integrationId = integrationId
    }

    if (isActive !== null && isActive !== undefined) {
      where.isActive = isActive === 'true'
    }

    // Get webhooks with related data
    const [webhooks, totalCount] = await Promise.all([
      db.webhook.findMany({
        where,
        include: {
          integration: {
            select: {
              id: true,
              name: true,
              type: true
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
      db.webhook.count({ where })
    ])

    // Parse events JSON for each webhook
    const webhooksWithParsedEvents = webhooks.map(webhook => ({
      ...webhook,
      events: webhook.events ? JSON.parse(webhook.events) : []
    }))

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      success: true,
      data: webhooksWithParsedEvents,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages
      }
    })
  } catch (error) {
    console.error('Error fetching webhooks:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch webhooks' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      integrationId,
      url,
      events,
      secret,
      isActive = true
    } = body

    // Validate required fields
    if (!integrationId || !url || !events) {
      return NextResponse.json(
        { success: false, error: 'Integration, URL, and events are required' },
        { status: 400 }
      )
    }

    // Check if integration exists
    const integration = await db.integration.findUnique({
      where: { id: integrationId }
    })

    if (!integration) {
      return NextResponse.json(
        { success: false, error: 'Integration not found' },
        { status: 404 }
      )
    }

    // Validate events is valid array
    let parsedEvents
    try {
      parsedEvents = typeof events === 'string' ? JSON.parse(events) : events
      if (!Array.isArray(parsedEvents)) {
        throw new Error('Events must be an array')
      }
    } catch (error) {
      return NextResponse.json(
        { success: false, error: 'Invalid events format. Must be a JSON array.' },
        { status: 400 }
      )
    }

    // Create webhook
    const webhook = await db.webhook.create({
      data: {
        integrationId,
        url,
        events: JSON.stringify(parsedEvents),
        secret,
        isActive
      },
      include: {
        integration: {
          select: {
            id: true,
            name: true,
            type: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        ...webhook,
        events: parsedEvents
      },
      message: 'Webhook created successfully'
    })
  } catch (error) {
    console.error('Error creating webhook:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create webhook' },
      { status: 500 }
    )
  }
}

// Test webhook endpoint
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, action } = body

    if (!id || !action) {
      return NextResponse.json(
        { success: false, error: 'Webhook ID and action are required' },
        { status: 400 }
      )
    }

    const webhook = await db.webhook.findUnique({
      where: { id },
      include: {
        integration: {
          select: {
            id: true,
            name: true,
            type: true
          }
        }
      }
    })

    if (!webhook) {
      return NextResponse.json(
        { success: false, error: 'Webhook not found' },
        { status: 404 }
      )
    }

    let updateData: any = {}

    switch (action) {
      case 'test':
        // Simulate webhook test
        updateData = {
          lastTriggered: new Date()
        }
        break
      case 'toggle':
        updateData = {
          isActive: !webhook.isActive
        }
        break
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        )
    }

    const updatedWebhook = await db.webhook.update({
      where: { id },
      data: updateData,
      include: {
        integration: {
          select: {
            id: true,
            name: true,
            type: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        ...updatedWebhook,
        events: updatedWebhook.events ? JSON.parse(updatedWebhook.events) : []
      },
      message: `Webhook ${action}ed successfully`
    })
  } catch (error) {
    console.error('Error updating webhook:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update webhook' },
      { status: 500 }
    )
  }
}

// Webhook receiver endpoint for external services
export async function POST_webhook(request: NextRequest) {
  try {
    const body = await request.json()
    const { searchParams } = new URL(request.url)
    const webhookId = searchParams.get('id')

    if (!webhookId) {
      return NextResponse.json(
        { success: false, error: 'Webhook ID is required' },
        { status: 400 }
      )
    }

    const webhook = await db.webhook.findUnique({
      where: { id: webhookId },
      include: {
        integration: true
      }
    })

    if (!webhook) {
      return NextResponse.json(
        { success: false, error: 'Webhook not found' },
        { status: 404 }
      )
    }

    if (!webhook.isActive) {
      return NextResponse.json(
        { success: false, error: 'Webhook is not active' },
        { status: 400 }
      )
    }

    // Verify webhook signature if secret is configured
    if (webhook.secret) {
      const signature = request.headers.get('x-webhook-signature')
      if (!signature) {
        return NextResponse.json(
          { success: false, error: 'Missing webhook signature' },
          { status: 401 }
        )
      }
      // In a real implementation, you would verify the signature here
    }

    // Update last triggered timestamp
    await db.webhook.update({
      where: { id: webhookId },
      data: {
        lastTriggered: new Date()
      }
    })

    // Process the webhook payload based on integration type
    // This is where you would handle different webhook events
    console.log(`Received webhook for ${webhook.integration.name}:`, body)

    return NextResponse.json({
      success: true,
      message: 'Webhook received and processed'
    })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process webhook' },
      { status: 500 }
    )
  }
}