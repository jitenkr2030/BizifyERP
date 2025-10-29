'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  ShoppingCart, 
  Package, 
  Users, 
  DollarSign, 
  Truck, 
  Sync,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  Database,
  CreditCard,
  MapPin,
  Box,
  Star
} from "lucide-react"

interface EcommerceChannel {
  id: string
  name: string
  type: string
  status: string
  lastSync: string
  products: number
  orders: number
  connected: boolean
}

interface EcommerceOrder {
  id: string
  orderNumber: string
  channel: string
  customer: string
  amount: string
  status: string
  orderDate: string
  fulfillmentStatus: string
}

interface EcommerceProduct {
  id: string
  sku: string
  name: string
  price: string
  stock: number
  channel: string
  status: string
  lastUpdated: string
}

interface SyncLog {
  id: string
  type: string
  channel: string
  status: string
  startTime: string
  endTime: string
  recordsProcessed: number
  errors: number
}

interface PricingRule {
  id: string
  name: string
  channel: string
  productType: string
  basePrice: number
  currentPrice: number
  strategy: string
  margin: number
  competitionPrice: number
  lastUpdated: string
  active: boolean
}

interface UnifiedCustomer {
  id: string
  name: string
  email: string
  totalOrders: number
  totalSpent: string
  lastOrderDate: string
  channels: string[]
  loyaltyStatus: string
  location: string
  joinedDate: string
}

