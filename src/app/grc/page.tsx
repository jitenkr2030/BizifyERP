'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  Shield, 
  AlertTriangle, 
  FileText, 
  Users, 
  TrendingUp, 
  Settings, 
  CheckCircle,
  Clock,
  XCircle,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Download,
  Calendar,
  Target,
  Scale
} from "lucide-react"

// Mock data for the module
const mockRisks = [
  {
    id: 1,
    title: "Data Security Breach",
    category: "Operational",
    level: "High",
    status: "Open",
    owner: "IT Department",
    dueDate: "2024-02-15",
    description: "Potential unauthorized access to sensitive customer data",
    mitigation: "Implement enhanced security protocols and monitoring"
  },
  {
    id: 2,
    title: "Regulatory Compliance Changes",
    category: "Compliance",
    level: "Medium",
    status: "Monitoring",
    owner: "Legal Team",
    dueDate: "2024-03-01",
    description: "New data protection regulations affecting business operations",
    mitigation: "Review and update compliance procedures"
  },
  {
    id: 3,
    title: "Supply Chain Disruption",
    category: "Strategic",
    level: "High",
    status: "Mitigated",
    owner: "Operations",
    dueDate: "2024-01-30",
    description: "Potential delays from key suppliers affecting production",
    mitigation: "Diversify supplier base and increase inventory buffer"
  }
]

const mockPolicies = [
  {
    id: 1,
    title: "Information Security Policy",
    version: "2.1",
    status: "Active",
    category: "Security",
    lastReviewed: "2024-01-10",
    nextReview: "2024-07-10",
    owner: "CISO",
    distribution: "All Employees"
  },
  {
    id: 2,
    title: "Data Privacy Policy",
    version: "1.5",
    status: "Draft",
    category: "Compliance",
    lastReviewed: "2024-01-08",
    nextReview: "2024-04-08",
    owner: "Legal Department",
    distribution: "Customer Facing Teams"
  },
  {
    id: 3,
    title: "Business Continuity Plan",
    version: "3.0",
    status: "Active",
    category: "Operations",
    lastReviewed: "2023-12-15",
    nextReview: "2024-06-15",
    owner: "COO",
    distribution: "Management Team"
  }
]

const mockAudits = [
  {
    id: 1,
    title: "Q1 2024 Internal Controls Audit",
    type: "Internal",
    status: "In Progress",
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    scope: "Financial Processes",
    leadAuditor: "Internal Audit Team",
    findings: 3
  },
  {
    id: 2,
    title: "ISO 27001 Surveillance Audit",
    type: "External",
    status: "Scheduled",
    startDate: "2024-03-01",
    endDate: "2024-03-05",
    scope: "Information Security Management",
    leadAuditor: "External Certification Body",
    findings: 0
  },
  {
    id: 3,
    title: "Sarbanes-Oxley Compliance Audit",
    type: "External",
    status: "Completed",
    startDate: "2023-12-01",
    endDate: "2023-12-20",
    scope: "Financial Reporting",
    leadAuditor: "External Auditor",
    findings: 2
  }
]

const mockCommittees = [
  {
    id: 1,
    name: "Audit Committee",
    type: "Board",
    chairperson: "John Smith",
    members: 5,
    meetingFrequency: "Quarterly",
    nextMeeting: "2024-02-20",
    responsibilities: "Financial oversight, risk management, internal controls"
  },
  {
    id: 2,
    name: "Risk Management Committee",
    type: "Executive",
    chairperson: "Sarah Johnson",
    members: 7,
    meetingFrequency: "Monthly",
    nextMeeting: "2024-02-05",
    responsibilities: "Enterprise risk assessment, mitigation strategies"
  },
  {
    id: 3,
    name: "Compliance Committee",
    type: "Operational",
    chairperson: "Michael Brown",
    members: 4,
    meetingFrequency: "Monthly",
    nextMeeting: "2024-02-08",
    responsibilities: "Regulatory compliance, policy oversight"
  }
]

