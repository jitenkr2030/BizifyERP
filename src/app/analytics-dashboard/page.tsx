'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Users,
  Package,
  FileText,
  Shield,
  Brain,
  Target,
  Activity,
  Zap,
  Eye,
  Download,
  RefreshCw
} from "lucide-react"

interface AnalyticsData {
  overview: {
    totalRevenue: number
    revenueGrowth: number
    totalUsers: number
    userGrowth: number
    totalOrders: number
    orderGrowth: number
    totalTaxLiability: number
    auditEvents: number
  }
  modules: {
    tax: {
      jurisdictions: number
      calculations: number
      compliance: number
    }
    audit: {
      logs: number
      criticalEvents: number
      signatureRequests: number
    }
    ai: {
      models: number
      insights: number
      predictions: number
      avgAccuracy: number
    }
  }
  trends: {
    revenue: Array<{ date: string; value: number }>
    users: Array<{ date: string; value: number }>
    orders: Array<{ date: string; value: number }>
  }
  insights: Array<{
    id: string
    title: string
    description: string
    impact: 'high' | 'medium' | 'low'
    category: string
    confidence: number
  }>
}

export default function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('30d')

  useEffect(() => {
    fetchAnalyticsData()
  }, [selectedPeriod])

  const fetchAnalyticsData = async () => {
    setLoading(true)
    try {
      // Mock analytics data - in real implementation, this would aggregate data from all modules
      const mockData: AnalyticsData = {
        overview: {
          totalRevenue: 2847500,
          revenueGrowth: 12.5,
          totalUsers: 15420,
          userGrowth: 8.3,
          totalOrders: 8934,
          orderGrowth: 15.2,
          totalTaxLiability: 342000,
          auditEvents: 15420
        },
        modules: {
          tax: {
            jurisdictions: 12,
            calculations: 2847,
            compliance: 94.5
          },
          audit: {
            logs: 15420,
            criticalEvents: 23,
            signatureRequests: 156
          },
          ai: {
            models: 8,
            insights: 47,
            predictions: 2847,
            avgAccuracy: 91.2
          }
        },
        trends: {
          revenue: [
            { date: '2024-01-01', value: 2400000 },
            { date: '2024-01-08', value: 2450000 },
            { date: '2024-01-15', value: 2520000 },
            { date: '2024-01-22', value: 2680000 },
            { date: '2024-01-29', value: 2847500 }
          ],
          users: [
            { date: '2024-01-01', value: 14200 },
            { date: '2024-01-08', value: 14500 },
            { date: '2024-01-15', value: 14800 },
            { date: '2024-01-22', value: 15100 },
            { date: '2024-01-29', value: 15420 }
          ],
          orders: [
            { date: '2024-01-01', value: 7200 },
            { date: '2024-01-08', value: 7800 },
            { date: '2024-01-15', value: 8200 },
            { date: '2024-01-22', value: 8600 },
            { date: '2024-01-29', value: 8934 }
          ]
        },
        insights: [
          {
            id: '1',
            title: 'Revenue Growth Acceleration',
            description: 'Q4 revenue shows 23% increase compared to previous year, driven by new market expansion',
            impact: 'high',
            category: 'Financial',
            confidence: 95
          },
          {
            id: '2',
            title: 'Customer Retention Improvement',
            description: 'AI-powered customer segmentation reduced churn rate by 18% in last quarter',
            impact: 'high',
            category: 'CRM',
            confidence: 88
          },
          {
            id: '3',
            title: 'Supply Chain Optimization',
            description: 'Inventory optimization AI reduced holding costs by 15% while maintaining service levels',
            impact: 'medium',
            category: 'Operations',
            confidence: 92
          },
          {
            id: '4',
            title: 'Tax Compliance Enhancement',
            description: 'Automated tax calculations improved compliance rate to 94.5% across all jurisdictions',
            impact: 'medium',
            category: 'Compliance',
            confidence: 97
          }
        ]
      }
      
      setAnalyticsData(mockData)
    } catch (error) {
      console.error('Error fetching analytics data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        </div>
      </div>
    )
  }

  if (!analyticsData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Error loading analytics data</h2>
            <Button onClick={fetchAnalyticsData}>Retry</Button>
          </div>
        </div>
      </div>
    )
  }

  const { overview, modules, trends, insights } = analyticsData

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-700" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900">Advanced Analytics Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <select 
                value={selectedPeriod} 
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-md bg-white"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <Button onClick={fetchAnalyticsData} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
          <p className="text-slate-600">Comprehensive business intelligence and insights across all ERP modules</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(overview.totalRevenue / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-600" />
                +{overview.revenueGrowth}% from last period
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overview.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-600" />
                +{overview.userGrowth}% from last period
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Package className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overview.totalOrders.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-600" />
                +{overview.orderGrowth}% from last period
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <Activity className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99.9%</div>
              <p className="text-xs text-muted-foreground">System uptime</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="modules">Module Performance</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="predictive">Predictive Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Trend */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Revenue Trend
                  </CardTitle>
                  <CardDescription>Revenue growth over the selected period</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Current Period:</span>
                      <span className="font-medium">${(overview.totalRevenue / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Growth Rate:</span>
                      <span className="font-medium text-green-600">+{overview.revenueGrowth}%</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Progress to target:</span>
                        <span>87%</span>
                      </div>
                      <Progress value={87} className="w-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* User Growth */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    User Growth
                  </CardTitle>
                  <CardDescription>User acquisition and retention metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Total Users:</span>
                      <span className="font-medium">{overview.totalUsers.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Growth Rate:</span>
                      <span className="font-medium text-green-600">+{overview.userGrowth}%</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Retention Rate:</span>
                        <span>94%</span>
                      </div>
                      <Progress value={94} className="w-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Volume */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Order Volume
                  </CardTitle>
                  <CardDescription>Order processing and fulfillment metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Total Orders:</span>
                      <span className="font-medium">{overview.totalOrders.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Growth Rate:</span>
                      <span className="font-medium text-green-600">+{overview.orderGrowth}%</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Fulfillment Rate:</span>
                        <span>96%</span>
                      </div>
                      <Progress value={96} className="w-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Compliance Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Compliance Overview
                  </CardTitle>
                  <CardDescription>Tax and audit compliance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Tax Liability:</span>
                      <span className="font-medium">${(overview.totalTaxLiability / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Audit Events:</span>
                      <span className="font-medium">{overview.auditEvents.toLocaleString()}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Compliance Score:</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} className="w-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Module Performance Tab */}
          <TabsContent value="modules" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Tax Module Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-red-600" />
                    Tax & Compliance
                  </CardTitle>
                  <CardDescription>Tax management performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Jurisdictions:</span>
                      <span className="font-medium">{modules.tax.jurisdictions}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Calculations:</span>
                      <span className="font-medium">{modules.tax.calculations.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Compliance:</span>
                      <span className="font-medium text-green-600">{modules.tax.compliance}%</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Automation Rate:</span>
                        <span>89%</span>
                      </div>
                      <Progress value={89} className="w-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Audit Module Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-indigo-600" />
                    Audit & eSignature
                  </CardTitle>
                  <CardDescription>Audit and signature performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Audit Logs:</span>
                      <span className="font-medium">{modules.audit.logs.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Critical Events:</span>
                      <span className="font-medium text-red-600">{modules.audit.criticalEvents}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Signature Requests:</span>
                      <span className="font-medium">{modules.audit.signatureRequests}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Security Score:</span>
                        <span>96%</span>
                      </div>
                      <Progress value={96} className="w-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Module Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    AI & Machine Learning
                  </CardTitle>
                  <CardDescription>AI model performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Active Models:</span>
                      <span className="font-medium">{modules.ai.models}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Insights Generated:</span>
                      <span className="font-medium">{modules.ai.insights}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Predictions:</span>
                      <span className="font-medium">{modules.ai.predictions.toLocaleString()}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Avg Accuracy:</span>
                        <span>{modules.ai.avgAccuracy}%</span>
                      </div>
                      <Progress value={modules.ai.avgAccuracy} className="w-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {insights.map((insight) => (
                <Card key={insight.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{insight.title}</CardTitle>
                      <div className="flex gap-2">
                        <Badge variant={
                          insight.impact === "high" ? "destructive" :
                          insight.impact === "medium" ? "secondary" : "outline"
                        }>
                          {insight.impact}
                        </Badge>
                        <Badge variant="outline">{insight.category}</Badge>
                      </div>
                    </div>
                    <CardDescription>{insight.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Confidence:</span>
                        <span className="font-medium">{insight.confidence}%</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Target className="w-4 h-4 mr-2" />
                          Take Action
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Predictive Analytics Tab */}
          <TabsContent value="predictive" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Forecast */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Revenue Forecast
                  </CardTitle>
                  <CardDescription>AI-powered revenue prediction for next quarter</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Predicted Revenue:</span>
                      <span className="font-medium text-green-600">$3.2M</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Confidence Level:</span>
                      <span className="font-medium">94%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Growth Projection:</span>
                      <span className="font-medium text-green-600">+18.5%</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Forecast Accuracy:</span>
                        <span>Historical: 92%</span>
                      </div>
                      <Progress value={94} className="w-full" />
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground mb-2">Key Drivers:</p>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">Market Expansion</Badge>
                        <Badge variant="outline" className="text-xs">Seasonal Trends</Badge>
                        <Badge variant="outline" className="text-xs">Customer Retention</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Churn Prediction */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-orange-600" />
                    Customer Churn Risk
                  </CardTitle>
                  <CardDescription>ML-based customer retention analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>High-Risk Customers:</span>
                      <span className="font-medium text-orange-600">342</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Predicted Churn Rate:</span>
                      <span className="font-medium text-orange-600">8.2%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Potential Revenue Loss:</span>
                      <span className="font-medium text-red-600">$485K</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Risk Assessment:</span>
                        <span>Medium</span>
                      </div>
                      <Progress value={65} className="w-full" />
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground mb-2">Top Risk Factors:</p>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">Price Sensitivity</Badge>
                        <Badge variant="outline" className="text-xs">Support Issues</Badge>
                        <Badge variant="outline" className="text-xs">Competitor Activity</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Inventory Optimization */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-600" />
                    Inventory Optimization
                  </CardTitle>
                  <CardDescription>AI-driven inventory level predictions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Optimal Stock Level:</span>
                      <span className="font-medium text-blue-600">15,420 units</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Predicted Demand:</span>
                      <span className="font-medium">12,850 units</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Cost Savings:</span>
                      <span className="font-medium text-green-600">$125K</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Optimization Score:</span>
                        <span>87%</span>
                      </div>
                      <Progress value={87} className="w-full" />
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground mb-2">Recommendations:</p>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">Reduce Safety Stock</Badge>
                        <Badge variant="outline" className="text-xs">Dynamic Reordering</Badge>
                        <Badge variant="outline" className="text-xs">Supplier Diversification</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Market Trend Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    Market Trend Analysis
                  </CardTitle>
                  <CardDescription>AI-powered market intelligence and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Market Growth Rate:</span>
                      <span className="font-medium text-purple-600">+12.3%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Emerging Opportunities:</span>
                      <span className="font-medium">7</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Competitive Position:</span>
                      <span className="font-medium text-green-600">Strong</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Market Share:</span>
                        <span>23.4%</span>
                      </div>
                      <Progress value={77} className="w-full" />
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground mb-2">Key Trends:</p>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">Digital Transformation</Badge>
                        <Badge variant="outline" className="text-xs">Sustainability</Badge>
                        <Badge variant="outline" className="text-xs">AI Adoption</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Real-time Monitoring */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-red-600" />
                  Real-time Anomaly Detection
                </CardTitle>
                <CardDescription>Live monitoring of business metrics with AI-powered alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Revenue Anomalies</span>
                      <Badge variant="outline" className="text-green-600">Normal</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Last 24 hours: No significant deviations detected
                    </div>
                    <div className="text-xs text-green-600">
                      Confidence: 98.2%
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">User Activity</span>
                      <Badge variant="outline" className="text-yellow-600">Warning</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Unusual login patterns detected in EU region
                    </div>
                    <div className="text-xs text-yellow-600">
                      Confidence: 76.5%
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">System Performance</span>
                      <Badge variant="outline" className="text-green-600">Optimal</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      All systems operating within normal parameters
                    </div>
                    <div className="text-xs text-green-600">
                      Uptime: 99.98%
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Last updated: Just now
                    </div>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh Monitoring
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Financial Report
                  </CardTitle>
                  <CardDescription>Comprehensive financial analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Detailed financial performance report including revenue, expenses, and profitability analysis.
                    </p>
                    <Button className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Compliance Report
                  </CardTitle>
                  <CardDescription>Tax and audit compliance status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Comprehensive compliance report covering all regulatory requirements and audit findings.
                    </p>
                    <Button className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    AI Performance Report
                  </CardTitle>
                  <CardDescription>AI model performance and insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Detailed analysis of AI model performance, accuracy metrics, and business impact.
                    </p>
                    <Button className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    User Analytics Report
                  </CardTitle>
                  <CardDescription>User behavior and engagement metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Comprehensive user analytics including engagement, retention, and satisfaction metrics.
                    </p>
                    <Button className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Operations Report
                  </CardTitle>
                  <CardDescription>Operational efficiency and performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Operational performance metrics including efficiency, productivity, and optimization insights.
                    </p>
                    <Button className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    System Performance Report
                  </CardTitle>
                  <CardDescription>System health and performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      System performance report including uptime, response times, and resource utilization.
                    </p>
                    <Button className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}