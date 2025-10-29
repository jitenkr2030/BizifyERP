import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

const accountSchema = z.object({
  name: z.string().min(1, 'Account name is required'),
  platform: z.string().min(1, 'Platform is required'),
  accountId: z.string().min(1, 'Account ID is required'),
  accountType: z.string().min(1, 'Account type is required'),
  username: z.string().optional(),
  profileImage: z.string().optional(),
  accessToken: z.string().optional(),
  refreshToken: z.string().optional(),
  isActive: z.boolean().default(true),
  settings: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const platform = searchParams.get('platform');
    const isActive = searchParams.get('isActive');

    const skip = (page - 1) * limit;

    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { username: { contains: search, mode: 'insensitive' } },
        { accountId: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (platform) {
      where.platform = platform;
    }
    
    if (isActive !== null) {
      where.isActive = isActive === 'true';
    }

    const [accounts, total] = await Promise.all([
      db.socialAccount.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          socialPosts: {
            take: 5,
            orderBy: { createdAt: 'desc' },
          },
          socialCampaigns: {
            take: 3,
            orderBy: { createdAt: 'desc' },
          },
          socialAds: {
            take: 3,
            orderBy: { createdAt: 'desc' },
          },
        },
      }),
      db.socialAccount.count({ where }),
    ]);

    return NextResponse.json({
      accounts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching social accounts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch social accounts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = accountSchema.parse(body);

    const account = await db.socialAccount.create({
      data: {
        ...validatedData,
        connectedAt: new Date(),
        settings: validatedData.settings || '{}',
      },
      include: {
        socialPosts: true,
        socialCampaigns: true,
        socialAds: true,
      },
    });

    return NextResponse.json(account, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Error creating social account:', error);
    return NextResponse.json(
      { error: 'Failed to create social account' },
      { status: 500 }
    );
  }
}