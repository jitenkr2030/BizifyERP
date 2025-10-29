'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Filter,
  Calendar,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  DollarSign,
  ShoppingCart,
  Package,
  FileText,
  Settings,
  RefreshCw,
  Eye,
  Edit,
  Trash2
} from "lucide-react"

interface KPI {
  id: string
  name: string
  value: string
  change: number
  target: string
  status: string
  category: string
}

interface Report {
  id: string
  name: string
  type: string
  category: string
  lastRun: string
  nextRun: string
  status: string
  createdBy: string
}

interface Dashboard {
  id: string
  name: string
  description: string
  widgets: number
  views: number
  lastModified: string
  isPublic: boolean
}

interface DataVisualization {
  id: string
  title: string
  type: string
  data: any[]
  category: string
}

export default function BusinessIntelligence() {
  const [kpis, setKpis] = useState<KPI[]>([])
  const [reports, setReports] = useState<Report[]>([])
  const [dashboards, setDashboards] = useState<Dashboard[]>([])
  const [visualizations, setVisualizations] = useState<DataVisualization[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching data
    const mockKPIs: KPI[] = [
      {
        id: '1',
        name: 'Revenue Growth',
        value: '$2.4M',
        change: 12.5,
        target: '$2.8M',
        status: 'on_track',
        category: 'Financial'
      },
      {
        id: '2',
        name: 'Customer Acquisition',
        value: '1,234',
        change: -3.2,
        target: '1,500',
        status: 'at_risk',
        category: 'Sales'
      },
      {
        id: '3',
        name: 'Inventory Turnover',
        value: '8.2',
        change: 5.1,
        target: '9.0',
        status: 'on_track',
        category: 'Operations'
      },
      {
        id: '4',
        name: 'Customer Satisfaction',
        value: '94%',
        change: 2.3,
        target: '95%',
        status: 'on_track',
        category: 'Service'
      },
      {
        id: '5',
        name: 'Operating Margin',
        value: '18.5%',
        change: -1.8,
        target: '20%',
        status: 'at_risk',
        category: 'Financial'
      },
      {
        id: '6',
        name: 'Employee Productivity',
        value: '87%',
        change: 4.2,
        target: '90%',
        status: 'on_track',
        category: 'HR'
      }
    ]

    const mockReports: Report[] = [
      {
        id: '1',
        name: 'Monthly Financial Summary',
        type: 'Scheduled',
        category: 'Financial',
        lastRun: '2024-01-15',
        nextRun: '2024-02-15',
        status: 'active',
        createdBy: 'John Doe'
      },
      {
        id: '2',
        name: 'Sales Performance Analysis',
        type: 'On-demand',
        category: 'Sales',
        lastRun: '2024-01-14',
        nextRun: '-',
        status: 'completed',
        createdBy: 'Jane Smith'
      },
      {
        id: '3',
        name: 'Inventory Optimization Report',
        type: 'Scheduled',
        category: 'Operations',
        lastRun: '2024-01-13',
        nextRun: '2024-01-20',
        status: 'active',
        createdBy: 'Mike Johnson'
      },
      {
        id: '4',
        name: 'Customer Analytics Dashboard',
        type: 'Real-time',
        category: 'CRM',
        lastRun: '2024-01-15',
        nextRun: '-',
        status: 'active',
        createdBy: 'Sarah Wilson'
      }
    ]

    const mockDashboards: Dashboard[] = [
      {
        id: '1',
        name: 'Executive Overview',
        description: 'High-level business metrics and KPIs',
        widgets: 12,
        views: 1245,
        lastModified: '2024-01-15',
        isPublic: true
      },
      {
        id: '2',
        name: 'Sales Performance',
        description: 'Sales metrics and pipeline analysis',
        widgets: 8,
        views: 892,
        lastModified: '2024-01-14',
        isPublic: false
      },
      {
        id: '3',
        name: 'Operations Dashboard',
        description: 'Supply chain and inventory metrics',
        widgets: 15,
        views: 567,
        lastModified: '2024-01-13',
        isPublic: true
      },
      {
        id: '4',
        name: 'Financial Analytics',
        description: 'Revenue, expenses, and profitability',
        widgets: 10,
        views: 734,
        lastModified: '2024-01-12',
        isPublic: false
      }
    ]

    const mockVisualizations: DataVisualization[] = [
      {
        id: '1',
        title: 'Revenue Trend',
        type: 'Line Chart',
        data: [],
        category: 'Financial'
      },
      {
        id: '2',
        title: 'Sales by Region',
        type: 'Pie Chart',
        data: [],
        category: 'Sales'
      },
      {
        id: '3',
        title: 'Inventory Levels',
        type: 'Bar Chart',
        data: [],
        category: 'Operations'
      },
      {
        id: '4',
        title: 'Customer Segmentation',
        type: 'Scatter Plot',
        data: [],
        category: 'CRM'
      }
    ]

    setKpis(mockKPIs)
    setReports(mockReports)
    setDashboards(mockDashboards)
    setVisualizations(mockVisualizations)
    setLoading(false)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on_track': return 'bg-green-100 text-green-700'
      case 'at_risk': return 'bg-yellow-100 text-yellow-700'
      case 'off_track': return 'bg-red-100 text-red-700'
      case 'active': return 'bg-blue-100 text-blue-700'
      case 'completed': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getChangeIcon = (change: number) => {
    return change >= 0 ? <TrendingUp className="h-4 w-4 text-green-500" /> : <TrendingDown className="h-4 w-4 text-red-500" />
  }

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-slate-900 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading Business Intelligence...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Business Intelligence & Reporting</h1>
              <p className="text-slate-600 mt-2">Advanced analytics, reporting, and data visualization</p>
            </div>
            <div className="flex gap-3">
              <Button className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Create Dashboard
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Generate Report
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Active KPIs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">24</div>
              <p className="text-xs text-slate-600">6 categories</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Scheduled Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">18</div>
              <p className="text-xs text-slate-600">Automated delivery</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Dashboards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">12</div>
              <p className="text-xs text-slate-600">3,438 total views</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <PieChart className="h-4 w-4" />
                Data Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">15</div>
              <p className="text-xs text-slate-600">Real-time sync</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="kpi" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="kpi">KPI Tracking</TabsTrigger>
            <TabsTrigger value="dashboards">Dashboards</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="kpi" className="space-y-6">
            {/* KPI Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kpis.map((kpi) => (
                <Card key={kpi.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold">{kpi.name}</CardTitle>
                      <Badge className={getStatusColor(kpi.status)}>
                        {kpi.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <CardDescription>{kpi.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-slate-900">{kpi.value}</div>
                        <div className="flex items-center gap-1">
                          {getChangeIcon(kpi.change)}
                          <span className={`text-sm font-medium ${getChangeColor(kpi.change)}`}>
                            {kpi.change >= 0 ? '+' : ''}{kpi.change}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Target:</span>
                          <span className="font-medium">{kpi.target}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              kpi.status === 'on_track' ? 'bg-green-500' : 
                              kpi.status === 'at_risk' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min(100, (parseFloat(kpi.value.replace(/[^0-9.-]+/g, '')) / parseFloat(kpi.target.replace(/[^0-9.-]+/g, ''))) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="dashboards" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dashboards.map((dashboard) => (
                <Card key={dashboard.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold">{dashboard.name}</CardTitle>
                      {dashboard.isPublic && (
                        <Badge variant="outline">Public</Badge>
                      )}
                    </div>
                    <CardDescription>{dashboard.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-600">Widgets:</span>
                          <span className="font-medium ml-2">{dashboard.widgets}</span>
                        </div>
                        <div>
                          <span className="text-slate-600">Views:</span>
                          <span className="font-medium ml-2">{dashboard.views.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-slate-600">Last Modified:</span>
                          <span className="font-medium ml-2">{dashboard.lastModified}</span>
                        </div>
                        <div>
                          <span className="text-slate-600">Access:</span>
                          <span className="font-medium ml-2">
                            {dashboard.isPublic ? 'Public' : 'Private'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          Open Dashboard
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Report Library</CardTitle>
                    <CardDescription>Manage scheduled and on-demand reports</CardDescription>
                  </div>
                  <Button>
                    <FileText className="h-4 w-4 mr-2" />
                    New Report
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-slate-100 rounded-lg">
                          <FileText className="h-6 w-6 text-slate-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{report.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-slate-600 mt-1">
                            <span>{report.type}</span>
                            <span>•</span>
                            <span>{report.category}</span>
                            <span>•</span>
                            <span>Created by {report.createdBy}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right text-sm">
                          <div className="text-slate-600">Last run: {report.lastRun}</div>
                          {report.nextRun !== '-' && (
                            <div className="text-slate-600">Next run: {report.nextRun}</div>
                          )}
                        </div>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status.replace('_', ' ')}
                        </Badge>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {visualizations.map((viz) => (
                <Card key={viz.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {viz.type === 'Line Chart' && <TrendingUp className="h-5 w-5" />}
                      {viz.type === 'Pie Chart' && <PieChart className="h-5 w-5" />}
                      {viz.type === 'Bar Chart' && <BarChart3 className="h-5 w-5" />}
                      {viz.title}
                    </CardTitle>
                    <CardDescription>{viz.type} • {viz.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-slate-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 mx-auto mb-2 text-slate-400" />
                        <p className="text-slate-600">Interactive Chart</p>
                        <p className="text-sm text-slate-500">Click to view full analytics</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common analytics tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <BarChart3 className="h-6 w-6 mb-2" />
                    <span>Create Chart</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <FileText className="h-6 w-6 mb-2" />
                    <span>Export Data</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Calendar className="h-6 w-6 mb-2" />
                    <span>Schedule Report</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Users className="h-6 w-6 mb-2" />
                    <span>Share Dashboard</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}