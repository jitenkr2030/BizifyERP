'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  Brain, 
  TrendingUp, 
  BarChart3, 
  Target, 
  Database, 
  Zap, 
  Settings, 
  FileText,
  RefreshCw,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Search
} from "lucide-react"

// Mock data for the module
const mockModels = [
  {
    id: 1,
    name: "Customer Churn Prediction",
    type: "Classification",
    status: "Active",
    accuracy: 0.94,
    lastTrained: "2024-01-15",
    description: "Predicts customer churn likelihood based on behavior patterns"
  },
  {
    id: 2,
    name: "Sales Forecasting",
    type: "Regression",
    status: "Training",
    accuracy: 0.87,
    lastTrained: "2024-01-10",
    description: "Forecasts future sales based on historical data and trends"
  },
  {
    id: 3,
    name: "Anomaly Detection",
    type: "Unsupervised",
    status: "Active",
    accuracy: 0.91,
    lastTrained: "2024-01-12",
    description: "Identifies unusual patterns in financial transactions"
  }
]

const mockAnalyses = [
  {
    id: 1,
    title: "Customer Segmentation Analysis",
    type: "Clustering",
    status: "Completed",
    createdAt: "2024-01-14",
    insights: "Identified 5 distinct customer segments with varying behaviors"
  },
  {
    id: 2,
    title: "Market Basket Analysis",
    type: "Association",
    status: "Processing",
    createdAt: "2024-01-13",
    insights: "Analyzing product purchase patterns and correlations"
  },
  {
    id: 3,
    title: "Time Series Analysis",
    type: "Forecasting",
    status: "Completed",
    createdAt: "2024-01-12",
    insights: "Seasonal patterns identified with 95% confidence"
  }
]

const mockReports = [
  {
    id: 1,
    name: "Q4 2023 Analytics Report",
    type: "Executive Summary",
    generatedAt: "2024-01-15",
    size: "2.4 MB",
    format: "PDF"
  },
  {
    id: 2,
    name: "Customer Behavior Analysis",
    type: "Detailed Analysis",
    generatedAt: "2024-01-14",
    size: "5.1 MB",
    format: "PDF"
  },
  {
    id: 3,
    name: "Predictive Model Performance",
    type: "Technical Report",
    generatedAt: "2024-01-13",
    size: "1.8 MB",
    format: "PDF"
  }
]

