import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

const regulationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  code: z.string().min(1, 'Code is required'),
  type: z.string().min(1, 'Type is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().optional(),
  jurisdiction: z.string().optional(),
  effectiveDate: z.string().optional(),
  lastUpdated: z.string().optional(),
  isActive: z.boolean().default(true),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const type = searchParams.get('type');
    const category = searchParams.get('category');
    const isActive = searchParams.get('isActive');

    const skip = (page - 1) * limit;

    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { code: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (type) {
      where.type = type;
    }
    
    if (category) {
      where.category = category;
    }
    
    if (isActive !== null) {
      where.isActive = isActive === 'true';
    }

    const [regulations, total] = await Promise.all([
      db.regulation.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          complianceFrameworks: true,
          complianceRequirements: true,
        },
      }),
      db.regulation.count({ where }),
    ]);

    return NextResponse.json({
      regulations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching regulations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch regulations' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = regulationSchema.parse(body);

    const regulation = await db.regulation.create({
      data: {
        ...validatedData,
        effectiveDate: validatedData.effectiveDate ? new Date(validatedData.effectiveDate) : null,
        lastUpdated: validatedData.lastUpdated ? new Date(validatedData.lastUpdated) : null,
      },
      include: {
        complianceFrameworks: true,
        complianceRequirements: true,
      },
    });

    return NextResponse.json(regulation, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Error creating regulation:', error);
    return NextResponse.json(
      { error: 'Failed to create regulation' },
      { status: 500 }
    );
  }
}