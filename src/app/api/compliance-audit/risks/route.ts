import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

const riskSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  source: z.string().min(1, 'Source is required'),
  likelihood: z.string().min(1, 'Likelihood is required'),
  impact: z.string().min(1, 'Impact is required'),
  riskLevel: z.string().min(1, 'Risk level is required'),
  mitigation: z.string().optional(),
  owner: z.string().optional(),
  status: z.string().default('Open'),
  targetDate: z.string().optional(),
  controlMeasures: z.string().optional(),
  monitoringPlan: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const riskLevel = searchParams.get('riskLevel');

    const skip = (page - 1) * limit;

    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (category) {
      where.category = category;
    }
    
    if (status) {
      where.status = status;
    }
    
    if (riskLevel) {
      where.riskLevel = riskLevel;
    }

    const [risks, total] = await Promise.all([
      db.complianceRisk.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      db.complianceRisk.count({ where }),
    ]);

    return NextResponse.json({
      risks,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching compliance risks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch compliance risks' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = riskSchema.parse(body);

    const risk = await db.complianceRisk.create({
      data: {
        ...validatedData,
        targetDate: validatedData.targetDate ? new Date(validatedData.targetDate) : null,
        controlMeasures: validatedData.controlMeasures || '[]',
      },
    });

    return NextResponse.json(risk, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Error creating compliance risk:', error);
    return NextResponse.json(
      { error: 'Failed to create compliance risk' },
      { status: 500 }
    );
  }
}