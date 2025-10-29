'use client'

import { useState, useEffect } from 'react'
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
  Users, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  UserPlus,
  Target,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Activity,
  RefreshCw
} from "lucide-react"

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  company: string
  source: string
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
  priority: 'low' | 'medium' | 'high'
  estimatedValue: number
  assignedTo?: string
  notes: string
  createdAt: string
  updatedAt: string
}

interface Opportunity {
  id: string
  name: string
  leadId?: string
  customerId?: string
  amount: number
  probability: number
  expectedCloseDate: string
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost'
  notes: string
  assignedTo?: string
  createdAt: string
  updatedAt: string
}

interface Contact {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  position: string
  customerId?: string
  leadId?: string
  createdAt: string
  updatedAt: string
}

interface Activity {
  id: string
  type: 'call' | 'email' | 'meeting' | 'task'
  subject: string
  description: string
  dueDate?: string
  completed: boolean
  leadId?: string
  opportunityId?: string
  contactId?: string
  assignedTo?: string
  createdAt: string
  updatedAt: string
}

const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@company.com',
    phone: '+1-555-0123',
    company: 'Tech Corp',
    source: 'website',
    status: 'qualified',
    priority: 'high',
    estimatedValue: 50000,
    assignedTo: 'Alice Johnson',
    notes: 'Interested in our enterprise solution',
    createdAt: '2024-01-10T10:00:00',
    updatedAt: '2024-01-15T14:30:00'
  },
  {
    id: '2',
    name: 'Sarah Williams',
    email: 'sarah.w@startup.io',
    phone: '+1-555-0456',
    company: 'Startup IO',
    source: 'referral',
    status: 'contacted',
    priority: 'medium',
    estimatedValue: 25000,
    assignedTo: 'Bob Davis',
    notes: 'Follow up scheduled for next week',
    createdAt: '2024-01-12T09:15:00',
    updatedAt: '2024-01-14T16:20:00'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.j@manufacturing.com',
    phone: '+1-555-0789',
    company: 'Manufacturing Co',
    source: 'advertisement',
    status: 'new',
    priority: 'low',
    estimatedValue: 15000,
    notes: 'Initial inquiry received',
    createdAt: '2024-01-15T11:45:00',
    updatedAt: '2024-01-15T11:45:00'
  }
]

const mockOpportunities: Opportunity[] = [
  {
    id: '1',
    name: 'Enterprise Software License',
    leadId: '1',
    amount: 50000,
    probability: 75,
    expectedCloseDate: '2024-02-15',
    stage: 'proposal',
    notes: 'Proposal sent, awaiting feedback',
    assignedTo: 'Alice Johnson',
    createdAt: '2024-01-10T10:00:00',
    updatedAt: '2024-01-15T14:30:00'
  },
  {
    id: '2',
    name: 'Cloud Migration Project',
    customerId: 'customer-1',
    amount: 75000,
    probability: 50,
    expectedCloseDate: '2024-03-01',
    stage: 'qualification',
    notes: 'Technical assessment in progress',
    assignedTo: 'Bob Davis',
    createdAt: '2024-01-08T14:20:00',
    updatedAt: '2024-01-14T09:30:00'
  }
]

const mockContacts: Contact[] = [
  {
    id: '1',
    firstName: 'Emily',
    lastName: 'Brown',
    email: 'emily.brown@techcorp.com',
    phone: '+1-555-1111',
    position: 'IT Director',
    customerId: 'customer-1',
    createdAt: '2024-01-05T09:00:00',
    updatedAt: '2024-01-05T09:00:00'
  },
  {
    id: '2',
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.wilson@startup.io',
    phone: '+1-555-2222',
    position: 'CEO',
    leadId: '2',
    createdAt: '2024-01-12T09:15:00',
    updatedAt: '2024-01-12T09:15:00'
  }
]

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'call',
    subject: 'Follow up call with John Smith',
    description: 'Discussed enterprise solution requirements',
    dueDate: '2024-01-16T15:00:00',
    completed: true,
    leadId: '1',
    assignedTo: 'Alice Johnson',
    createdAt: '2024-01-15T14:30:00',
    updatedAt: '2024-01-15T16:45:00'
  },
  {
    id: '2',
    type: 'email',
    subject: 'Send proposal to Sarah Williams',
    description: 'Prepare and send detailed proposal',
    dueDate: '2024-01-17T12:00:00',
    completed: false,
    leadId: '2',
    assignedTo: 'Bob Davis',
    createdAt: '2024-01-14T16:20:00',
    updatedAt: '2024-01-14T16:20:00'
  },
  {
    id: '3',
    type: 'meeting',
    subject: 'Technical review with Emily Brown',
    description: 'Review technical requirements for cloud migration',
    dueDate: '2024-01-18T10:00:00',
    completed: false,
    contactId: '1',
    assignedTo: 'Alice Johnson',
    createdAt: '2024-01-15T11:00:00',
    updatedAt: '2024-01-15T11:00:00'
  }
]

