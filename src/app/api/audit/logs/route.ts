import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'
import crypto from 'crypto'

const auditLogSchema = z.object({
  entityId: z.string(),
  entityType: z.string(),
  action: z.string(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  changes: z.string().optional(),
  metadata: z.string().optional(),
})

// Audit logging middleware/service
class AuditLogger {
  async logAction(data: {
    entityId: string
    entityType: string
    action: string
    userId: string
    ipAddress?: string
    userAgent?: string
    changes?: any
    metadata?: any
  }) {
    // Generate cryptographic hash for tamper evidence
    const logData = {
      entityId: data.entityId,
      entityType: data.entityType,
      action: data.action,
      userId: data.userId,
      timestamp: new Date().toISOString(),
    }
    
    const hash = crypto
      .createHash('sha256')
      .update(JSON.stringify(logData))
      .digest('hex')

    const auditLog = await db.auditLog.create({
      data: {
        entityId: data.entityId,
        entityType: data.entityType,
        action: data.action,
        userId: data.userId,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
        changes: data.changes ? JSON.stringify(data.changes) : null,
        metadata: data.metadata ? JSON.stringify(data.metadata) : null,
        hash,
      },
    })

    return auditLog
  }

  async verifyIntegrity(logId: string): Promise<boolean> {
    const log = await db.auditLog.findUnique({
      where: { id: logId },
    })

    if (!log) return false

    const logData = {
      entityId: log.entityId,
      entityType: log.entityType,
      action: log.action,
      userId: log.userId,
      timestamp: log.createdAt.toISOString(),
    }

    const computedHash = crypto
      .createHash('sha256')
      .update(JSON.stringify(logData))
      .digest('hex')

    return computedHash === log.hash
  }

  async getAuditTrail(entityId: string, entityType: string) {
    return await db.auditLog.findMany({
      where: {
        entityId,
        entityType,
      },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })
  }
}

const auditLogger = new AuditLogger()

// GET /api/audit/logs - List audit logs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const entityId = searchParams.get('entityId')
    const entityType = searchParams.get('entityType')
    const action = searchParams.get('action')
    const userId = searchParams.get('userId')

    const skip = (page - 1) * limit

    const where: any = {}
    if (entityId) where.entityId = entityId
    if (entityType) where.entityType = entityType
    if (action) where.action = action
    if (userId) where.userId = userId

    const [logs, total] = await Promise.all([
      db.auditLog.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      db.auditLog.count({ where }),
    ])

    return NextResponse.json({
      logs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching audit logs:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/audit/logs - Create audit log
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = auditLogSchema.parse(body)

    // Get user ID from authentication (in real app)
    const userId = 'default-user-id' // This would come from auth context

    const auditLog = await auditLogger.logAction({
      ...validatedData,
      userId,
      changes: validatedData.changes ? JSON.parse(validatedData.changes) : undefined,
      metadata: validatedData.metadata ? JSON.parse(validatedData.metadata) : undefined,
    })

    return NextResponse.json(auditLog, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating audit log:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET /api/audit/logs/[id]/verify - Verify audit log integrity
export async function verifyLogIntegrity(request: NextRequest) {
  try {
    const logId = request.url.split('/').pop()
    
    if (!logId || logId === 'verify') {
      return NextResponse.json(
        { error: 'Log ID required' },
        { status: 400 }
      )
    }

    const isValid = await auditLogger.verifyIntegrity(logId)

    return NextResponse.json({
      logId,
      isValid,
      message: isValid ? 'Audit log integrity verified' : 'Audit log has been tampered with',
    })
  } catch (error) {
    console.error('Error verifying audit log integrity:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET /api/audit/logs/trail/[entityId]/[entityType] - Get audit trail for entity
export async function getAuditTrail(request: NextRequest) {
  try {
    const urlParts = request.url.split('/')
    const entityId = urlParts[urlParts.length - 2]
    const entityType = urlParts[urlParts.length - 1]

    if (!entityId || !entityType) {
      return NextResponse.json(
        { error: 'Entity ID and type required' },
        { status: 400 }
      )
    }

    const trail = await auditLogger.getAuditTrail(entityId, entityType)

    return NextResponse.json({
      entityId,
      entityType,
      trail,
    })
  } catch (error) {
    console.error('Error fetching audit trail:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}