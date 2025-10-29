import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const type = searchParams.get('type')
    const status = searchParams.get('status')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (type && type !== 'all') {
      where.type = type
    }

    if (status && status !== 'all') {
      where.status = status
    }

    // Get integrations with related data
    const [integrations, totalCount] = await Promise.all([
      db.integration.findMany({
        where,
        include: {
          webhooks: {
            select: {
              id: true,
              url: true,
              events: true,
              isActive: true,
              lastTriggered: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: [
          { isActive: 'desc' },
          { status: 'asc' },
          { createdAt: 'desc' }
        ]
      }),
      db.integration.count({ where })
    ])

    // Parse config JSON for each integration
    const integrationsWithParsedConfig = integrations.map(integration => ({
      ...integration,
      config: integration.config ? JSON.parse(integration.config) : {},
      webhookCount: integration.webhooks.length
    }))

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      success: true,
      data: integrationsWithParsedConfig,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages
      }
    })
  } catch (error) {
    console.error('Error fetching integrations:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch integrations' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      type,
      config,
      isActive = true
    } = body

    // Validate required fields
    if (!name || !type || !config) {
      return NextResponse.json(
        { success: false, error: 'Name, type, and config are required' },
        { status: 400 }
      )
    }

    // Validate config is valid JSON
    let parsedConfig
    try {
      parsedConfig = typeof config === 'string' ? JSON.parse(config) : config
    } catch (error) {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON configuration' },
        { status: 400 }
      )
    }

    // Check if integration name already exists
    const existingIntegration = await db.integration.findFirst({
      where: { name: { equals: name, mode: 'insensitive' } }
    })

    if (existingIntegration) {
      return NextResponse.json(
        { success: false, error: 'Integration with this name already exists' },
        { status: 400 }
      )
    }

    // Create integration
    const integration = await db.integration.create({
      data: {
        name,
        type,
        config: JSON.stringify(parsedConfig),
        isActive,
        status: 'disconnected'
      },
      include: {
        webhooks: {
          select: {
            id: true,
            url: true,
            events: true,
            isActive: true,
            lastTriggered: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        ...integration,
        config: parsedConfig,
        webhookCount: integration.webhooks.length
      },
      message: 'Integration created successfully'
    })
  } catch (error) {
    console.error('Error creating integration:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create integration' },
      { status: 500 }
    )
  }
}

// Test integration connection
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, action } = body

    if (!id || !action) {
      return NextResponse.json(
        { success: false, error: 'Integration ID and action are required' },
        { status: 400 }
      )
    }

    const integration = await db.integration.findUnique({
      where: { id }
    })

    if (!integration) {
      return NextResponse.json(
        { success: false, error: 'Integration not found' },
        { status: 404 }
      )
    }

    let updateData: any = {}

    switch (action) {
      case 'connect':
        // Simulate connection test
        updateData = {
          status: 'connected',
          lastSync: new Date()
        }
        break
      case 'disconnect':
        updateData = {
          status: 'disconnected'
        }
        break
      case 'sync':
        // Simulate data sync
        updateData = {
          lastSync: new Date()
        }
        break
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        )
    }

    const updatedIntegration = await db.integration.update({
      where: { id },
      data: updateData,
      include: {
        webhooks: {
          select: {
            id: true,
            url: true,
            events: true,
            isActive: true,
            lastTriggered: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        ...updatedIntegration,
        config: updatedIntegration.config ? JSON.parse(updatedIntegration.config) : {},
        webhookCount: updatedIntegration.webhooks.length
      },
      message: `Integration ${action}d successfully`
    })
  } catch (error) {
    console.error('Error updating integration:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update integration' },
      { status: 500 }
    )
  }
}