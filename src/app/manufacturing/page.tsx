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
  Package, 
  FileText, 
  Plus, 
  Search, 
  Filter,
  Factory,
  Settings,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle
} from "lucide-react"

interface BillOfMaterial {
  id: string
  code: string
  name: string
  productName: string
  version: number
  isActive: boolean
  itemCount: number
  createdAt: string
}

interface BillOfMaterialItem {
  id: string
  productName: string
  productCode: string
  quantity: number
  unit: string
}

interface WorkOrder {
  id: string
  number: string
  productName: string
  productCode: string
  quantity: number
  startDate?: string
  endDate?: string
  status: 'draft' | 'in_progress' | 'completed' | 'cancelled'
  bomName?: string
  progress: number
  createdAt: string
}

interface WorkOrderItem {
  id: string
  productName: string
  productCode: string
  quantity: number
  unit: string
  completed: number
}

export default function ManufacturingPage() {
  const [billOfMaterials, setBillOfMaterials] = useState<BillOfMaterial[]>([])
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [activeTab, setActiveTab] = useState('bom')

  // Mock data for demonstration
  useEffect(() => {
    const mockBOMs: BillOfMaterial[] = [
      {
        id: '1',
        code: 'BOM-001',
        name: 'Laptop Assembly',
        productName: 'Laptop Pro 15"',
        version: 1,
        isActive: true,
        itemCount: 12,
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        code: 'BOM-002',
        name: 'Smartphone Production',
        productName: 'Smartphone X',
        version: 2,
        isActive: true,
        itemCount: 8,
        createdAt: '2024-01-20'
      },
      {
        id: '3',
        code: 'BOM-003',
        name: 'Tablet Manufacturing',
        productName: 'Tablet Air',
        version: 1,
        isActive: false,
        itemCount: 6,
        createdAt: '2024-02-01'
      }
    ]

    const mockWorkOrders: WorkOrder[] = [
      {
        id: '1',
        number: 'WO-001',
        productName: 'Laptop Pro 15"',
        productCode: 'LP-001',
        quantity: 100,
        startDate: '2024-01-15',
        endDate: '2024-01-25',
        status: 'completed',
        bomName: 'Laptop Assembly',
        progress: 100,
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        number: 'WO-002',
        productName: 'Smartphone X',
        productCode: 'SP-001',
        quantity: 500,
        startDate: '2024-01-20',
        status: 'in_progress',
        bomName: 'Smartphone Production',
        progress: 65,
        createdAt: '2024-01-20'
      },
      {
        id: '3',
        number: 'WO-003',
        productName: 'Tablet Air',
        productCode: 'TB-001',
        quantity: 200,
        status: 'draft',
        bomName: 'Tablet Manufacturing',
        progress: 0,
        createdAt: '2024-02-01'
      }
    ]

    setBillOfMaterials(mockBOMs)
    setWorkOrders(mockWorkOrders)
    setLoading(false)
  }, [])

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { label: 'Draft', variant: 'secondary' as const, icon: FileText },
      in_progress: { label: 'In Progress', variant: 'default' as const, icon: Clock },
      completed: { label: 'Completed', variant: 'outline' as const, icon: CheckCircle },
      cancelled: { label: 'Cancelled', variant: 'destructive' as const, icon: XCircle }
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

  const filteredBOMs = billOfMaterials.filter(bom => 
    bom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bom.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bom.productName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredWorkOrders = workOrders.filter(wo => {
    const matchesSearch = wo.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         wo.productName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || wo.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    totalBOMs: billOfMaterials.length,
    activeBOMs: billOfMaterials.filter(bom => bom.isActive).length,
    totalWorkOrders: workOrders.length,
    activeWorkOrders: workOrders.filter(wo => wo.status === 'in_progress').length,
    completedWorkOrders: workOrders.filter(wo => wo.status === 'completed').length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-red-100 text-red-700 rounded-lg">
              <Factory className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Manufacturing</h1>
              <p className="text-slate-600">Transform raw materials into finished products</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total BOMs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stats.totalBOMs}</div>
              <p className="text-xs text-slate-600">Bill of Materials</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Active BOMs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.activeBOMs}</div>
              <p className="text-xs text-slate-600">Currently in use</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Work Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stats.totalWorkOrders}</div>
              <p className="text-xs text-slate-600">Total orders</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.activeWorkOrders}</div>
              <p className="text-xs text-slate-600">Currently producing</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.completedWorkOrders}</div>
              <p className="text-xs text-slate-600">Finished production</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bom" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Bill of Materials
            </TabsTrigger>
            <TabsTrigger value="workorders" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Work Orders
            </TabsTrigger>
          </TabsList>

          {/* Bill of Materials Tab */}
          <TabsContent value="bom" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Bill of Materials</CardTitle>
                    <CardDescription>Manage your product recipes and material requirements</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        New BOM
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Create New Bill of Materials</DialogTitle>
                        <DialogDescription>Define the materials and quantities needed for production</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="bom-code">BOM Code</Label>
                            <Input id="bom-code" placeholder="BOM-001" />
                          </div>
                          <div>
                            <Label htmlFor="bom-name">BOM Name</Label>
                            <Input id="bom-name" placeholder="Product Assembly" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="product">Product</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select product" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="laptop">Laptop Pro 15"</SelectItem>
                              <SelectItem value="smartphone">Smartphone X</SelectItem>
                              <SelectItem value="tablet">Tablet Air</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea id="description" placeholder="Describe the BOM and its purpose" />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Cancel</Button>
                          <Button>Create BOM</Button>
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
                      placeholder="Search BOMs..."
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
                        <TableHead>Code</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Version</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBOMs.map((bom) => (
                        <TableRow key={bom.id}>
                          <TableCell className="font-medium">{bom.code}</TableCell>
                          <TableCell>{bom.name}</TableCell>
                          <TableCell>{bom.productName}</TableCell>
                          <TableCell>v{bom.version}</TableCell>
                          <TableCell>{bom.itemCount}</TableCell>
                          <TableCell>
                            <Badge variant={bom.isActive ? 'default' : 'secondary'}>
                              {bom.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell>{bom.createdAt}</TableCell>
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

          {/* Work Orders Tab */}
          <TabsContent value="workorders" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Work Orders</CardTitle>
                    <CardDescription>Track and manage production orders</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        New Work Order
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Create New Work Order</DialogTitle>
                        <DialogDescription>Schedule production for a specific product</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="wo-number">Work Order #</Label>
                            <Input id="wo-number" placeholder="WO-001" />
                          </div>
                          <div>
                            <Label htmlFor="quantity">Quantity</Label>
                            <Input id="quantity" type="number" placeholder="100" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="product">Product</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select product" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="laptop">Laptop Pro 15"</SelectItem>
                              <SelectItem value="smartphone">Smartphone X</SelectItem>
                              <SelectItem value="tablet">Tablet Air</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="bom">Bill of Materials</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select BOM" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bom-001">Laptop Assembly</SelectItem>
                              <SelectItem value="bom-002">Smartphone Production</SelectItem>
                              <SelectItem value="bom-003">Tablet Manufacturing</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="start-date">Start Date</Label>
                            <Input id="start-date" type="date" />
                          </div>
                          <div>
                            <Label htmlFor="end-date">End Date</Label>
                            <Input id="end-date" type="date" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="notes">Notes</Label>
                          <Textarea id="notes" placeholder="Additional notes for production" />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Cancel</Button>
                          <Button>Create Work Order</Button>
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
                      placeholder="Search work orders..."
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
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
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
                        <TableHead>Work Order #</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredWorkOrders.map((wo) => (
                        <TableRow key={wo.id}>
                          <TableCell className="font-medium">{wo.number}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{wo.productName}</div>
                              <div className="text-sm text-slate-500">{wo.productCode}</div>
                            </div>
                          </TableCell>
                          <TableCell>{wo.quantity}</TableCell>
                          <TableCell>{wo.startDate || '-'}</TableCell>
                          <TableCell>{wo.endDate || '-'}</TableCell>
                          <TableCell>{getStatusBadge(wo.status)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-slate-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${wo.progress}%` }}
                                />
                              </div>
                              <span className="text-sm text-slate-600">{wo.progress}%</span>
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
        </Tabs>
      </div>
    </div>
  )
}