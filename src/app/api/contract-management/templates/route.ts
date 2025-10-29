import { NextRequest, NextResponse } from 'next/server'

// Mock data for contract templates
const mockTemplates = [
  { 
    id: 1, 
    name: 'Software License Agreement', 
    category: 'Technology', 
    description: 'Standard software licensing agreement for enterprise software products',
    usage: 45,
    version: '2.1',
    lastUpdated: '2024-01-15',
    status: 'Active',
    requiredFields: ['licensor', 'licensee', 'software_description', 'license_fee', 'term'],
    optionalFields: ['support_terms', 'maintenance', 'termination_clauses'],
    createdBy: 'legal@company.com',
    tags: ['software', 'license', 'technology', 'enterprise'],
    content: 'This Software License Agreement ("Agreement") is entered into between...'
  },
  { 
    id: 2, 
    name: 'Service Level Agreement', 
    category: 'Services', 
    description: 'Comprehensive SLA template for IT and professional services',
    usage: 32,
    version: '1.5',
    lastUpdated: '2024-01-10',
    status: 'Active',
    requiredFields: ['service_provider', 'client', 'service_description', 'service_levels', 'term'],
    optionalFields: ['penalty_clauses', 'reporting_requirements', 'review_meetings'],
    createdBy: 'legal@company.com',
    tags: ['services', 'sla', 'it', 'professional'],
    content: 'This Service Level Agreement ("SLA") is made and entered into...'
  },
  { 
    id: 3, 
    name: 'Vendor Contract', 
    category: 'Procurement', 
    description: 'Standard vendor agreement for procurement of goods and services',
    usage: 28,
    version: '3.0',
    lastUpdated: '2024-01-08',
    status: 'Active',
    requiredFields: ['vendor', 'buyer', 'goods_services', 'price', 'delivery_terms'],
    optionalFields: ['quality_requirements', 'inspection_rights', 'warranty_terms'],
    createdBy: 'procurement@company.com',
    tags: ['vendor', 'procurement', 'goods', 'services'],
    content: 'This Vendor Agreement ("Agreement") is entered into between...'
  },
  { 
    id: 4, 
    name: 'Employment Agreement', 
    category: 'HR', 
    description: 'Comprehensive employment agreement template for various employee types',
    usage: 67,
    version: '4.2',
    lastUpdated: '2024-01-12',
    status: 'Active',
    requiredFields: ['employer', 'employee', 'position', 'compensation', 'start_date'],
    optionalFields: ['benefits', 'stock_options', 'non_compete', 'confidentiality'],
    createdBy: 'hr@company.com',
    tags: ['employment', 'hr', 'staff', 'personnel'],
    content: 'This Employment Agreement ("Agreement") is made between...'
  },
  { 
    id: 5, 
    name: 'Non-Disclosure Agreement', 
    category: 'Legal', 
    description: 'Standard NDA template for protecting confidential information',
    usage: 89,
    version: '2.0',
    lastUpdated: '2024-01-05',
    status: 'Active',
    requiredFields: ['disclosing_party', 'receiving_party', 'confidential_information', 'term'],
    optionalFields: ['permitted_disclosures', 'return_provisions', 'remedies'],
    createdBy: 'legal@company.com',
    tags: ['nda', 'confidential', 'privacy', 'legal'],
    content: 'This Non-Disclosure Agreement ("Agreement") is entered into...'
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category') || ''
    const status = searchParams.get('status') || ''

    // Filter data based on category and status
    let filteredData = mockTemplates

    if (category) {
      filteredData = filteredData.filter(item => 
        item.category.toLowerCase() === category.toLowerCase()
      )
    }

    if (status) {
      filteredData = filteredData.filter(item => 
        item.status.toLowerCase() === status.toLowerCase()
      )
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedData = filteredData.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: paginatedData,
      pagination: {
        current: page,
        total: Math.ceil(filteredData.length / limit),
        count: filteredData.length,
        limit
      }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch templates' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'category', 'description', 'requiredFields']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Create new template
    const newTemplate = {
      id: mockTemplates.length + 1,
      name: body.name,
      category: body.category,
      description: body.description,
      usage: 0,
      version: body.version || '1.0',
      lastUpdated: new Date().toISOString().split('T')[0],
      status: body.status || 'Active',
      requiredFields: body.requiredFields,
      optionalFields: body.optionalFields || [],
      createdBy: body.createdBy || 'system',
      tags: body.tags || [],
      content: body.content || ''
    }

    mockTemplates.push(newTemplate)

    return NextResponse.json({
      success: true,
      data: newTemplate,
      message: 'Template created successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create template' },
      { status: 500 }
    )
  }
}