export default function GRC() {
  const [activeTab, setActiveTab] = useState("risks")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isCreateRiskOpen, setIsCreateRiskOpen] = useState(false)
  const [isCreatePolicyOpen, setIsCreatePolicyOpen] = useState(false)

  const filteredRisks = mockRisks.filter(risk => {
    const matchesSearch = risk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         risk.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || risk.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || risk.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const filteredPolicies = mockPolicies.filter(policy => {
    const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || policy.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || policy.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
      case "completed":
      case "mitigated":
        return "bg-green-100 text-green-700"
      case "open":
      case "in progress":
        return "bg-yellow-100 text-yellow-700"
      case "high":
        return "bg-red-100 text-red-700"
      case "medium":
        return "bg-orange-100 text-orange-700"
      case "low":
        return "bg-blue-100 text-blue-700"
      case "draft":
      case "scheduled":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-700"
      case "medium":
        return "bg-orange-100 text-orange-700"
      case "low":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-red-100 text-red-700">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Governance, Risk & Compliance (GRC)</h1>
              <p className="text-slate-600">Enterprise risk management, policy management, and compliance monitoring</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Active Risks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">24</div>
                <p className="text-xs text-slate-600">Under monitoring</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Policies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">156</div>
                <p className="text-xs text-slate-600">Active policies</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Compliance Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">94.2%</div>
                <p className="text-xs text-slate-600">Overall compliance</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Open Audits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">8</div>
                <p className="text-xs text-slate-600">In progress</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="risks" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Risk Management
            </TabsTrigger>
            <TabsTrigger value="policies" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Policies
            </TabsTrigger>
            <TabsTrigger value="audits" className="flex items-center gap-2">
              <Scale className="w-4 h-4" />
              Audits
            </TabsTrigger>
            <TabsTrigger value="committees" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Committees
            </TabsTrigger>
            <TabsTrigger value="compliance" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Compliance
            </TabsTrigger>
          </TabsList>

          {/* Risk Management Tab */}
          <TabsContent value="risks" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search risks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Operational">Operational</SelectItem>
                    <SelectItem value="Financial">Financial</SelectItem>
                    <SelectItem value="Strategic">Strategic</SelectItem>
                    <SelectItem value="Compliance">Compliance</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="Monitoring">Monitoring</SelectItem>
                    <SelectItem value="Mitigated">Mitigated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Dialog open={isCreateRiskOpen} onOpenChange={setIsCreateRiskOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    New Risk
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New Risk</DialogTitle>
                    <DialogDescription>
                      Register a new risk for enterprise risk management
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="riskTitle">Risk Title</Label>
                      <Input id="riskTitle" placeholder="Enter risk title" />
                    </div>
                    <div>
                      <Label htmlFor="riskCategory">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="operational">Operational</SelectItem>
                          <SelectItem value="financial">Financial</SelectItem>
                          <SelectItem value="strategic">Strategic</SelectItem>
                          <SelectItem value="compliance">Compliance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="riskLevel">Risk Level</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select risk level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="riskOwner">Risk Owner</Label>
                      <Input id="riskOwner" placeholder="Assign risk owner" />
                    </div>
                    <div>
                      <Label htmlFor="riskDescription">Description</Label>
                      <Textarea id="riskDescription" placeholder="Describe the risk" />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" onClick={() => setIsCreateRiskOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsCreateRiskOpen(false)}>
                        Create Risk
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRisks.map((risk) => (
                <Card key={risk.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(risk.status)}>{risk.status}</Badge>
                        <Badge className={getLevelColor(risk.level)}>{risk.level}</Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{risk.title}</CardTitle>
                    <CardDescription>{risk.category} • Owned by {risk.owner}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-slate-600">{risk.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-600">Due Date</span>
                          <span className="font-medium">{risk.dueDate}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-600">Mitigation</span>
                          <span className="font-medium text-xs">{risk.mitigation.substring(0, 30)}...</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Target className="w-4 h-4 mr-1" />
                          Mitigate
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Download className="w-4 h-4 mr-1" />
                          Report
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Policies Tab */}
          <TabsContent value="policies" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search policies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Security">Security</SelectItem>
                    <SelectItem value="Compliance">Compliance</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="HR">Human Resources</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Dialog open={isCreatePolicyOpen} onOpenChange={setIsCreatePolicyOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    New Policy
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New Policy</DialogTitle>
                    <DialogDescription>
                      Create a new policy document for governance and compliance
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="policyTitle">Policy Title</Label>
                      <Input id="policyTitle" placeholder="Enter policy title" />
                    </div>
                    <div>
                      <Label htmlFor="policyCategory">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="security">Security</SelectItem>
                          <SelectItem value="compliance">Compliance</SelectItem>
                          <SelectItem value="operations">Operations</SelectItem>
                          <SelectItem value="hr">Human Resources</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="policyOwner">Policy Owner</Label>
                      <Input id="policyOwner" placeholder="Assign policy owner" />
                    </div>
                    <div>
                      <Label htmlFor="policyDistribution">Distribution</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select distribution scope" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Employees</SelectItem>
                          <SelectItem value="management">Management</SelectItem>
                          <SelectItem value="specific">Specific Departments</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" onClick={() => setIsCreatePolicyOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsCreatePolicyOpen(false)}>
                        Create Policy
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPolicies.map((policy) => (
                <Card key={policy.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(policy.status)}>{policy.status}</Badge>
                        <Badge variant="outline">v{policy.version}</Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{policy.title}</CardTitle>
                    <CardDescription>{policy.category} • Owned by {policy.owner}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">Last Reviewed</span>
                        <span className="font-medium">{policy.lastReviewed}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">Next Review</span>
                        <span className="font-medium">{policy.nextReview}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">Distribution</span>
                        <span className="font-medium text-xs">{policy.distribution}</span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          Schedule Review
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Users className="w-4 h-4 mr-1" />
                          Distribute
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Audits Tab */}
          <TabsContent value="audits" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search audits..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Internal">Internal</SelectItem>
                    <SelectItem value="External">External</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Audit
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockAudits.map((audit) => (
                <Card key={audit.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(audit.status)}>{audit.status}</Badge>
                        <Badge variant="outline">{audit.type}</Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{audit.title}</CardTitle>
                    <CardDescription>{audit.scope} • Lead: {audit.leadAuditor}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">Start Date</span>
                        <span className="font-medium">{audit.startDate}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">End Date</span>
                        <span className="font-medium">{audit.endDate}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">Findings</span>
                        <span className={`font-medium ${audit.findings > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {audit.findings}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Download className="w-4 h-4 mr-1" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Committees Tab */}
          <TabsContent value="committees" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search committees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Committee
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCommittees.map((committee) => (
                <Card key={committee.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{committee.type}</Badge>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{committee.name}</CardTitle>
                    <CardDescription>Chair: {committee.chairperson} • {committee.members} members</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">Meeting Frequency</span>
                        <span className="font-medium">{committee.meetingFrequency}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">Next Meeting</span>
                        <span className="font-medium">{committee.nextMeeting}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">Responsibilities</span>
                        <span className="font-medium text-xs">{committee.responsibilities.substring(0, 30)}...</span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          Schedule
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Users className="w-4 h-4 mr-1" />
                          Members
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Overview</CardTitle>
                  <CardDescription>Overall compliance status across all regulations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm">GDPR</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">98%</span>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">SOC 2</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">87%</span>
                        <Clock className="w-4 h-4 text-yellow-500" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm">ISO 27001</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">95%</span>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm">SOX</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">72%</span>
                        <XCircle className="w-4 h-4 text-red-500" />
                      </div>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    View Detailed Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regulatory Changes</CardTitle>
                  <CardDescription>Recent and upcoming regulatory changes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm">CCPA Updates</h4>
                        <Badge className="bg-yellow-100 text-yellow-700">Upcoming</Badge>
                      </div>
                      <p className="text-xs text-slate-600">Effective March 2024</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm">DORA Regulation</h4>
                        <Badge className="bg-orange-100 text-orange-700">Monitoring</Badge>
                      </div>
                      <p className="text-xs text-slate-600">Effective January 2025</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm">EUDPR</h4>
                        <Badge className="bg-green-100 text-green-700">Implemented</Badge>
                      </div>
                      <p className="text-xs text-slate-600">Effective December 2023</p>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    View All Changes
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}