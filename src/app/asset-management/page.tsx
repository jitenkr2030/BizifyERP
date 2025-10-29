'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Package, 
  Wrench, 
  TrendingDown, 
  Calendar, 
  Search,
  Plus,
  Edit,
  Eye,
  MoreHorizontal,
  DollarSign,
  AlertTriangle
} from "lucide-react"

export default function AssetManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  // Sample data
  const assets = [
    {
      id: '1',
      code: 'AST001',
      name: 'Office Laptop Dell XPS 15',
      category: 'it_equipment',
      description: 'High-performance laptop for development work',
      purchaseDate: '2023-01-15',
      purchasePrice: 2500,
      currentValue: 1875,
      location: 'Office - Floor 3',
      department: 'Engineering',
      status: 'active',
      warrantyExpiry: '2025-01-15'
    },
    {
      id: '2',
      code: 'AST002',
      name: 'Company Vehicle Toyota Camry',
      category: 'vehicle',
      description: 'Company car for business travel',
      purchaseDate: '2022-06-20',
      purchasePrice: 35000,
      currentValue: 28000,
      location: 'Parking Lot',
      department: 'Sales',
      status: 'active',
      warrantyExpiry: '2025-06-20'
    },
    {
      id: '3',
      code: 'AST003',
      name: 'Office Chair Herman Miller',
      category: 'furniture',
      description: 'Ergonomic office chair',
      purchaseDate: '2023-03-10',
      purchasePrice: 800,
      currentValue: 600,
      location: 'Office - Floor 2',
      department: 'HR',
      status: 'maintenance',
      warrantyExpiry: '2026-03-10'
    }
  ]

  const maintenanceRecords = [
    {
      id: '1',
      assetName: 'Office Laptop Dell XPS 15',
      maintenanceType: 'preventive',
      description: 'Regular maintenance check and cleaning',
      cost: 50,
      performedBy: 'IT Support',
      performedDate: '2024-01-10',
      status: 'completed',
      nextMaintenanceDate: '2024-04-10'
    },
    {
      id: '2',
      assetName: 'Company Vehicle Toyota Camry',
      maintenanceType: 'preventive',
      description: 'Oil change and tire rotation',
      cost: 120,
      performedBy: 'Auto Service Center',
      performedDate: '2024-01-05',
      status: 'completed',
      nextMaintenanceDate: '2024-04-05'
    }
  ]

  const depreciationRecords = [
    {
      id: '1',
      assetName: 'Office Laptop Dell XPS 15',
      date: '2024-01-01',
      method: 'straight_line',
      amount: 52.08,
      accumulatedValue: 625,
      bookValue: 1875
    },
    {
      id: '2',
      assetName: 'Company Vehicle Toyota Camry',
      date: '2024-01-01',
      method: 'straight_line',
      amount: 291.67,
      accumulatedValue: 7000,
      bookValue: 28000
    }
  ]

  const assetLeases = [
    {
      id: '1',
      assetName: 'Office Printer HP LaserJet',
      lessor: 'Office Equipment Rentals Inc.',
      leaseNumber: 'LEASE-001',
      startDate: '2023-01-01',
      endDate: '2025-12-31',
      monthlyPayment: 150,
      status: 'active'
    }
  ]

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || asset.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || asset.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default'
      case 'maintenance': return 'secondary'
      case 'disposed': return 'destructive'
      case 'retired': return 'outline'
      default: return 'secondary'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Asset Management
          </h1>
          <p className="text-lg text-slate-600">
            Track, maintain, and manage company assets and equipment
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <Package className="w-4 h-4" />
                Total Assets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">156</div>
              <p className="text-xs text-slate-600">+8 from last quarter</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Total Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">$2.4M</div>
              <p className="text-xs text-slate-600">Current book value</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                Maintenance Due
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">12</div>
              <p className="text-xs text-slate-600">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Warnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">3</div>
              <p className="text-xs text-slate-600">Require attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="assets" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="depreciation">Depreciation</TabsTrigger>
            <TabsTrigger value="leases">Leases</TabsTrigger>
          </TabsList>

          <TabsContent value="assets">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Asset Register</CardTitle>
                    <CardDescription>Manage and track all company assets</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Asset
                  </Button>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Search assets..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                      <SelectItem value="vehicle">Vehicle</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="it_equipment">IT Equipment</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="disposed">Disposed</SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredAssets.map((asset) => (
                    <div key={asset.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Package className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{asset.name}</h3>
                          <p className="text-sm text-slate-600">{asset.code} • {asset.category}</p>
                          <p className="text-xs text-slate-500">{asset.location} • {asset.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold">${asset.currentValue.toLocaleString()}</p>
                          <p className="text-xs text-slate-500">Current Value</p>
                        </div>
                        <Badge variant={getStatusColor(asset.status)}>
                          {asset.status}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Maintenance Records</CardTitle>
                    <CardDescription>Track asset maintenance and repairs</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule Maintenance
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {maintenanceRecords.map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Wrench className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{record.assetName}</h3>
                          <p className="text-sm text-slate-600">{record.description}</p>
                          <p className="text-xs text-slate-500">Performed by {record.performedBy} on {record.performedDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold">${record.cost}</p>
                          <p className="text-xs text-slate-500">Next: {record.nextMaintenanceDate}</p>
                        </div>
                        <Badge variant={record.status === 'completed' ? 'default' : 'secondary'}>
                          {record.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="depreciation">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Depreciation Tracking</CardTitle>
                    <CardDescription>Monitor asset depreciation and book values</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Record Depreciation
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {depreciationRecords.map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <TrendingDown className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{record.assetName}</h3>
                          <p className="text-sm text-slate-600">{record.method} method</p>
                          <p className="text-xs text-slate-500">Recorded on {record.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold">${record.amount}</p>
                          <p className="text-xs text-slate-500">Book Value: ${record.bookValue}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leases">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Asset Leases</CardTitle>
                    <CardDescription>Manage leased assets and agreements</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Lease
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assetLeases.map((lease) => (
                    <div key={lease.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{lease.assetName}</h3>
                          <p className="text-sm text-slate-600">Lessor: {lease.lessor}</p>
                          <p className="text-xs text-slate-500">{lease.startDate} - {lease.endDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold">${lease.monthlyPayment}/mo</p>
                          <p className="text-xs text-slate-500">{lease.leaseNumber}</p>
                        </div>
                        <Badge variant={lease.status === 'active' ? 'default' : 'secondary'}>
                          {lease.status}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}