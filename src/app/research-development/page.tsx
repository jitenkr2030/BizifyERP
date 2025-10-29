'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  FlaskConical, 
  Lightbulb, 
  FileText, 
  Users, 
  DollarSign, 
  Calendar, 
  TrendingUp,
  Search,
  Plus,
  Filter,
  Target,
  Award,
  BookOpen,
  BarChart3
} from "lucide-react"

// Mock data for demonstration
const mockRDProjects = [
  {
    id: 1,
    name: "AI-Powered Analytics Platform",
    description: "Developing advanced machine learning algorithms for predictive analytics",
    status: "active",
    category: "artificial-intelligence",
    budget: 250000,
    spent: 175000,
    startDate: "2024-01-15",
    endDate: "2024-12-31",
    teamSize: 8,
    progress: 70,
    roi: 2.5,
    milestones: [
      { name: "Data Collection Complete", status: "completed", date: "2024-03-15" },
      { name: "Model Development", status: "in-progress", date: "2024-06-30" },
      { name: "Beta Testing", status: "pending", date: "2024-09-30" }
    ]
  },
  {
    id: 2,
    name: "Blockchain Supply Chain Solution",
    description: "Implementing blockchain technology for transparent supply chain tracking",
    status: "planning",
    category: "blockchain",
    budget: 180000,
    spent: 25000,
    startDate: "2024-03-01",
    endDate: "2025-02-28",
    teamSize: 6,
    progress: 15,
    roi: 3.2,
    milestones: [
      { name: "Architecture Design", status: "completed", date: "2024-04-15" },
      { name: "Smart Contract Development", status: "in-progress", date: "2024-07-31" },
      { name: "Integration Testing", status: "pending", date: "2024-11-30" }
    ]
  },
  {
    id: 3,
    name: "IoT Manufacturing Optimization",
    description: "Creating IoT sensors and analytics for manufacturing process optimization",
    status: "completed",
    category: "iot",
    budget: 320000,
    spent: 315000,
    startDate: "2023-06-01",
    endDate: "2024-02-28",
    teamSize: 12,
    progress: 100,
    roi: 4.1,
    milestones: [
      { name: "Sensor Development", status: "completed", date: "2023-09-30" },
      { name: "Platform Integration", status: "completed", date: "2023-12-15" },
      { name: "Production Deployment", status: "completed", date: "2024-02-28" }
    ]
  }
]

const mockIntellectualProperty = [
  {
    id: 1,
    title: "Predictive Maintenance Algorithm",
    type: "patent",
    status: "pending",
    filingDate: "2024-01-15",
    approvalDate: null,
    description: "Machine learning algorithm for predicting equipment maintenance needs",
    inventors: ["Dr. Sarah Johnson", "Mike Chen"],
    projectId: 1,
    value: 500000
  },
  {
    id: 2,
    title: "Secure Data Encryption Protocol",
    type: "patent",
    status: "approved",
    filingDate: "2023-08-20",
    approvalDate: "2024-02-10",
    description: "Advanced encryption method for secure data transmission",
    inventors: ["Dr. Emily Rodriguez", "James Wilson"],
    projectId: 3,
    value: 750000
  },
  {
    id: 3,
    title: "BizifyERP Analytics Engine",
    type: "trademark",
    status: "approved",
    filingDate: "2023-05-10",
    approvalDate: "2023-08-15",
    description: "Trademark for the proprietary analytics engine",
    inventors: ["Legal Department"],
    projectId: null,
    value: 250000
  }
]

const mockInnovationPipeline = [
  {
    id: 1,
    name: "Quantum Computing Integration",
    stage: "research",
    description: "Exploring quantum computing applications for enterprise solutions",
    potentialValue: 2000000,
    probability: 30,
    timeline: "2-3 years",
    team: ["Dr. Alex Kim", "Dr. Lisa Wang"],
    dependencies: ["Quantum hardware availability", "Algorithm development"]
  },
  {
    id: 2,
    name: "AR/VR Training Platform",
    stage: "development",
    description: "Developing immersive training solutions using AR/VR technology",
    potentialValue: 1200000,
    probability: 65,
    timeline: "1-2 years",
    team: ["Tom Anderson", "Sarah Davis"],
    dependencies: ["Hardware partnerships", "Content development"]
  },
  {
    id: 3,
    name: "Sustainable Energy Management",
    stage: "prototype",
    description: "Creating AI-powered energy optimization for data centers",
    potentialValue: 1800000,
    probability: 80,
    timeline: "6-12 months",
    team: ["Dr. Michael Brown", "Jennifer Lee"],
    dependencies: ["Sensor deployment", "ML model training"]
  }
]