export default function EcommerceIntegration() {
  const [channels, setChannels] = useState<EcommerceChannel[]>([])
  const [orders, setOrders] = useState<EcommerceOrder[]>([])
  const [products, setProducts] = useState<EcommerceProduct[]>([])
  const [syncLogs, setSyncLogs] = useState<SyncLog[]>([])
  const [pricingRules, setPricingRules] = useState<PricingRule[]>([])
  const [unifiedCustomers, setUnifiedCustomers] = useState<UnifiedCustomer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching data
    const mockChannels: EcommerceChannel[] = [
      {
        id: '1',
        name: 'Amazon Store',
        type: 'Marketplace',
        status: 'active',
        lastSync: '2024-01-15 14:30',
        products: 245,
        orders: 1234,
        connected: true
      },
      {
        id: '2',
        name: 'Shopify Store',
        type: 'E-commerce Platform',
        status: 'active',
        lastSync: '2024-01-15 14:25',
        products: 189,
        orders: 892,
        connected: true
      },
      {
        id: '3',
        name: 'eBay Store',
        type: 'Marketplace',
        status: 'active',
        lastSync: '2024-01-15 13:45',
        products: 156,
        orders: 567,
        connected: true
      },
      {
        id: '4',
        name: 'WooCommerce',
        type: 'E-commerce Platform',
        status: 'error',
        lastSync: '2024-01-15 10:15',
        products: 98,
        orders: 234,
        connected: false
      }
    ]

    const mockOrders: EcommerceOrder[] = [
      {
        id: '1',
        orderNumber: 'AMZ-2024-001234',
        channel: 'Amazon',
        customer: 'John Smith',
        amount: '$156.99',
        status: 'processing',
        orderDate: '2024-01-15',
        fulfillmentStatus: 'unfulfilled'
      },
      {
        id: '2',
        orderNumber: 'SHO-2024-005678',
        channel: 'Shopify',
        customer: 'Sarah Johnson',
        amount: '$89.50',
        status: 'fulfilled',
        orderDate: '2024-01-14',
        fulfillmentStatus: 'delivered'
      },
      {
        id: '3',
        orderNumber: 'EBY-2024-009012',
        channel: 'eBay',
        customer: 'Mike Wilson',
        amount: '$234.00',
        status: 'shipped',
        orderDate: '2024-01-14',
        fulfillmentStatus: 'in_transit'
      },
      {
        id: '4',
        orderNumber: 'AMZ-2024-001235',
        channel: 'Amazon',
        customer: 'Emily Davis',
        amount: '$67.25',
        status: 'pending',
        orderDate: '2024-01-15',
        fulfillmentStatus: 'unfulfilled'
      },
      {
        id: '5',
        orderNumber: 'SHO-2024-005679',
        channel: 'Shopify',
        customer: 'Robert Brown',
        amount: '$145.80',
        status: 'processing',
        orderDate: '2024-01-15',
        fulfillmentStatus: 'unfulfilled'
      }
    ]

    const mockProducts: EcommerceProduct[] = [
      {
        id: '1',
        sku: 'PRD-001',
        name: 'Wireless Bluetooth Headphones',
        price: '$79.99',
        stock: 45,
        channel: 'Amazon',
        status: 'active',
        lastUpdated: '2024-01-15'
      },
      {
        id: '2',
        sku: 'PRD-002',
        name: 'Smartphone Case',
        price: '$24.99',
        stock: 120,
        channel: 'Shopify',
        status: 'active',
        lastUpdated: '2024-01-15'
      },
      {
        id: '3',
        sku: 'PRD-003',
        name: 'Laptop Stand',
        price: '$34.99',
        stock: 8,
        channel: 'eBay',
        status: 'low_stock',
        lastUpdated: '2024-01-14'
      },
      {
        id: '4',
        sku: 'PRD-004',
        name: 'USB-C Cable',
        price: '$12.99',
        stock: 0,
        channel: 'Amazon',
        status: 'out_of_stock',
        lastUpdated: '2024-01-13'
      }
    ]

    const mockSyncLogs: SyncLog[] = [
      {
        id: '1',
        type: 'Product Sync',
        channel: 'Amazon',
        status: 'completed',
        startTime: '2024-01-15 14:30',
        endTime: '2024-01-15 14:32',
        recordsProcessed: 245,
        errors: 0
      },
      {
        id: '2',
        type: 'Order Sync',
        channel: 'Shopify',
        status: 'completed',
        startTime: '2024-01-15 14:25',
        endTime: '2024-01-15 14:27',
        recordsProcessed: 45,
        errors: 0
      },
      {
        id: '3',
        type: 'Inventory Sync',
        channel: 'eBay',
        status: 'completed',
        startTime: '2024-01-15 13:45',
        endTime: '2024-01-15 13:47',
        recordsProcessed: 156,
        errors: 2
      },
      {
        id: '4',
        type: 'Product Sync',
        channel: 'WooCommerce',
        status: 'failed',
        startTime: '2024-01-15 10:15',
        endTime: '2024-01-15 10:18',
        recordsProcessed: 0,
        errors: 1
      }
    ]

    const mockPricingRules: PricingRule[] = [
      {
        id: '1',
        name: 'Electronics Competitive Pricing',
        channel: 'Amazon',
        productType: 'Electronics',
        basePrice: 79.99,
        currentPrice: 74.99,
        strategy: 'Competitive Match',
        margin: 6.3,
        competitionPrice: 75.99,
        lastUpdated: '2024-01-15 14:30',
        active: true
      },
      {
        id: '2',
        name: 'Premium Accessories Markup',
        channel: 'Shopify',
        productType: 'Accessories',
        basePrice: 24.99,
        currentPrice: 29.99,
        strategy: 'Premium Markup',
        margin: 20.0,
        competitionPrice: 26.99,
        lastUpdated: '2024-01-15 13:45',
        active: true
      },
      {
        id: '3',
        name: 'Dynamic Pricing Rule',
        channel: 'eBay',
        productType: 'Home & Garden',
        basePrice: 34.99,
        currentPrice: 32.99,
        strategy: 'Dynamic Pricing',
        margin: 5.7,
        competitionPrice: 33.99,
        lastUpdated: '2024-01-15 12:30',
        active: true
      }
    ]

    const mockUnifiedCustomers: UnifiedCustomer[] = [
      {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@email.com',
        totalOrders: 12,
        totalSpent: '$1,234.56',
        lastOrderDate: '2024-01-15',
        channels: ['Amazon', 'Shopify'],
        loyaltyStatus: 'Gold',
        location: 'New York, NY',
        joinedDate: '2023-06-15'
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        totalOrders: 8,
        totalSpent: '$892.34',
        lastOrderDate: '2024-01-14',
        channels: ['Shopify', 'eBay'],
        loyaltyStatus: 'Silver',
        location: 'Los Angeles, CA',
        joinedDate: '2023-08-22'
      },
      {
        id: '3',
        name: 'Mike Wilson',
        email: 'mike.wilson@email.com',
        totalOrders: 15,
        totalSpent: '$2,156.78',
        lastOrderDate: '2024-01-14',
        channels: ['Amazon', 'eBay', 'WooCommerce'],
        loyaltyStatus: 'Platinum',
        location: 'Chicago, IL',
        joinedDate: '2023-03-10'
      },
      {
        id: '4',
        name: 'Emily Davis',
        email: 'emily.davis@email.com',
        totalOrders: 5,
        totalSpent: '$456.23',
        lastOrderDate: '2024-01-15',
        channels: ['Amazon'],
        loyaltyStatus: 'Bronze',
        location: 'Miami, FL',
        joinedDate: '2023-11-05'
      }
    ]

    setChannels(mockChannels)
    setOrders(mockOrders)
    setProducts(mockProducts)
    setSyncLogs(mockSyncLogs)
    setPricingRules(mockPricingRules)
    setUnifiedCustomers(mockUnifiedCustomers)
    setLoading(false)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'processing': return 'bg-blue-100 text-blue-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'fulfilled': return 'bg-green-100 text-green-700'
      case 'shipped': return 'bg-blue-100 text-blue-700'
      case 'error': return 'bg-red-100 text-red-700'
      case 'failed': return 'bg-red-100 text-red-700'
      case 'completed': return 'bg-green-100 text-green-700'
      case 'low_stock': return 'bg-yellow-100 text-yellow-700'
      case 'out_of_stock': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'Marketplace': return <ShoppingCart className="h-5 w-5" />
      case 'E-commerce Platform': return <ExternalLink className="h-5 w-5" />
      default: return <Database className="h-5 w-5" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-slate-900 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading E-commerce Integration...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">E-commerce Integration</h1>
              <p className="text-slate-600 mt-2">Multi-channel sales management and automation</p>
            </div>
            <div className="flex gap-3">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Channel
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Sync className="h-4 w-4" />
                Sync All
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Active Channels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">4</div>
              <p className="text-xs text-slate-600">3 connected</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <Package className="h-4 w-4" />
                Total Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">688</div>
              <p className="text-xs text-slate-600">Across all channels</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Monthly Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">$45.2K</div>
              <p className="text-xs text-slate-600">+18% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Orders Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">47</div>
              <p className="text-xs text-slate-600">12 pending fulfillment</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="channels" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="channels">Channels</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="sync">Sync Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="channels" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {channels.map((channel) => (
                <Card key={channel.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg">
                          {getChannelIcon(channel.type)}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{channel.name}</CardTitle>
                          <CardDescription>{channel.type}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {channel.connected ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                        )}
                        <Badge className={getStatusColor(channel.status)}>
                          {channel.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-600">Products:</span>
                          <span className="font-medium ml-2">{channel.products}</span>
                        </div>
                        <div>
                          <span className="text-slate-600">Orders:</span>
                          <span className="font-medium ml-2">{channel.orders}</span>
                        </div>
                        <div>
                          <span className="text-slate-600">Last Sync:</span>
                          <span className="font-medium ml-2">{channel.lastSync}</span>
                        </div>
                        <div>
                          <span className="text-slate-600">Status:</span>
                          <span className="font-medium ml-2">
                            {channel.connected ? 'Connected' : 'Disconnected'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Settings className="h-4 w-4 mr-1" />
                          Configure
                        </Button>
                        <Button variant="outline" size="sm">
                          <Sync className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Orders from all connected channels</CardDescription>
                  </div>
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Export Orders
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order #</TableHead>
                      <TableHead>Channel</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Fulfillment</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.orderNumber}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{order.channel}</Badge>
                        </TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell className="font-medium">{order.amount}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            order.fulfillmentStatus === 'delivered' ? 'bg-green-100 text-green-700' :
                            order.fulfillmentStatus === 'in_transit' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                          }>
                            {order.fulfillmentStatus.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>{order.orderDate}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
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

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Product Catalog</CardTitle>
                    <CardDescription>Manage products across all channels</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>SKU</TableHead>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Channel</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.sku}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell className="font-medium">{product.price}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{product.stock}</span>
                            {product.stock <= 10 && (
                              <AlertTriangle className="h-4 w-4 text-yellow-500" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{product.channel}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(product.status)}>
                            {product.status.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>{product.lastUpdated}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Sync className="h-4 w-4" />
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

          <TabsContent value="pricing" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Dynamic Pricing Management</CardTitle>
                    <CardDescription>Automated pricing strategies across all channels</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Pricing Rule
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rule Name</TableHead>
                      <TableHead>Channel</TableHead>
                      <TableHead>Product Type</TableHead>
                      <TableHead>Base Price</TableHead>
                      <TableHead>Current Price</TableHead>
                      <TableHead>Strategy</TableHead>
                      <TableHead>Margin</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pricingRules.map((rule) => (
                      <TableRow key={rule.id}>
                        <TableCell className="font-medium">{rule.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{rule.channel}</Badge>
                        </TableCell>
                        <TableCell>{rule.productType}</TableCell>
                        <TableCell className="font-medium">${rule.basePrice.toFixed(2)}</TableCell>
                        <TableCell className="font-medium">${rule.currentPrice.toFixed(2)}</TableCell>
                        <TableCell>{rule.strategy}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{rule.margin}%</span>
                            {rule.margin > 15 ? (
                              <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={rule.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                            {rule.active ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pricing Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Competitive Match Rate</span>
                        <span className="font-medium">87%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Average Margin</span>
                        <span className="font-medium">12.5%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '62.5%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Price Update Frequency</span>
                        <span className="font-medium">4.2/day</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '84%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Competition Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Below Competition</span>
                      <Badge className="bg-green-100 text-green-700">23%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">At Competition</span>
                      <Badge className="bg-blue-100 text-blue-700">64%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Above Competition</span>
                      <Badge className="bg-yellow-100 text-yellow-700">13%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Revenue Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Revenue Increase</span>
                      <span className="font-medium text-green-600">+18.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Volume Increase</span>
                      <span className="font-medium text-blue-600">+12.3%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Margin Protection</span>
                      <span className="font-medium text-purple-600">+2.1%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Unified Customer View</CardTitle>
                    <CardDescription>Single customer profile across all channels</CardDescription>
                  </div>
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Export Customers
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Total Orders</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead>Channels</TableHead>
                      <TableHead>Loyalty Status</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {unifiedCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.totalOrders}</TableCell>
                        <TableCell className="font-medium">{customer.totalSpent}</TableCell>
                        <TableCell>
                          <div className="flex gap-1 flex-wrap">
                            {customer.channels.map((channel, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {channel}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            customer.loyaltyStatus === 'Platinum' ? 'bg-purple-100 text-purple-700' :
                            customer.loyaltyStatus === 'Gold' ? 'bg-yellow-100 text-yellow-700' :
                            customer.loyaltyStatus === 'Silver' ? 'bg-gray-100 text-gray-700' :
                            'bg-orange-100 text-orange-700'
                          }>
                            {customer.loyaltyStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{customer.location}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <CreditCard className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Total Customers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">2,847</div>
                  <p className="text-xs text-slate-600">+15% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Multi-channel
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">1,234</div>
                  <p className="text-xs text-slate-600">43% of customers</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Loyalty Members
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">892</div>
                  <p className="text-xs text-slate-600">31% of customers</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Avg. Order Value
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">$127</div>
                  <p className="text-xs text-slate-600">+8% from last month</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sync" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Sync Logs</CardTitle>
                    <CardDescription>Monitor data synchronization across channels</CardDescription>
                  </div>
                  <Button>
                    <Sync className="h-4 w-4 mr-2" />
                    Sync All Channels
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {syncLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-slate-100 rounded-lg">
                          <Sync className="h-5 w-5 text-slate-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{log.type}</h3>
                          <div className="flex items-center gap-4 text-sm text-slate-600 mt-1">
                            <span>{log.channel}</span>
                            <span>•</span>
                            <span>{log.startTime} - {log.endTime}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right text-sm">
                          <div className="text-slate-600">Processed: {log.recordsProcessed}</div>
                          {log.errors > 0 && (
                            <div className="text-red-600">Errors: {log.errors}</div>
                          )}
                        </div>
                        <Badge className={getStatusColor(log.status)}>
                          {log.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
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