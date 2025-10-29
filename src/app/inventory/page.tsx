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
  Package, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  Warehouse,
  Truck
} from "lucide-react"

interface Product {
  id: string
  name: string
  sku: string
  description: string
  category: string
  price: number
  cost: number
  quantity: number
  minStock: number
  maxStock: number
  unit: string
  status: 'in_stock' | 'low_stock' | 'out_of_stock'
  location: string
  supplier?: string
  lastUpdated: string
}

interface Warehouse {
  id: string
  name: string
  location: string
  capacity: number
  currentStock: number
  manager: string
  status: 'active' | 'inactive'
}

interface StockMovement {
  id: string
  productId: string
  productName: string
  type: 'in' | 'out' | 'transfer'
  quantity: number
  fromLocation?: string
  toLocation?: string
  reason: string
  date: string
  user: string
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Laptop Pro 15"',
    sku: 'LP-001',
    description: 'High-performance laptop for professionals',
    category: 'Electronics',
    price: 1499.99,
    cost: 999.99,
    quantity: 45,
    minStock: 10,
    maxStock: 100,
    unit: 'pcs',
    status: 'in_stock',
    location: 'Main Warehouse',
    supplier: 'Tech Supplier Inc.',
    lastUpdated: '2024-01-15'
  },
  {
    id: '2',
    name: 'Wireless Mouse',
    sku: 'WM-002',
    description: 'Ergonomic wireless mouse with long battery life',
    category: 'Accessories',
    price: 29.99,
    cost: 15.99,
    quantity: 8,
    minStock: 20,
    maxStock: 200,
    unit: 'pcs',
    status: 'low_stock',
    location: 'Main Warehouse',
    supplier: 'Tech Supplier Inc.',
    lastUpdated: '2024-01-14'
  },
  {
    id: '3',
    name: 'USB-C Cable',
    sku: 'UC-003',
    description: 'High-speed USB-C charging cable',
    category: 'Accessories',
    price: 12.99,
    cost: 5.99,
    quantity: 0,
    minStock: 50,
    maxStock: 500,
    unit: 'pcs',
    status: 'out_of_stock',
    location: 'Main Warehouse',
    supplier: 'Cable Corp',
    lastUpdated: '2024-01-13'
  }
]

const mockWarehouses: Warehouse[] = [
  {
    id: '1',
    name: 'Main Warehouse',
    location: '123 Industrial Ave, City',
    capacity: 10000,
    currentStock: 3542,
    manager: 'John Smith',
    status: 'active'
  },
  {
    id: '2',
    name: 'East Branch',
    location: '456 Commerce St, East City',
    capacity: 5000,
    currentStock: 1234,
    manager: 'Sarah Johnson',
    status: 'active'
  }
]

