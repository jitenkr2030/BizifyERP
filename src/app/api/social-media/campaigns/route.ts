import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

const campaignSchema = z.object({
  name: z.string().min(1, 'Campaign name is required'),
  description: z.string().optional(),
  objective: z.string().min(1, 'Objective is required'),
  startDate: z.string(),
  endDate: z.string(),
  budget: z.number().min(0, 'Budget must be non-negative'),
  actualSpend: z.number().min(0).default(0),
  status: z.string().default('Draft'),
  platform: z.string().min(1, 'Platform is required'),
  targetAudience: z.string().optional(),
  creativeAssets: z.string().optional(),
  accountId: z.string().optional(),
  createdBy: z.string().optional(),
  approvedBy: z.string().optional(),
  approvedAt: z.string().optional(),
  metrics: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const platform = searchParams.get('platform');
    const status = searchParams.get('status');
    const objective = searchParams.get('objective');

    const skip = (page - 1) * limit;

    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (platform) {
      where.platform = platform;
    }
    
    if (status) {
      where.status = status;
    }
    
    if (objective) {
      where.objective = objective;
    }

    const [campaigns, total] = await Promise.all([
      db.socialCampaign.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          account: true,
          socialPosts: {
            take: 5,
            orderBy: { createdAt: 'desc' },
          },
          socialAds: {
            take: 5,
            orderBy: { createdAt: 'desc' },
          },
          influencerCampaigns: {
            take: 3,
            orderBy: { createdAt: 'desc' },
          },
        },
      }),
      db.socialCampaign.count({ where }),
    ]);

    return NextResponse.json({
      campaigns,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching social campaigns:', error);
    return NextResponse.json(
      { error: 'Failed to fetch social campaigns' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = campaignSchema.parse(body);

    const campaign = await db.socialCampaign.create({
      data: {
        ...validatedData,
        startDate: new Date(validatedData.startDate),
        endDate: new Date(validatedData.endDate),
        targetAudience: validatedData.targetAudience || '{}',
        creativeAssets: validatedData.creativeAssets || '{}',
        metrics: validatedData.metrics || '{}',
        approvedAt: validatedData.approvedAt ? new Date(validatedData.approvedAt) : null,
      },
      include: {
        account: true,
        socialPosts: true,
        socialAds: true,
        influencerCampaigns: true,
      },
    });

    return NextResponse.json(campaign, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Error creating social campaign:', error);
    return NextResponse.json(
      { error: 'Failed to create social campaign' },
      { status: 500 }
    );
  }
}