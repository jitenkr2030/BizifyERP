import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tenantId = searchParams.get('tenantId')

    if (!tenantId) {
      return NextResponse.json(
        { error: 'Tenant ID is required' },
        { status: 400 }
      )
    }

    const tenant = await db.tenant.findUnique({
      where: { id: tenantId },
      include: {
        users: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            isTenantAdmin: true,
            subscriptionTier: true,
            subscriptionStatus: true,
            createdAt: true,
          }
        },
        companies: {
          select: {
            id: true,
            name: true,
            taxId: true,
            email: true,
            phone: true,
            createdAt: true,
          }
        },
        subscriptionPayments: {
          orderBy: { createdAt: 'desc' },
          take: 10,
          include: {
            plan: true,
          }
        }
      }
    })

    if (!tenant) {
      return NextResponse.json(
        { error: 'Tenant not found' },
        { status: 404 }
      )
    }

    // Parse JSON fields
    const formattedTenant = {
      ...tenant,
      features: tenant.features ? JSON.parse(tenant.features) : [],
      subscriptionPayments: tenant.subscriptionPayments.map(payment => ({
        ...payment,
        plan: {
          ...payment.plan,
          features: payment.plan.features ? JSON.parse(payment.plan.features) : []
        }
      }))
    }

    return NextResponse.json(formattedTenant)
  } catch (error) {
    console.error('Error fetching tenant:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tenantId = searchParams.get('tenantId')

    if (!tenantId) {
      return NextResponse.json(
        { error: 'Tenant ID is required' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { name, domain, logo, settings, maxUsers, maxStorage, features } = body

    const tenant = await db.tenant.update({
      where: { id: tenantId },
      data: {
        ...(name && { name }),
        ...(domain !== undefined && { domain }),
        ...(logo !== undefined && { logo }),
        ...(settings !== undefined && { settings: JSON.stringify(settings) }),
        ...(maxUsers !== undefined && { maxUsers }),
        ...(maxStorage !== undefined && { maxStorage }),
        ...(features !== undefined && { features: JSON.stringify(features) }),
      }
    })

    return NextResponse.json({
      message: 'Tenant updated successfully',
      tenant: {
        ...tenant,
        features: tenant.features ? JSON.parse(tenant.features) : [],
        settings: tenant.settings ? JSON.parse(tenant.settings) : {},
      }
    })

  } catch (error) {
    console.error('Error updating tenant:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}