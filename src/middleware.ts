import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function middleware(request: NextRequest) {
  // Get the tenant from the request headers or subdomain
  const tenantSlug = request.headers.get('x-tenant-slug') || 
                    request.nextUrl.hostname.split('.')[0]

  // Skip middleware for auth routes and static assets
  if (request.nextUrl.pathname.startsWith('/api/auth/') ||
      request.nextUrl.pathname.startsWith('/_next/') ||
      request.nextUrl.pathname.startsWith('/static/') ||
      request.nextUrl.pathname === '/') {
    return NextResponse.next()
  }

  // For API routes, check tenant isolation
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Get user ID from headers (in real app, this would come from JWT)
    const userId = request.headers.get('x-user-id')
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user with tenant info
    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        tenant: true,
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
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

    // Add tenant context to request headers for downstream use
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-tenant-id', user.tenantId || '')
    requestHeaders.set('x-user-role', user.role)
    requestHeaders.set('x-subscription-tier', user.subscriptionTier)
    requestHeaders.set('x-is-tenant-admin', user.isTenantAdmin.toString())

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

  // For page routes, you would implement session checking here
  // This is a simplified version - in production, you'd use proper session management
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}