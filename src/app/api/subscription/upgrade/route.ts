import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const upgradeSchema = z.object({
  userId: z.string(),
  planId: z.string(),
  paymentMethod: z.string().optional(),
  paymentId: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, planId, paymentMethod, paymentId } = upgradeSchema.parse(body)

    // Get user and current tenant
    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        tenant: true,
      }
    })

    if (!user || !user.tenant) {
      return NextResponse.json(
        { error: 'User or tenant not found' },
        { status: 404 }
      )
    }

    // Get the selected plan
    const plan = await db.subscriptionPlan.findUnique({
      where: { id: planId }
    })

    if (!plan) {
      return NextResponse.json(
        { error: 'Plan not found' },
        { status: 404 }
      )
    }

    // Calculate period dates
    const periodStart = new Date()
    const periodEnd = new Date()
    periodEnd.setMonth(periodEnd.getMonth() + 1) // 1 month from now

    // Create subscription payment record
    const payment = await db.subscriptionPayment.create({
      data: {
        userId,
        tenantId: user.tenantId,
        planId,
        amount: plan.price,
        currency: 'USD',
        status: 'completed',
        paymentMethod,
        paymentId,
        periodStart,
        periodEnd,
      }
    })

    // Update user subscription
    await db.user.update({
      where: { id: userId },
      data: {
        subscriptionTier: plan.name.toLowerCase(),
        subscriptionStatus: 'active',
        subscriptionEndsAt: periodEnd,
      }
    })

    // Update tenant
    await db.tenant.update({
      where: { id: user.tenantId },
      data: {
        plan: plan.name.toLowerCase(),
        maxUsers: plan.maxUsers,
        maxStorage: plan.maxStorage,
        features: plan.features,
        status: 'active',
      }
    })

    return NextResponse.json({
      message: 'Subscription upgraded successfully',
      payment: {
        id: payment.id,
        amount: payment.amount,
        status: payment.status,
        periodStart: payment.periodStart,
        periodEnd: payment.periodEnd,
      },
      user: {
        subscriptionTier: plan.name.toLowerCase(),
        subscriptionStatus: 'active',
        subscriptionEndsAt: periodEnd,
      },
      tenant: {
        plan: plan.name.toLowerCase(),
        maxUsers: plan.maxUsers,
        maxStorage: plan.maxStorage,
        status: 'active',
      }
    })

  } catch (error) {
    console.error('Subscription upgrade error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}