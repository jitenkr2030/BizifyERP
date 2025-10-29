'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  FileText, 
  Users, 
  CheckCircle, 
  Shield, 
  RefreshCw, 
  AlertTriangle,
  Clock,
  TrendingUp,
  Eye,
  Edit,
  Download,
  Calendar,
  DollarSign,
  Scale
} from 'lucide-react'

export default function ContractLifecycleManagement() {
  const [activeTab, setActiveTab] = useState('contract-creation')

  // Mock data for contracts
  const contracts = [
    { 
      id: 1, 
      title: 'Software License Agreement', 
      type: 'License', 
      status: 'Active', 
      value: '$50,000', 
      startDate: '2024-01-01', 
      endDate: '2024-12-31', 
      renewalDate: '2024-11-01',
      riskLevel: 'Low',
      compliance: 'Compliant'
    },
    { 
      id: 2, 
      title: 'Service Level Agreement', 
      type: 'SLA', 
      status: 'Pending Approval', 
      value: '$25,000', 
      startDate: '2024-02-01', 
      endDate: '2025-01-31', 
      renewalDate: '2024-12-01',
      riskLevel: 'Medium',
      compliance: 'Under Review'
    },
    { 
      id: 3, 
      title: 'Vendor Contract', 
      type: 'Procurement', 
      status: 'Active', 
      value: '$100,000', 
      startDate: '2023-06-01', 
      endDate: '2024-05-31', 
      renewalDate: '2024-04-01',
      riskLevel: 'High',
      compliance: 'Non-Compliant'
    },
    { 
      id: 4, 
      title: 'Employment Agreement', 
      type: 'HR', 
      status: 'Draft', 
      value: '$75,000', 
      startDate: '2024-03-01', 
      endDate: '2025-02-28', 
      renewalDate: '2025-01-01',
      riskLevel: 'Low',
      compliance: 'Not Reviewed'
    },
  ]

  // Mock data for approval workflows
  const approvalWorkflows = [
    { 
      id: 1, 
      name: 'Standard Contract Approval', 
      contract: 'Software License Agreement', 
      currentStage: 'Legal Review', 
      totalStages: 4, 
      progress: 75, 
      status: 'In Progress',
      assignedTo: 'John Doe'
    },
    { 
      id: 2, 
      name: 'High-Value Contract Approval', 
      contract: 'Vendor Contract', 
      currentStage: 'Executive Approval', 
      totalStages: 5, 
      progress: 80, 
      status: 'In Progress',
      assignedTo: 'Jane Smith'
    },
    { 
      id: 3, 
      name: 'Emergency Approval', 
      contract: 'Service Level Agreement', 
      currentStage: 'Completed', 
      totalStages: 3, 
      progress: 100, 
      status: 'Approved',
      assignedTo: 'Mike Johnson'
    },
  ]

  // Mock data for compliance monitoring
  const complianceItems = [
    { 
      id: 1, 
      contract: 'Software License Agreement', 
      requirement: 'GDPR Compliance', 
      status: 'Compliant', 
      lastChecked: '2024-01-15',
      nextCheck: '2024-04-15'
    },
    { 
      id: 2, 
      contract: 'Vendor Contract', 
      requirement: 'SOX Compliance', 
      status: 'Non-Compliant', 
      lastChecked: '2024-01-10',
      nextCheck: '2024-02-10'
    },
    { 
      id: 3, 
      contract: 'Service Level Agreement', 
      requirement: 'Data Protection', 
      status: 'Under Review', 
      lastChecked: '2024-01-12',
      nextCheck: '2024-04-12'
    },
    { 
      id: 4, 
      contract: 'Employment Agreement', 
      requirement: 'Labor Laws', 
      status: 'Not Reviewed', 
      lastChecked: '2024-01-08',
      nextCheck: '2024-04-08'
    },
  ]

  // Mock data for renewals
  const renewals = [
    { 
      id: 1, 
      contract: 'Software License Agreement', 
      value: '$50,000', 
      renewalDate: '2024-11-01', 
      daysLeft: 45, 
      status: 'On Track',
      autoRenew: true
    },
    { 
      id: 2, 
      contract: 'Vendor Contract', 
      value: '$100,000', 
      renewalDate: '2024-04-01', 
      daysLeft: 15, 
      status: 'Urgent',
      autoRenew: false
    },
    { 
      id: 3, 
      contract: 'Service Level Agreement', 
      value: '$25,000', 
      renewalDate: '2024-12-01', 
      daysLeft: 75, 
      status: 'On Track',
      autoRenew: true
    },
  ]

  // Mock data for risk assessment
  const riskAssessments = [
    { 
      id: 1, 
      contract: 'Software License Agreement', 
      riskLevel: 'Low', 
      score: 25, 
      factors: ['Standard terms', 'Established vendor', 'Clear deliverables'],
      mitigation: 'Standard review process'
    },
    { 
      id: 2, 
      contract: 'Vendor Contract', 
      riskLevel: 'High', 
      score: 85, 
      factors: ['High value', 'Complex terms', 'International jurisdiction'],
      mitigation: 'Enhanced monitoring required'
    },
    { 
      id: 3, 
      contract: 'Service Level Agreement', 
      riskLevel: 'Medium', 
      score: 55, 
      factors: ['Service guarantees', 'Penalty clauses', 'Performance metrics'],
      mitigation: 'Regular performance reviews'
    },
  ]

  // Mock data for contract templates
  const templates = [
    { id: 1, name: 'Software License Agreement', category: 'Technology', usage: 45 },
    { id: 2, name: 'Service Level Agreement', category: 'Services', usage: 32 },
    { id: 3, name: 'Vendor Contract', category: 'Procurement', usage: 28 },
    { id: 4, name: 'Employment Agreement', category: 'HR', usage: 67 },
    { id: 5, name: 'Non-Disclosure Agreement', category: 'Legal', usage: 89 },
  ]

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'approved':
      case 'compliant':
      case 'on track':
        return 'bg-green-100 text-green-800'
      case 'pending approval':
      case 'in progress':
      case 'under review':
        return 'bg-yellow-100 text-yellow-800'
      case 'draft':
      case 'not reviewed':
        return 'bg-gray-100 text-gray-800'
      case 'non-compliant':
      case 'urgent':
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

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low':
        return 'bg-green-100 text-green-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'high':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Contract Lifecycle Management</h1>
          <p className="text-muted-foreground">
            Streamline contract management and reduce legal risks
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Create Contract
          </Button>
        </div>
      </div>

      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contracts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              -5% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">
              +2% from last quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Renewals</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">
              Next 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="contract-creation">Contract Creation</TabsTrigger>
          <TabsTrigger value="approval-workflows">Approval Workflows</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="renewals">Renewals</TabsTrigger>
          <TabsTrigger value="risk-assessment">Risk Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="contract-creation" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Templates Section */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Contract Templates</CardTitle>
                <CardDescription>
                  Quick start with pre-built templates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {templates.map((template) => (
                    <div key={template.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{template.name}</h4>
                        <p className="text-sm text-muted-foreground">{template.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{template.usage} uses</p>
                        <Button variant="outline" size="sm">Use</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contracts List */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Contracts</CardTitle>
                <CardDescription>
                  View and manage your contracts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contract</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contracts.map((contract) => (
                      <TableRow key={contract.id}>
                        <TableCell className="font-medium">{contract.title}</TableCell>
                        <TableCell>{contract.type}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(contract.status)}>
                            {contract.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{contract.value}</TableCell>
                        <TableCell>{contract.endDate}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="approval-workflows" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Approval Workflows</CardTitle>
              <CardDescription>
                Track multi-stage contract approval processes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Workflow</TableHead>
                    <TableHead>Contract</TableHead>
                    <TableHead>Current Stage</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {approvalWorkflows.map((workflow) => (
                    <TableRow key={workflow.id}>
                      <TableCell className="font-medium">{workflow.name}</TableCell>
                      <TableCell>{workflow.contract}</TableCell>
                      <TableCell>{workflow.currentStage}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={workflow.progress} className="w-20" />
                          <span className="text-sm">{workflow.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(workflow.status)}>
                          {workflow.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{workflow.assignedTo}</TableCell>
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

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Monitoring</CardTitle>
              <CardDescription>
                Ensure contracts meet regulatory requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contract</TableHead>
                    <TableHead>Requirement</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Checked</TableHead>
                    <TableHead>Next Check</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {complianceItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.contract}</TableCell>
                      <TableCell>{item.requirement}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.lastChecked}</TableCell>
                      <TableCell>{item.nextCheck}</TableCell>
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

        <TabsContent value="renewals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Renewal Management</CardTitle>
              <CardDescription>
                Track contract renewals and expirations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contract</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Renewal Date</TableHead>
                    <TableHead>Days Left</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Auto Renew</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {renewals.map((renewal) => (
                    <TableRow key={renewal.id}>
                      <TableCell className="font-medium">{renewal.contract}</TableCell>
                      <TableCell>{renewal.value}</TableCell>
                      <TableCell>{renewal.renewalDate}</TableCell>
                      <TableCell>
                        <Badge variant={renewal.daysLeft < 30 ? "destructive" : "secondary"}>
                          {renewal.daysLeft} days
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(renewal.status)}>
                          {renewal.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={renewal.autoRenew ? "default" : "outline"}>
                          {renewal.autoRenew ? "Yes" : "No"}
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

        <TabsContent value="risk-assessment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment</CardTitle>
              <CardDescription>
                Evaluate contract-related risks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contract</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Risk Score</TableHead>
                    <TableHead>Key Factors</TableHead>
                    <TableHead>Mitigation</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {riskAssessments.map((assessment) => (
                    <TableRow key={assessment.id}>
                      <TableCell className="font-medium">{assessment.contract}</TableCell>
                      <TableCell>
                        <Badge className={getRiskColor(assessment.riskLevel)}>
                          {assessment.riskLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={assessment.score} className="w-20" />
                          <span className="text-sm">{assessment.score}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          {assessment.factors.slice(0, 2).map((factor, index) => (
                            <div key={index} className="text-sm">• {factor}</div>
                          ))}
                          {assessment.factors.length > 2 && (
                            <div className="text-sm text-muted-foreground">
                              +{assessment.factors.length - 2} more
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{assessment.mitigation}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Assess
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