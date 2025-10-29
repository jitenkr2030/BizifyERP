import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

const reportSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  period: z.string().min(1, 'Period is required'),
  startDate: z.string(),
  endDate: z.string(),
  status: z.string().default('Draft'),
  generatedBy: z.string().optional(),
  data: z.string().optional(),
  summary: z.string().optional(),
  keyMetrics: z.string().optional(),
  recommendations: z.string().optional(),
  filePath: z.string().optional(),
  distribution: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const period = searchParams.get('period');

    const skip = (page - 1) * limit;

    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { summary: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (type) {
      where.type = type;
    }
    
    if (status) {
      where.status = status;
    }
    
    if (period) {
      where.period = period;
    }

    const [reports, total] = await Promise.all([
      db.complianceReport.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      db.complianceReport.count({ where }),
    ]);

    return NextResponse.json({
      reports,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching compliance reports:', error);
    return NextResponse.json(
      { error: 'Failed to fetch compliance reports' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = reportSchema.parse(body);

    const report = await db.complianceReport.create({
      data: {
        ...validatedData,
        startDate: new Date(validatedData.startDate),
        endDate: new Date(validatedData.endDate),
        data: validatedData.data || '{}',
        keyMetrics: validatedData.keyMetrics || '{}',
        distribution: validatedData.distribution || '[]',
      },
    });

    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Error creating compliance report:', error);
    return NextResponse.json(
      { error: 'Failed to create compliance report' },
      { status: 500 }
    );
  }
}