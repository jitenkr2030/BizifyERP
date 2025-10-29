'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  FileText, 
  Upload, 
  Download, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  Users,
  Folder,
  Tag,
  Calendar,
  Shield,
  Workflow,
  Archive,
  Signature
} from "lucide-react"

interface Document {
  id: string
  title: string
  type: string
  category: string
  version: number
  status: string
  uploadedBy: string
  uploadedAt: string
  size: string
  tags: string[]
  approvalStatus: string
  retentionDate?: string
}

interface DocumentCategory {
  id: string
  name: string
  documentCount: number
  color: string
}

interface ApprovalWorkflow {
  id: string
  documentTitle: string
  currentStep: number
  totalSteps: number
  requestedBy: string
  requestedAt: string
  status: string
  approvers: string[]
}

export default function DocumentManagement() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [categories, setCategories] = useState<DocumentCategory[]>([])
  const [workflows, setWorkflows] = useState<ApprovalWorkflow[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching data
    const mockDocuments: Document[] = [
      {
        id: '1',
        title: 'Q4 Financial Report 2024',
        type: 'PDF',
        category: 'Financial',
        version: 3,
        status: 'approved',
        uploadedBy: 'John Doe',
        uploadedAt: '2024-01-15',
        size: '2.4 MB',
        tags: ['financial', 'quarterly', '2024'],
        approvalStatus: 'approved',
        retentionDate: '2029-01-15'
      },
      {
        id: '2',
        title: 'Employee Handbook v2',
        type: 'DOCX',
        category: 'HR',
        version: 2,
        status: 'pending_approval',
        uploadedBy: 'Jane Smith',
        uploadedAt: '2024-01-14',
        size: '1.8 MB',
        tags: ['hr', 'policy', 'handbook'],
        approvalStatus: 'pending'
      },
      {
        id: '3',
        title: 'Supply Chain Agreement',
        type: 'PDF',
        category: 'Legal',
        version: 1,
        status: 'draft',
        uploadedBy: 'Mike Johnson',
        uploadedAt: '2024-01-13',
        size: '3.2 MB',
        tags: ['legal', 'contract', 'supply-chain'],
        approvalStatus: 'draft'
      },
      {
        id: '4',
        title: 'Product Specification Sheet',
        type: 'PDF',
        category: 'Product',
        version: 5,
        status: 'approved',
        uploadedBy: 'Sarah Wilson',
        uploadedAt: '2024-01-12',
        size: '856 KB',
        tags: ['product', 'specification', 'technical'],
        approvalStatus: 'approved',
        retentionDate: '2027-01-12'
      },
      {
        id: '5',
        title: 'Quality Audit Report',
        type: 'XLSX',
        category: 'Quality',
        version: 2,
        status: 'in_review',
        uploadedBy: 'David Brown',
        uploadedAt: '2024-01-11',
        size: '1.2 MB',
        tags: ['quality', 'audit', 'compliance'],
        approvalStatus: 'in_review'
      }
    ]

    const mockCategories: DocumentCategory[] = [
      { id: '1', name: 'Financial', documentCount: 45, color: 'bg-blue-100 text-blue-700' },
      { id: '2', name: 'HR', documentCount: 23, color: 'bg-green-100 text-green-700' },
      { id: '3', name: 'Legal', documentCount: 18, color: 'bg-red-100 text-red-700' },
      { id: '4', name: 'Product', documentCount: 67, color: 'bg-purple-100 text-purple-700' },
      { id: '5', name: 'Quality', documentCount: 34, color: 'bg-orange-100 text-orange-700' },
      { id: '6', name: 'Operations', documentCount: 29, color: 'bg-cyan-100 text-cyan-700' }
    ]

    const mockWorkflows: ApprovalWorkflow[] = [
      {
        id: '1',
        documentTitle: 'Employee Handbook v2',
        currentStep: 2,
        totalSteps: 3,
        requestedBy: 'Jane Smith',
        requestedAt: '2024-01-14',
        status: 'in_progress',
        approvers: ['John Doe (HR Manager)', 'Sarah Wilson (Legal)']
      },
      {
        id: '2',
        documentTitle: 'Quality Audit Report',
        currentStep: 1,
        totalSteps: 2,
        requestedBy: 'David Brown',
        requestedAt: '2024-01-11',
        status: 'pending',
        approvers: ['Mike Johnson (Quality Manager)']
      }
    ]

    setDocuments(mockDocuments)
    setCategories(mockCategories)
    setWorkflows(mockWorkflows)
    setLoading(false)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'in_review': return 'bg-blue-100 text-blue-700'
      case 'draft': return 'bg-gray-100 text-gray-700'
      case 'rejected': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getApprovalStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'in_review': return 'bg-blue-100 text-blue-700'
      case 'draft': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || doc.category.toLowerCase() === selectedCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-slate-900 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading Document Management System...</p>
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
              <h1 className="text-3xl font-bold text-slate-900">Document Management System</h1>
              <p className="text-slate-600 mt-2">Centralized document storage and workflow management</p>
            </div>
            <div className="flex gap-3">
              <Button className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload Document
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Signature className="h-4 w-4" />
                Request Signature
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Total Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">216</div>
              <p className="text-xs text-slate-600">+12 this week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Pending Approvals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">8</div>
              <p className="text-xs text-slate-600">Awaiting review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <Archive className="h-4 w-4" />
                Storage Used
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">4.2 GB</div>
              <p className="text-xs text-slate-600">of 10 GB available</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Compliance Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">94%</div>
              <p className="text-xs text-slate-600">All policies met</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="documents" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="workflows">Approval Workflows</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="documents" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search documents by title or tags..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <select 
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-3 py-2 border border-slate-300 rounded-md"
                    >
                      <option value="all">All Categories</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.name.toLowerCase()}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents Table */}
            <Card>
              <CardHeader>
                <CardTitle>Document Library</CardTitle>
                <CardDescription>Manage and organize all your documents</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Approval</TableHead>
                      <TableHead>Uploaded</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocuments.map((document) => (
                      <TableRow key={document.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-slate-400" />
                            <div>
                              <div className="font-medium">{document.title}</div>
                              <div className="flex gap-1 mt-1">
                                {document.tags.slice(0, 2).map((tag, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{document.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">v{document.version}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(document.status)}>
                            {document.status.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getApprovalStatusColor(document.approvalStatus)}>
                            {document.approvalStatus.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{document.uploadedBy}</div>
                            <div className="text-slate-500">{document.uploadedAt}</div>
                          </div>
                        </TableCell>
                        <TableCell>{document.size}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
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

          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Card key={category.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Folder className="h-5 w-5" />
                      {category.name}
                    </CardTitle>
                    <CardDescription>{category.documentCount} documents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge className={category.color}>
                        {category.documentCount} files
                      </Badge>
                      <Button variant="outline" size="sm">
                        View All
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="workflows" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Workflow className="h-5 w-5" />
                  Approval Workflows
                </CardTitle>
                <CardDescription>Track document approval processes</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Requested By</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Approvers</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {workflows.map((workflow) => (
                      <TableRow key={workflow.id}>
                        <TableCell className="font-medium">{workflow.documentTitle}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-slate-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full" 
                                style={{ width: `${(workflow.currentStep / workflow.totalSteps) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-slate-600">
                              {workflow.currentStep}/{workflow.totalSteps}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{workflow.requestedBy}</div>
                            <div className="text-slate-500">{workflow.requestedAt}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            workflow.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            workflow.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                            'bg-green-100 text-green-700'
                          }>
                            {workflow.status.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {workflow.approvers.map((approver, index) => (
                              <div key={index} className="text-slate-600">
                                {approver}
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Review
                            </Button>
                            <Button variant="ghost" size="sm">
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
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Invoice Template', category: 'Financial', uses: 156 },
                { name: 'Contract Template', category: 'Legal', uses: 89 },
                { name: 'Employee Onboarding', category: 'HR', uses: 234 },
                { name: 'Quality Report', category: 'Quality', uses: 67 },
                { name: 'Purchase Order', category: 'Procurement', uses: 145 },
                { name: 'Project Proposal', category: 'Operations', uses: 78 }
              ].map((template, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      {template.name}
                    </CardTitle>
                    <CardDescription>{template.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-600">
                        {template.uses} uses
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Use Template
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}