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
import { 
  Shield, 
  Plus, 
  Search, 
  Filter,
  Calculator,
  FileText,
  Globe,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from "lucide-react"

// Types for API responses
interface TaxJurisdiction {
  id: string
  name: string
  type: string
  countryCode: string
  rate: number
  isActive: boolean
}

interface TaxCalculation {
  id: string
  referenceId: string
  referenceType: string
  jurisdiction: TaxJurisdiction
  taxType: string
  taxableAmount: number
  taxAmount: number
  status: string
  createdAt: string
}

interface TaxReturn {
  id: string
  jurisdiction: string
  period: string
  dueDate: string
  status: string
  amount: number
}

export default function TaxRegulatoryCompliance() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [jurisdictions, setJurisdictions] = useState<TaxJurisdiction[]>([])
  const [calculations, setCalculations] = useState<TaxCalculation[]>([])
  const [returns, setReturns] = useState<TaxReturn[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch jurisdictions
      const jurisdictionsResponse = await fetch('/api/tax/jurisdictions')
      if (jurisdictionsResponse.ok) {
        const jurisdictionsData = await jurisdictionsResponse.json()
        setJurisdictions(jurisdictionsData.jurisdictions || [])
      }

      // Fetch calculations
      const calculationsResponse = await fetch('/api/tax/calculations')
      if (calculationsResponse.ok) {
        const calculationsData = await calculationsResponse.json()
        setCalculations(calculationsData.calculations || [])
      }

      // Mock returns data (would be from API in real implementation)
      setReturns([
        { id: "1", jurisdiction: "US Federal", period: "Q4 2023", dueDate: "2024-01-31", status: "filed", amount: 21000 },
        { id: "2", jurisdiction: "California", period: "Q4 2023", dueDate: "2024-01-31", status: "pending", amount: 8840 },
        { id: "3", jurisdiction: "UK VAT", period: "December 2023", dueDate: "2024-01-20", status: "overdue", amount: 10000 },
        { id: "4", jurisdiction: "Germany VAT", period: "December 2023", dueDate: "2024-01-10", status: "filed", amount: 14250 },
      ])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredJurisdictions = jurisdictions.filter(jurisdiction => {
    const matchesSearch = jurisdiction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         jurisdiction.countryCode.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || jurisdiction.type === selectedType
    return matchesSearch && matchesType
  })

  const totalTaxLiability = calculations
    .filter(calc => calc.status === "completed")
    .reduce((sum, calc) => sum + calc.taxAmount, 0)
  
  const pendingCalculations = calculations.filter(calc => calc.status === "pending").length
  const overdueReturns = returns.filter(ret => ret.status === "overdue").length
  const activeJurisdictions = jurisdictions.filter(jur => jur.isActive).length

  const handleCalculateTax = async () => {
    try {
      const response = await fetch('/api/tax/calculations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'calculate',
          amount: 100000,
          jurisdictionId: jurisdictions[0]?.id || '1',
          referenceType: 'invoice'
        })
      })
      
      if (response.ok) {
        const result = await response.json()
        alert(`Tax calculated: $${result.taxAmount}`)
        fetchData() // Refresh data
      }
    } catch (error) {
      console.error('Error calculating tax:', error)
      alert('Error calculating tax')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <Shield className="w-6 h-6 text-red-700" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Tax & Regulatory Compliance</h1>
          </div>
          <p className="text-slate-600">Manage tax jurisdictions, calculations, and regulatory compliance across multiple regions</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tax Liability</CardTitle>
              <Calculator className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalTaxLiability.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Current period</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Calculations</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingCalculations}</div>
              <p className="text-xs text-muted-foreground">Awaiting processing</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue Returns</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overdueReturns}</div>
              <p className="text-xs text-muted-foreground">Require immediate attention</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Jurisdictions</CardTitle>
              <Globe className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeJurisdictions}</div>
              <p className="text-xs text-muted-foreground">Tax regions configured</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="jurisdictions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="jurisdictions">Tax Jurisdictions</TabsTrigger>
            <TabsTrigger value="calculations">Tax Calculations</TabsTrigger>
            <TabsTrigger value="returns">Tax Returns</TabsTrigger>
            <TabsTrigger value="reports">Compliance Reports</TabsTrigger>
          </TabsList>

          {/* Tax Jurisdictions Tab */}
          <TabsContent value="jurisdictions" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Tax Jurisdictions</CardTitle>
                    <CardDescription>Manage tax rates and rules for different regions</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        New Jurisdiction
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Tax Jurisdiction</DialogTitle>
                        <DialogDescription>
                          Configure a new tax jurisdiction with rates and rules
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input placeholder="Jurisdiction Name" />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Tax Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="federal">Federal Income Tax</SelectItem>
                            <SelectItem value="state">State Income Tax</SelectItem>
                            <SelectItem value="vat">Value Added Tax (VAT)</SelectItem>
                            <SelectItem value="gst">Goods and Services Tax (GST)</SelectItem>
                            <SelectItem value="sales">Sales Tax</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input placeholder="Country Code" />
                        <Input placeholder="Tax Rate (%)" type="number" />
                        <Button className="w-full">Add Jurisdiction</Button>
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
                      placeholder="Search jurisdictions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="federal">Federal</SelectItem>
                      <SelectItem value="state">State</SelectItem>
                      <SelectItem value="vat">VAT</SelectItem>
                      <SelectItem value="gst">GST</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead className="text-right">Tax Rate</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredJurisdictions.map((jurisdiction) => (
                      <TableRow key={jurisdiction.id}>
                        <TableCell className="font-medium">{jurisdiction.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {jurisdiction.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{jurisdiction.countryCode}</TableCell>
                        <TableCell className="text-right font-medium">
                          ${jurisdiction.rate}%
                        </TableCell>
                        <TableCell>
                          <Badge variant={jurisdiction.isActive ? "default" : "secondary"}>
                            {jurisdiction.isActive ? "Active" : "Inactive"}
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

          {/* Tax Calculations Tab */}
          <TabsContent value="calculations" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Tax Calculations</CardTitle>
                    <CardDescription>View and manage automated tax calculations</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleCalculateTax}>
                      <Calculator className="w-4 h-4 mr-2" />
                      Test Calculate
                    </Button>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      New Calculation
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Jurisdiction</TableHead>
                      <TableHead>Tax Type</TableHead>
                      <TableHead className="text-right">Base Amount</TableHead>
                      <TableHead className="text-right">Calculated Tax</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {calculations.map((calculation) => (
                      <TableRow key={calculation.id}>
                        <TableCell className="font-medium">{calculation.jurisdiction?.name || 'Unknown'}</TableCell>
                        <TableCell>{calculation.taxType}</TableCell>
                        <TableCell className="text-right">${calculation.taxableAmount.toLocaleString()}</TableCell>
                        <TableCell className="text-right font-medium">${calculation.taxAmount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={
                            calculation.status === "completed" ? "default" :
                            calculation.status === "processing" ? "secondary" : "outline"
                          }>
                            {calculation.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(calculation.createdAt).toLocaleDateString()}</TableCell>
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

          {/* Tax Returns Tab */}
          <TabsContent value="returns" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Tax Returns</CardTitle>
                    <CardDescription>Track filing status and due dates for tax returns</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    File Return
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Jurisdiction</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {returns.map((taxReturn) => (
                      <TableRow key={taxReturn.id}>
                        <TableCell className="font-medium">{taxReturn.jurisdiction}</TableCell>
                        <TableCell>{taxReturn.period}</TableCell>
                        <TableCell>{taxReturn.dueDate}</TableCell>
                        <TableCell className="text-right font-medium">${taxReturn.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={
                            taxReturn.status === "filed" ? "default" :
                            taxReturn.status === "pending" ? "secondary" : "destructive"
                          }>
                            {taxReturn.status}
                          </Badge>
                        </TableCell>
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

          {/* Compliance Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Tax Summary Report
                  </CardTitle>
                  <CardDescription>Comprehensive overview of all tax obligations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Jurisdictions:</span>
                      <span className="font-medium">{jurisdictions.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Tax Liability:</span>
                      <span className="font-medium">${totalTaxLiability.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Overdue Returns:</span>
                      <span className="font-medium text-red-600">{overdueReturns}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4">Generate Report</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Compliance Status
                  </CardTitle>
                  <CardDescription>Current compliance standing across all jurisdictions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Federal Compliance: Complete</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      <span>State Compliance: Attention Required</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>International Compliance: Complete</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4">View Details</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}