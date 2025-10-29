'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  ShoppingCart, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  FileText,
  Truck,
  Package,
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  Users,
  Building2
} from "lucide-react"

interface Supplier {
  id: string
  code: string
  name: string
  email: string
  phone: string
  address: string
  taxId: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface RequestForQuotation {
  id: string
  number: string
  supplierId: string
  date: string
  expiryDate: string
  status: 'draft' | 'sent' | 'received' | 'cancelled'
  notes: string
  createdAt: string
  updatedAt: string
  supplier?: Supplier
}

interface RFQItem {
  id: string
  rfqId: string
  productId?: string
  description: string
  quantity: number
  createdAt: string
  updatedAt: string
}

interface PurchaseOrder {
  id: string
  number: string
  supplierId: string
  rfqId?: string
  date: string
  expectedDeliveryDate: string
  status: 'draft' | 'confirmed' | 'received' | 'cancelled'
  subtotal: number
  tax: number
  total: number
  notes: string
  createdAt: string
  updatedAt: string
  supplier?: Supplier
}

interface PurchaseOrderItem {
  id: string
  purchaseOrderId: string
  productId?: string
  description: string
  quantity: number
  unitPrice: number
  taxRate: number
  subtotal: number
  tax: number
  total: number
  createdAt: string
  updatedAt: string
}

const mockSuppliers: Supplier[] = [
  {
    id: '1',
    code: 'SUP001',
    name: 'Tech Supplier Inc.',
    email: 'contact@techsupplier.com',
    phone: '+1-555-0101',
    address: '123 Tech Ave, Silicon Valley, CA 94000',
    taxId: 'TAX001',
    isActive: true,
    createdAt: '2024-01-01T10:00:00',
    updatedAt: '2024-01-15T14:30:00'
  },
  {
    id: '2',
    code: 'SUP002',
    name: 'Office Supplies Co.',
    email: 'sales@officesupplies.com',
    phone: '+1-555-0202',
    address: '456 Office Blvd, Business City, BC 12345',
    taxId: 'TAX002',
    isActive: true,
    createdAt: '2024-01-05T09:15:00',
    updatedAt: '2024-01-10T11:20:00'
  },
  {
    id: '3',
    code: 'SUP003',
    name: 'Industrial Parts Ltd.',
    email: 'info@industrialparts.com',
    phone: '+1-555-0303',
    address: '789 Industrial Way, Factory Town, FT 67890',
    taxId: 'TAX003',
    isActive: false,
    createdAt: '2024-01-10T14:45:00',
    updatedAt: '2024-01-12T16:00:00'
  }
]

const mockRFQs: RequestForQuotation[] = [
  {
    id: '1',
    number: 'RFQ-2024-001',
    supplierId: '1',
    date: '2024-01-10',
    expiryDate: '2024-01-24',
    status: 'sent',
    notes: 'Request for laptop computers',
    createdAt: '2024-01-10T10:00:00',
    updatedAt: '2024-01-10T10:00:00'
  },
  {
    id: '2',
    number: 'RFQ-2024-002',
    supplierId: '2',
    date: '2024-01-12',
    expiryDate: '2024-01-26',
    status: 'received',
    notes: 'Office furniture quotation',
    createdAt: '2024-01-12T09:15:00',
    updatedAt: '2024-01-15T14:30:00'
  }
]

const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: '1',
    number: 'PO-2024-001',
    supplierId: '1',
    rfqId: '1',
    date: '2024-01-15',
    expectedDeliveryDate: '2024-01-30',
    status: 'confirmed',
    subtotal: 45000,
    tax: 3600,
    total: 48600,
    notes: 'Laptop computers purchase',
    createdAt: '2024-01-15T10:00:00',
    updatedAt: '2024-01-15T10:00:00'
  },
  {
    id: '2',
    number: 'PO-2024-002',
    supplierId: '2',
    date: '2024-01-16',
    expectedDeliveryDate: '2024-01-25',
    status: 'draft',
    subtotal: 2500,
    tax: 200,
    total: 2700,
    notes: 'Office supplies order',
    createdAt: '2024-01-16T09:00:00',
    updatedAt: '2024-01-16T09:00:00'
  }
]

