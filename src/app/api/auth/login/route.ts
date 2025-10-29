import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = loginSchema.parse(body)

    // Find user by email
    const user = await db.user.findUnique({
      where: { email },
      include: {
        tenant: true,
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Check subscription status
    if (user.subscriptionStatus === 'cancelled' || user.subscriptionStatus === 'expired') {
      return NextResponse.json(
        { error: 'Subscription expired. Please upgrade your plan.' },
        { status: 403 }
      )
    }

    // Check tenant status
    if (user.tenant && user.tenant.status === 'suspended') {
      return NextResponse.json(
        { error: 'Tenant account suspended. Please contact support.' },
        { status: 403 }
      )
    }

    // Check trial period
    if (user.tenant && user.tenant.trialEndsAt && new Date() > user.tenant.trialEndsAt && user.subscriptionTier === 'free') {
      return NextResponse.json(
        { error: 'Trial period expired. Please upgrade your plan.' },
        { status: 403 }
      )
    }

    // In a real app, you would verify the password here
    // const isPasswordValid = await bcrypt.compare(password, user.password)
    // For demo purposes, we'll skip password verification

    return NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        tenantId: user.tenantId,
        isTenantAdmin: user.isTenantAdmin,
        subscriptionTier: user.subscriptionTier,
        subscriptionStatus: user.subscriptionStatus,
        subscriptionEndsAt: user.subscriptionEndsAt,
      },
      tenant: user.tenant ? {
        id: user.tenant.id,
        name: user.tenant.name,
        slug: user.tenant.slug,
        plan: user.tenant.plan,
        status: user.tenant.status,
        maxUsers: user.tenant.maxUsers,
        maxStorage: user.tenant.maxStorage,
        trialEndsAt: user.tenant.trialEndsAt,
        features: user.tenant.features ? JSON.parse(user.tenant.features) : [],
      } : null,
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}