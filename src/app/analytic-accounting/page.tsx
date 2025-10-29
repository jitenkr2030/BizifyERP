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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { 
  BarChart3, 
  PieChart, 
  Plus, 
  Search, 
  Filter,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Building,
  FolderOpen,
  Target,
  Activity,
  Calculator,
  Layers,
  TreePine
} from "lucide-react"

interface AnalyticAccount {
  id: string
  code: string
  name: string
  type: 'cost_center' | 'project' | 'department'
  parentId?: string
  parentName?: string
  isActive: boolean
  transactionCount: number
  totalAmount: number
  budget?: number
  variance?: number
  createdAt: string
}

interface AnalyticLine {
  id: string
  analyticAccountName: string
  analyticAccountCode: string
  transactionReference: string
  transactionDate: string
  accountName: string
  accountCode: string
  amount: number
  percentage: number
  description?: string
  createdAt: string
}

interface AnalyticReport {
  id: string
  name: string
  type: 'expense' | 'revenue' | 'profit_loss' | 'budget_variance'
  period: string
  totalAmount: number
  accountCount: number
  createdAt: string
}

export default function AnalyticAccountingPage() {
  const [analyticAccounts, setAnalyticAccounts] = useState<AnalyticAccount[]>([])
  const [analyticLines, setAnalyticLines] = useState<AnalyticLine[]>([])
  const [analyticReports, setAnalyticReports] = useState<AnalyticReport[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [activeTab, setActiveTab] = useState('accounts')

  // Mock data for demonstration
  useEffect(() => {
    const mockAnalyticAccounts: AnalyticAccount[] = [
      {
        id: '1',
        code: 'CC-001',
        name: 'Research & Development',
        type: 'cost_center',
        isActive: true,
        transactionCount: 45,
        totalAmount: 125000,
        budget: 150000,
        variance: -16.7,
        createdAt: '2024-01-01'
      },
      {
        id: '2',
        code: 'CC-002',
        name: 'Marketing & Sales',
        type: 'cost_center',
        isActive: true,
        transactionCount: 67,
        totalAmount: 89000,
        budget: 80000,
        variance: 11.3,
        createdAt: '2024-01-01'
      },
      {
        id: '3',
        code: 'DEPT-001',
        name: 'Engineering Department',
        type: 'department',
        parentId: '1',
        parentName: 'Research & Development',
        isActive: true,
        transactionCount: 32,
        totalAmount: 78000,
        budget: 90000,
        variance: -13.3,
        createdAt: '2024-01-01'
      },
      {
        id: '4',
        code: 'PROJ-001',
        name: 'Website Redesign Project',
        type: 'project',
        isActive: true,
        transactionCount: 28,
        totalAmount: 45000,
        budget: 50000,
        variance: -10.0,
        createdAt: '2024-01-15'
      },
      {
        id: '5',
        code: 'PROJ-002',
        name: 'Mobile App Development',
        type: 'project',
        isActive: true,
        transactionCount: 35,
        totalAmount: 67000,
        budget: 60000,
        variance: 11.7,
        createdAt: '2024-01-20'
      }
    ]

    const mockAnalyticLines: AnalyticLine[] = [
      {
        id: '1',
        analyticAccountName: 'Research & Development',
        analyticAccountCode: 'CC-001',
        transactionReference: 'TRX-001',
        transactionDate: '2024-01-15',
        accountName: 'Software Licenses',
        accountCode: '6010',
        amount: 2500,
        percentage: 100,
        description: 'Annual software licenses',
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        analyticAccountName: 'Marketing & Sales',
        analyticAccountCode: 'CC-002',
        transactionReference: 'TRX-002',
        transactionDate: '2024-01-16',
        accountName: 'Advertising Expense',
        accountCode: '6020',
        amount: 1500,
        percentage: 100,
        description: 'Digital marketing campaign',
        createdAt: '2024-01-16'
      },
      {
        id: '3',
        analyticAccountName: 'Engineering Department',
        analyticAccountCode: 'DEPT-001',
        transactionReference: 'TRX-003',
        transactionDate: '2024-01-17',
        accountName: 'Salaries Expense',
        accountCode: '6050',
        amount: 8500,
        percentage: 100,
        description: 'Monthly salaries',
        createdAt: '2024-01-17'
      },
      {
        id: '4',
        analyticAccountName: 'Website Redesign Project',
        analyticAccountCode: 'PROJ-001',
        transactionReference: 'TRX-004',
        transactionDate: '2024-01-18',
        accountName: 'Contract Services',
        accountCode: '6030',
        amount: 3200,
        percentage: 100,
        description: 'Design agency services',
        createdAt: '2024-01-18'
      }
    ]

    const mockAnalyticReports: AnalyticReport[] = [
      {
        id: '1',
        name: 'Q1 2024 Expense Analysis',
        type: 'expense',
        period: '2024-Q1',
        totalAmount: 325000,
        accountCount: 15,
        createdAt: '2024-01-31'
      },
      {
        id: '2',
        name: 'Q1 2024 Revenue by Department',
        type: 'revenue',
        period: '2024-Q1',
        totalAmount: 580000,
        accountCount: 8,
        createdAt: '2024-01-31'
      },
      {
        id: '3',
        name: 'Project Profitability Analysis',
        type: 'profit_loss',
        period: '2024-Q1',
        totalAmount: 125000,
        accountCount: 12,
        createdAt: '2024-02-01'
      },
      {
        id: '4',
        name: 'Budget Variance Report',
        type: 'budget_variance',
        period: '2024-Q1',
        totalAmount: -45000,
        accountCount: 20,
        createdAt: '2024-02-01'
      }
    ]

    setAnalyticAccounts(mockAnalyticAccounts)
    setAnalyticLines(mockAnalyticLines)
    setAnalyticReports(mockAnalyticReports)
    setLoading(false)
  }, [])

  const getTypeIcon = (type: string) => {
    const typeConfig = {
      cost_center: Building,
      project: Target,
      department: Users
    }
    const Icon = typeConfig[type as keyof typeof typeConfig] || typeConfig.cost_center
    return <Icon className="w-4 h-4" />
  }

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      cost_center: { label: 'Cost Center', variant: 'default' as const },
      project: { label: 'Project', variant: 'secondary' as const },
      department: { label: 'Department', variant: 'outline' as const }
    }
    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.cost_center
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getVarianceBadge = (variance?: number) => {
    if (!variance) return null
    
    const isPositive = variance >= 0
    const varianceConfig = {
      positive: { label: `+${variance.toFixed(1)}%`, variant: 'default' as const, icon: TrendingUp },
      negative: { label: `${variance.toFixed(1)}%`, variant: 'destructive' as const, icon: TrendingDown }
    }
    const config = isPositive ? varianceConfig.positive : varianceConfig.negative
    const Icon = config.icon
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    )
  }

  const getReportTypeBadge = (type: string) => {
    const typeConfig = {
      expense: { label: 'Expense', variant: 'destructive' as const },
      revenue: { label: 'Revenue', variant: 'default' as const },
      profit_loss: { label: 'P&L', variant: 'outline' as const },
      budget_variance: { label: 'Budget Variance', variant: 'secondary' as const }
    }
    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.expense
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const filteredAccounts = analyticAccounts.filter(account => 
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredLines = analyticLines.filter(line => 
    line.analyticAccountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    line.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    line.transactionReference.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredReports = analyticReports.filter(report => 
    report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    totalAccounts: analyticAccounts.length,
    activeAccounts: analyticAccounts.filter(a => a.isActive).length,
    totalTransactions: analyticAccounts.reduce((sum, a) => sum + a.transactionCount, 0),
    totalAmount: analyticAccounts.reduce((sum, a) => sum + a.totalAmount, 0),
    totalBudget: analyticAccounts.reduce((sum, a) => sum + (a.budget || 0), 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-100 text-purple-700 rounded-lg">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Analytic Accounting</h1>
              <p className="text-slate-600">Cost center and expense breakdown</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stats.totalAccounts}</div>
              <p className="text-xs text-slate-600">Analytic accounts</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Active Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.activeAccounts}</div>
              <p className="text-xs text-slate-600">Currently active</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.totalTransactions}</div>
              <p className="text-xs text-slate-600">Tracked transactions</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">${(stats.totalAmount / 1000).toFixed(1)}K</div>
              <p className="text-xs text-slate-600">Total tracked</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${(stats.totalBudget / 1000).toFixed(1)}K</div>
              <p className="text-xs text-slate-600">Budget allocated</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="accounts" className="flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Accounts
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Transactions
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <PieChart className="w-4 h-4" />
              Reports
            </TabsTrigger>
          </TabsList>

          {/* Accounts Tab */}
          <TabsContent value="accounts" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Analytic Accounts</CardTitle>
                    <CardDescription>Manage cost centers, projects, and departments</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        New Account
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Create New Analytic Account</DialogTitle>
                        <DialogDescription>Set up a new cost center, project, or department</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="account-code">Account Code</Label>
                            <Input id="account-code" placeholder="CC-001" />
                          </div>
                          <div>
                            <Label htmlFor="account-name">Account Name</Label>
                            <Input id="account-name" placeholder="Enter account name" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="account-type">Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cost_center">Cost Center</SelectItem>
                              <SelectItem value="project">Project</SelectItem>
                              <SelectItem value="department">Department</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="parent-account">Parent Account (Optional)</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select parent account" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cc-001">Research & Development</SelectItem>
                              <SelectItem value="cc-002">Marketing & Sales</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="budget">Budget ($)</Label>
                            <Input id="budget" type="number" placeholder="100000" />
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="account-active" defaultChecked />
                            <Label htmlFor="account-active">Active</Label>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Cancel</Button>
                          <Button>Create Account</Button>
                        </div>
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
                      placeholder="Search accounts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="cost_center">Cost Centers</SelectItem>
                      <SelectItem value="project">Projects</SelectItem>
                      <SelectItem value="department">Departments</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Account</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Budget</TableHead>
                        <TableHead>Actual</TableHead>
                        <TableHead>Variance</TableHead>
                        <TableHead>Transactions</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAccounts.map((account) => (
                        <TableRow key={account.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-slate-100 rounded">
                                {getTypeIcon(account.type)}
                              </div>
                              <div>
                                <div className="font-medium">{account.name}</div>
                                <div className="text-sm text-slate-500">{account.code}</div>
                                {account.parentName && (
                                  <div className="text-xs text-slate-400">
                                    Parent: {account.parentName}
                                  </div>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{getTypeBadge(account.type)}</TableCell>
                          <TableCell>
                            <div className="text-right">
                              <div className="font-medium">
                                {account.budget ? `$${account.budget.toLocaleString()}` : '-'}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-right">
                              <div className="font-medium">${account.totalAmount.toLocaleString()}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getVarianceBadge(account.variance)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span>{account.transactionCount}</span>
                              <Activity className="w-3 h-3 text-blue-600" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">View</Button>
                              <Button variant="ghost" size="sm">Edit</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Analytic Transactions</CardTitle>
                    <CardDescription>View transactions allocated to analytic accounts</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Allocate Transaction
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Allocate Transaction to Analytic Account</DialogTitle>
                        <DialogDescription>Distribute transaction amounts across analytic accounts</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="transaction">Transaction</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select transaction" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="trx-001">TRX-001 - Software Licenses</SelectItem>
                              <SelectItem value="trx-002">TRX-002 - Advertising Expense</SelectItem>
                              <SelectItem value="trx-003">TRX-003 - Salaries Expense</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="analytic-account">Analytic Account</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select analytic account" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cc-001">Research & Development</SelectItem>
                              <SelectItem value="cc-002">Marketing & Sales</SelectItem>
                              <SelectItem value="dept-001">Engineering Department</SelectItem>
                              <SelectItem value="proj-001">Website Redesign Project</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="amount">Amount ($)</Label>
                            <Input id="amount" type="number" placeholder="2500" />
                          </div>
                          <div>
                            <Label htmlFor="percentage">Percentage (%)</Label>
                            <Input id="percentage" type="number" placeholder="100" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="allocation-description">Description</Label>
                          <Textarea id="allocation-description" placeholder="Allocation description" />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Cancel</Button>
                          <Button>Allocate Transaction</Button>
                        </div>
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
                      placeholder="Search transactions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Transaction</TableHead>
                        <TableHead>Analytic Account</TableHead>
                        <TableHead>Account</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Percentage</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLines.map((line) => (
                        <TableRow key={line.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{line.transactionReference}</div>
                              <div className="text-sm text-slate-500">{line.transactionDate}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{line.analyticAccountName}</div>
                              <div className="text-sm text-slate-500">{line.analyticAccountCode}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{line.accountName}</div>
                              <div className="text-sm text-slate-500">{line.accountCode}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">${line.amount.toLocaleString()}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span>{line.percentage}%</span>
                              <div className="w-16 bg-slate-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${line.percentage}%` }}
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{line.transactionDate}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">View</Button>
                              <Button variant="ghost" size="sm">Edit</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Analytic Reports</CardTitle>
                    <CardDescription>Generate reports for cost analysis and budgeting</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Generate Report
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Generate Analytic Report</DialogTitle>
                        <DialogDescription>Create a new analytic report</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="report-name">Report Name</Label>
                          <Input id="report-name" placeholder="Enter report name" />
                        </div>
                        <div>
                          <Label htmlFor="report-type">Report Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select report type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="expense">Expense Analysis</SelectItem>
                              <SelectItem value="revenue">Revenue Analysis</SelectItem>
                              <SelectItem value="profit_loss">Profit & Loss</SelectItem>
                              <SelectItem value="budget_variance">Budget Variance</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="report-period">Period</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2024-q1">Q1 2024</SelectItem>
                              <SelectItem value="2024-q2">Q2 2024</SelectItem>
                              <SelectItem value="2024-q3">Q3 2024</SelectItem>
                              <SelectItem value="2024-q4">Q4 2024</SelectItem>
                              <SelectItem value="2024-annual">2024 Annual</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Cancel</Button>
                          <Button>Generate Report</Button>
                        </div>
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
                      placeholder="Search reports..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Report Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Period</TableHead>
                        <TableHead>Total Amount</TableHead>
                        <TableHead>Accounts</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium">{report.name}</TableCell>
                          <TableCell>{getReportTypeBadge(report.type)}</TableCell>
                          <TableCell>{report.period}</TableCell>
                          <TableCell>
                            <div className={`font-medium ${
                              report.totalAmount >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              ${report.totalAmount.toLocaleString()}
                            </div>
                          </TableCell>
                          <TableCell>{report.accountCount}</TableCell>
                          <TableCell>{report.createdAt}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">View</Button>
                              <Button variant="ghost" size="sm">Export</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}