import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

const postSchema = z.object({
  accountId: z.string().min(1, 'Account ID is required'),
  content: z.string().min(1, 'Content is required'),
  mediaUrls: z.string().optional(),
  mediaType: z.string().optional(),
  postType: z.string().default('organic'),
  status: z.string().default('Draft'),
  scheduledAt: z.string().optional(),
  platform: z.string().min(1, 'Platform is required'),
  hashtags: z.string().optional(),
  mentions: z.string().optional(),
  location: z.string().optional(),
  targeting: z.string().optional(),
  campaignId: z.string().optional(),
  adGroupId: z.string().optional(),
  engagementData: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const platform = searchParams.get('platform');
    const status = searchParams.get('status');
    const accountId = searchParams.get('accountId');

    const skip = (page - 1) * limit;

    const where: any = {};
    
    if (search) {
      where.OR = [
        { content: { contains: search, mode: 'insensitive' } },
        { hashtags: { contains: search, mode: 'insensitive' } },
        { mentions: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (platform) {
      where.platform = platform;
    }
    
    if (status) {
      where.status = status;
    }
    
    if (accountId) {
      where.accountId = accountId;
    }

    const [posts, total] = await Promise.all([
      db.socialPost.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          account: true,
          campaign: true,
          socialMetrics: {
            take: 1,
            orderBy: { metricDate: 'desc' },
          },
          socialComments: {
            take: 3,
            orderBy: { createdAt: 'desc' },
          },
          _count: {
            select: {
              socialComments: true,
              socialInteractions: true,
            },
          },
        },
      }),
      db.socialPost.count({ where }),
    ]);

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching social posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch social posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = postSchema.parse(body);

    const post = await db.socialPost.create({
      data: {
        ...validatedData,
        mediaUrls: validatedData.mediaUrls || '[]',
        hashtags: validatedData.hashtags || '[]',
        mentions: validatedData.mentions || '[]',
        targeting: validatedData.targeting || '{}',
        engagementData: validatedData.engagementData || '{}',
        scheduledAt: validatedData.scheduledAt ? new Date(validatedData.scheduledAt) : null,
        platformPostId: `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      },
      include: {
        account: true,
        campaign: true,
        socialMetrics: true,
        socialComments: true,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Error creating social post:', error);
    return NextResponse.json(
      { error: 'Failed to create social post' },
      { status: 500 }
    );
  }
}