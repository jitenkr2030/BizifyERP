import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  companyName: z.string().min(2),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name, companyName } = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    // Create tenant
    const tenant = await db.tenant.create({
      data: {
        name: companyName,
        slug: companyName.toLowerCase().replace(/\s+/g, '-'),
        plan: 'free',
        status: 'active',
        maxUsers: 5,
        maxStorage: 1024,
        trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days trial
      }
    })

    // Create user as tenant admin
    const user = await db.user.create({
      data: {
        email,
        name,
        tenantId: tenant.id,
        isTenantAdmin: true,
        subscriptionTier: 'free',
        subscriptionStatus: 'active',
      }
    })

    // Create default company for tenant
    await db.company.create({
      data: {
        name: companyName,
        tenantId: tenant.id,
      }
    })

    // Create default subscription plans
    const plans = [
      {
        name: 'Free',
        description: 'Perfect for small teams getting started',
        price: 0,
        interval: 'monthly',
        features: JSON.stringify([
          'Up to 5 users',
          '1GB storage',
          'Basic modules',
          'Email support'
        ]),
        maxUsers: 5,
        maxStorage: 1024,
      },
      {
        name: 'Basic',
        description: 'Great for growing businesses',
        price: 29,
        interval: 'monthly',
        features: JSON.stringify([
          'Up to 20 users',
          '10GB storage',
          'All modules',
          'Priority support',
          'Advanced reporting'
        ]),
        maxUsers: 20,
        maxStorage: 10240,
      },
      {
        name: 'Pro',
        description: 'For established businesses',
        price: 99,
        interval: 'monthly',
        features: JSON.stringify([
          'Up to 100 users',
          '100GB storage',
          'All modules + premium features',
          '24/7 phone support',
          'Custom integrations',
          'API access'
        ]),
        maxUsers: 100,
        maxStorage: 102400,
      },
      {
        name: 'Enterprise',
        description: 'Custom solution for large organizations',
        price: 299,
        interval: 'monthly',
        features: JSON.stringify([
          'Unlimited users',
          'Unlimited storage',
          'All features',
          'Dedicated support',
          'Custom development',
          'SLA guarantee',
          'On-premise option'
        ]),
        maxUsers: 999999,
        maxStorage: 999999,
      }
    ]

    for (const plan of plans) {
      await db.subscriptionPlan.create({
        data: plan
      })
    }

    return NextResponse.json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        tenantId: user.tenantId,
        isTenantAdmin: user.isTenantAdmin,
        subscriptionTier: user.subscriptionTier,
      },
      tenant: {
        id: tenant.id,
        name: tenant.name,
        slug: tenant.slug,
        plan: tenant.plan,
        trialEndsAt: tenant.trialEndsAt,
      }
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}