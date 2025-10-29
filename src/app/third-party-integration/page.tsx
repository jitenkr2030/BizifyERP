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
  Network, 
  Settings, 
  Plus, 
  Search, 
  Filter,
  Link,
  Unlink,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Database,
  CreditCard,
  Truck,
  Globe,
  Activity
} from "lucide-react"

interface Integration {
  id: string
  name: string
  type: 'bank' | 'carrier' | 'payment_gateway' | 'email' | 'storage' | 'api'
  config: any
  isActive: boolean
  status: 'disconnected' | 'connected' | 'error'
  lastSync?: string
  webhookCount: number
  createdAt: string
}

interface Webhook {
  id: string
  integrationName: string
  url: string
  events: string[]
  isActive: boolean
  lastTriggered?: string
  createdAt: string
}

export default function ThirdPartyIntegrationPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [webhooks, setWebhooks] = useState<Webhook[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [activeTab, setActiveTab] = useState('integrations')

  // Mock data for demonstration
  useEffect(() => {
    const mockIntegrations: Integration[] = [
      {
        id: '1',
        name: 'Stripe Payment Gateway',
        type: 'payment_gateway',
        config: {
          apiKey: 'pk_test_...',
          webhookSecret: 'whsec_...',
          mode: 'test'
        },
        isActive: true,
        status: 'connected',
        lastSync: '2024-01-15T10:30:00Z',
        webhookCount: 3,
        createdAt: '2024-01-10'
      },
      {
        id: '2',
        name: 'FedEx Shipping API',
        type: 'carrier',
        config: {
          apiKey: 'fedex_api_key',
          accountNumber: '123456789',
          meterNumber: '987654321'
        },
        isActive: true,
        status: 'connected',
        lastSync: '2024-01-15T09:15:00Z',
        webhookCount: 1,
        createdAt: '2024-01-12'
      },
      {
        id: '3',
        name: 'QuickBooks Online',
        type: 'bank',
        config: {
          clientId: 'quickbooks_client_id',
          realmId: '1234567890',
          accessToken: 'access_token_...'
        },
        isActive: true,
        status: 'error',
        lastSync: '2024-01-14T16:45:00Z',
        webhookCount: 2,
        createdAt: '2024-01-08'
      },
      {
        id: '4',
        name: 'Amazon S3 Storage',
        type: 'storage',
        config: {
          accessKey: 'AKIA...',
          secretKey: 'secret_key...',
          bucket: 'erp-backups',
          region: 'us-east-1'
        },
        isActive: false,
        status: 'disconnected',
        webhookCount: 0,
        createdAt: '2024-01-05'
      },
      {
        id: '5',
        name: 'SendGrid Email',
        type: 'email',
        config: {
          apiKey: 'SG.api_key...',
          fromEmail: 'noreply@company.com',
          fromName: 'ERP System'
        },
        isActive: true,
        status: 'connected',
        lastSync: '2024-01-15T11:20:00Z',
        webhookCount: 1,
        createdAt: '2024-01-03'
      }
    ]

    const mockWebhooks: Webhook[] = [
      {
        id: '1',
        integrationName: 'Stripe Payment Gateway',
        url: 'https://api.company.com/webhooks/stripe',
        events: ['payment_intent.succeeded', 'payment_intent.failed', 'charge.succeeded'],
        isActive: true,
        lastTriggered: '2024-01-15T10:30:00Z',
        createdAt: '2024-01-10'
      },
      {
        id: '2',
        integrationName: 'FedEx Shipping API',
        url: 'https://api.company.com/webhooks/fedex',
        events: ['shipment.created', 'shipment.delivered', 'shipment.exception'],
        isActive: true,
        lastTriggered: '2024-01-15T09:15:00Z',
        createdAt: '2024-01-12'
      },
      {
        id: '3',
        integrationName: 'QuickBooks Online',
        url: 'https://api.company.com/webhooks/quickbooks',
        events: ['invoice.created', 'payment.received', 'customer.updated'],
        isActive: true,
        lastTriggered: '2024-01-14T16:45:00Z',
        createdAt: '2024-01-08'
      },
      {
        id: '4',
        integrationName: 'SendGrid Email',
        url: 'https://api.company.com/webhooks/sendgrid',
        events: ['email.delivered', 'email.opened', 'email.clicked'],
        isActive: true,
        lastTriggered: '2024-01-15T11:20:00Z',
        createdAt: '2024-01-03'
      }
    ]

    setIntegrations(mockIntegrations)
    setWebhooks(mockWebhooks)
    setLoading(false)
  }, [])

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      disconnected: { label: 'Disconnected', variant: 'secondary' as const, icon: Unlink },
      connected: { label: 'Connected', variant: 'default' as const, icon: CheckCircle },
      error: { label: 'Error', variant: 'destructive' as const, icon: AlertTriangle }
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.disconnected
    const Icon = config.icon
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    )
  }

  const getTypeIcon = (type: string) => {
    const typeConfig = {
      bank: Database,
      carrier: Truck,
      payment_gateway: CreditCard,
      email: Globe,
      storage: Database,
      api: Zap
    }
    const Icon = typeConfig[type as keyof typeof typeConfig] || typeConfig.api
    return <Icon className="w-4 h-4" />
  }

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      bank: { label: 'Bank', variant: 'outline' as const },
      carrier: { label: 'Carrier', variant: 'outline' as const },
      payment_gateway: { label: 'Payment', variant: 'outline' as const },
      email: { label: 'Email', variant: 'outline' as const },
      storage: { label: 'Storage', variant: 'outline' as const },
      api: { label: 'API', variant: 'outline' as const }
    }
    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.api
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const filteredIntegrations = integrations.filter(integration => 
    integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    integration.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredWebhooks = webhooks.filter(webhook => 
    webhook.integrationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    webhook.url.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    totalIntegrations: integrations.length,
    connectedIntegrations: integrations.filter(i => i.status === 'connected').length,
    errorIntegrations: integrations.filter(i => i.status === 'error').length,
    totalWebhooks: webhooks.length,
    activeWebhooks: webhooks.filter(w => w.isActive).length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gray-100 text-gray-700 rounded-lg">
              <Network className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Third Party Integration</h1>
              <p className="text-slate-600">Bank, carrier, and website automation</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Integrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stats.totalIntegrations}</div>
              <p className="text-xs text-slate-600">All integrations</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Connected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.connectedIntegrations}</div>
              <p className="text-xs text-slate-600">Active connections</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Errors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.errorIntegrations}</div>
              <p className="text-xs text-slate-600">Need attention</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Webhooks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.totalWebhooks}</div>
              <p className="text-xs text-slate-600">Total webhooks</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Active Webhooks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.activeWebhooks}</div>
              <p className="text-xs text-slate-600">Currently active</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="integrations" className="flex items-center gap-2">
              <Network className="w-4 h-4" />
              Integrations
            </TabsTrigger>
            <TabsTrigger value="webhooks" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Webhooks
            </TabsTrigger>
          </TabsList>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Integrations</CardTitle>
                    <CardDescription>Manage third-party service connections</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        New Integration
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Integration</DialogTitle>
                        <DialogDescription>Connect to a third-party service</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="integration-name">Integration Name</Label>
                            <Input id="integration-name" placeholder="Enter integration name" />
                          </div>
                          <div>
                            <Label htmlFor="integration-type">Type</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="bank">Bank</SelectItem>
                                <SelectItem value="carrier">Carrier</SelectItem>
                                <SelectItem value="payment_gateway">Payment Gateway</SelectItem>
                                <SelectItem value="email">Email Service</SelectItem>
                                <SelectItem value="storage">Storage</SelectItem>
                                <SelectItem value="api">API</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="config">Configuration (JSON)</Label>
                          <Textarea 
                            id="config" 
                            placeholder={`{\n  "apiKey": "your_api_key",\n  "secret": "your_secret"\n}`}
                            rows={6}
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Cancel</Button>
                          <Button>Add Integration</Button>
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
                      placeholder="Search integrations..."
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
                      <SelectItem value="bank">Bank</SelectItem>
                      <SelectItem value="carrier">Carrier</SelectItem>
                      <SelectItem value="payment_gateway">Payment</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="storage">Storage</SelectItem>
                      <SelectItem value="api">API</SelectItem>
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
                        <TableHead>Integration</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Sync</TableHead>
                        <TableHead>Webhooks</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredIntegrations.map((integration) => (
                        <TableRow key={integration.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-slate-100 rounded">
                                {getTypeIcon(integration.type)}
                              </div>
                              <div>
                                <div className="font-medium">{integration.name}</div>
                                <div className="text-sm text-slate-500">
                                  {integration.isActive ? 'Active' : 'Inactive'}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{getTypeBadge(integration.type)}</TableCell>
                          <TableCell>{getStatusBadge(integration.status)}</TableCell>
                          <TableCell>
                            {integration.lastSync ? (
                              <div className="flex items-center gap-2 text-sm">
                                <Clock className="w-3 h-3 text-slate-400" />
                                <span>{new Date(integration.lastSync).toLocaleDateString()}</span>
                              </div>
                            ) : (
                              <span className="text-slate-400">Never</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span>{integration.webhookCount}</span>
                              {integration.webhookCount > 0 && (
                                <Activity className="w-3 h-3 text-blue-600" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <RefreshCw className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm">
                                {integration.status === 'connected' ? (
                                  <Unlink className="w-4 h-4" />
                                ) : (
                                  <Link className="w-4 h-4" />
                                )}
                              </Button>
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

          {/* Webhooks Tab */}
          <TabsContent value="webhooks" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Webhooks</CardTitle>
                    <CardDescription>Manage webhook endpoints for real-time data sync</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        New Webhook
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Create New Webhook</DialogTitle>
                        <DialogDescription>Set up a webhook endpoint for real-time notifications</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="integration">Integration</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select integration" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="stripe">Stripe Payment Gateway</SelectItem>
                              <SelectItem value="fedex">FedEx Shipping API</SelectItem>
                              <SelectItem value="quickbooks">QuickBooks Online</SelectItem>
                              <SelectItem value="sendgrid">SendGrid Email</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="webhook-url">Webhook URL</Label>
                          <Input id="webhook-url" placeholder="https://your-domain.com/webhooks/endpoint" />
                        </div>
                        <div>
                          <Label htmlFor="events">Events (comma-separated)</Label>
                          <Input 
                            id="events" 
                            placeholder="payment_intent.succeeded, charge.failed, invoice.created" 
                          />
                        </div>
                        <div>
                          <Label htmlFor="secret">Secret (Optional)</Label>
                          <Input id="secret" placeholder="Webhook secret for verification" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="webhook-active" defaultChecked />
                          <Label htmlFor="webhook-active">Active</Label>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Cancel</Button>
                          <Button>Create Webhook</Button>
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
                      placeholder="Search webhooks..."
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
                        <TableHead>Integration</TableHead>
                        <TableHead>URL</TableHead>
                        <TableHead>Events</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Triggered</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredWebhooks.map((webhook) => (
                        <TableRow key={webhook.id}>
                          <TableCell className="font-medium">{webhook.integrationName}</TableCell>
                          <TableCell>
                            <div className="max-w-xs truncate">
                              <span className="text-sm font-mono">{webhook.url}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {webhook.events.slice(0, 2).map((event, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {event}
                                </Badge>
                              ))}
                              {webhook.events.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{webhook.events.length - 2}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={webhook.isActive ? 'default' : 'secondary'}>
                              {webhook.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {webhook.lastTriggered ? (
                              <div className="flex items-center gap-2 text-sm">
                                <Clock className="w-3 h-3 text-slate-400" />
                                <span>{new Date(webhook.lastTriggered).toLocaleDateString()}</span>
                              </div>
                            ) : (
                              <span className="text-slate-400">Never</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">Test</Button>
                              <Button variant="ghost" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm">
                                {webhook.isActive ? 'Disable' : 'Enable'}
                              </Button>
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