'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  ShoppingCart, 
  Plus, 
  Search, 
  Filter,
  TrendingUp,
  Users,
  FileText,
  DollarSign,
  Package
} from "lucide-react"

// Mock data for demonstration
const mockCustomers = [
  { id: "1", code: "CUST001", name: "Acme Corporation", email: "contact@acme.com", phone: "+1-555-0123", status: "active" },
  { id: "2", code: "CUST002", name: "Tech Solutions Ltd", email: "info@techsolutions.com", phone: "+1-555-0456", status: "active" },
  { id: "3", code: "CUST003", name: "Global Industries", email: "sales@globalindustries.com", phone: "+1-555-0789", status: "inactive" },
  { id: "4", code: "CUST004", name: "StartUp Inc", email: "hello@startup.com", phone: "+1-555-0123", status: "active" },
]

const mockQuotes = [
  { id: "1", number: "Q-2024-001", customer: "Acme Corporation", date: "2024-01-15", expiryDate: "2024-02-15", status: "sent", total: 5000 },
  { id: "2", number: "Q-2024-002", customer: "Tech Solutions Ltd", date: "2024-01-16", expiryDate: "2024-02-16", status: "accepted", total: 7500 },
  { id: "3", number: "Q-2024-003", customer: "Global Industries", date: "2024-01-17", expiryDate: "2024-02-17", status: "draft", total: 3200 },
  { id: "4", number: "Q-2024-004", customer: "StartUp Inc", date: "2024-01-18", expiryDate: "2024-02-18", status: "rejected", total: 1800 },
]

const mockSalesOrders = [
  { id: "1", number: "SO-2024-001", customer: "Acme Corporation", date: "2024-01-15", status: "confirmed", total: 5000 },
  { id: "2", number: "SO-2024-002", customer: "Tech Solutions Ltd", date: "2024-01-16", status: "processing", total: 7500 },
  { id: "3", number: "SO-2024-003", customer: "Global Industries", date: "2024-01-17", status: "shipped", total: 3200 },
  { id: "4", number: "SO-2024-004", customer: "StartUp Inc", date: "2024-01-18", status: "delivered", total: 1800 },
]

const mockInvoices = [
  { id: "1", number: "INV-2024-001", customer: "Acme Corporation", date: "2024-01-15", dueDate: "2024-02-15", status: "sent", total: 5000, paidAmount: 0 },
  { id: "2", number: "INV-2024-002", customer: "Tech Solutions Ltd", date: "2024-01-16", dueDate: "2024-02-16", status: "paid", total: 7500, paidAmount: 7500 },
  { id: "3", number: "INV-2024-003", customer: "Global Industries", date: "2024-01-17", dueDate: "2024-02-17", status: "overdue", total: 3200, paidAmount: 0 },
  { id: "4", number: "INV-2024-004", customer: "StartUp Inc", date: "2024-01-18", dueDate: "2024-02-18", status: "sent", total: 1800, paidAmount: 0 },
]

export default function Sales() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const totalRevenue = mockInvoices
    .filter(inv => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.paidAmount, 0)
  
  const outstandingInvoices = mockInvoices
    .filter(inv => inv.status !== "paid")
    .reduce((sum, inv) => sum + (inv.total - inv.paidAmount), 0)

  const activeCustomers = mockCustomers.filter(cust => cust.status === "active").length
  const pendingOrders = mockSalesOrders.filter(order => order.status === "confirmed" || order.status === "processing").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-green-700" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Sales</h1>
          </div>
          <p className="text-slate-600">Manage customers, quotes, orders, and invoices</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Outstanding Invoices</CardTitle>
              <FileText className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${outstandingInvoices.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Awaiting payment</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeCustomers}</div>
              <p className="text-xs text-muted-foreground">Total customers</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <Package className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingOrders}</div>
              <p className="text-xs text-muted-foreground">To be fulfilled</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="customers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="quotes">Quotes</TabsTrigger>
            <TabsTrigger value="orders">Sales Orders</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
          </TabsList>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Customers</CardTitle>
                    <CardDescription>Manage your customer information</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        New Customer
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Customer</DialogTitle>
                        <DialogDescription>
                          Add a new customer to your database
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input placeholder="Customer Code" />
                        <Input placeholder="Customer Name" />
                        <Input placeholder="Email" />
                        <Input placeholder="Phone" />
                        <Input placeholder="Address" />
                        <Button className="w-full">Create Customer</Button>
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
                      placeholder="Search customers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Code</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.code}</TableCell>
                        <TableCell>{customer.name}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.phone}</TableCell>
                        <TableCell>
                          <Badge variant={customer.status === "active" ? "default" : "secondary"}>
                            {customer.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quotes Tab */}
          <TabsContent value="quotes" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Quotes</CardTitle>
                    <CardDescription>Manage customer quotes and proposals</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    New Quote
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Number</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockQuotes.map((quote) => (
                      <TableRow key={quote.id}>
                        <TableCell className="font-medium">{quote.number}</TableCell>
                        <TableCell>{quote.customer}</TableCell>
                        <TableCell>{quote.date}</TableCell>
                        <TableCell>{quote.expiryDate}</TableCell>
                        <TableCell>
                          <Badge variant={
                            quote.status === "accepted" ? "default" : 
                            quote.status === "rejected" ? "destructive" : 
                            quote.status === "sent" ? "secondary" : "outline"
                          }>
                            {quote.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">${quote.total.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sales Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Sales Orders</CardTitle>
                    <CardDescription>Track and manage customer orders</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    New Sales Order
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Number</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockSalesOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.number}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <Badge variant={
                            order.status === "delivered" ? "default" : 
                            order.status === "shipped" ? "secondary" : 
                            order.status === "processing" ? "outline" : "default"
                          }>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">${order.total.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Invoices Tab */}
          <TabsContent value="invoices" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Invoices</CardTitle>
                    <CardDescription>Manage customer invoices and payments</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    New Invoice
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Number</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right">Paid</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.number}</TableCell>
                        <TableCell>{invoice.customer}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.dueDate}</TableCell>
                        <TableCell>
                          <Badge variant={
                            invoice.status === "paid" ? "default" : 
                            invoice.status === "overdue" ? "destructive" : 
                            invoice.status === "sent" ? "secondary" : "outline"
                          }>
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">${invoice.total.toLocaleString()}</TableCell>
                        <TableCell className="text-right">${invoice.paidAmount.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">View</Button>
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