const mockResearchTeams = [
  {
    id: 1,
    name: "AI Research Lab",
    lead: "Dr. Sarah Johnson",
    members: 8,
    specializations: ["Machine Learning", "Natural Language Processing", "Computer Vision"],
    currentProjects: [1],
    budget: 500000,
    publications: 15
  },
  {
    id: 2,
    name: "Blockchain Innovation Team",
    lead: "Dr. Emily Rodriguez",
    members: 6,
    specializations: ["Distributed Systems", "Smart Contracts", "Cryptocurrency"],
    currentProjects: [2],
    budget: 350000,
    publications: 8
  },
  {
    id: 3,
    name: "IoT & Embedded Systems",
    lead: "Dr. Michael Chen",
    members: 12,
    specializations: ["Sensor Networks", "Edge Computing", "Embedded Systems"],
    currentProjects: [3],
    budget: 750000,
    publications: 22
  }
]

export default function ResearchDevelopmentPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false)
  const [isCreateIPOpen, setIsCreateIPOpen] = useState(false)

  const filteredProjects = mockRDProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || project.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'completed': return 'bg-blue-100 text-blue-700'
      case 'planning': return 'bg-yellow-100 text-yellow-700'
      case 'pending': return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'research': return 'bg-purple-100 text-purple-700'
      case 'development': return 'bg-blue-100 text-blue-700'
      case 'prototype': return 'bg-green-100 text-green-700'
      case 'testing': return 'bg-yellow-100 text-yellow-700'
      case 'deployment': return 'bg-indigo-100 text-indigo-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Research & Development Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage R&D projects, intellectual property, and innovation pipeline
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCreateProjectOpen} onOpenChange={setIsCreateProjectOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New R&D Project</DialogTitle>
                <DialogDescription>
                  Set up a new research and development project with budget and timeline
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="project-name">Project Name</Label>
                    <Input id="project-name" placeholder="Enter project name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project-category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="artificial-intelligence">Artificial Intelligence</SelectItem>
                        <SelectItem value="blockchain">Blockchain</SelectItem>
                        <SelectItem value="iot">Internet of Things</SelectItem>
                        <SelectItem value="biotech">Biotechnology</SelectItem>
                        <SelectItem value="clean-tech">Clean Technology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-description">Description</Label>
                  <Textarea id="project-description" placeholder="Describe the project objectives and scope" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="project-budget">Budget ($)</Label>
                    <Input id="project-budget" type="number" placeholder="500000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project-team">Team Size</Label>
                    <Input id="project-team" type="number" placeholder="8" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input id="start-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <Input id="end-date" type="date" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateProjectOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateProjectOpen(false)}>
                  Create Project
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isCreateIPOpen} onOpenChange={setIsCreateIPOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                New IP
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Register Intellectual Property</DialogTitle>
                <DialogDescription>
                  File a new patent, trademark, or copyright application
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ip-title">Title</Label>
                    <Input id="ip-title" placeholder="Enter IP title" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ip-type">Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select IP type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="patent">Patent</SelectItem>
                        <SelectItem value="trademark">Trademark</SelectItem>
                        <SelectItem value="copyright">Copyright</SelectItem>
                        <SelectItem value="trade-secret">Trade Secret</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ip-description">Description</Label>
                  <Textarea id="ip-description" placeholder="Describe the intellectual property" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ip-inventors">Inventors</Label>
                    <Input id="ip-inventors" placeholder="Enter inventor names" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ip-project">Related Project</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockRDProjects.map(project => (
                          <SelectItem key={project.id} value={project.id.toString()}>
                            {project.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ip-value">Estimated Value ($)</Label>
                  <Input id="ip-value" type="number" placeholder="500000" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateIPOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateIPOpen(false)}>
                  Register IP
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <FlaskConical className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockRDProjects.filter(p => p.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">R&D Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(mockRDProjects.reduce((sum, p) => sum + p.budget, 0) / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">
              Total allocated budget
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">IP Portfolio</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockIntellectualProperty.length}</div>
            <p className="text-xs text-muted-foreground">
              Patents, trademarks & copyrights
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Innovation Pipeline</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockInnovationPipeline.length}</div>
            <p className="text-xs text-muted-foreground">
              Ideas in development
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="projects">R&D Projects</TabsTrigger>
          <TabsTrigger value="intellectual-property">Intellectual Property</TabsTrigger>
          <TabsTrigger value="innovation-pipeline">Innovation Pipeline</TabsTrigger>
          <TabsTrigger value="research-teams">Research Teams</TabsTrigger>
        </TabsList>

        {/* R&D Projects Tab */}
        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>R&D Projects</CardTitle>
              <CardDescription>
                Manage research projects, budgets, timelines, and progress tracking
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="planning">Planning</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="artificial-intelligence">AI</SelectItem>
                    <SelectItem value="blockchain">Blockchain</SelectItem>
                    <SelectItem value="iot">IoT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Projects Grid */}
              <div className="grid gap-4">
                {filteredProjects.map((project) => (
                  <Card key={project.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{project.name}</h3>
                            <Badge className={getStatusColor(project.status)}>
                              {project.status}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-4">{project.description}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">${(project.budget / 1000).toFixed(0)}k</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{project.startDate} - {project.endDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{project.teamSize} team members</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Target className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{project.roi}x ROI</span>
                            </div>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{project.progress}%</span>
                            </div>
                            <div className="w-full bg-secondary rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all" 
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                          </div>
                          
                          {/* Budget Progress */}
                          <div className="space-y-2 mt-4">
                            <div className="flex justify-between text-sm">
                              <span>Budget Used</span>
                              <span>${(project.spent / 1000).toFixed(0)}k / ${(project.budget / 1000).toFixed(0)}k</span>
                            </div>
                            <div className="w-full bg-secondary rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full transition-all" 
                                style={{ width: `${(project.spent / project.budget) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Intellectual Property Tab */}
        <TabsContent value="intellectual-property" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property Portfolio</CardTitle>
              <CardDescription>
                Manage patents, trademarks, copyrights, and trade secrets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {mockIntellectualProperty.map((ip) => (
                  <Card key={ip.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{ip.title}</h3>
                            <Badge className={getStatusColor(ip.status)}>
                              {ip.status}
                            </Badge>
                            <Badge variant="outline">{ip.type}</Badge>
                          </div>
                          <p className="text-muted-foreground mb-4">{ip.description}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-sm font-medium">Filing Date</p>
                              <p className="text-sm text-muted-foreground">{ip.filingDate}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Approval Date</p>
                              <p className="text-sm text-muted-foreground">{ip.approvalDate || 'Pending'}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Inventors</p>
                              <p className="text-sm text-muted-foreground">{ip.inventors.join(', ')}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Estimated Value</p>
                              <p className="text-sm text-muted-foreground">${(ip.value / 1000).toFixed(0)}k</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Innovation Pipeline Tab */}
        <TabsContent value="innovation-pipeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Innovation Pipeline</CardTitle>
              <CardDescription>
                Track and manage innovative ideas from concept to implementation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {mockInnovationPipeline.map((innovation) => (
                  <Card key={innovation.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{innovation.name}</h3>
                            <Badge className={getStageColor(innovation.stage)}>
                              {innovation.stage}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-4">{innovation.description}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-sm font-medium">Potential Value</p>
                              <p className="text-sm text-muted-foreground">${(innovation.potentialValue / 1000000).toFixed(1)}M</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Success Probability</p>
                              <p className="text-sm text-muted-foreground">{innovation.probability}%</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Timeline</p>
                              <p className="text-sm text-muted-foreground">{innovation.timeline}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Team Size</p>
                              <p className="text-sm text-muted-foreground">{innovation.team.length} members</p>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Dependencies</p>
                            <div className="flex flex-wrap gap-2">
                              {innovation.dependencies.map((dep, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {dep}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            Advance Stage
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Research Teams Tab */}
        <TabsContent value="research-teams" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Research Teams</CardTitle>
              <CardDescription>
                Manage research teams, their specializations, and current projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {mockResearchTeams.map((team) => (
                  <Card key={team.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{team.name}</h3>
                            <Badge variant="outline">{team.members} members</Badge>
                          </div>
                          <p className="text-muted-foreground mb-4">Led by {team.lead}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-sm font-medium">Budget</p>
                              <p className="text-sm text-muted-foreground">${(team.budget / 1000).toFixed(0)}k</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Active Projects</p>
                              <p className="text-sm text-muted-foreground">{team.currentProjects.length}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Publications</p>
                              <p className="text-sm text-muted-foreground">{team.publications}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Specializations</p>
                              <p className="text-sm text-muted-foreground">{team.specializations.length} areas</p>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Specializations</p>
                            <div className="flex flex-wrap gap-2">
                              {team.specializations.map((spec, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {spec}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Team
                          </Button>
                          <Button variant="outline" size="sm">
                            Manage
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}