export default function CRMPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedPriority, setSelectedPriority] = useState('all')
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false)
  const [isAddOpportunityOpen, setIsAddOpportunityOpen] = useState(false)
  const [isAddContactOpen, setIsAddContactOpen] = useState(false)
  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false)

  useEffect(() => {
    fetchCRMData()
  }, [])

  const fetchCRMData = async () => {
    setLoading(true)
    try {
      // Fetch leads
      const leadsResponse = await fetch('/api/crm/leads')
      if (leadsResponse.ok) {
        const leadsData = await leadsResponse.json()
        setLeads(leadsData.leads || [])
      }

      // Fetch opportunities
      const opportunitiesResponse = await fetch('/api/crm/opportunities')
      if (opportunitiesResponse.ok) {
        const opportunitiesData = await opportunitiesResponse.json()
        setOpportunities(opportunitiesData.opportunities || [])
      }

      // Fetch contacts
      const contactsResponse = await fetch('/api/crm/contacts')
      if (contactsResponse.ok) {
        const contactsData = await contactsResponse.json()
        setContacts(contactsData.contacts || [])
      }

      // Fetch activities
      const activitiesResponse = await fetch('/api/crm/activities')
      if (activitiesResponse.ok) {
        const activitiesData = await activitiesResponse.json()
        setActivities(activitiesData.activities || [])
      }
    } catch (error) {
      console.error('Error fetching CRM data:', error)
      // Fallback to mock data if API fails
      setLeads(mockLeads)
      setOpportunities(mockOpportunities)
      setContacts(mockContacts)
      setActivities(mockActivities)
    } finally {
      setLoading(false)
    }
  }

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || lead.status === selectedStatus
    const matchesPriority = selectedPriority === 'all' || lead.priority === selectedPriority
    return matchesSearch && matchesStatus && matchesPriority
  })

  const getLeadStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-100 text-blue-700"><Clock className="w-3 h-3 mr-1" />New</Badge>
      case 'contacted':
        return <Badge className="bg-yellow-100 text-yellow-700"><Phone className="w-3 h-3 mr-1" />Contacted</Badge>
      case 'qualified':
        return <Badge className="bg-purple-100 text-purple-700"><Target className="w-3 h-3 mr-1" />Qualified</Badge>
      case 'converted':
        return <Badge className="bg-green-100 text-green-700"><CheckCircle className="w-3 h-3 mr-1" />Converted</Badge>
      case 'lost':
        return <Badge className="bg-red-100 text-red-700"><AlertTriangle className="w-3 h-3 mr-1" />Lost</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-700">High</Badge>
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-700">Medium</Badge>
      case 'low':
        return <Badge className="bg-green-100 text-green-700">Low</Badge>
      default:
        return <Badge>{priority}</Badge>
    }
  }

  const getOpportunityStageBadge = (stage: string) => {
    switch (stage) {
      case 'prospecting':
        return <Badge className="bg-blue-100 text-blue-700">Prospecting</Badge>
      case 'qualification':
        return <Badge className="bg-purple-100 text-purple-700">Qualification</Badge>
      case 'proposal':
        return <Badge className="bg-yellow-100 text-yellow-700">Proposal</Badge>
      case 'negotiation':
        return <Badge className="bg-orange-100 text-orange-700">Negotiation</Badge>
      case 'closed_won':
        return <Badge className="bg-green-100 text-green-700"><CheckCircle className="w-3 h-3 mr-1" />Won</Badge>
      case 'closed_lost':
        return <Badge className="bg-red-100 text-red-700"><AlertTriangle className="w-3 h-3 mr-1" />Lost</Badge>
      default:
        return <Badge>{stage}</Badge>
    }
  }

  const getActivityTypeIcon = (type: string) => {
    switch (type) {
      case 'call':
        return <Phone className="w-4 h-4" />
      case 'email':
        return <Mail className="w-4 h-4" />
      case 'meeting':
        return <Calendar className="w-4 h-4" />
      case 'task':
        return <Activity className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-pink-100 rounded-lg">
                <Users className="w-8 h-8 text-pink-700" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">CRM</h1>
                <p className="text-slate-600">Convert your leads and opportunities into sales</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Dialog open={isAddLeadOpen} onOpenChange={setIsAddLeadOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Lead
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Lead</DialogTitle>
                    <DialogDescription>
                      Create a new lead in your CRM system
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="lead-name">Name</Label>
                      <Input id="lead-name" placeholder="Enter lead name" />
                    </div>
                    <div>
                      <Label htmlFor="lead-email">Email</Label>
                      <Input id="lead-email" type="email" placeholder="Enter email address" />
                    </div>
                    <div>
                      <Label htmlFor="lead-phone">Phone</Label>
                      <Input id="lead-phone" placeholder="Enter phone number" />
                    </div>
                    <div>
                      <Label htmlFor="lead-company">Company</Label>
                      <Input id="lead-company" placeholder="Enter company name" />
                    </div>
                    <div>
                      <Label htmlFor="lead-source">Source</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select source" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="website">Website</SelectItem>
                          <SelectItem value="referral">Referral</SelectItem>
                          <SelectItem value="advertisement">Advertisement</SelectItem>
                          <SelectItem value="social">Social Media</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="lead-value">Estimated Value ($)</Label>
                      <Input id="lead-value" type="number" placeholder="0" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddLeadOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddLeadOpen(false)}>
                      Add Lead
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog open={isAddActivityOpen} onOpenChange={setIsAddActivityOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Activity className="w-4 h-4 mr-2" />
                    Add Activity
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Activity</DialogTitle>
                    <DialogDescription>
                      Schedule a new activity or task
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="activity-type">Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select activity type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="call">Call</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="meeting">Meeting</SelectItem>
                          <SelectItem value="task">Task</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="activity-subject">Subject</Label>
                      <Input id="activity-subject" placeholder="Enter activity subject" />
                    </div>
                    <div>
                      <Label htmlFor="activity-description">Description</Label>
                      <Textarea id="activity-description" placeholder="Enter activity description" />
                    </div>
                    <div>
                      <Label htmlFor="activity-date">Due Date</Label>
                      <Input id="activity-date" type="datetime-local" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddActivityOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddActivityOpen(false)}>
                      Add Activity
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
                <CardTitle className="text-sm font-medium text-slate-600">Total Leads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{leads.length}</div>
                <p className="text-xs text-slate-600">
                  {leads.filter(l => l.status === 'new').length} new leads
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{opportunities.length}</div>
                <p className="text-xs text-slate-600">
                  ${opportunities.reduce((sum, o) => sum + o.amount, 0).toLocaleString()} total value
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {((leads.filter(l => l.status === 'converted').length / leads.length) * 100 || 0).toFixed(1)}%
                </div>
                <p className="text-xs text-slate-600">Lead to customer</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{activities.length}</div>
                <p className="text-xs text-slate-600">
                  {activities.filter(a => !a.completed).length} pending
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="leads" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
          </TabsList>

          <TabsContent value="leads" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search leads by name, company, or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="qualified">Qualified</SelectItem>
                      <SelectItem value="converted">Converted</SelectItem>
                      <SelectItem value="lost">Lost</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                    <SelectTrigger className="w-full md:w-32">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priority</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Leads Table */}
            <Card>
              <CardHeader>
                <CardTitle>Leads Management</CardTitle>
                <CardDescription>Manage your leads and track their progress through the sales pipeline</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{lead.name}</div>
                            <div className="text-sm text-slate-600">{lead.source}</div>
                          </div>
                        </TableCell>
                        <TableCell>{lead.company}</TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm">{lead.email}</div>
                            <div className="text-xs text-slate-600">{lead.phone}</div>
                          </div>
                        </TableCell>
                        <TableCell>{getLeadStatusBadge(lead.status)}</TableCell>
                        <TableCell>{getPriorityBadge(lead.priority)}</TableCell>
                        <TableCell className="text-right">${lead.estimatedValue.toLocaleString()}</TableCell>
                        <TableCell>{lead.assignedTo || '-'}</TableCell>
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

          <TabsContent value="opportunities" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Opportunities</h2>
                <p className="text-slate-600">Track your sales opportunities and deal pipeline</p>
              </div>
              <Dialog open={isAddOpportunityOpen} onOpenChange={setIsAddOpportunityOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Target className="w-4 h-4 mr-2" />
                    Add Opportunity
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Opportunity</DialogTitle>
                    <DialogDescription>
                      Create a new sales opportunity
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label htmlFor="opportunity-name">Opportunity Name</Label>
                      <Input id="opportunity-name" placeholder="Enter opportunity name" />
                    </div>
                    <div>
                      <Label htmlFor="opportunity-amount">Amount ($)</Label>
                      <Input id="opportunity-amount" type="number" placeholder="0" />
                    </div>
                    <div>
                      <Label htmlFor="opportunity-probability">Probability (%)</Label>
                      <Input id="opportunity-probability" type="number" min="0" max="100" placeholder="50" />
                    </div>
                    <div>
                      <Label htmlFor="opportunity-date">Expected Close Date</Label>
                      <Input id="opportunity-date" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="opportunity-stage">Stage</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select stage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="prospecting">Prospecting</SelectItem>
                          <SelectItem value="qualification">Qualification</SelectItem>
                          <SelectItem value="proposal">Proposal</SelectItem>
                          <SelectItem value="negotiation">Negotiation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddOpportunityOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddOpportunityOpen(false)}>
                      Add Opportunity
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Opportunities Pipeline</CardTitle>
                <CardDescription>Track your sales opportunities through each stage</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Opportunity</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Probability</TableHead>
                      <TableHead>Stage</TableHead>
                      <TableHead>Expected Close</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {opportunities.map((opportunity) => (
                      <TableRow key={opportunity.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{opportunity.name}</div>
                            <div className="text-sm text-slate-600">
                              {opportunity.leadId ? 'From Lead' : 'From Customer'}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">${opportunity.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 bg-slate-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${opportunity.probability}%` }}
                              />
                            </div>
                            <span className="text-sm text-slate-600">{opportunity.probability}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{getOpportunityStageBadge(opportunity.stage)}</TableCell>
                        <TableCell>
                          {new Date(opportunity.expectedCloseDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{opportunity.assignedTo || '-'}</TableCell>
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

          <TabsContent value="contacts" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Contacts</h2>
                <p className="text-slate-600">Manage your contact information and relationships</p>
              </div>
              <Dialog open={isAddContactOpen} onOpenChange={setIsAddContactOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Contact
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Contact</DialogTitle>
                    <DialogDescription>
                      Create a new contact record
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contact-first">First Name</Label>
                        <Input id="contact-first" placeholder="First name" />
                      </div>
                      <div>
                        <Label htmlFor="contact-last">Last Name</Label>
                        <Input id="contact-last" placeholder="Last name" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="contact-email">Email</Label>
                      <Input id="contact-email" type="email" placeholder="Email address" />
                    </div>
                    <div>
                      <Label htmlFor="contact-phone">Phone</Label>
                      <Input id="contact-phone" placeholder="Phone number" />
                    </div>
                    <div>
                      <Label htmlFor="contact-position">Position</Label>
                      <Input id="contact-position" placeholder="Job position" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddContactOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddContactOpen(false)}>
                      Add Contact
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Contacts Directory</CardTitle>
                <CardDescription>Manage your contact information and relationships</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell>
                          <div className="font-medium">
                            {contact.firstName} {contact.lastName}
                          </div>
                        </TableCell>
                        <TableCell>{contact.position}</TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm">{contact.email}</div>
                            <div className="text-xs text-slate-600">{contact.phone}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {contact.customerId ? 'Customer' : contact.leadId ? 'Lead' : '-'}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {contact.customerId ? 'Customer' : contact.leadId ? 'Lead' : 'Standalone'}
                          </Badge>
                        </TableCell>
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

          <TabsContent value="activities" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Activities</h2>
              <p className="text-slate-600">Track your activities, tasks, and follow-ups</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Activity Timeline</CardTitle>
                <CardDescription>Your recent activities and upcoming tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activities.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getActivityTypeIcon(activity.type)}
                            <span className="capitalize">{activity.type}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{activity.subject}</TableCell>
                        <TableCell className="max-w-xs truncate">{activity.description}</TableCell>
                        <TableCell>
                          {activity.dueDate ? (
                            <div>
                              <div>{new Date(activity.dueDate).toLocaleDateString()}</div>
                              <div className="text-xs text-slate-600">
                                {new Date(activity.dueDate).toLocaleTimeString()}
                              </div>
                            </div>
                          ) : (
                            '-'
                          )}
                        </TableCell>
                        <TableCell>
                          {activity.completed ? (
                            <Badge className="bg-green-100 text-green-700">
                              <CheckCircle className="w-3 h-3 mr-1" />Completed
                            </Badge>
                          ) : (
                            <Badge className="bg-yellow-100 text-yellow-700">
                              <Clock className="w-3 h-3 mr-1" />Pending
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{activity.assignedTo || '-'}</TableCell>
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
        </Tabs>
      </div>
    </div>
  )
}