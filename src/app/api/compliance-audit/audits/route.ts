import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

const auditSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  scope: z.string().optional(),
  objectives: z.string().optional(),
  scheduledStart: z.string(),
  scheduledEnd: z.string(),
  leadAuditor: z.string().optional(),
  teamMembers: z.string().optional(),
  budget: z.number().optional(),
  riskLevel: z.string().min(1, 'Risk level is required'),
  findings: z.string().optional(),
  recommendations: z.string().optional(),
  reportPath: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const riskLevel = searchParams.get('riskLevel');

    const skip = (page - 1) * limit;

    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { scope: { contains: search, mode: 'insensitive' } },
        { objectives: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (type) {
      where.type = type;
    }
    
    if (status) {
      where.status = status;
    }
    
    if (riskLevel) {
      where.riskLevel = riskLevel;
    }

    const [audits, total] = await Promise.all([
      db.audit.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          complianceAuditFindings: true,
          auditPlans: true,
        },
      }),
      db.audit.count({ where }),
    ]);

    return NextResponse.json({
      audits,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching audits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch audits' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = auditSchema.parse(body);

    const audit = await db.audit.create({
      data: {
        ...validatedData,
        scheduledStart: new Date(validatedData.scheduledStart),
        scheduledEnd: new Date(validatedData.scheduledEnd),
        teamMembers: validatedData.teamMembers || '[]',
        findings: validatedData.findings || '[]',
      },
      include: {
        complianceAuditFindings: true,
        auditPlans: true,
      },
    });

    return NextResponse.json(audit, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Error creating audit:', error);
    return NextResponse.json(
      { error: 'Failed to create audit' },
      { status: 500 }
    );
  }
}