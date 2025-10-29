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
  BarChart3, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  TrendingUp,
  TrendingDown,
  Package,
  Truck,
  Clock,
  CheckCircle,
  AlertTriangle,
  Warehouse,
  Ship,
  Plane,
  Train,
  MapPin,
  Calendar,
  DollarSign,
  Activity
} from "lucide-react"

interface SupplierPerformance {
  id: string
  supplierId: string
  supplierName: string
  onTimeDelivery: number
  qualityRating: number
  priceCompetitiveness: number
  responsiveness: number
  totalScore: number
  lastEvaluation: string
  status: 'excellent' | 'good' | 'average' | 'poor'
}

interface DemandForecast {
  id: string
  productId: string
  productName: string
  category: string
  currentStock: number
  forecastedDemand: number
  period: string
  confidence: number
  recommendedOrder: number
  status: 'optimal' | 'low' | 'critical' | 'excess'
}

interface Shipment {
  id: string
  trackingNumber: string
  carrier: string
  origin: string
  destination: string
  status: 'preparing' | 'in_transit' | 'delivered' | 'delayed' | 'cancelled'
  estimatedDeparture: string
  estimatedArrival: string
  actualDeparture?: string
  actualArrival?: string
  cost: number
  contents: string
  notes?: string
}

interface InventoryOptimization {
  id: string
  productId: string
  productName: string
  currentStock: number
  reorderPoint: number
  economicOrderQuantity: number
  leadTime: number
  holdingCost: number
  orderingCost: number
  stockoutCost: number
  recommendation: string
  potentialSavings: number
}

const mockSupplierPerformance: SupplierPerformance[] = [
  {
    id: '1',
    supplierId: '1',
    supplierName: 'Tech Supplier Inc.',
    onTimeDelivery: 95,
    qualityRating: 92,
    priceCompetitiveness: 88,
    responsiveness: 90,
    totalScore: 91,
    lastEvaluation: '2024-01-15',
    status: 'excellent'
  },
  {
    id: '2',
    supplierId: '2',
    supplierName: 'Office Supplies Co.',
    onTimeDelivery: 85,
    qualityRating: 88,
    priceCompetitiveness: 95,
    responsiveness: 82,
    totalScore: 87,
    lastEvaluation: '2024-01-10',
    status: 'good'
  },
  {
    id: '3',
    supplierId: '3',
    supplierName: 'Industrial Parts Ltd.',
    onTimeDelivery: 72,
    qualityRating: 78,
    priceCompetitiveness: 85,
    responsiveness: 75,
    totalScore: 77,
    lastEvaluation: '2024-01-05',
    status: 'average'
  }
]

const mockDemandForecasts: DemandForecast[] = [
  {
    id: '1',
    productId: '1',
    productName: 'Laptop Pro 15"',
    category: 'Electronics',
    currentStock: 45,
    forecastedDemand: 120,
    period: 'Q1 2024',
    confidence: 85,
    recommendedOrder: 80,
    status: 'low'
  },
  {
    id: '2',
    productId: '2',
    productName: 'Wireless Mouse',
    category: 'Accessories',
    currentStock: 8,
    forecastedDemand: 200,
    period: 'Q1 2024',
    confidence: 90,
    recommendedOrder: 195,
    status: 'critical'
  },
  {
    id: '3',
    productId: '3',
    productName: 'USB-C Cable',
    category: 'Accessories',
    currentStock: 150,
    forecastedDemand: 100,
    period: 'Q1 2024',
    confidence: 80,
    recommendedOrder: 0,
    status: 'excess'
  }
]

const mockShipments: Shipment[] = [
  {
    id: '1',
    trackingNumber: 'TRK001234567',
    carrier: 'FedEx',
    origin: 'Silicon Valley, CA',
    destination: 'New York, NY',
    status: 'in_transit',
    estimatedDeparture: '2024-01-15T10:00:00',
    estimatedArrival: '2024-01-18T15:00:00',
    cost: 250.00,
    contents: 'Laptop computers - 10 units'
  },
  {
    id: '2',
    trackingNumber: 'TRK002345678',
    carrier: 'UPS',
    origin: 'Chicago, IL',
    destination: 'Los Angeles, CA',
    status: 'delivered',
    estimatedDeparture: '2024-01-12T09:00:00',
    estimatedArrival: '2024-01-14T12:00:00',
    actualDeparture: '2024-01-12T09:15:00',
    actualArrival: '2024-01-14T11:45:00',
    cost: 150.00,
    contents: 'Office supplies'
  },
  {
    id: '3',
    trackingNumber: 'TRK003456789',
    carrier: 'DHL',
    origin: 'Miami, FL',
    destination: 'Seattle, WA',
    status: 'delayed',
    estimatedDeparture: '2024-01-16T14:00:00',
    estimatedArrival: '2024-01-19T16:00:00',
    cost: 320.00,
    contents: 'Industrial equipment',
    notes: 'Weather delay'
  }
]

