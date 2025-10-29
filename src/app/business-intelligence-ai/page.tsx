'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  MessageSquare, 
  FileText, 
  BarChart3,
  Target,
  Zap,
  Eye,
  Download,
  Play,
  Pause,
  Settings,
  RefreshCw,
  Database,
  Lightbulb
} from 'lucide-react'

export default function BusinessIntelligenceAI() {
  const [activeTab, setActiveTab] = useState('predictive-analytics')

  // Mock data for predictive analytics
  const predictions = [
    { 
      id: 1, 
      type: 'Sales Forecast', 
      model: 'Time Series ARIMA', 
      accuracy: 94.5, 
      period: 'Next 6 Months', 
      status: 'Active',
      lastRun: '2024-01-15',
      nextRun: '2024-01-22',
      prediction: '+12.5% growth'
    },
    { 
      id: 2, 
      type: 'Inventory Demand', 
      model: 'LSTM Neural Network', 
      accuracy: 89.2, 
      period: 'Next 3 Months', 
      status: 'Active',
      lastRun: '2024-01-14',
      nextRun: '2024-01-21',
      prediction: 'Optimal stock levels maintained'
    },
    { 
      id: 3, 
      type: 'Cash Flow', 
      model: 'Prophet Forecasting', 
      accuracy: 91.8, 
      period: 'Next 12 Months', 
      status: 'Training',
      lastRun: '2024-01-13',
      nextRun: '2024-01-20',
      prediction: 'Positive cash flow expected'
    },
  ]

  // Mock data for anomaly detection
  const anomalies = [
    { 
      id: 1, 
      type: 'Financial Transaction', 
      severity: 'High', 
      confidence: 96.3, 
      detected: '2024-01-15 14:30', 
      description: 'Unusual large transaction detected',
      status: 'Under Review',
      action: 'Immediate investigation required'
    },
    { 
      id: 2, 
      type: 'User Behavior', 
      severity: 'Medium', 
      confidence: 78.5, 
      detected: '2024-01-15 10:15', 
      description: 'Abnormal login pattern detected',
      status: 'Investigating',
      action: 'Security team notified'
    },
    { 
      id: 3, 
      type: 'Sales Pattern', 
      severity: 'Low', 
      confidence: 65.2, 
      detected: '2024-01-14 16:45', 
      description: 'Unusual sales spike detected',
      status: 'Resolved',
      action: 'Validated as legitimate promotion'
    },
  ]

  // Mock data for NLP chatbot
  const chatbotStats = {
    totalConversations: 15420,
    avgResponseTime: '1.2s',
    satisfaction: 4.7,
    activeUsers: 342,
    languages: ['English', 'Spanish', 'French', 'German']
  }

  // Mock data for automated reports
  const reports = [
    { 
      id: 1, 
      name: 'Monthly Sales Report', 
      type: 'Scheduled', 
      frequency: 'Monthly', 
      lastGenerated: '2024-01-01', 
      nextGeneration: '2024-02-01', 
      status: 'Active',
      recipients: 12,
      insights: 'Sales growth of 15% compared to last month'
    },
    { 
      id: 2, 
      name: 'Customer Churn Analysis', 
      type: 'AI-Powered', 
      frequency: 'Weekly', 
      lastGenerated: '2024-01-14', 
      nextGeneration: '2024-01-21', 
      status: 'Active',
      recipients: 8,
      insights: 'Churn risk decreased by 8% this week'
    },
    { 
      id: 3, 
      name: 'Inventory Optimization', 
      type: 'On-Demand', 
      frequency: 'As Needed', 
      lastGenerated: '2024-01-13', 
      nextGeneration: 'Manual', 
      status: 'Paused',
      recipients: 5,
      insights: 'Recommendation to reduce stock levels by 15%'
    },
  ]

  // Mock data for ML models
  const mlModels = [
    { 
      id: 1, 
      name: 'Customer Churn Prediction', 
      type: 'Classification', 
      accuracy: 92.3, 
      precision: 89.7, 
      recall: 94.1, 
      status: 'Deployed',
      trainingData: '2.5M records',
      lastTrained: '2024-01-10',
      features: 45
    },
    { 
      id: 2, 
      name: 'Demand Forecasting', 
      type: 'Regression', 
      accuracy: 88.9, 
      precision: 87.2, 
      recall: 90.1, 
      status: 'Training',
      trainingData: '1.8M records',
      lastTrained: '2024-01-12',
      features: 32
    },
    { 
      id: 3, 
      name: 'Fraud Detection', 
      type: 'Anomaly Detection', 
      accuracy: 95.7, 
      precision: 93.4, 
      recall: 97.8, 
      status: 'Deployed',
      trainingData: '5.2M records',
      lastTrained: '2024-01-08',
      features: 78
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'deployed':
      case 'resolved':
        return 'bg-green-100 text-green-800'
      case 'training':
      case 'under review':
      case 'investigating':
        return 'bg-yellow-100 text-yellow-800'
      case 'paused':
        return 'bg-gray-100 text-gray-800'
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-orange-100 text-orange-800'
      case 'low':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-orange-100 text-orange-800'
      case 'low':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Advanced Business Intelligence & AI</h1>
          <p className="text-muted-foreground">
            Transform raw data into actionable business insights using advanced AI/ML capabilities
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Insights
          </Button>
          <Button>
            <Brain className="h-4 w-4 mr-2" />
            Train Model
          </Button>
        </div>
      </div>

      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Models</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +3 new this month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Predictions Accuracy</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92.4%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Anomalies Detected</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">147</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Insights</CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              Generated this week
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="predictive-analytics">Predictive Analytics</TabsTrigger>
          <TabsTrigger value="anomaly-detection">Anomaly Detection</TabsTrigger>
          <TabsTrigger value="nlp">NLP Chatbot</TabsTrigger>
          <TabsTrigger value="automated-reports">Automated Reports</TabsTrigger>
          <TabsTrigger value="ml-models">ML Models</TabsTrigger>
        </TabsList>

        <TabsContent value="predictive-analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Predictive Analytics Models</CardTitle>
              <CardDescription>
                Forecast sales, inventory needs, and cash flow with AI-powered predictions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prediction Type</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Accuracy</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Prediction</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {predictions.map((prediction) => (
                    <TableRow key={prediction.id}>
                      <TableCell className="font-medium">{prediction.type}</TableCell>
                      <TableCell>{prediction.model}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={prediction.accuracy} className="w-16" />
                          <span className="text-sm">{prediction.accuracy}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{prediction.period}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(prediction.status)}>
                          {prediction.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{prediction.prediction}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <RefreshCw className="h-3 w-3" />
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

        <TabsContent value="anomaly-detection" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Anomaly Detection</CardTitle>
              <CardDescription>
                Identify unusual patterns in financial data and business operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead>Detected</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {anomalies.map((anomaly) => (
                    <TableRow key={anomaly.id}>
                      <TableCell className="font-medium">{anomaly.type}</TableCell>
                      <TableCell>
                        <Badge className={getSeverityColor(anomaly.severity)}>
                          {anomaly.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={anomaly.confidence} className="w-16" />
                          <span className="text-sm">{anomaly.confidence}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{anomaly.detected}</TableCell>
                      <TableCell className="max-w-xs truncate">{anomaly.description}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(anomaly.status)}>
                          {anomaly.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Investigate
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nlp" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chatbot Stats */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Chatbot Performance</CardTitle>
                <CardDescription>
                  Natural Language Processing chatbot statistics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Conversations</span>
                    <span className="font-medium">{chatbotStats.totalConversations.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Avg Response Time</span>
                    <span className="font-medium">{chatbotStats.avgResponseTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Satisfaction Score</span>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{chatbotStats.satisfaction}</span>
                      <span className="text-sm text-muted-foreground">/5.0</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Active Users</span>
                    <span className="font-medium">{chatbotStats.activeUsers}</span>
                  </div>
                  <div>
                    <span className="text-sm">Languages Supported</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {chatbotStats.languages.map((lang, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chat Interface Preview */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>AI Assistant Interface</CardTitle>
                <CardDescription>
                  Chat with our AI-powered business assistant
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 h-64 bg-muted/50">
                  <div className="space-y-3">
                    <div className="flex justify-start">
                      <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-xs">
                        <p className="text-sm">Hello! I'm your AI business assistant. How can I help you today?</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-muted rounded-lg p-3 max-w-xs">
                        <p className="text-sm">Show me the sales forecast for next quarter</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-md">
                        <p className="text-sm">Based on current trends and historical data, I predict a 15.2% increase in sales for the next quarter. The main drivers are seasonal demand and new product launches.</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Ask a business question..." 
                      className="flex-1 px-3 py-2 border rounded-md text-sm"
                    />
                    <Button size="sm">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="automated-reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Automated Report Generation</CardTitle>
              <CardDescription>
                AI-powered insights and automated report generation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Last Generated</TableHead>
                    <TableHead>Next Generation</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.name}</TableCell>
                      <TableCell>{report.type}</TableCell>
                      <TableCell>{report.frequency}</TableCell>
                      <TableCell>{report.lastGenerated}</TableCell>
                      <TableCell>{report.nextGeneration}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3" />
                          </Button>
                          {report.status === 'Active' ? (
                            <Button variant="outline" size="sm">
                              <Pause className="h-3 w-3" />
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm">
                              <Play className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ml-models" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Machine Learning Models</CardTitle>
              <CardDescription>
                Customer churn prediction, demand forecasting, and other ML models
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Model Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Accuracy</TableHead>
                    <TableHead>Precision</TableHead>
                    <TableHead>Recall</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mlModels.map((model) => (
                    <TableRow key={model.id}>
                      <TableCell className="font-medium">{model.name}</TableCell>
                      <TableCell>{model.type}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={model.accuracy} className="w-16" />
                          <span className="text-sm">{model.accuracy}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={model.precision} className="w-16" />
                          <span className="text-sm">{model.precision}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={model.recall} className="w-16" />
                          <span className="text-sm">{model.recall}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(model.status)}>
                          {model.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <RefreshCw className="h-3 w-3" />
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
      </Tabs>
    </div>
  )
}