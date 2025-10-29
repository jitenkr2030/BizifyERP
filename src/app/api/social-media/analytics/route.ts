import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get('accountId');
    const postId = searchParams.get('postId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const platform = searchParams.get('platform');

    const where: any = {};
    
    if (accountId) {
      where.accountId = accountId;
    }
    
    if (postId) {
      where.postId = postId;
    }
    
    if (platform) {
      where.platform = platform;
    }
    
    if (startDate && endDate) {
      where.metricDate = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    const metrics = await db.socialMetric.findMany({
      where,
      orderBy: { metricDate: 'desc' },
      include: {
        account: true,
        post: true,
      },
    });

    // Calculate aggregated metrics
    const aggregated = metrics.reduce((acc, metric) => {
      acc.totalImpressions += metric.impressions;
      acc.totalReach += metric.reach;
      acc.totalEngagement += metric.engagement;
      acc.totalLikes += metric.likes;
      acc.totalComments += metric.comments;
      acc.totalShares += metric.shares;
      acc.totalClicks += metric.clicks;
      acc.totalSaves += metric.saves;
      acc.totalVideoViews += metric.videoViews;
      acc.totalVideoWatchTime += metric.videoWatchTime;
      acc.totalSpend += metric.spend;
      acc.totalRevenue += metric.revenue;
      acc.count++;
      return acc;
    }, {
      totalImpressions: 0,
      totalReach: 0,
      totalEngagement: 0,
      totalLikes: 0,
      totalComments: 0,
      totalShares: 0,
      totalClicks: 0,
      totalSaves: 0,
      totalVideoViews: 0,
      totalVideoWatchTime: 0,
      totalSpend: 0,
      totalRevenue: 0,
      count: 0,
    });

    // Calculate averages and rates
    const avgMetrics = {
      avgReachRate: aggregated.totalReach > 0 ? (aggregated.totalReach / aggregated.totalImpressions) * 100 : 0,
      avgEngagementRate: aggregated.totalImpressions > 0 ? (aggregated.totalEngagement / aggregated.totalImpressions) * 100 : 0,
      avgClickThroughRate: aggregated.totalImpressions > 0 ? (aggregated.totalClicks / aggregated.totalImpressions) * 100 : 0,
      avgCostPerClick: aggregated.totalClicks > 0 ? aggregated.totalSpend / aggregated.totalClicks : 0,
      avgCostPerImpression: aggregated.totalImpressions > 0 ? aggregated.totalSpend / aggregated.totalImpressions : 0,
      avgROI: aggregated.totalSpend > 0 ? ((aggregated.totalRevenue - aggregated.totalSpend) / aggregated.totalSpend) * 100 : 0,
      ...aggregated,
    };

    // Group by platform for comparison
    const platformMetrics = metrics.reduce((acc, metric) => {
      if (!acc[metric.platform]) {
        acc[metric.platform] = {
          platform: metric.platform,
          impressions: 0,
          reach: 0,
          engagement: 0,
          likes: 0,
          comments: 0,
          shares: 0,
          clicks: 0,
          spend: 0,
          revenue: 0,
          count: 0,
        };
      }
      acc[metric.platform].impressions += metric.impressions;
      acc[metric.platform].reach += metric.reach;
      acc[metric.platform].engagement += metric.engagement;
      acc[metric.platform].likes += metric.likes;
      acc[metric.platform].comments += metric.comments;
      acc[metric.platform].shares += metric.shares;
      acc[metric.platform].clicks += metric.clicks;
      acc[metric.platform].spend += metric.spend;
      acc[metric.platform].revenue += metric.revenue;
      acc[metric.platform].count++;
      return acc;
    }, {} as any);

    // Calculate platform averages
    Object.keys(platformMetrics).forEach(platform => {
      const data = platformMetrics[platform];
      data.engagementRate = data.impressions > 0 ? (data.engagement / data.impressions) * 100 : 0;
      data.clickThroughRate = data.impressions > 0 ? (data.clicks / data.impressions) * 100 : 0;
      data.costPerClick = data.clicks > 0 ? data.spend / data.clicks : 0;
      data.roi = data.spend > 0 ? ((data.revenue - data.spend) / data.spend) * 100 : 0;
    });

    return NextResponse.json({
      metrics,
      aggregated: avgMetrics,
      platformMetrics: Object.values(platformMetrics),
    });
  } catch (error) {
    console.error('Error fetching social analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch social analytics' },
      { status: 500 }
    );
  }
}