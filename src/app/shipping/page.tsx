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
  Truck, 
  Package, 
  Plus, 
  Search, 
  Filter,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Plane,
  Ship,
  Train,
  Navigation
} from "lucide-react"

interface Carrier {
  id: string
  name: string
  trackingUrl?: string
  isActive: boolean
  shipmentCount: number
  createdAt: string
}

interface Shipment {
  id: string
  number: string
  salesOrderNumber: string
  customerName: string
  carrierName: string
  trackingNumber?: string
  shipDate?: string
  deliveryDate?: string
  status: 'draft' | 'shipped' | 'in_transit' | 'delivered' | 'cancelled'
  origin?: string
  destination?: string
  weight?: number
  notes?: string
  createdAt: string
}

interface ShipmentItem {
  id: string
  productName: string
  productCode: string
  quantity: number
  unit: string
}

export default function ShippingPage() {
  const [carriers, setCarriers] = useState<Carrier[]>([])
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [activeTab, setActiveTab] = useState('shipments')

  // Mock data for demonstration
  useEffect(() => {
    const mockCarriers: Carrier[] = [
      {
        id: '1',
        name: 'FedEx Express',
        trackingUrl: 'https://www.fedex.com/tracking',
        isActive: true,
        shipmentCount: 45,
        createdAt: '2024-01-10'
      },
      {
        id: '2',
        name: 'UPS Ground',
        trackingUrl: 'https://www.ups.com/tracking',
        isActive: true,
        shipmentCount: 32,
        createdAt: '2024-01-12'
      },
      {
        id: '3',
        name: 'DHL Express',
        trackingUrl: 'https://www.dhl.com/tracking',
        isActive: true,
        shipmentCount: 28,
        createdAt: '2024-01-15'
      },
      {
        id: '4',
        name: 'USPS Priority',
        trackingUrl: 'https://tools.usps.com/go/TrackConfirmAction',
        isActive: false,
        shipmentCount: 15,
        createdAt: '2024-01-18'
      }
    ]

    const mockShipments: Shipment[] = [
      {
        id: '1',
        number: 'SHP-001',
        salesOrderNumber: 'SO-001',
        customerName: 'Acme Corporation',
        carrierName: 'FedEx Express',
        trackingNumber: 'FDX123456789',
        shipDate: '2024-01-15',
        deliveryDate: '2024-01-18',
        status: 'delivered',
        origin: 'New York, NY',
        destination: 'Los Angeles, CA',
        weight: 5.2,
        notes: 'Delivered successfully',
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        number: 'SHP-002',
        salesOrderNumber: 'SO-002',
        customerName: 'Tech Solutions Inc',
        carrierName: 'UPS Ground',
        trackingNumber: 'UPS987654321',
        shipDate: '2024-01-18',
        status: 'in_transit',
        origin: 'Chicago, IL',
        destination: 'Miami, FL',
        weight: 3.8,
        notes: 'In transit to destination',
        createdAt: '2024-01-18'
      },
      {
        id: '3',
        number: 'SHP-003',
        salesOrderNumber: 'SO-003',
        customerName: 'Global Enterprises',
        carrierName: 'DHL Express',
        trackingNumber: 'DHL456789123',
        status: 'shipped',
        origin: 'Seattle, WA',
        destination: 'Boston, MA',
        weight: 2.5,
        notes: 'Shipped from warehouse',
        createdAt: '2024-01-20'
      },
      {
        id: '4',
        number: 'SHP-004',
        salesOrderNumber: 'SO-004',
        customerName: 'Innovation Labs',
        carrierName: 'FedEx Express',
        status: 'draft',
        origin: 'Austin, TX',
        destination: 'Denver, CO',
        weight: 1.8,
        notes: 'Awaiting pickup',
        createdAt: '2024-01-22'
      }
    ]

    setCarriers(mockCarriers)
    setShipments(mockShipments)
    setLoading(false)
  }, [])

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { label: 'Draft', variant: 'secondary' as const, icon: Package },
      shipped: { label: 'Shipped', variant: 'default' as const, icon: Truck },
      in_transit: { label: 'In Transit', variant: 'outline' as const, icon: Navigation },
      delivered: { label: 'Delivered', variant: 'outline' as const, icon: CheckCircle },
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

  const filteredCarriers = carriers.filter(carrier => 
    carrier.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = shipment.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.salesOrderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (shipment.trackingNumber && shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || shipment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    totalCarriers: carriers.length,
    activeCarriers: carriers.filter(c => c.isActive).length,
    totalShipments: shipments.length,
    inTransitShipments: shipments.filter(s => s.status === 'in_transit').length,
    deliveredShipments: shipments.filter(s => s.status === 'delivered').length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-teal-100 text-teal-700 rounded-lg">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Shipping & Logistics</h1>
              <p className="text-slate-600">Package shipments and carrier management</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Carriers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stats.totalCarriers}</div>
              <p className="text-xs text-slate-600">Shipping partners</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Active Carriers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.activeCarriers}</div>
              <p className="text-xs text-slate-600">Currently available</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Shipments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stats.totalShipments}</div>
              <p className="text-xs text-slate-600">All time shipments</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">In Transit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.inTransitShipments}</div>
              <p className="text-xs text-slate-600">Currently shipping</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Delivered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.deliveredShipments}</div>
              <p className="text-xs text-slate-600">Successfully delivered</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="shipments" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Shipments
            </TabsTrigger>
            <TabsTrigger value="carriers" className="flex items-center gap-2">
              <Truck className="w-4 h-4" />
              Carriers
            </TabsTrigger>
          </TabsList>

          {/* Shipments Tab */}
          <TabsContent value="shipments" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Shipments</CardTitle>
                    <CardDescription>Track and manage all shipments</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        New Shipment
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Create New Shipment</DialogTitle>
                        <DialogDescription>Package and ship items to customers</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="shipment-number">Shipment #</Label>
                            <Input id="shipment-number" placeholder="SHP-001" />
                          </div>
                          <div>
                            <Label htmlFor="sales-order">Sales Order</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select sales order" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="so-001">SO-001 - Acme Corporation</SelectItem>
                                <SelectItem value="so-002">SO-002 - Tech Solutions Inc</SelectItem>
                                <SelectItem value="so-003">SO-003 - Global Enterprises</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="carrier">Carrier</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select carrier" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fedex">FedEx Express</SelectItem>
                              <SelectItem value="ups">UPS Ground</SelectItem>
                              <SelectItem value="dhl">DHL Express</SelectItem>
                              <SelectItem value="usps">USPS Priority</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="tracking-number">Tracking Number</Label>
                            <Input id="tracking-number" placeholder="Enter tracking number" />
                          </div>
                          <div>
                            <Label htmlFor="weight">Weight (kg)</Label>
                            <Input id="weight" type="number" step="0.1" placeholder="5.0" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="origin">Origin</Label>
                            <Input id="origin" placeholder="New York, NY" />
                          </div>
                          <div>
                            <Label htmlFor="destination">Destination</Label>
                            <Input id="destination" placeholder="Los Angeles, CA" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="notes">Notes</Label>
                          <Textarea id="notes" placeholder="Additional shipping notes" />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Cancel</Button>
                          <Button>Create Shipment</Button>
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
                      placeholder="Search shipments..."
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
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="in_transit">In Transit</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
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
                        <TableHead>Shipment #</TableHead>
                        <TableHead>Sales Order</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Carrier</TableHead>
                        <TableHead>Tracking #</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Route</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredShipments.map((shipment) => (
                        <TableRow key={shipment.id}>
                          <TableCell className="font-medium">{shipment.number}</TableCell>
                          <TableCell>{shipment.salesOrderNumber}</TableCell>
                          <TableCell>{shipment.customerName}</TableCell>
                          <TableCell>{shipment.carrierName}</TableCell>
                          <TableCell>
                            {shipment.trackingNumber ? (
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-sm">{shipment.trackingNumber}</span>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <Navigation className="w-3 h-3" />
                                </Button>
                              </div>
                            ) : (
                              <span className="text-slate-400">-</span>
                            )}
                          </TableCell>
                          <TableCell>{getStatusBadge(shipment.status)}</TableCell>
                          <TableCell>
                            {shipment.origin && shipment.destination && (
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="w-3 h-3 text-slate-400" />
                                <span>{shipment.origin} → {shipment.destination}</span>
                              </div>
                            )}
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

          {/* Carriers Tab */}
          <TabsContent value="carriers" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Carriers</CardTitle>
                    <CardDescription>Manage shipping carriers and their services</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        New Carrier
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Add New Carrier</DialogTitle>
                        <DialogDescription>Configure a new shipping carrier</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="carrier-name">Carrier Name</Label>
                          <Input id="carrier-name" placeholder="Enter carrier name" />
                        </div>
                        <div>
                          <Label htmlFor="tracking-url">Tracking URL</Label>
                          <Input id="tracking-url" placeholder="https://carrier.com/tracking" />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Cancel</Button>
                          <Button>Add Carrier</Button>
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
                      placeholder="Search carriers..."
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
                        <TableHead>Name</TableHead>
                        <TableHead>Tracking URL</TableHead>
                        <TableHead>Shipments</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCarriers.map((carrier) => (
                        <TableRow key={carrier.id}>
                          <TableCell className="font-medium">{carrier.name}</TableCell>
                          <TableCell>
                            {carrier.trackingUrl ? (
                              <a 
                                href={carrier.trackingUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline text-sm"
                              >
                                {carrier.trackingUrl}
                              </a>
                            ) : (
                              <span className="text-slate-400">Not configured</span>
                            )}
                          </TableCell>
                          <TableCell>{carrier.shipmentCount}</TableCell>
                          <TableCell>
                            <Badge variant={carrier.isActive ? 'default' : 'secondary'}>
                              {carrier.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell>{carrier.createdAt}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm">
                                {carrier.isActive ? 'Disable' : 'Enable'}
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