export default function PurchasingPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers)
  const [rfqs, setRfqs] = useState<RequestForQuotation[]>(mockRFQs)
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(mockPurchaseOrders)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [isAddSupplierOpen, setIsAddSupplierOpen] = useState(false)
  const [isAddRFQOpen, setIsAddRFQOpen] = useState(false)
  const [isAddPurchaseOrderOpen, setIsAddPurchaseOrderOpen] = useState(false)

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const filteredRFQs = rfqs.filter(rfq => {
    const matchesSearch = rfq.number.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || rfq.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const filteredPurchaseOrders = purchaseOrders.filter(po => {
    const matchesSearch = po.number.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || po.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getRFQStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-700">Draft</Badge>
      case 'sent':
        return <Badge className="bg-blue-100 text-blue-700"><Clock className="w-3 h-3 mr-1" />Sent</Badge>
      case 'received':
        return <Badge className="bg-green-100 text-green-700"><CheckCircle className="w-3 h-3 mr-1" />Received</Badge>
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-700"><AlertTriangle className="w-3 h-3 mr-1" />Cancelled</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getPOStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-700">Draft</Badge>
      case 'confirmed':
        return <Badge className="bg-blue-100 text-blue-700"><CheckCircle className="w-3 h-3 mr-1" />Confirmed</Badge>
      case 'received':
        return <Badge className="bg-green-100 text-green-700"><Package className="w-3 h-3 mr-1" />Received</Badge>
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-700"><AlertTriangle className="w-3 h-3 mr-1" />Cancelled</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <ShoppingCart className="w-8 h-8 text-yellow-700" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Purchasing</h1>
                <p className="text-slate-600">Follow your requests for quotation and reduce costs by grouping orders</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Dialog open={isAddSupplierOpen} onOpenChange={setIsAddSupplierOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Building2 className="w-4 h-4 mr-2" />
                    Add Supplier
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Supplier</DialogTitle>
                    <DialogDescription>
                      Create a new supplier in your purchasing system
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="supplier-code">Supplier Code</Label>
                      <Input id="supplier-code" placeholder="Enter supplier code" />
                    </div>
                    <div>
                      <Label htmlFor="supplier-name">Supplier Name</Label>
                      <Input id="supplier-name" placeholder="Enter supplier name" />
                    </div>
                    <div>
                      <Label htmlFor="supplier-email">Email</Label>
                      <Input id="supplier-email" type="email" placeholder="Enter email address" />
                    </div>
                    <div>
                      <Label htmlFor="supplier-phone">Phone</Label>
                      <Input id="supplier-phone" placeholder="Enter phone number" />
                    </div>
                    <div>
                      <Label htmlFor="supplier-address">Address</Label>
                      <Textarea id="supplier-address" placeholder="Enter supplier address" />
                    </div>
                    <div>
                      <Label htmlFor="supplier-tax">Tax ID</Label>
                      <Input id="supplier-tax" placeholder="Enter tax ID" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddSupplierOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddSupplierOpen(false)}>
                      Add Supplier
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog open={isAddRFQOpen} onOpenChange={setIsAddRFQOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    New RFQ
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create Request for Quotation</DialogTitle>
                    <DialogDescription>
                      Create a new RFQ to send to suppliers
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="rfq-supplier">Supplier</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select supplier" />
                        </SelectTrigger>
                        <SelectContent>
                          {suppliers.filter(s => s.isActive).map(supplier => (
                            <SelectItem key={supplier.id} value={supplier.id}>
                              {supplier.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="rfq-expiry">Expiry Date</Label>
                      <Input id="rfq-expiry" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="rfq-notes">Notes</Label>
                      <Textarea id="rfq-notes" placeholder="Enter RFQ notes" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddRFQOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddRFQOpen(false)}>
                      Create RFQ
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Active Suppliers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">
                  {suppliers.filter(s => s.isActive).length}
                </div>
                <p className="text-xs text-slate-600">
                  {suppliers.length} total suppliers
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Pending RFQs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {rfqs.filter(r => r.status === 'sent').length}
                </div>
                <p className="text-xs text-slate-600">Awaiting response</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Open POs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {purchaseOrders.filter(po => po.status === 'confirmed').length}
                </div>
                <p className="text-xs text-slate-600">Awaiting delivery</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Total Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">
                  ${purchaseOrders.reduce((sum, po) => sum + po.total, 0).toLocaleString()}
                </div>
                <p className="text-xs text-slate-600">Open orders value</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="suppliers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
            <TabsTrigger value="rfqs">RFQs</TabsTrigger>
            <TabsTrigger value="purchase-orders">Purchase Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="suppliers" className="space-y-6">
            {/* Search */}
            <Card>
              <CardContent className="pt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search suppliers by name, code, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Suppliers Table */}
            <Card>
              <CardHeader>
                <CardTitle>Suppliers Management</CardTitle>
                <CardDescription>Manage your supplier information and relationships</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Tax ID</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSuppliers.map((supplier) => (
                      <TableRow key={supplier.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{supplier.name}</div>
                            <div className="text-sm text-slate-600">{supplier.code}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm">{supplier.email}</div>
                            <div className="text-xs text-slate-600">{supplier.phone}</div>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{supplier.address}</TableCell>
                        <TableCell className="font-mono">{supplier.taxId}</TableCell>
                        <TableCell>
                          {supplier.isActive ? (
                            <Badge className="bg-green-100 text-green-700">Active</Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-700">Inactive</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4" />
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

          <TabsContent value="rfqs" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Requests for Quotation</h2>
                <p className="text-slate-600">Manage your RFQs and track supplier responses</p>
              </div>
            </div>

            {/* Search and Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search RFQs by number..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="sent">Sent</SelectItem>
                      <SelectItem value="received">Received</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* RFQs Table */}
            <Card>
              <CardHeader>
                <CardTitle>RFQ Management</CardTitle>
                <CardDescription>Track your requests for quotation and supplier responses</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>RFQ Number</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRFQs.map((rfq) => {
                      const supplier = suppliers.find(s => s.id === rfq.supplierId)
                      return (
                        <TableRow key={rfq.id}>
                          <TableCell className="font-mono">{rfq.number}</TableCell>
                          <TableCell>{supplier?.name || 'Unknown'}</TableCell>
                          <TableCell>{new Date(rfq.date).toLocaleDateString()}</TableCell>
                          <TableCell>{new Date(rfq.expiryDate).toLocaleDateString()}</TableCell>
                          <TableCell>{getRFQStatusBadge(rfq.status)}</TableCell>
                          <TableCell className="max-w-xs truncate">{rfq.notes}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="purchase-orders" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Purchase Orders</h2>
                <p className="text-slate-600">Manage your purchase orders and track deliveries</p>
              </div>
              <Dialog open={isAddPurchaseOrderOpen} onOpenChange={setIsAddPurchaseOrderOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    New PO
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create Purchase Order</DialogTitle>
                    <DialogDescription>
                      Create a new purchase order
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="po-supplier">Supplier</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select supplier" />
                        </SelectTrigger>
                        <SelectContent>
                          {suppliers.filter(s => s.isActive).map(supplier => (
                            <SelectItem key={supplier.id} value={supplier.id}>
                              {supplier.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="po-rfq">RFQ (Optional)</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select RFQ" />
                        </SelectTrigger>
                        <SelectContent>
                          {rfqs.filter(r => r.status === 'received').map(rfq => (
                            <SelectItem key={rfq.id} value={rfq.id}>
                              {rfq.number}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="po-delivery">Expected Delivery Date</Label>
                      <Input id="po-delivery" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="po-notes">Notes</Label>
                      <Textarea id="po-notes" placeholder="Enter PO notes" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddPurchaseOrderOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddPurchaseOrderOpen(false)}>
                      Create PO
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search and Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search purchase orders by number..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="received">Received</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Purchase Orders Table */}
            <Card>
              <CardHeader>
                <CardTitle>Purchase Orders</CardTitle>
                <CardDescription>Track your purchase orders and deliveries</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>PO Number</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Expected Delivery</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPurchaseOrders.map((po) => {
                      const supplier = suppliers.find(s => s.id === po.supplierId)
                      return (
                        <TableRow key={po.id}>
                          <TableCell className="font-mono">{po.number}</TableCell>
                          <TableCell>{supplier?.name || 'Unknown'}</TableCell>
                          <TableCell>{new Date(po.date).toLocaleDateString()}</TableCell>
                          <TableCell>{new Date(po.expectedDeliveryDate).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">${po.total.toLocaleString()}</TableCell>
                          <TableCell>{getPOStatusBadge(po.status)}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}