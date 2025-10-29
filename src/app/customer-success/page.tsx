'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  Heart, 
  Users, 
  RefreshCw, 
  MessageSquare, 
  BookOpen, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  BarChart3
} from 'lucide-react'

export default function CustomerSuccessManagement() {
  const [activeTab, setActiveTab] = useState('health-scoring')

  // Mock data for customer health scoring
  const healthScores = [
    { id: 1, name: 'Acme Corp', score: 92, status: 'Excellent', trend: 'up', lastInteraction: '2 days ago' },
    { id: 2, name: 'Tech Solutions Inc', score: 78, status: 'Good', trend: 'stable', lastInteraction: '1 week ago' },
    { id: 3, name: 'Global Enterprises', score: 45, status: 'At Risk', trend: 'down', lastInteraction: '3 weeks ago' },
    { id: 4, name: 'Startup Co', score: 88, status: 'Excellent', trend: 'up', lastInteraction: '1 day ago' },
    { id: 5, name: 'Mega Corp', score: 62, status: 'Fair', trend: 'down', lastInteraction: '2 weeks ago' },
  ]

  // Mock data for onboarding workflows
  const onboardingWorkflows = [
    { id: 1, name: 'New Customer Onboarding', customers: 45, completion: 78, status: 'Active' },
    { id: 2, name: 'Premium Feature Setup', customers: 12, completion: 92, status: 'Active' },
    { id: 3, name: 'Integration Setup', customers: 8, completion: 65, status: 'Active' },
    { id: 4, name: 'Training Program', customers: 23, completion: 45, status: 'Paused' },
  ]

  // Mock data for renewal management
  const renewals = [
    { id: 1, customer: 'Acme Corp', amount: '$12,000', date: '2024-02-15', probability: 85, status: 'On Track' },
    { id: 2, customer: 'Tech Solutions Inc', amount: '$8,500', date: '2024-03-01', probability: 92, status: 'On Track' },
    { id: 3, customer: 'Global Enterprises', amount: '$25,000', date: '2024-02-28', probability: 45, status: 'At Risk' },
    { id: 4, customer: 'Startup Co', amount: '$5,000', date: '2024-03-15', probability: 78, status: 'On Track' },
  ]

  // Mock data for customer feedback
  const feedback = [
    { id: 1, customer: 'Acme Corp', rating: 4.8, sentiment: 'Positive', feedback: 'Excellent service and support', date: '2024-01-15' },
    { id: 2, customer: 'Tech Solutions Inc', rating: 3.2, sentiment: 'Neutral', feedback: 'Good product but needs more features', date: '2024-01-10' },
    { id: 3, customer: 'Global Enterprises', rating: 2.1, sentiment: 'Negative', feedback: 'Response time could be improved', date: '2024-01-08' },
    { id: 4, customer: 'Startup Co', rating: 4.9, sentiment: 'Positive', feedback: 'Perfect for our needs!', date: '2024-01-12' },
  ]

  // Mock data for success playbooks
  const playbooks = [
    { id: 1, name: 'High-Touch Customer Success', customers: 15, success: 92, status: 'Active' },
    { id: 2, name: 'Tech-First Onboarding', customers: 28, success: 78, status: 'Active' },
    { id: 3, name: 'Renewal Outreach', customers: 12, success: 85, status: 'Active' },
    { id: 4, name: 'Customer Advocacy', customers: 8, success: 67, status: 'Draft' },
  ]

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'excellent':
      case 'positive':
      case 'on track':
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'good':
      case 'neutral':
        return 'bg-yellow-100 text-yellow-800'
      case 'at risk':
      case 'negative':
        return 'bg-red-100 text-red-800'
      case 'fair':
        return 'bg-blue-100 text-blue-800'
      case 'paused':
        return 'bg-gray-100 text-gray-800'
      case 'draft':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'down':
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Customer Success Management</h1>
          <p className="text-muted-foreground">
            Proactively manage customer relationships to reduce churn and increase lifetime value
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Users className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Health Score</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78.5</div>
            <p className="text-xs text-muted-foreground">
              +3.2 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Renewal Rate</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              +5% from last quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.6</div>
            <p className="text-xs text-muted-foreground">
              +0.3 from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="health-scoring">Health Scoring</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
          <TabsTrigger value="renewals">Renewals</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="playbooks">Playbooks</TabsTrigger>
        </TabsList>

        <TabsContent value="health-scoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Health Scores</CardTitle>
              <CardDescription>
                Monitor customer engagement and satisfaction levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Health Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Trend</TableHead>
                    <TableHead>Last Interaction</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {healthScores.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={customer.score} className="w-20" />
                          <span className="text-sm">{customer.score}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(customer.status)}>
                          {customer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {getTrendIcon(customer.trend)}
                      </TableCell>
                      <TableCell>{customer.lastInteraction}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="onboarding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Onboarding Workflows</CardTitle>
              <CardDescription>
                Automated customer onboarding processes and progress tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Workflow</TableHead>
                    <TableHead>Active Customers</TableHead>
                    <TableHead>Completion Rate</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {onboardingWorkflows.map((workflow) => (
                    <TableRow key={workflow.id}>
                      <TableCell className="font-medium">{workflow.name}</TableCell>
                      <TableCell>{workflow.customers}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={workflow.completion} className="w-20" />
                          <span className="text-sm">{workflow.completion}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(workflow.status)}>
                          {workflow.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="renewals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Renewal Management</CardTitle>
              <CardDescription>
                Track subscription renewals and expansion opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Renewal Date</TableHead>
                    <TableHead>Probability</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {renewals.map((renewal) => (
                    <TableRow key={renewal.id}>
                      <TableCell className="font-medium">{renewal.customer}</TableCell>
                      <TableCell>{renewal.amount}</TableCell>
                      <TableCell>{renewal.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={renewal.probability} className="w-20" />
                          <span className="text-sm">{renewal.probability}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(renewal.status)}>
                          {renewal.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Contact
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Feedback</CardTitle>
              <CardDescription>
                Survey management and sentiment analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Sentiment</TableHead>
                    <TableHead>Feedback</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feedback.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.customer}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{item.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(item.sentiment)}>
                          {item.sentiment}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{item.feedback}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="playbooks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Success Playbooks</CardTitle>
              <CardDescription>
                Automated customer success workflows and best practices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Playbook</TableHead>
                    <TableHead>Active Customers</TableHead>
                    <TableHead>Success Rate</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {playbooks.map((playbook) => (
                    <TableRow key={playbook.id}>
                      <TableCell className="font-medium">{playbook.name}</TableCell>
                      <TableCell>{playbook.customers}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={playbook.success} className="w-20" />
                          <span className="text-sm">{playbook.success}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(playbook.status)}>
                          {playbook.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
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