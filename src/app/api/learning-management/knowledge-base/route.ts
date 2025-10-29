import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/learning-management/knowledge-base - Get all knowledge articles
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const author = searchParams.get('author')
    const search = searchParams.get('search')
    const tags = searchParams.get('tags')?.split(',').filter(Boolean)
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    const offset = (page - 1) * limit

    // Build where clause
    const where: any = {}
    if (category) where.category = category
    if (author) where.author = author
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        { summary: { contains: search, mode: 'insensitive' } }
      ]
    }
    if (tags && tags.length > 0) {
      where.tags = {
        hasSome: tags
      }
    }

    // Build order by
    const orderBy: any = {}
    orderBy[sortBy] = sortOrder

    // Get knowledge articles with pagination
    const [articles, total] = await Promise.all([
      db.knowledgeArticle.findMany({
        where,
        include: {
          author: true,
          category: true,
          tags: true,
          versions: {
            orderBy: { version: 'desc' },
            take: 1
          },
          feedback: {
            select: {
              rating: true,
              comment: true
            }
          }
        },
        skip: offset,
        take: limit,
        orderBy
      }),
      db.knowledgeArticle.count({ where })
    ])

    // Calculate statistics for each article
    const articlesWithStats = articles.map(article => {
      const totalViews = article.views || 0
      const totalFeedback = article.feedback.length
      const averageRating = totalFeedback > 0 
        ? article.feedback.reduce((sum, f) => sum + f.rating, 0) / totalFeedback 
        : 0

      return {
        ...article,
        statistics: {
          totalViews,
          totalFeedback,
          averageRating: Math.round(averageRating * 10) / 10,
          totalVersions: article.versions.length
        }
      }
    })

    // Get overall statistics
    const stats = await Promise.all([
      db.knowledgeArticle.groupBy({
        by: ['categoryId'],
        _count: { id: true }
      }),
      db.knowledgeArticle.aggregate({
        _sum: { views: true },
        _avg: { views: true },
        _count: { id: true }
      }),
      db.knowledgeArticle.findMany({
        select: { tags: true },
        distinct: ['tags']
      })
    ])

    // Get popular articles
    const popularArticles = await db.knowledgeArticle.findMany({
      orderBy: { views: 'desc' },
      take: 5,
      include: {
        author: true,
        category: true
      }
    })

    // Get recently updated articles
    const recentArticles = await db.knowledgeArticle.findMany({
      orderBy: { updatedAt: 'desc' },
      take: 5,
      include: {
        author: true,
        category: true
      }
    })

    return NextResponse.json({
      success: true,
      data: articlesWithStats,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      stats: {
        byCategory: stats[0].reduce((acc, stat) => {
          acc[stat.categoryId] = stat._count.id
          return acc
        }, {} as Record<string, number>),
        totalViews: stats[1]._sum.views || 0,
        averageViews: Math.round((stats[1]._avg.views || 0)),
        totalArticles: stats[1]._count.id,
        allTags: [...new Set(stats[2].flatMap(article => article.tags).filter(Boolean))]
      },
      popularArticles,
      recentArticles
    })
  } catch (error) {
    console.error('Error fetching knowledge articles:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch knowledge articles' },
      { status: 500 }
    )
  }
}

// POST /api/learning-management/knowledge-base - Create new knowledge article
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      content,
      summary,
      categoryId,
      tags,
      status,
      featured,
      allowComments,
      relatedArticles
    } = body

    // Validate required fields
    if (!title || !content || !categoryId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create knowledge article
    const article = await db.knowledgeArticle.create({
      data: {
        title,
        content,
        summary,
        categoryId,
        tags: tags || [],
        status: status || 'published',
        featured: featured || false,
        allowComments: allowComments || false,
        authorId: body.authorId, // This should come from authentication
        versions: {
          create: {
            content,
            version: 1,
            changelog: 'Initial version',
            authorId: body.authorId
          }
        },
        relatedArticles: {
          create: relatedArticles?.map((articleId: string) => ({
            relatedArticleId: articleId
          })) || []
        }
      },
      include: {
        author: true,
        category: true,
        tags: true,
        versions: true,
        relatedArticles: {
          include: {
            relatedArticle: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: article,
      message: 'Knowledge article created successfully'
    })
  } catch (error) {
    console.error('Error creating knowledge article:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create knowledge article' },
      { status: 500 }
    )
  }
}