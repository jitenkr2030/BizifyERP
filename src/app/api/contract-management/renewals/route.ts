import { NextRequest, NextResponse } from 'next/server'

// Mock data for renewals
const mockRenewals = [
  { 
    id: 1, 
    contractId: 1,
    contract: 'Software License Agreement', 
    value: 50000, 
    currency: 'USD',
    renewalDate: '2024-11-01', 
    daysLeft: 45, 
    status: 'On Track',
    autoRenew: true,
    renewalTerms: 'Same terms as current agreement',
    notifications: [
      { type: 'email', sent: false, scheduled: '2024-09-01' },
      { type: 'system', sent: false, scheduled: '2024-10-01' }
    ],
    assignedTo: 'John Doe',
    notes: 'Customer has indicated interest in renewal'
  },
  { 
    id: 2, 
    contractId: 3,
    contract: 'Vendor Contract', 
    value: 100000, 
    currency: 'USD',
    renewalDate: '2024-04-01', 
    daysLeft: 15, 
    status: 'Urgent',
    autoRenew: false,
    renewalTerms: 'Negotiating new terms with vendor',
    notifications: [
      { type: 'email', sent: true, scheduled: '2024-02-01' },
      { type: 'system', sent: true, scheduled: '2024-03-01' }
    ],
    assignedTo: 'Jane Smith',
    notes: 'Requires immediate attention and negotiation'
  },
  { 
    id: 3, 
    contractId: 2,
    contract: 'Service Level Agreement', 
    value: 25000, 
    currency: 'USD',
    renewalDate: '2024-12-01', 
    daysLeft: 75, 
    status: 'On Track',
    autoRenew: true,
    renewalTerms: 'Updated service levels based on feedback',
    notifications: [
      { type: 'email', sent: false, scheduled: '2024-10-01' },
      { type: 'system', sent: false, scheduled: '2024-11-01' }
    ],
    assignedTo: 'Mike Johnson',
    notes: 'Service levels to be reviewed before renewal'
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status') || ''

    // Filter data based on status
    let filteredData = mockRenewals

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
      { success: false, error: 'Failed to fetch renewals' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['contractId', 'value', 'renewalDate']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Calculate days left
    const renewalDate = new Date(body.renewalDate)
    const today = new Date()
    const daysLeft = Math.ceil((renewalDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    // Create new renewal
    const newRenewal = {
      id: mockRenewals.length + 1,
      contractId: body.contractId,
      contract: body.contract || 'Unknown Contract',
      value: body.value,
      currency: body.currency || 'USD',
      renewalDate: body.renewalDate,
      daysLeft: daysLeft > 0 ? daysLeft : 0,
      status: daysLeft > 30 ? 'On Track' : daysLeft > 7 ? 'Attention Needed' : 'Urgent',
      autoRenew: body.autoRenew || false,
      renewalTerms: body.renewalTerms || '',
      notifications: body.notifications || [],
      assignedTo: body.assignedTo || 'Unassigned',
      notes: body.notes || ''
    }

    mockRenewals.push(newRenewal)

    return NextResponse.json({
      success: true,
      data: newRenewal,
      message: 'Renewal created successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create renewal' },
      { status: 500 }
    )
  }
}