const mockInventoryOptimization: InventoryOptimization[] = [
  {
    id: '1',
    productId: '1',
    productName: 'Laptop Pro 15"',
    currentStock: 45,
    reorderPoint: 20,
    economicOrderQuantity: 50,
    leadTime: 7,
    holdingCost: 50,
    orderingCost: 100,
    stockoutCost: 500,
    recommendation: 'Order 50 units',
    potentialSavings: 200
  },
  {
    id: '2',
    productId: '2',
    productName: 'Wireless Mouse',
    currentStock: 8,
    reorderPoint: 30,
    economicOrderQuantity: 100,
    leadTime: 3,
    holdingCost: 2,
    orderingCost: 25,
    stockoutCost: 100,
    recommendation: 'Urgent order needed',
    potentialSavings: 150
  },
  {
    id: '3',
    productId: '3',
    productName: 'USB-C Cable',
    currentStock: 150,
    reorderPoint: 50,
    economicOrderQuantity: 200,
    leadTime: 5,
    holdingCost: 0.5,
    orderingCost: 15,
    stockoutCost: 20,
    recommendation: 'Optimal stock level',
    potentialSavings: 0
  }
]

export default function SupplyChainPage() {
  const [supplierPerformance, setSupplierPerformance] = useState<SupplierPerformance[]>(mockSupplierPerformance)
  const [demandForecasts, setDemandForecasts] = useState<DemandForecast[]>(mockDemandForecasts)
  const [shipments, setShipments] = useState<Shipment[]>(mockShipments)
  const [inventoryOptimization, setInventoryOptimization] = useState<InventoryOptimization[]>(mockInventoryOptimization)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [isAddShipmentOpen, setIsAddShipmentOpen] = useState(false)

  const getPerformanceBadge = (status: string) => {
    switch (status) {
      case 'excellent':
        return <Badge className="bg-green-100 text-green-700">Excellent</Badge>
      case 'good':
        return <Badge className="bg-blue-100 text-blue-700">Good</Badge>
      case 'average':
        return <Badge className="bg-yellow-100 text-yellow-700">Average</Badge>
      case 'poor':
        return <Badge className="bg-red-100 text-red-700">Poor</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getForecastStatusBadge = (status: string) => {
    switch (status) {
      case 'optimal':
        return <Badge className="bg-green-100 text-green-700"><CheckCircle className="w-3 h-3 mr-1" />Optimal</Badge>
      case 'low':
        return <Badge className="bg-yellow-100 text-yellow-700"><Clock className="w-3 h-3 mr-1" />Low</Badge>
      case 'critical':
        return <Badge className="bg-red-100 text-red-700"><AlertTriangle className="w-3 h-3 mr-1" />Critical</Badge>
      case 'excess':
        return <Badge className="bg-blue-100 text-blue-700"><Package className="w-3 h-3 mr-1" />Excess</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getShipmentStatusBadge = (status: string) => {
    switch (status) {
      case 'preparing':
        return <Badge className="bg-gray-100 text-gray-700">Preparing</Badge>
      case 'in_transit':
        return <Badge className="bg-blue-100 text-blue-700"><Truck className="w-3 h-3 mr-1" />In Transit</Badge>
      case 'delivered':
        return <Badge className="bg-green-100 text-green-700"><CheckCircle className="w-3 h-3 mr-1" />Delivered</Badge>
      case 'delayed':
        return <Badge className="bg-red-100 text-red-700"><AlertTriangle className="w-3 h-3 mr-1" />Delayed</Badge>
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-700">Cancelled</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getCarrierIcon = (carrier: string) => {
    switch (carrier.toLowerCase()) {
      case 'fedex':
        return <Plane className="w-4 h-4" />
      case 'ups':
        return <Truck className="w-4 h-4" />
      case 'dhl':
        return <Plane className="w-4 h-4" />
      default:
        return <Truck className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <BarChart3 className="w-8 h-8 text-indigo-700" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Supply Chain Management</h1>
                <p className="text-slate-600">Fill your warehouses just in time</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Dialog open={isAddShipmentOpen} onOpenChange={setIsAddShipmentOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Shipment
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Shipment</DialogTitle>
                    <DialogDescription>
                      Create a new shipment tracking record
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="tracking-number">Tracking Number</Label>
                      <Input id="tracking-number" placeholder="Enter tracking number" />
                    </div>
                    <div>
                      <Label htmlFor="carrier">Carrier</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select carrier" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fedex">FedEx</SelectItem>
                          <SelectItem value="ups">UPS</SelectItem>
                          <SelectItem value="dhl">DHL</SelectItem>
                          <SelectItem value="usps">USPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="origin">Origin</Label>
                      <Input id="origin" placeholder="Enter origin address" />
                    </div>
                    <div>
                      <Label htmlFor="destination">Destination</Label>
                      <Input id="destination" placeholder="Enter destination address" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="departure">Estimated Departure</Label>
                        <Input id="departure" type="datetime-local" />
                      </div>
                      <div>
                        <Label htmlFor="arrival">Estimated Arrival</Label>
                        <Input id="arrival" type="datetime-local" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cost">Cost ($)</Label>
                      <Input id="cost" type="number" placeholder="0.00" />
                    </div>
                    <div>
                      <Label htmlFor="contents">Contents</Label>
                      <Textarea id="contents" placeholder="Describe shipment contents" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddShipmentOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddShipmentOpen(false)}>
                      Add Shipment
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
                <CardTitle className="text-sm font-medium text-slate-600">Active Shipments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">
                  {shipments.filter(s => s.status === 'in_transit').length}
                </div>
                <p className="text-xs text-slate-600">Currently in transit</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">On-Time Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(supplierPerformance.reduce((sum, s) => sum + s.onTimeDelivery, 0) / supplierPerformance.length)}%
                </div>
                <p className="text-xs text-slate-600">Average supplier performance</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Critical Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {demandForecasts.filter(f => f.status === 'critical').length}
                </div>
                <p className="text-xs text-slate-600">Require immediate attention</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Potential Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">
                  ${inventoryOptimization.reduce((sum, io) => sum + io.potentialSavings, 0).toLocaleString()}
                </div>
                <p className="text-xs text-slate-600">From optimization</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="supplier-performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="supplier-performance">Supplier Performance</TabsTrigger>
            <TabsTrigger value="demand-forecast">Demand Forecast</TabsTrigger>
            <TabsTrigger value="shipments">Shipments</TabsTrigger>
            <TabsTrigger value="inventory-opt">Inventory Optimization</TabsTrigger>
          </TabsList>

          <TabsContent value="supplier-performance" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Supplier Performance</h2>
              <p className="text-slate-600">Monitor and evaluate supplier performance metrics</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators for your suppliers</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Supplier</TableHead>
                      <TableHead>On-Time Delivery</TableHead>
                      <TableHead>Quality Rating</TableHead>
                      <TableHead>Price Competitiveness</TableHead>
                      <TableHead>Responsiveness</TableHead>
                      <TableHead>Total Score</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Evaluation</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {supplierPerformance.map((performance) => (
                      <TableRow key={performance.id}>
                        <TableCell className="font-medium">{performance.supplierName}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 bg-slate-200 rounded-full h-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ width: `${performance.onTimeDelivery}%` }}
                              />
                            </div>
                            <span className="text-sm text-slate-600">{performance.onTimeDelivery}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 bg-slate-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${performance.qualityRating}%` }}
                              />
                            </div>
                            <span className="text-sm text-slate-600">{performance.qualityRating}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 bg-slate-200 rounded-full h-2">
                              <div 
                                className="bg-purple-600 h-2 rounded-full" 
                                style={{ width: `${performance.priceCompetitiveness}%` }}
                              />
                            </div>
                            <span className="text-sm text-slate-600">{performance.priceCompetitiveness}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 bg-slate-200 rounded-full h-2">
                              <div 
                                className="bg-orange-600 h-2 rounded-full" 
                                style={{ width: `${performance.responsiveness}%` }}
                              />
                            </div>
                            <span className="text-sm text-slate-600">{performance.responsiveness}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-bold">{performance.totalScore}%</TableCell>
                        <TableCell>{getPerformanceBadge(performance.status)}</TableCell>
                        <TableCell>{new Date(performance.lastEvaluation).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demand-forecast" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Demand Forecasting</h2>
              <p className="text-slate-600">Predict future demand and optimize inventory levels</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Forecast Analysis</CardTitle>
                <CardDescription>Demand predictions and inventory recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Current Stock</TableHead>
                      <TableHead>Forecasted Demand</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Confidence</TableHead>
                      <TableHead>Recommended Order</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {demandForecasts.map((forecast) => (
                      <TableRow key={forecast.id}>
                        <TableCell className="font-medium">{forecast.productName}</TableCell>
                        <TableCell>{forecast.category}</TableCell>
                        <TableCell className="text-right">{forecast.currentStock}</TableCell>
                        <TableCell className="text-right">{forecast.forecastedDemand}</TableCell>
                        <TableCell>{forecast.period}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 bg-slate-200 rounded-full h-2">
                              <div 
                                className="bg-indigo-600 h-2 rounded-full" 
                                style={{ width: `${forecast.confidence}%` }}
                              />
                            </div>
                            <span className="text-sm text-slate-600">{forecast.confidence}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium">{forecast.recommendedOrder}</TableCell>
                        <TableCell>{getForecastStatusBadge(forecast.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shipments" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Shipments</h2>
                <p className="text-slate-600">Track and manage your shipments and logistics</p>
              </div>
            </div>

            {/* Search and Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search shipments by tracking number..."
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
                      <SelectItem value="preparing">Preparing</SelectItem>
                      <SelectItem value="in_transit">In Transit</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="delayed">Delayed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shipment Tracking</CardTitle>
                <CardDescription>Monitor your shipments and delivery status</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tracking #</TableHead>
                      <TableHead>Carrier</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Timeline</TableHead>
                      <TableHead>Cost</TableHead>
                      <TableHead>Contents</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shipments.map((shipment) => (
                      <TableRow key={shipment.id}>
                        <TableCell className="font-mono">{shipment.trackingNumber}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getCarrierIcon(shipment.carrier)}
                            <span>{shipment.carrier}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              <span>{shipment.origin}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <TrendingDown className="w-3 h-3 text-slate-400" />
                              <span>{shipment.destination}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getShipmentStatusBadge(shipment.status)}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>Est: {new Date(shipment.estimatedArrival).toLocaleDateString()}</div>
                            {shipment.actualArrival && (
                              <div className="text-green-600">
                                Actual: {new Date(shipment.actualArrival).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">${shipment.cost.toFixed(2)}</TableCell>
                        <TableCell className="max-w-xs truncate">{shipment.contents}</TableCell>
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

          <TabsContent value="inventory-opt" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Inventory Optimization</h2>
              <p className="text-slate-600">Optimize inventory levels and reduce costs</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Optimization Analysis</CardTitle>
                <CardDescription>EOQ calculations and inventory recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Current Stock</TableHead>
                      <TableHead>Reorder Point</TableHead>
                      <TableHead>EOQ</TableHead>
                      <TableHead>Lead Time</TableHead>
                      <TableHead>Total Costs</TableHead>
                      <TableHead>Recommendation</TableHead>
                      <TableHead>Potential Savings</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventoryOptimization.map((opt) => (
                      <TableRow key={opt.id}>
                        <TableCell className="font-medium">{opt.productName}</TableCell>
                        <TableCell className="text-right">{opt.currentStock}</TableCell>
                        <TableCell className="text-right">{opt.reorderPoint}</TableCell>
                        <TableCell className="text-right">{opt.economicOrderQuantity}</TableCell>
                        <TableCell className="text-right">{opt.leadTime} days</TableCell>
                        <TableCell className="text-right">
                          <div className="text-sm">
                            <div>Holding: ${opt.holdingCost}</div>
                            <div>Ordering: ${opt.orderingCost}</div>
                            <div>Stockout: ${opt.stockoutCost}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={opt.recommendation.includes('Urgent') ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}>
                            {opt.recommendation}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {opt.potentialSavings > 0 ? `$${opt.potentialSavings}` : '-'}
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
    </div>
  )
}