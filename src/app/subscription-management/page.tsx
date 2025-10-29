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
import { 
  RefreshCw, 
  FileText, 
  Plus, 
  Search, 
  Filter,
  Calendar,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  PauseCircle,
  TrendingUp,
  CreditCard
} from "lucide-react"

interface Subscription {
  id: string
  name: string
  description?: string
  customerName: string
  customerEmail?: string
  startDate: string
  endDate?: string
  frequency: 'monthly' | 'quarterly' | 'yearly'
  amount: number
  status: 'active' | 'paused' | 'cancelled' | 'expired'
  lastInvoiceDate?: string
  nextInvoiceDate?: string
  invoiceCount: number
  totalRevenue: number
  createdAt: string
}

interface SubscriptionInvoice {
  id: string
  subscriptionName: string
  customerName: string
  invoiceNumber?: string
  date: string
  dueDate: string
  amount: number
  status: 'draft' | 'sent' | 'paid' | 'overdue'
  createdAt: string
}

export default function SubscriptionManagementPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [subscriptionInvoices, setSubscriptionInvoices] = useState<SubscriptionInvoice[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [activeTab, setActiveTab] = useState('subscriptions')

  // Mock data for demonstration
  useEffect(() => {
    const mockSubscriptions: Subscription[] = [
      {
        id: '1',
        name: 'Premium Support Plan',
        description: '24/7 premium technical support',
        customerName: 'Acme Corporation',
        customerEmail: 'contact@acme.com',
        startDate: '2024-01-01',
        endDate: '2025-01-01',
        frequency: 'monthly',
        amount: 500,
        status: 'active',
        lastInvoiceDate: '2024-01-01',
        nextInvoiceDate: '2024-02-01',
        invoiceCount: 12,
        totalRevenue: 6000,
        createdAt: '2024-01-01'
      },
      {
        id: '2',
        name: 'Cloud Storage Pro',
        description: '1TB cloud storage with advanced features',
        customerName: 'Tech Solutions Inc',
        customerEmail: 'info@techsolutions.com',
        startDate: '2024-01-15',
        frequency: 'yearly',
        amount: 1200,
        status: 'active',
        lastInvoiceDate: '2024-01-15',
        nextInvoiceDate: '2025-01-15',
        invoiceCount: 1,
        totalRevenue: 1200,
        createdAt: '2024-01-15'
      },
      {
        id: '3',
        name: 'Marketing Automation',
        description: 'Advanced marketing automation tools',
        customerName: 'Global Enterprises',
        customerEmail: 'hello@global.com',
        startDate: '2024-02-01',
        frequency: 'quarterly',
        amount: 300,
        status: 'paused',
        lastInvoiceDate: '2024-02-01',
        nextInvoiceDate: '2024-05-01',
        invoiceCount: 1,
        totalRevenue: 300,
        createdAt: '2024-02-01'
      },
      {
        id: '4',
        name: 'Analytics Dashboard',
        description: 'Advanced analytics and reporting',
        customerName: 'Innovation Labs',
        customerEmail: 'contact@innovationlabs.com',
        startDate: '2023-06-01',
        endDate: '2024-06-01',
        frequency: 'monthly',
        amount: 200,
        status: 'expired',
        lastInvoiceDate: '2024-05-01',
        invoiceCount: 12,
        totalRevenue: 2400,
        createdAt: '2023-06-01'
      }
    ]

    const mockSubscriptionInvoices: SubscriptionInvoice[] = [
      {
        id: '1',
        subscriptionName: 'Premium Support Plan',
        customerName: 'Acme Corporation',
        invoiceNumber: 'INV-2024-001',
        date: '2024-01-01',
        dueDate: '2024-01-15',
        amount: 500,
        status: 'paid',
        createdAt: '2024-01-01'
      },
      {
        id: '2',
        subscriptionName: 'Cloud Storage Pro',
        customerName: 'Tech Solutions Inc',
        invoiceNumber: 'INV-2024-002',
        date: '2024-01-15',
        dueDate: '2024-02-15',
        amount: 1200,
        status: 'paid',
        createdAt: '2024-01-15'
      },
      {
        id: '3',
        subscriptionName: 'Marketing Automation',
        customerName: 'Global Enterprises',
        invoiceNumber: 'INV-2024-003',
        date: '2024-02-01',
        dueDate: '2024-02-15',
        amount: 300,
        status: 'sent',
        createdAt: '2024-02-01'
      },
      {
        id: '4',
        subscriptionName: 'Premium Support Plan',
        customerName: 'Acme Corporation',
        invoiceNumber: 'INV-2024-004',
        date: '2024-02-01',
        dueDate: '2024-02-15',
        amount: 500,
        status: 'overdue',
        createdAt: '2024-02-01'
      }
    ]

    setSubscriptions(mockSubscriptions)
    setSubscriptionInvoices(mockSubscriptionInvoices)
    setLoading(false)
  }, [])

  const getStatusBadge = (status: string, type: 'subscription' | 'invoice' = 'subscription') => {
    if (type === 'subscription') {
      const statusConfig = {
        active: { label: 'Active', variant: 'default' as const, icon: CheckCircle },
        paused: { label: 'Paused', variant: 'secondary' as const, icon: PauseCircle },
        cancelled: { label: 'Cancelled', variant: 'destructive' as const, icon: XCircle },
        expired: { label: 'Expired', variant: 'outline' as const, icon: XCircle }
      }
      const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active
      const Icon = config.icon
      return (
        <Badge variant={config.variant} className="flex items-center gap-1">
          <Icon className="w-3 h-3" />
          {config.label}
        </Badge>
      )
    } else {
      const statusConfig = {
        draft: { label: 'Draft', variant: 'secondary' as const, icon: FileText },
        sent: { label: 'Sent', variant: 'default' as const, icon: CreditCard },
        paid: { label: 'Paid', variant: 'outline' as const, icon: CheckCircle },
        overdue: { label: 'Overdue', variant: 'destructive' as const, icon: AlertCircle }
      }
      const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft
      const Icon = config.icon
      return (
        <Badge variant={config.variant} className="flex items-center gap-1">
          <Icon className="w-3 h-3" />
          {config.label}
        </Badge>
      )
    }
  }

  const getFrequencyBadge = (frequency: string) => {
    const frequencyConfig = {
      monthly: { label: 'Monthly', variant: 'default' as const },
      quarterly: { label: 'Quarterly', variant: 'secondary' as const },
      yearly: { label: 'Yearly', variant: 'outline' as const }
    }
    const config = frequencyConfig[frequency as keyof typeof frequencyConfig] || frequencyConfig.monthly
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const filteredSubscriptions = subscriptions.filter(subscription => 
    subscription.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subscription.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredInvoices = subscriptionInvoices.filter(invoice => 
    invoice.subscriptionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.invoiceNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    totalSubscriptions: subscriptions.length,
    activeSubscriptions: subscriptions.filter(s => s.status === 'active').length,
    monthlyRevenue: subscriptions
      .filter(s => s.status === 'active' && s.frequency === 'monthly')
      .reduce((sum, s) => sum + s.amount, 0),
    totalRevenue: subscriptions.reduce((sum, s) => sum + s.totalRevenue, 0),
    overdueInvoices: subscriptionInvoices.filter(i => i.status === 'overdue').length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-lime-100 text-lime-700 rounded-lg">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Subscription Management</h1>
              <p className="text-slate-600">Recurring invoices and contracts</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stats.totalSubscriptions}</div>
              <p className="text-xs text-slate-600">All subscriptions</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Active Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.activeSubscriptions}</div>
              <p className="text-xs text-slate-600">Currently active</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">${stats.monthlyRevenue.toLocaleString()}</div>
              <p className="text-xs text-slate-600">Monthly recurring</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${(stats.totalRevenue / 1000).toFixed(1)}K</div>
              <p className="text-xs text-slate-600">All time revenue</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Overdue Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.overdueInvoices}</div>
              <p className="text-xs text-slate-600">Need attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="subscriptions" className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Subscriptions
            </TabsTrigger>
            <TabsTrigger value="invoices" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Invoices
            </TabsTrigger>
          </TabsList>

          {/* Subscriptions Tab */}
          <TabsContent value="subscriptions" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Subscriptions</CardTitle>
                    <CardDescription>Manage recurring subscriptions and contracts</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        New Subscription
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Create New Subscription</DialogTitle>
                        <DialogDescription>Set up a recurring subscription for a customer</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="subscription-name">Subscription Name</Label>
                            <Input id="subscription-name" placeholder="Enter subscription name" />
                          </div>
                          <div>
                            <Label htmlFor="customer">Customer</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select customer" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="acme">Acme Corporation</SelectItem>
                                <SelectItem value="tech">Tech Solutions Inc</SelectItem>
                                <SelectItem value="global">Global Enterprises</SelectItem>
                                <SelectItem value="innovation">Innovation Labs</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea id="description" placeholder="Subscription description and features" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="frequency">Billing Frequency</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select frequency" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="quarterly">Quarterly</SelectItem>
                                <SelectItem value="yearly">Yearly</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="amount">Amount ($)</Label>
                            <Input id="amount" type="number" placeholder="100" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="start-date">Start Date</Label>
                            <Input id="start-date" type="date" />
                          </div>
                          <div>
                            <Label htmlFor="end-date">End Date (Optional)</Label>
                            <Input id="end-date" type="date" />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Cancel</Button>
                          <Button>Create Subscription</Button>
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
                      placeholder="Search subscriptions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
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
                        <TableHead>Subscription</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Frequency</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Next Invoice</TableHead>
                        <TableHead>Total Revenue</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSubscriptions.map((subscription) => (
                        <TableRow key={subscription.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{subscription.name}</div>
                              <div className="text-sm text-slate-500">{subscription.description}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{subscription.customerName}</div>
                              <div className="text-sm text-slate-500">{subscription.customerEmail}</div>
                            </div>
                          </TableCell>
                          <TableCell>{getFrequencyBadge(subscription.frequency)}</TableCell>
                          <TableCell>
                            <div className="font-medium">${subscription.amount.toLocaleString()}</div>
                            <div className="text-sm text-slate-500">per {subscription.frequency.slice(0, -2)}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-slate-400" />
                              <span className="text-sm">
                                {subscription.nextInvoiceDate || 'Not scheduled'}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-green-600" />
                              <span className="font-medium text-green-600">
                                ${subscription.totalRevenue.toLocaleString()}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(subscription.status, 'subscription')}</TableCell>
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

          {/* Invoices Tab */}
          <TabsContent value="invoices" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Subscription Invoices</CardTitle>
                    <CardDescription>Manage recurring invoices and payments</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Generate Invoices
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Generate Recurring Invoices</DialogTitle>
                        <DialogDescription>Create invoices for all active subscriptions</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="invoice-date">Invoice Date</Label>
                          <Input id="invoice-date" type="date" />
                        </div>
                        <div>
                          <Label htmlFor="due-date">Due Date</Label>
                          <Input id="due-date" type="date" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="send-email" defaultChecked />
                          <Label htmlFor="send-email">Send email notifications</Label>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Cancel</Button>
                          <Button>Generate Invoices</Button>
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
                      placeholder="Search invoices..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="sent">Sent</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
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
                        <TableHead>Invoice #</TableHead>
                        <TableHead>Subscription</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInvoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">
                            {invoice.invoiceNumber || 'Draft'}
                          </TableCell>
                          <TableCell>{invoice.subscriptionName}</TableCell>
                          <TableCell>{invoice.customerName}</TableCell>
                          <TableCell>{invoice.date}</TableCell>
                          <TableCell>{invoice.dueDate}</TableCell>
                          <TableCell>
                            <div className="font-medium">${invoice.amount.toLocaleString()}</div>
                          </TableCell>
                          <TableCell>{getStatusBadge(invoice.status, 'invoice')}</TableCell>
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
        </Tabs>
      </div>
    </div>
  )
}