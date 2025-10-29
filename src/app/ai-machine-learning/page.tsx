'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { 
  BarChart3, 
  Plus, 
  Search, 
  Filter,
  Brain,
  Zap,
  Target,
  TrendingUp,
  TrendingDown,
  Play,
  Pause,
  Settings,
  Eye,
  Download
} from "lucide-react"

// Types for API responses
interface MLModel {
  id: string
  name: string
  type: string
  status: string
  version: string
  metrics?: any
  createdAt: string
  updatedAt: string
  mlPredictions?: any[]
  mlTrainingRuns?: any[]
}

interface AIInsight {
  id: string
  type: string
  title: string
  description: string
  confidence: number
  status: string
  createdAt: string
  data?: any
  recommendations?: any[]
}

interface TrainingJob {
  id: string
  modelId: string
  status: string
  startTime?: string
  endTime?: string
  progress?: number
  config?: any
  metrics?: any
  error?: string
}

export default function AIMachineLearning() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [models, setModels] = useState<MLModel[]>([])
  const [insights, setInsights] = useState<AIInsight[]>([])
  const [trainingJobs, setTrainingJobs] = useState<TrainingJob[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch ML models
      const modelsResponse = await fetch('/api/ai/models')
      if (modelsResponse.ok) {
        const modelsData = await modelsResponse.json()
        setModels(modelsData.models || [])
      }

      // Fetch AI insights
      const insightsResponse = await fetch('/api/ai/insights')
      if (insightsResponse.ok) {
        const insightsData = await insightsResponse.json()
        setInsights(insightsData.insights || [])
      }

      // Mock training jobs (would be from API in real implementation)
      setTrainingJobs([
        { 
          id: "1", 
          modelId: "2", 
          status: "running", 
          progress: 75, 
          startTime: "2024-01-18 10:30:00", 
          estimatedCompletion: "2024-01-18 14:30:00",
          dataset: "Customer Data Q4 2023"
        },
        { 
          id: "2", 
          modelId: "1", 
          status: "completed", 
          progress: 100, 
          startTime: "2024-01-15 09:00:00", 
          estimatedCompletion: "2024-01-15 13:00:00",
          dataset: "Sales Data 2023"
        },
        { 
          id: "3", 
          modelId: "4", 
          status: "queued", 
          progress: 0, 
          startTime: null, 
          estimatedCompletion: "2024-01-19 16:00:00",
          dataset: "Transaction Data 2024"
        },
      ])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredModels = models.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         model.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || model.type.toLowerCase() === selectedType.toLowerCase()
    return matchesSearch && matchesType
  })

  const activeModels = models.filter(model => model.status === "active").length
  const trainingModels = models.filter(model => model.status === "training").length
  const totalPredictions = models.reduce((sum, model) => sum + (model.mlPredictions?.length || 0), 0)
  const avgAccuracy = models.length > 0 
    ? models.reduce((sum, model) => {
        const metrics = model.metrics ? JSON.parse(model.metrics) : {}
        return sum + (metrics.accuracy || 0)
      }, 0) / models.length
    : 0

  const handleTrainModel = async (modelId: string) => {
    try {
      const response = await fetch(`/api/ai/models/${modelId}/train`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          config: {
            epochs: 100,
            batchSize: 32,
            learningRate: 0.001,
          }
        })
      })
      
      if (response.ok) {
        const result = await response.json()
        alert(`Model training started: ${result.message}`)
        fetchData() // Refresh data
      }
    } catch (error) {
      console.error('Error training model:', error)
      alert('Error training model')
    }
  }

  const handleGenerateInsights = async () => {
    try {
      const response = await fetch('/api/ai/insights/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tenantId: 'default-tenant'
        })
      })
      
      if (response.ok) {
        const result = await response.json()
        alert(`Generated ${result.count} new insights`)
        fetchData() // Refresh data
      }
    } catch (error) {
      console.error('Error generating insights:', error)
      alert('Error generating insights')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Brain className="w-6 h-6 text-purple-700" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Artificial Intelligence & Machine Learning</h1>
          </div>
          <p className="text-slate-600">Advanced automation and predictive capabilities with AI-powered insights</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Models</CardTitle>
              <Zap className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeModels}</div>
              <p className="text-xs text-muted-foreground">Currently deployed</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Training Models</CardTitle>
              <Play className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{trainingModels}</div>
              <p className="text-xs text-muted-foreground">In progress</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Predictions</CardTitle>
              <Target className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPredictions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Accuracy</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgAccuracy.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">Across all models</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="models" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="models">ML Models</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="training">Model Training</TabsTrigger>
            <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
          </TabsList>

          {/* ML Models Tab */}
          <TabsContent value="models" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Machine Learning Models</CardTitle>
                    <CardDescription>Manage and monitor your AI/ML model portfolio</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        New Model
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New ML Model</DialogTitle>
                        <DialogDescription>
                          Configure a new machine learning model
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input placeholder="Model Name" />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Model Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="classification">Classification</SelectItem>
                            <SelectItem value="regression">Regression</SelectItem>
                            <SelectItem value="time-series">Time Series</SelectItem>
                            <SelectItem value="clustering">Clustering</SelectItem>
                            <SelectItem value="anomaly-detection">Anomaly Detection</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input placeholder="Dataset" />
                        <Button className="w-full">Create Model</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Search models..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="time-series">Time Series</SelectItem>
                      <SelectItem value="classification">Classification</SelectItem>
                      <SelectItem value="regression">Regression</SelectItem>
                      <SelectItem value="anomaly-detection">Anomaly Detection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Model Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Accuracy</TableHead>
                      <TableHead>Last Trained</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead className="text-right">Predictions</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredModels.map((model) => (
                      <TableRow key={model.id}>
                        <TableCell className="font-medium">{model.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{model.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            model.status === "active" ? "default" :
                            model.status === "training" ? "secondary" : "outline"
                          }>
                            {model.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {model.metrics ? (JSON.parse(model.metrics).accuracy * 100).toFixed(1) + '%' : 'N/A'}
                        </TableCell>
                        <TableCell>{new Date(model.updatedAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{model.version}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {model.mlPredictions?.length || 0}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleTrainModel(model.id)}
                              disabled={model.status === "training"}
                            >
                              <Play className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Settings className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>AI-Generated Insights</CardTitle>
                    <CardDescription>Business intelligence and actionable insights from AI analysis</CardDescription>
                  </div>
                  <Button onClick={handleGenerateInsights}>
                    <Plus className="w-4 h-4 mr-2" />
                    Generate Insights
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {insights.map((insight) => (
                    <Card key={insight.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{insight.title}</CardTitle>
                          <div className="flex gap-2">
                            <Badge variant="outline">{insight.type}</Badge>
                            <Badge variant="default">{Math.round(insight.confidence * 100)}%</Badge>
                          </div>
                        </div>
                        <CardDescription>{insight.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Status:</span>
                            <Badge variant="outline">{insight.status}</Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Generated:</span>
                            <span className="font-medium">{new Date(insight.createdAt).toLocaleDateString()}</span>
                          </div>
                          {insight.recommendations && (
                            <div className="space-y-2">
                              <span className="text-sm font-medium">Recommendations:</span>
                              <div className="flex flex-col gap-1">
                                {insight.recommendations.map((rec, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {rec}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1">
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Model Training Tab */}
          <TabsContent value="training" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Model Training Jobs</CardTitle>
                    <CardDescription>Monitor and manage model training processes</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Start Training
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {trainingJobs.map((job) => (
                    <Card key={job.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{job.modelName}</CardTitle>
                          <Badge variant={
                            job.status === "running" ? "default" :
                            job.status === "completed" ? "secondary" : "outline"
                          }>
                            {job.status}
                          </Badge>
                        </div>
                        <CardDescription>Dataset: {job.dataset}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {job.status === "running" && (
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Progress:</span>
                                <span className="font-medium">{job.progress}%</span>
                              </div>
                              <Progress value={job.progress} className="w-full" />
                            </div>
                          )}
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Started:</span>
                              <div className="font-medium">
                                {job.startedAt || "Not started"}
                              </div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Est. Completion:</span>
                              <div className="font-medium">{job.estimatedCompletion}</div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {job.status === "running" && (
                              <Button size="sm" variant="outline">
                                <Pause className="w-4 h-4 mr-2" />
                                Pause
                              </Button>
                            )}
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-2" />
                              View Logs
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Model Performance
                  </CardTitle>
                  <CardDescription>Accuracy and performance metrics over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Best Performing Model:</span>
                      <span className="font-medium">Fraud Detection (96.3%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Most Improved:</span>
                      <span className="font-medium">Sales Forecasting (+5.2%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Models:</span>
                      <span className="font-medium">{models.length}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4">View Detailed Analytics</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Business Impact
                  </CardTitle>
                  <CardDescription>Measurable business outcomes from AI/ML</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Cost Savings:</span>
                      <span className="font-medium text-green-600">$2.4M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Revenue Increase:</span>
                      <span className="font-medium text-green-600">$1.8M</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Efficiency Gain:</span>
                      <span className="font-medium">35%</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4">Generate Impact Report</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}