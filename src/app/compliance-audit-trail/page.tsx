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
  FileText, 
  Plus, 
  Search, 
  Filter,
  Shield,
  Fingerprint,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  Download
} from "lucide-react"

// Types for API responses
interface AuditLog {
  id: string
  action: string
  user?: {
    id: string
    name: string
    email: string
  }
  resource: string
  ipAddress: string
  status: string
  severity: string
  createdAt: string
}

interface SignatureRequest {
  id: string
  documentName: string
  documentType: string
  signers: any[]
  status: string
  createdAt: string
  expiresAt?: string
  signatureResponses?: any[]
}

interface ApprovalWorkflow {
  id: string
  name: string
  description: string
  status: string
  approvers: string[]
  totalRequests: number
  pendingRequests: number
}

export default function ComplianceAuditTrail() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSeverity, setSelectedSeverity] = useState("all")
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  const [signatureRequests, setSignatureRequests] = useState<SignatureRequest[]>([])
  const [approvalWorkflows, setApprovalWorkflows] = useState<ApprovalWorkflow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch audit logs
      const auditResponse = await fetch('/api/audit/logs')
      if (auditResponse.ok) {
        const auditData = await auditResponse.json()
        setAuditLogs(auditData.logs || [])
      }

      // Fetch signature requests
      const signatureResponse = await fetch('/api/signature/requests')
      if (signatureResponse.ok) {
        const signatureData = await signatureResponse.json()
        setSignatureRequests(signatureData.requests || [])
      }

      // Mock approval workflows (would be from API in real implementation)
      setApprovalWorkflows([
        { 
          id: "1", 
          name: "Expense Approval", 
          description: "Approve employee expense reports", 
          status: "active", 
          approvers: ["manager@company.com", "finance@company.com"], 
          totalRequests: 45,
          pendingRequests: 12
        },
        { 
          id: "2", 
          name: "Document Approval", 
          description: "Review and approve company documents", 
          status: "active", 
          approvers: ["legal@company.com", "compliance@company.com"], 
          totalRequests: 23,
          pendingRequests: 5
        },
        { 
          id: "3", 
          name: "Purchase Order Approval", 
          description: "Authorize purchase orders over $1000", 
          status: "active", 
          approvers: ["procurement@company.com", "finance@company.com"], 
          totalRequests: 67,
          pendingRequests: 8
        },
      ])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredAuditLogs = auditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (log.user?.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeverity = selectedSeverity === "all" || log.severity === selectedSeverity
    return matchesSearch && matchesSeverity
  })

  const totalAuditEvents = auditLogs.length
  const criticalEvents = auditLogs.filter(log => log.severity === "critical").length
  const pendingSignatures = signatureRequests.filter(req => req.status === "pending").length
  const activeWorkflows = approvalWorkflows.filter(workflow => workflow.status === "active").length

  const handleCreateSignatureRequest = async () => {
    try {
      const response = await fetch('/api/signature/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documentId: 'doc-' + Date.now(),
          documentType: 'contract',
          signers: JSON.stringify([
            { email: 'signer1@example.com', name: 'John Doe', order: 1 },
            { email: 'signer2@example.com', name: 'Jane Smith', order: 2 }
          ]),
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          provider: 'docusign',
          metadata: JSON.stringify({ priority: 'high' })
        })
      })
      
      if (response.ok) {
        const result = await response.json()
        alert(`Signature request created: ${result.id}`)
        fetchData() // Refresh data
      }
    } catch (error) {
      console.error('Error creating signature request:', error)
      alert('Error creating signature request')
    }
  }

  const handleSignDocument = async (requestId: string) => {
    try {
      const response = await fetch(`/api/signature/requests/${requestId}/sign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          signerEmail: 'signer1@example.com',
          signatureData: {
            signature: 'mock-signature-data',
            timestamp: new Date().toISOString(),
            ipAddress: '192.168.1.100'
          }
        })
      })
      
      if (response.ok) {
        const result = await response.json()
        alert(`Document signed successfully: ${result.allSigned ? 'All signatures complete' : 'Signature recorded'}`)
        fetchData() // Refresh data
      }
    } catch (error) {
      console.error('Error signing document:', error)
      alert('Error signing document')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <FileText className="w-6 h-6 text-indigo-700" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Compliance / Audit Trail & eSignature</h1>
          </div>
          <p className="text-slate-600">Immutable audit logs, electronic signatures, and role-based approval workflows</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Audit Events</CardTitle>
              <Shield className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAuditEvents}</div>
              <p className="text-xs text-muted-foreground">Tracked activities</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Events</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{criticalEvents}</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Signatures</CardTitle>
              <Fingerprint className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingSignatures}</div>
              <p className="text-xs text-muted-foreground">Awaiting completion</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeWorkflows}</div>
              <p className="text-xs text-muted-foreground">Approval processes</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="audit-logs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="audit-logs">Audit Logs</TabsTrigger>
            <TabsTrigger value="esignature">eSignature</TabsTrigger>
            <TabsTrigger value="workflows">Approval Workflows</TabsTrigger>
            <TabsTrigger value="compliance">Compliance Reports</TabsTrigger>
          </TabsList>

          {/* Audit Logs Tab */}
          <TabsContent value="audit-logs" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Audit Logs</CardTitle>
                    <CardDescription>Immutable audit trail of all system activities</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Search audit logs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Severities</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Resource</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAuditLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                        <TableCell className="font-medium">{log.action}</TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell className="font-mono text-sm">{log.resource}</TableCell>
                        <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
                        <TableCell>
                          <Badge variant={log.status === "success" ? "default" : "destructive"}>
                            {log.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            log.severity === "critical" ? "destructive" :
                            log.severity === "warning" ? "secondary" : "outline"
                          }>
                            {log.severity}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* eSignature Tab */}
          <TabsContent value="esignature" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Electronic Signatures</CardTitle>
                    <CardDescription>Manage document signing requests and track status</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        New Signature Request
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create Signature Request</DialogTitle>
                        <DialogDescription>
                          Send a document for electronic signature
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input placeholder="Document Name" id="documentName" />
                        <Input placeholder="Document Type" id="documentType" />
                        <Input placeholder="Signer Email (comma-separated)" id="signerEmails" />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Provider" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="docusign">DocuSign</SelectItem>
                            <SelectItem value="adobe">Adobe Sign</SelectItem>
                            <SelectItem value="hellosign">HelloSign</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input placeholder="Due Date" type="date" id="dueDate" />
                        <Button className="w-full" onClick={handleCreateSignatureRequest}>Send Request</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document Name</TableHead>
                      <TableHead>Requester</TableHead>
                      <TableHead>Signers</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {signatureRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.documentName || request.documentType}</TableCell>
                        <TableCell>System</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            {request.signers?.map((signer, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {signer.name || signer.email}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{new Date(request.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{request.expiresAt ? new Date(request.expiresAt).toLocaleDateString() : 'No expiry'}</TableCell>
                        <TableCell>
                          <Badge variant="outline">medium</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            request.status === "signed" ? "default" :
                            request.status === "pending" ? "secondary" : "outline"
                          }>
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleSignDocument(request.id)}
                              disabled={request.status === "signed"}
                            >
                              <Fingerprint className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">View</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Approval Workflows Tab */}
          <TabsContent value="workflows" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Approval Workflows</CardTitle>
                    <CardDescription>Configure and manage role-based approval processes</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    New Workflow
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {approvalWorkflows.map((workflow) => (
                    <Card key={workflow.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{workflow.name}</CardTitle>
                        <CardDescription>{workflow.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Status:</span>
                            <Badge variant={workflow.status === "active" ? "default" : "secondary"}>
                              {workflow.status}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <span className="text-sm font-medium">Approvers:</span>
                            <div className="flex flex-col gap-1">
                              {workflow.approvers.map((approver, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {approver}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Total Requests:</span>
                            <span className="font-medium">{workflow.totalRequests}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Pending:</span>
                            <span className="font-medium text-yellow-600">{workflow.pendingRequests}</span>
                          </div>
                          <Button className="w-full" variant="outline">Manage Workflow</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compliance Reports Tab */}
          <TabsContent value="compliance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Audit Summary
                  </CardTitle>
                  <CardDescription>Overview of audit activities and compliance status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Events Logged:</span>
                      <span className="font-medium">{totalAuditEvents}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Critical Events:</span>
                      <span className="font-medium text-red-600">{criticalEvents}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Success Rate:</span>
                      <span className="font-medium text-green-600">
                        {Math.round((auditLogs.filter(log => log.status === "success").length / totalAuditEvents) * 100)}%
                      </span>
                    </div>
                  </div>
                  <Button className="w-full mt-4">Generate Report</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Compliance Status
                  </CardTitle>
                  <CardDescription>Current compliance standing and certification status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>SOC 2 Type II: Certified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>GDPR: Compliant</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      <span>ISO 27001: In Progress</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>ESIGN Act: Compliant</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4">View Certifications</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}