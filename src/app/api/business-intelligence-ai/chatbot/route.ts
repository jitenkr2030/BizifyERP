import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

// Mock data for chatbot statistics and conversations
const mockChatbotStats = {
  totalConversations: 15420,
  avgResponseTime: '1.2s',
  satisfaction: 4.7,
  activeUsers: 342,
  languages: ['English', 'Spanish', 'French', 'German'],
  totalMessages: 48750,
  resolutionRate: 87.3,
  avgConversationLength: '3.5 minutes'
}

const mockConversations = [
  {
    id: 1,
    userId: 'user_123',
    sessionId: 'session_456',
    messages: [
      { role: 'assistant', content: 'Hello! I\'m your AI business assistant. How can I help you today?', timestamp: '2024-01-15T10:00:00Z' },
      { role: 'user', content: 'Show me the sales forecast for next quarter', timestamp: '2024-01-15T10:01:00Z' },
      { role: 'assistant', content: 'Based on current trends and historical data, I predict a 15.2% increase in sales for the next quarter. The main drivers are seasonal demand and new product launches.', timestamp: '2024-01-15T10:01:30Z' }
    ],
    status: 'active',
    satisfaction: 5,
    language: 'English',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:01:30Z'
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'stats'

    if (type === 'stats') {
      return NextResponse.json({
        success: true,
        data: mockChatbotStats
      })
    } else if (type === 'conversations') {
      const page = parseInt(searchParams.get('page') || '1')
      const limit = parseInt(searchParams.get('limit') || '10')
      
      // Pagination
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedData = mockConversations.slice(startIndex, endIndex)

      return NextResponse.json({
        success: true,
        data: paginatedData,
        pagination: {
          current: page,
          total: Math.ceil(mockConversations.length / limit),
          count: mockConversations.length,
          limit
        }
      })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid type parameter' },
      { status: 400 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch chatbot data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    if (body.type === 'message') {
      // Validate required fields for message
      if (!body.message || !body.sessionId) {
        return NextResponse.json(
          { success: false, error: 'Message and sessionId are required' },
          { status: 400 }
        )
      }

      try {
        // Initialize ZAI SDK
        const zai = await ZAI.create()

        // Create a conversation context
        const systemPrompt = `You are an AI business assistant for BizifyERP, a comprehensive ERP system. 
        You help users with business analytics, sales forecasts, inventory management, customer insights, 
        and general business questions. Be helpful, concise, and provide actionable insights.`

        // Get completion from ZAI
        const completion = await zai.chat.completions.create({
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: body.message }
          ],
          temperature: 0.7,
          max_tokens: 500
        })

        const response = completion.choices[0]?.message?.content || 'I apologize, but I\'m unable to process your request at the moment.'

        return NextResponse.json({
          success: true,
          data: {
            response: response,
            sessionId: body.sessionId,
            timestamp: new Date().toISOString()
          },
          message: 'Message processed successfully'
        })
      } catch (aiError) {
        console.error('AI processing error:', aiError)
        
        // Fallback response if AI fails
        const fallbackResponses = [
          "I understand your question about business analytics. Let me help you with that.",
          "Based on the available data, I can provide insights on that topic.",
          "That's a great question about business operations. Here's what I can tell you.",
          "I'd be happy to help you with your business inquiry."
        ]
        
        const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
        
        return NextResponse.json({
          success: true,
          data: {
            response: randomResponse,
            sessionId: body.sessionId,
            timestamp: new Date().toISOString(),
            fallback: true
          },
          message: 'Message processed with fallback response'
        })
      }
    } else if (body.type === 'conversation') {
      // Create new conversation
      const newConversation = {
        id: mockConversations.length + 1,
        userId: body.userId || 'anonymous',
        sessionId: body.sessionId,
        messages: body.messages || [],
        status: body.status || 'active',
        satisfaction: null,
        language: body.language || 'English',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      mockConversations.push(newConversation)

      return NextResponse.json({
        success: true,
        data: newConversation,
        message: 'Conversation created successfully'
      })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid request type' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Chatbot API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    )
  }
}