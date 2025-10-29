'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  FileText, 
  Search,
  Plus,
  Edit,
  Eye,
  MoreHorizontal,
  TrendingUp,
  Shield
} from "lucide-react"

export default function QualityManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [severityFilter, setSeverityFilter] = useState('all')

  // Sample data
  const qualityInspections = [
    {
      id: '1',
      reference: 'QI-2024-001',
      inspectionType: 'incoming',
      productName: 'Raw Material A',
      date: '2024-01-15',
      inspector: 'John Doe',
      status: 'passed',
      result: 'All specifications met'
    },
    {
      id: '2',
      reference: 'QI-2024-002',
      inspectionType: 'in_process',
      productName: 'Product B',
      date: '2024-01-14',
      inspector: 'Jane Smith',
      status: 'failed',
      result: 'Dimensional issues detected'
    },
    {
      id: '3',
      reference: 'QI-2024-003',
      inspectionType: 'final',
      productName: 'Product C',
      date: '2024-01-13',
      inspector: 'Mike Johnson',
      status: 'passed',
      result: 'Quality standards met'
    }
  ]

  const nonConformances = [
    {
      id: '1',
      reference: 'NC-2024-001',
      severity: 'high',
      type: 'product',
      description: 'Dimensional deviation from specifications',
      detectedDate: '2024-01-14',
      reportedBy: 'Jane Smith',
      status: 'in_progress',
      rootCause: 'Machine calibration issue'
    },
    {
      id: '2',
      reference: 'NC-2024-002',
      severity: 'medium',
      type: 'process',
      description: 'Documentation not properly followed',
      detectedDate: '2024-01-12',
      reportedBy: 'John Doe',
      status: 'open',
      rootCause: 'Training gap'
    }
  ]

  const correctiveActions = [
    {
      id: '1',
      nonConformanceRef: 'NC-2024-001',
      description: 'Recalibrate production machine',
      assignedTo: 'Maintenance Team',
      dueDate: '2024-01-20',
      status: 'in_progress',
      effectiveness: 'Pending evaluation'
    },
    {
      id: '2',
      nonConformanceRef: 'NC-2024-002',
      description: 'Conduct training on documentation procedures',
      assignedTo: 'HR Department',
      dueDate: '2024-01-25',
      status: 'pending',
      effectiveness: null
    }
  ]

  const qualityAudits = [
    {
      id: '1',
      reference: 'QA-2024-001',
      auditType: 'internal',
      scope: 'Production Department',
      auditor: 'Sarah Wilson',
      startDate: '2024-01-10',
      endDate: '2024-01-12',
      status: 'completed',
      findings: '3 minor findings identified'
    },
    {
      id: '2',
      reference: 'QA-2024-002',
      auditType: 'supplier',
      scope: 'Supplier Quality Management',
      auditor: 'David Brown',
      startDate: '2024-01-15',
      status: 'in_progress',
      findings: 'Audit in progress'
    }
  ]

  const filteredInspections = qualityInspections.filter(inspection => {
    const matchesSearch = inspection.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inspection.productName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || inspection.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredNonConformances = nonConformances.filter(nc => {
    const matchesSearch = nc.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         nc.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeverity = severityFilter === 'all' || nc.severity === severityFilter
    const matchesStatus = statusFilter === 'all' || nc.status === statusFilter
    return matchesSearch && matchesSeverity && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': case 'completed': case 'resolved': return 'default'
      case 'failed': return 'destructive'
      case 'pending': case 'open': return 'secondary'
      case 'in_progress': return 'outline'
      default: return 'secondary'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'default'
      case 'medium': return 'secondary'
      case 'high': return 'outline'
      case 'critical': return 'destructive'
      default: return 'secondary'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Quality Management
          </h1>
          <p className="text-lg text-slate-600">
            Ensure quality standards and continuous improvement
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Inspections Passed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">94%</div>
              <p className="text-xs text-slate-600">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Open Non-Conformances
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">8</div>
              <p className="text-xs text-slate-600">Require attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                CAPA Completion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">87%</div>
              <p className="text-xs text-slate-600">On-time completion</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Audits Scheduled
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">5</div>
              <p className="text-xs text-slate-600">This quarter</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="inspections" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="inspections">Inspections</TabsTrigger>
            <TabsTrigger value="nonconformances">Non-Conformances</TabsTrigger>
            <TabsTrigger value="capa">CAPA</TabsTrigger>
            <TabsTrigger value="audits">Audits</TabsTrigger>
          </TabsList>

          <TabsContent value="inspections">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Quality Inspections</CardTitle>
                    <CardDescription>Manage quality control inspections and checks</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    New Inspection
                  </Button>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Search inspections..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="passed">Passed</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredInspections.map((inspection) => (
                    <div key={inspection.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          inspection.status === 'passed' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {inspection.status === 'passed' ? 
                            <CheckCircle className="w-5 h-5 text-green-600" /> : 
                            <XCircle className="w-5 h-5 text-red-600" />
                          }
                        </div>
                        <div>
                          <h3 className="font-semibold">{inspection.reference}</h3>
                          <p className="text-sm text-slate-600">{inspection.productName} • {inspection.inspectionType}</p>
                          <p className="text-xs text-slate-500">{inspection.date} • Inspector: {inspection.inspector}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold">{inspection.result}</p>
                          <p className="text-xs text-slate-500">{inspection.status}</p>
                        </div>
                        <Badge variant={getStatusColor(inspection.status)}>
                          {inspection.status}
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

          <TabsContent value="nonconformances">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Non-Conformances</CardTitle>
                    <CardDescription>Track and manage quality non-conformances</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Report Non-Conformance
                  </Button>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Search non-conformances..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={severityFilter} onValueChange={setSeverityFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Severity</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredNonConformances.map((nc) => (
                    <div key={nc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <AlertTriangle className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{nc.reference}</h3>
                          <p className="text-sm text-slate-600">{nc.description}</p>
                          <p className="text-xs text-slate-500">{nc.detectedDate} • Reported by: {nc.reportedBy}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold">{nc.type}</p>
                          <p className="text-xs text-slate-500">{nc.rootCause}</p>
                        </div>
                        <Badge variant={getSeverityColor(nc.severity)}>
                          {nc.severity}
                        </Badge>
                        <Badge variant={getStatusColor(nc.status)}>
                          {nc.status}
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

          <TabsContent value="capa">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Corrective & Preventive Actions</CardTitle>
                    <CardDescription>Manage CAPA plans and track effectiveness</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create CAPA
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {correctiveActions.map((action) => (
                    <div key={action.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{action.nonConformanceRef}</h3>
                          <p className="text-sm text-slate-600">{action.description}</p>
                          <p className="text-xs text-slate-500">Assigned to: {action.assignedTo} • Due: {action.dueDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold">{action.effectiveness || 'In Progress'}</p>
                          <p className="text-xs text-slate-500">{action.status}</p>
                        </div>
                        <Badge variant={getStatusColor(action.status)}>
                          {action.status}
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

          <TabsContent value="audits">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Quality Audits</CardTitle>
                    <CardDescription>Plan and conduct quality audits</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule Audit
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {qualityAudits.map((audit) => (
                    <div key={audit.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <FileText className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{audit.reference}</h3>
                          <p className="text-sm text-slate-600">{audit.scope} • {audit.auditType}</p>
                          <p className="text-xs text-slate-500">{audit.startDate} - {audit.endDate || 'Ongoing'} • Auditor: {audit.auditor}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold">{audit.findings}</p>
                          <p className="text-xs text-slate-500">{audit.status}</p>
                        </div>
                        <Badge variant={getStatusColor(audit.status)}>
                          {audit.status}
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