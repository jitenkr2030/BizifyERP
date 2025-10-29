import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const channels = await db.ecommerceChannel.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(channels)
  } catch (error) {
    console.error('Error fetching e-commerce channels:', error)
    return NextResponse.json(
      { error: 'Failed to fetch channels' },
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
      apiKey,
      apiSecret,
      storeUrl,
      isActive = true
    } = body

    const channel = await db.ecommerceChannel.create({
      data: {
        name,
        type,
        apiKey,
        apiSecret,
        storeUrl,
        isActive,
        lastSync: null,
        productsCount: 0,
        ordersCount: 0
      }
    })

    return NextResponse.json(channel, { status: 201 })
  } catch (error) {
    console.error('Error creating e-commerce channel:', error)
    return NextResponse.json(
      { error: 'Failed to create channel' },
      { status: 500 }
    )
  }
}