export default function AdvancedAnalyticsDataScience() {
  const [activeTab, setActiveTab] = useState("models")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isCreateModelOpen, setIsCreateModelOpen] = useState(false)
  const [isCreateAnalysisOpen, setIsCreateAnalysisOpen] = useState(false)

  const filteredModels = mockModels.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         model.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || model.type === selectedType
    const matchesStatus = selectedStatus === "all" || model.status === selectedStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const filteredAnalyses = mockAnalyses.filter(analysis => {
    const matchesSearch = analysis.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         analysis.insights.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || analysis.type === selectedType
    const matchesStatus = selectedStatus === "all" || analysis.status === selectedStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
      case "completed":
        return "bg-green-100 text-green-700"
      case "training":
      case "processing":
        return "bg-yellow-100 text-yellow-700"
      case "inactive":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "classification":
      case "clustering":
        return "bg-blue-100 text-blue-700"
      case "regression":
      case "forecasting":
        return "bg-purple-100 text-purple-700"
      case "unsupervised":
        return "bg-orange-100 text-orange-700"
      case "association":
        return "bg-pink-100 text-pink-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-indigo-100 text-indigo-700">
              <Brain className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Advanced Analytics & Data Science</h1>
              <p className="text-slate-600">Advanced statistical analysis, machine learning, and predictive analytics</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Active Models</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">12</div>
                <p className="text-xs text-slate-600">Machine learning models</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Analyses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">28</div>
                <p className="text-xs text-slate-600">Data analysis projects</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Avg. Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">92.4%</div>
                <p className="text-xs text-slate-600">Model performance</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">156</div>
                <p className="text-xs text-slate-600">Generated insights</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="models" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              ML Models
            </TabsTrigger>
            <TabsTrigger value="analyses" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analyses
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Models Tab */}
          <TabsContent value="models" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search models..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Classification">Classification</SelectItem>
                    <SelectItem value="Regression">Regression</SelectItem>
                    <SelectItem value="Unsupervised">Unsupervised</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Training">Training</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Dialog open={isCreateModelOpen} onOpenChange={setIsCreateModelOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Create Model
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New ML Model</DialogTitle>
                    <DialogDescription>
                      Configure a new machine learning model for predictive analytics
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="modelName">Model Name</Label>
                      <Input id="modelName" placeholder="Enter model name" />
                    </div>
                    <div>
                      <Label htmlFor="modelType">Model Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select model type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="classification">Classification</SelectItem>
                          <SelectItem value="regression">Regression</SelectItem>
                          <SelectItem value="clustering">Clustering</SelectItem>
                          <SelectItem value="anomaly">Anomaly Detection</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="dataSource">Data Source</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select data source" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="crm">CRM Data</SelectItem>
                          <SelectItem value="sales">Sales Data</SelectItem>
                          <SelectItem value="financial">Financial Data</SelectItem>
                          <SelectItem value="inventory">Inventory Data</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="Describe the model purpose" />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" onClick={() => setIsCreateModelOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsCreateModelOpen(false)}>
                        Create Model
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModels.map((model) => (
                <Card key={model.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex gap-2">
                        <Badge className={getTypeColor(model.type)}>{model.type}</Badge>
                        <Badge className={getStatusColor(model.status)}>{model.status}</Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{model.name}</CardTitle>
                    <CardDescription>{model.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Accuracy</span>
                        <span className="text-sm font-medium">{(model.accuracy * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Last Trained</span>
                        <span className="text-sm font-medium">{model.lastTrained}</span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1">
                          <RefreshCw className="w-4 h-4 mr-1" />
                          Retrain
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Download className="w-4 h-4 mr-1" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analyses Tab */}
          <TabsContent value="analyses" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search analyses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Clustering">Clustering</SelectItem>
                    <SelectItem value="Association">Association</SelectItem>
                    <SelectItem value="Forecasting">Forecasting</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Dialog open={isCreateAnalysisOpen} onOpenChange={setIsCreateAnalysisOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    New Analysis
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New Analysis</DialogTitle>
                    <DialogDescription>
                      Start a new data analysis project
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="analysisName">Analysis Name</Label>
                      <Input id="analysisName" placeholder="Enter analysis name" />
                    </div>
                    <div>
                      <Label htmlFor="analysisType">Analysis Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select analysis type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="clustering">Clustering Analysis</SelectItem>
                          <SelectItem value="association">Association Analysis</SelectItem>
                          <SelectItem value="forecasting">Time Series Forecasting</SelectItem>
                          <SelectItem value="regression">Regression Analysis</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="dataSources">Data Sources</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select data sources" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="crm">CRM Data</SelectItem>
                          <SelectItem value="sales">Sales Data</SelectItem>
                          <SelectItem value="financial">Financial Data</SelectItem>
                          <SelectItem value="inventory">Inventory Data</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="Describe the analysis objectives" />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" onClick={() => setIsCreateAnalysisOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsCreateAnalysisOpen(false)}>
                        Start Analysis
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAnalyses.map((analysis) => (
                <Card key={analysis.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex gap-2">
                        <Badge className={getTypeColor(analysis.type)}>{analysis.type}</Badge>
                        <Badge className={getStatusColor(analysis.status)}>{analysis.status}</Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{analysis.title}</CardTitle>
                    <CardDescription>Created: {analysis.createdAt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-slate-600">{analysis.insights}</p>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Download className="w-4 h-4 mr-1" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Generate Report
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockReports.map((report) => (
                <Card key={report.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{report.type}</Badge>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{report.name}</CardTitle>
                    <CardDescription>
                      Generated: {report.generatedAt} • {report.size} • {report.format}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Data Sources</CardTitle>
                  <CardDescription>Configure data sources for analytics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">CRM Database</h4>
                        <p className="text-sm text-slate-600">Customer relationship data</p>
                      </div>
                      <Button size="sm" variant="outline">Configure</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Sales Database</h4>
                        <p className="text-sm text-slate-600">Sales transactions and history</p>
                      </div>
                      <Button size="sm" variant="outline">Configure</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Financial Database</h4>
                        <p className="text-sm text-slate-600">Financial records and transactions</p>
                      </div>
                      <Button size="sm" variant="outline">Configure</Button>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Data Source
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Model Settings</CardTitle>
                  <CardDescription>Configure machine learning model parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="defaultAccuracy">Default Accuracy Threshold</Label>
                      <Input id="defaultAccuracy" type="number" defaultValue="85" min="0" max="100" />
                    </div>
                    <div>
                      <Label htmlFor="retrainingFrequency">Auto-retraining Frequency</Label>
                      <Select defaultValue="weekly">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="maxModels">Maximum Concurrent Models</Label>
                      <Input id="maxModels" type="number" defaultValue="10" min="1" max="50" />
                    </div>
                  </div>
                  <Button className="w-full">Save Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}