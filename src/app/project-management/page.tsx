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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { 
  Briefcase, 
  Clock, 
  Plus, 
  Search, 
  Filter,
  Users,
  DollarSign,
  Calendar,
  CheckCircle,
  AlertCircle,
  XCircle,
  PlayCircle,
  PauseCircle,
  TrendingUp,
  Timer
} from "lucide-react"

interface Project {
  id: string
  name: string
  description?: string
  customerName?: string
  startDate: string
  endDate?: string
  budget?: number
  status: 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled'
  managerName?: string
  progress: number
  actualHours: number
  estimatedHours?: number
  actualCost: number
  revenue?: number
  profitability?: number
  taskCount: number
  createdAt: string
}

interface Task {
  id: string
  projectName: string
  name: string
  description?: string
  startDate?: string
  endDate?: string
  status: 'todo' | 'in_progress' | 'review' | 'done'
  priority: 'low' | 'medium' | 'high'
  estimatedHours?: number
  actualHours: number
  assigneeName?: string
  createdAt: string
}

interface TimeEntry {
  id: string
  projectName?: string
  taskName?: string
  userName: string
  date: string
  hours: number
  description?: string
  billable: boolean
  rate?: number
  totalAmount?: number
  createdAt: string
}

export default function ProjectManagementPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [activeTab, setActiveTab] = useState('projects')

  // Mock data for demonstration
  useEffect(() => {
    const mockProjects: Project[] = [
      {
        id: '1',
        name: 'Website Redesign',
        description: 'Complete redesign of company website',
        customerName: 'Acme Corporation',
        startDate: '2024-01-01',
        endDate: '2024-03-31',
        budget: 50000,
        status: 'active',
        managerName: 'John Smith',
        progress: 65,
        actualHours: 320,
        estimatedHours: 480,
        actualCost: 32000,
        revenue: 50000,
        profitability: 36,
        taskCount: 12,
        createdAt: '2024-01-01'
      },
      {
        id: '2',
        name: 'Mobile App Development',
        description: 'Native iOS and Android app development',
        customerName: 'Tech Solutions Inc',
        startDate: '2024-01-15',
        endDate: '2024-06-30',
        budget: 120000,
        status: 'active',
        managerName: 'Sarah Johnson',
        progress: 40,
        actualHours: 280,
        estimatedHours: 800,
        actualCost: 28000,
        revenue: 120000,
        profitability: 77,
        taskCount: 25,
        createdAt: '2024-01-15'
      },
      {
        id: '3',
        name: 'ERP Implementation',
        description: 'BizifyERP system implementation',
        customerName: 'Global Enterprises',
        startDate: '2024-02-01',
        endDate: '2024-08-31',
        budget: 200000,
        status: 'planning',
        managerName: 'Mike Wilson',
        progress: 10,
        actualHours: 40,
        estimatedHours: 1200,
        actualCost: 4000,
        revenue: 200000,
        profitability: 98,
        taskCount: 8,
        createdAt: '2024-02-01'
      }
    ]

    const mockTasks: Task[] = [
      {
        id: '1',
        projectName: 'Website Redesign',
        name: 'Design Homepage',
        description: 'Create responsive homepage design',
        startDate: '2024-01-01',
        endDate: '2024-01-15',
        status: 'done',
        priority: 'high',
        estimatedHours: 40,
        actualHours: 35,
        assigneeName: 'Alice Brown',
        createdAt: '2024-01-01'
      },
      {
        id: '2',
        projectName: 'Website Redesign',
        name: 'Develop Backend API',
        description: 'Create REST API for website functionality',
        startDate: '2024-01-10',
        endDate: '2024-02-01',
        status: 'in_progress',
        priority: 'high',
        estimatedHours: 80,
        actualHours: 45,
        assigneeName: 'Bob Davis',
        createdAt: '2024-01-10'
      },
      {
        id: '3',
        projectName: 'Mobile App Development',
        name: 'UI/UX Design',
        description: 'Design mobile app interface',
        startDate: '2024-01-15',
        endDate: '2024-02-15',
        status: 'in_progress',
        priority: 'medium',
        estimatedHours: 60,
        actualHours: 30,
        assigneeName: 'Carol White',
        createdAt: '2024-01-15'
      }
    ]

    const mockTimeEntries: TimeEntry[] = [
      {
        id: '1',
        projectName: 'Website Redesign',
        taskName: 'Design Homepage',
        userName: 'Alice Brown',
        date: '2024-01-15',
        hours: 8,
        description: 'Homepage layout and responsive design',
        billable: true,
        rate: 100,
        totalAmount: 800,
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        projectName: 'Website Redesign',
        taskName: 'Develop Backend API',
        userName: 'Bob Davis',
        date: '2024-01-15',
        hours: 6,
        description: 'API endpoint development',
        billable: true,
        rate: 120,
        totalAmount: 720,
        createdAt: '2024-01-15'
      },
      {
        id: '3',
        projectName: 'Mobile App Development',
        taskName: 'UI/UX Design',
        userName: 'Carol White',
        date: '2024-01-15',
        hours: 4,
        description: 'Mobile app wireframing',
        billable: true,
        rate: 90,
        totalAmount: 360,
        createdAt: '2024-01-15'
      }
    ]

    setProjects(mockProjects)
    setTasks(mockTasks)
    setTimeEntries(mockTimeEntries)
    setLoading(false)
  }, [])

  const getStatusBadge = (status: string, type: 'project' | 'task' = 'project') => {
    if (type === 'project') {
      const statusConfig = {
        planning: { label: 'Planning', variant: 'secondary' as const, icon: Clock },
        active: { label: 'Active', variant: 'default' as const, icon: PlayCircle },
        on_hold: { label: 'On Hold', variant: 'outline' as const, icon: PauseCircle },
        completed: { label: 'Completed', variant: 'outline' as const, icon: CheckCircle },
        cancelled: { label: 'Cancelled', variant: 'destructive' as const, icon: XCircle }
      }
      const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.planning
      const Icon = config.icon
      return (
        <Badge variant={config.variant} className="flex items-center gap-1">
          <Icon className="w-3 h-3" />
          {config.label}
        </Badge>
      )
    } else {
      const statusConfig = {
        todo: { label: 'To Do', variant: 'secondary' as const, icon: Clock },
        in_progress: { label: 'In Progress', variant: 'default' as const, icon: PlayCircle },
        review: { label: 'Review', variant: 'outline' as const, icon: AlertCircle },
        done: { label: 'Done', variant: 'outline' as const, icon: CheckCircle }
      }
      const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.todo
      const Icon = config.icon
      return (
        <Badge variant={config.variant} className="flex items-center gap-1">
          <Icon className="w-3 h-3" />
          {config.label}
        </Badge>
      )
    }
  }

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: { label: 'Low', variant: 'secondary' as const },
      medium: { label: 'Medium', variant: 'default' as const },
      high: { label: 'High', variant: 'destructive' as const }
    }
    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.customerName?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredTasks = tasks.filter(task => 
    task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredTimeEntries = timeEntries.filter(entry => 
    entry.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.projectName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.taskName?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'active').length,
    completedProjects: projects.filter(p => p.status === 'completed').length,
    totalRevenue: projects.reduce((sum, p) => sum + (p.revenue || 0), 0),
    totalCost: projects.reduce((sum, p) => sum + p.actualCost, 0),
    totalHours: projects.reduce((sum, p) => sum + p.actualHours, 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-cyan-100 text-cyan-700 rounded-lg">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Project Management</h1>
              <p className="text-slate-600">Time tracking and project profitability</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stats.totalProjects}</div>
              <p className="text-xs text-slate-600">All projects</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.activeProjects}</div>
              <p className="text-xs text-slate-600">Currently running</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${(stats.totalRevenue / 1000).toFixed(1)}K</div>
              <p className="text-xs text-slate-600">Project revenue</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Cost</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">${(stats.totalCost / 1000).toFixed(1)}K</div>
              <p className="text-xs text-slate-600">Project costs</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.totalHours}</div>
              <p className="text-xs text-slate-600">Hours tracked</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Tasks
            </TabsTrigger>
            <TabsTrigger value="time" className="flex items-center gap-2">
              <Timer className="w-4 h-4" />
              Time Entries
            </TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Projects</CardTitle>
                    <CardDescription>Manage projects and track profitability</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        New Project
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Create New Project</DialogTitle>
                        <DialogDescription>Set up a new project with budget and timeline</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="project-name">Project Name</Label>
                            <Input id="project-name" placeholder="Enter project name" />
                          </div>
                          <div>
                            <Label htmlFor="customer">Customer</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select customer" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="acme">Acme Corporation</SelectItem>
                                <SelectItem value="tech">Tech Solutions Inc</SelectItem>
                                <SelectItem value="global">Global Enterprises</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea id="description" placeholder="Project description and objectives" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="start-date">Start Date</Label>
                            <Input id="start-date" type="date" />
                          </div>
                          <div>
                            <Label htmlFor="end-date">End Date</Label>
                            <Input id="end-date" type="date" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="budget">Budget ($)</Label>
                            <Input id="budget" type="number" placeholder="50000" />
                          </div>
                          <div>
                            <Label htmlFor="manager">Project Manager</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select manager" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="john">John Smith</SelectItem>
                                <SelectItem value="sarah">Sarah Johnson</SelectItem>
                                <SelectItem value="mike">Mike Wilson</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Cancel</Button>
                          <Button>Create Project</Button>
                        </div>
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
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="on_hold">On Hold</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Manager</TableHead>
                        <TableHead>Budget</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Profitability</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProjects.map((project) => (
                        <TableRow key={project.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{project.name}</div>
                              <div className="text-sm text-slate-500">
                                {project.actualHours}h / {project.estimatedHours}h
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{project.customerName}</TableCell>
                          <TableCell>{project.managerName}</TableCell>
                          <TableCell>
                            <div className="text-right">
                              <div className="font-medium">${project.budget?.toLocaleString()}</div>
                              <div className="text-sm text-slate-500">
                                Spent: ${project.actualCost.toLocaleString()}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>{project.progress}%</span>
                              </div>
                              <Progress value={project.progress} className="w-20" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className={`text-sm font-medium ${
                                project.profitability && project.profitability > 0 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {project.profitability}%
                              </div>
                              <TrendingUp className={`w-4 h-4 ${
                                project.profitability && project.profitability > 0 ? 'text-green-600' : 'text-red-600'
                              }`} />
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(project.status, 'project')}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">View</Button>
                              <Button variant="ghost" size="sm">Edit</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Tasks</CardTitle>
                    <CardDescription>Manage project tasks and assignments</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        New Task
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Create New Task</DialogTitle>
                        <DialogDescription>Add a new task to a project</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="task-name">Task Name</Label>
                            <Input id="task-name" placeholder="Enter task name" />
                          </div>
                          <div>
                            <Label htmlFor="project">Project</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select project" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="website">Website Redesign</SelectItem>
                                <SelectItem value="mobile">Mobile App Development</SelectItem>
                                <SelectItem value="erp">ERP Implementation</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="task-description">Description</Label>
                          <Textarea id="task-description" placeholder="Task description and requirements" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="priority">Priority</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="assignee">Assignee</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select assignee" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="alice">Alice Brown</SelectItem>
                                <SelectItem value="bob">Bob Davis</SelectItem>
                                <SelectItem value="carol">Carol White</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="estimated-hours">Estimated Hours</Label>
                            <Input id="estimated-hours" type="number" step="0.5" placeholder="40" />
                          </div>
                          <div>
                            <Label htmlFor="due-date">Due Date</Label>
                            <Input id="due-date" type="date" />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Cancel</Button>
                          <Button>Create Task</Button>
                        </div>
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
                      placeholder="Search tasks..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Task</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Assignee</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Hours</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTasks.map((task) => (
                        <TableRow key={task.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{task.name}</div>
                              <div className="text-sm text-slate-500">{task.description}</div>
                            </div>
                          </TableCell>
                          <TableCell>{task.projectName}</TableCell>
                          <TableCell>{task.assigneeName}</TableCell>
                          <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{task.actualHours}h / {task.estimatedHours || '-'}h</div>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(task.status, 'task')}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">View</Button>
                              <Button variant="ghost" size="sm">Edit</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Time Entries Tab */}
          <TabsContent value="time" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Time Entries</CardTitle>
                    <CardDescription>Track time spent on projects and tasks</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Log Time
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Log Time Entry</DialogTitle>
                        <DialogDescription>Record time spent on project work</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="project">Project</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select project" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="website">Website Redesign</SelectItem>
                              <SelectItem value="mobile">Mobile App Development</SelectItem>
                              <SelectItem value="erp">ERP Implementation</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="task">Task</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select task" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="design">Design Homepage</SelectItem>
                              <SelectItem value="api">Develop Backend API</SelectItem>
                              <SelectItem value="ui">UI/UX Design</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="date">Date</Label>
                            <Input id="date" type="date" />
                          </div>
                          <div>
                            <Label htmlFor="hours">Hours</Label>
                            <Input id="hours" type="number" step="0.5" placeholder="8" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea id="description" placeholder="What did you work on?" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="rate">Hourly Rate ($)</Label>
                            <Input id="rate" type="number" placeholder="100" />
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="billable" defaultChecked />
                            <Label htmlFor="billable">Billable</Label>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Cancel</Button>
                          <Button>Log Time</Button>
                        </div>
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
                      placeholder="Search time entries..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Task</TableHead>
                        <TableHead>Hours</TableHead>
                        <TableHead>Rate</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Billable</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTimeEntries.map((entry) => (
                        <TableRow key={entry.id}>
                          <TableCell>{entry.date}</TableCell>
                          <TableCell>{entry.userName}</TableCell>
                          <TableCell>{entry.projectName}</TableCell>
                          <TableCell>{entry.taskName}</TableCell>
                          <TableCell>{entry.hours}h</TableCell>
                          <TableCell>${entry.rate}/h</TableCell>
                          <TableCell>${entry.totalAmount}</TableCell>
                          <TableCell>
                            <Badge variant={entry.billable ? 'default' : 'secondary'}>
                              {entry.billable ? 'Yes' : 'No'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">Edit</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}