const mockStockMovements: StockMovement[] = [
  {
    id: '1',
    productId: '1',
    productName: 'Laptop Pro 15"',
    type: 'in',
    quantity: 10,
    toLocation: 'Main Warehouse',
    reason: 'New shipment received',
    date: '2024-01-15T10:30:00',
    user: 'John Smith'
  },
  {
    id: '2',
    productId: '2',
    productName: 'Wireless Mouse',
    type: 'out',
    quantity: 5,
    fromLocation: 'Main Warehouse',
    reason: 'Customer order #1234',
    date: '2024-01-14T14:20:00',
    user: 'Alice Brown'
  },
  {
    id: '3',
    productId: '1',
    productName: 'Laptop Pro 15"',
    type: 'transfer',
    quantity: 5,
    fromLocation: 'Main Warehouse',
    toLocation: 'East Branch',
    reason: 'Stock transfer between warehouses',
    date: '2024-01-13T09:15:00',
    user: 'Mike Wilson'
  }
]

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [warehouses, setWarehouses] = useState<Warehouse[]>(mockWarehouses)
  const [stockMovements, setStockMovements] = useState<StockMovement[]>(mockStockMovements)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isAddWarehouseOpen, setIsAddWarehouseOpen] = useState(false)
  const [isStockMovementOpen, setIsStockMovementOpen] = useState(false)

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_stock':
        return <Badge className="bg-green-100 text-green-700"><CheckCircle className="w-3 h-3 mr-1" />In Stock</Badge>
      case 'low_stock':
        return <Badge className="bg-yellow-100 text-yellow-700"><AlertTriangle className="w-3 h-3 mr-1" />Low Stock</Badge>
      case 'out_of_stock':
        return <Badge className="bg-red-100 text-red-700"><Clock className="w-3 h-3 mr-1" />Out of Stock</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getMovementTypeBadge = (type: string) => {
    switch (type) {
      case 'in':
        return <Badge className="bg-green-100 text-green-700">Stock In</Badge>
      case 'out':
        return <Badge className="bg-red-100 text-red-700">Stock Out</Badge>
      case 'transfer':
        return <Badge className="bg-blue-100 text-blue-700">Transfer</Badge>
      default:
        return <Badge>{type}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Package className="w-8 h-8 text-orange-700" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Inventory Management</h1>
                <p className="text-slate-600">Track goods in your warehouses from receipt to delivery</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>
                      Create a new product in your inventory system
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="name">Product Name</Label>
                      <Input id="name" placeholder="Enter product name" />
                    </div>
                    <div>
                      <Label htmlFor="sku">SKU</Label>
                      <Input id="sku" placeholder="Enter SKU" />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="electronics">Electronics</SelectItem>
                          <SelectItem value="accessories">Accessories</SelectItem>
                          <SelectItem value="clothing">Clothing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Price ($)</Label>
                        <Input id="price" type="number" placeholder="0.00" />
                      </div>
                      <div>
                        <Label htmlFor="cost">Cost ($)</Label>
                        <Input id="cost" type="number" placeholder="0.00" />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddProductOpen(false)}>
                      Add Product
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog open={isStockMovementOpen} onOpenChange={setIsStockMovementOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Truck className="w-4 h-4 mr-2" />
                    Stock Movement
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Record Stock Movement</DialogTitle>
                    <DialogDescription>
                      Record stock in, out, or transfer between locations
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="product">Product</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map(product => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="movement-type">Movement Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in">Stock In</SelectItem>
                          <SelectItem value="out">Stock Out</SelectItem>
                          <SelectItem value="transfer">Transfer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input id="quantity" type="number" placeholder="0" />
                    </div>
                    <div>
                      <Label htmlFor="reason">Reason</Label>
                      <Textarea id="reason" placeholder="Enter reason for movement" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsStockMovementOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsStockMovementOpen(false)}>
                      Record Movement
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
                <CardTitle className="text-sm font-medium text-slate-600">Total Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{products.length}</div>
                <p className="text-xs text-slate-600">Across all categories</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Low Stock Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {products.filter(p => p.status === 'low_stock').length}
                </div>
                <p className="text-xs text-slate-600">Need replenishment</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Out of Stock</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {products.filter(p => p.status === 'out_of_stock').length}
                </div>
                <p className="text-xs text-slate-600">Require immediate attention</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Total Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">
                  ${products.reduce((sum, p) => sum + (p.quantity * p.cost), 0).toLocaleString()}
                </div>
                <p className="text-xs text-slate-600">Inventory value</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="warehouses">Warehouses</TabsTrigger>
            <TabsTrigger value="movements">Stock Movements</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search products by name or SKU..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Accessories">Accessories</SelectItem>
                      <SelectItem value="Clothing">Clothing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Products Table */}
            <Card>
              <CardHeader>
                <CardTitle>Products Inventory</CardTitle>
                <CardDescription>Manage your product inventory and stock levels</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-slate-600">{product.description}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono">{product.sku}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>
                          <div className="text-right">
                            <div className="font-medium">{product.quantity} {product.unit}</div>
                            <div className="text-xs text-slate-600">
                              Min: {product.minStock}, Max: {product.maxStock}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(product.status)}</TableCell>
                        <TableCell>{product.location}</TableCell>
                        <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
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

          <TabsContent value="warehouses" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Warehouses</h2>
                <p className="text-slate-600">Manage your warehouse locations and capacity</p>
              </div>
              <Dialog open={isAddWarehouseOpen} onOpenChange={setIsAddWarehouseOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Warehouse
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Warehouse</DialogTitle>
                    <DialogDescription>
                      Create a new warehouse location
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="warehouse-name">Warehouse Name</Label>
                      <Input id="warehouse-name" placeholder="Enter warehouse name" />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="Enter warehouse address" />
                    </div>
                    <div>
                      <Label htmlFor="capacity">Capacity</Label>
                      <Input id="capacity" type="number" placeholder="Enter capacity" />
                    </div>
                    <div>
                      <Label htmlFor="manager">Manager</Label>
                      <Input id="manager" placeholder="Enter manager name" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddWarehouseOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddWarehouseOpen(false)}>
                      Add Warehouse
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {warehouses.map((warehouse) => (
                <Card key={warehouse.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Warehouse className="w-5 h-5 text-slate-600" />
                        <CardTitle>{warehouse.name}</CardTitle>
                      </div>
                      <Badge variant={warehouse.status === 'active' ? 'default' : 'secondary'}>
                        {warehouse.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium text-slate-600">Location</Label>
                        <p className="text-sm">{warehouse.location}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-slate-600">Manager</Label>
                        <p className="text-sm">{warehouse.manager}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-slate-600">Capacity</Label>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-slate-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(warehouse.currentStock / warehouse.capacity) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-slate-600">
                            {warehouse.currentStock}/{warehouse.capacity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="movements" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Stock Movements</h2>
              <p className="text-slate-600">Track all inventory movements and transfers</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Movement History</CardTitle>
                <CardDescription>Recent stock movements across all warehouses</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>From/To</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>User</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stockMovements.map((movement) => (
                      <TableRow key={movement.id}>
                        <TableCell>
                          {new Date(movement.date).toLocaleDateString()}
                          <div className="text-xs text-slate-600">
                            {new Date(movement.date).toLocaleTimeString()}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{movement.productName}</TableCell>
                        <TableCell>{getMovementTypeBadge(movement.type)}</TableCell>
                        <TableCell className="text-right">{movement.quantity}</TableCell>
                        <TableCell>
                          {movement.type === 'in' && movement.toLocation && (
                            <span className="text-green-600">To: {movement.toLocation}</span>
                          )}
                          {movement.type === 'out' && movement.fromLocation && (
                            <span className="text-red-600">From: {movement.fromLocation}</span>
                          )}
                          {movement.type === 'transfer' && movement.fromLocation && movement.toLocation && (
                            <span className="text-blue-600">
                              {movement.fromLocation} → {movement.toLocation}
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{movement.reason}</TableCell>
                        <TableCell>{movement.user}</TableCell>
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