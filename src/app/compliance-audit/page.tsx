'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, FileText, Shield, AlertTriangle, TrendingUp, Search, Plus, Filter, Download } from 'lucide-react';

interface Regulation {
  id: string;
  name: string;
  code: string;
  type: string;
  category: string;
  description?: string;
  jurisdiction?: string;
  effectiveDate?: string;
  lastUpdated?: string;
  isActive: boolean;
  createdAt: string;
}

interface Audit {
  id: string;
  name: string;
  type: string;
  scope?: string;
  objectives?: string;
  scheduledStart: string;
  scheduledEnd: string;
  actualStart?: string;
  actualEnd?: string;
  status: string;
  leadAuditor?: string;
  riskLevel: string;
  findings?: string;
  recommendations?: string;
  createdAt: string;
}

interface Risk {
  id: string;
  name: string;
  description: string;
  category: string;
  source: string;
  likelihood: string;
  impact: string;
  riskLevel: string;
  mitigation?: string;
  owner?: string;
  status: string;
  identifiedDate: string;
  targetDate?: string;
}

interface Report {
  id: string;
  name: string;
  type: string;
  period: string;
  startDate: string;
  endDate: string;
  status: string;
  generatedBy?: string;
  generatedAt: string;
  summary?: string;
  createdAt: string;
}

export default function ComplianceAuditPage() {
  const [regulations, setRegulations] = useState<Regulation[]>([]);
  const [audits, setAudits] = useState<Audit[]>([]);
  const [risks, setRisks] = useState<Risk[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Form states
  const [showRegulationDialog, setShowRegulationDialog] = useState(false);
  const [showAuditDialog, setShowAuditDialog] = useState(false);
  const [showRiskDialog, setShowRiskDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);

  // Form data
  const [regulationForm, setRegulationForm] = useState({
    name: '',
    code: '',
    type: '',
    category: '',
    description: '',
    jurisdiction: '',
    effectiveDate: '',
    lastUpdated: '',
    isActive: true,
  });

  const [auditForm, setAuditForm] = useState({
    name: '',
    type: '',
    scope: '',
    objectives: '',
    scheduledStart: '',
    scheduledEnd: '',
    leadAuditor: '',
    riskLevel: '',
  });

  const [riskForm, setRiskForm] = useState({
    name: '',
    description: '',
    category: '',
    source: '',
    likelihood: '',
    impact: '',
    riskLevel: '',
    mitigation: '',
    owner: '',
    status: 'Open',
    targetDate: '',
  });

  const [reportForm, setReportForm] = useState({
    name: '',
    type: '',
    period: '',
    startDate: '',
    endDate: '',
    summary: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [regRes, auditRes, riskRes, reportRes] = await Promise.all([
        fetch('/api/compliance-audit/regulations'),
        fetch('/api/compliance-audit/audits'),
        fetch('/api/compliance-audit/risks'),
        fetch('/api/compliance-audit/reports'),
      ]);

      const [regData, auditData, riskData, reportData] = await Promise.all([
        regRes.json(),
        auditRes.json(),
        riskRes.json(),
        reportRes.json(),
      ]);

      setRegulations(regData.regulations || []);
      setAudits(auditData.audits || []);
      setRisks(riskData.risks || []);
      setReports(reportData.reports || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRegulation = async () => {
    try {
      const response = await fetch('/api/compliance-audit/regulations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regulationForm),
      });

      if (response.ok) {
        setShowRegulationDialog(false);
        setRegulationForm({
          name: '',
          code: '',
          type: '',
          category: '',
          description: '',
          jurisdiction: '',
          effectiveDate: '',
          lastUpdated: '',
          isActive: true,
        });
        fetchData();
      }
    } catch (error) {
      console.error('Error creating regulation:', error);
    }
  };

  const handleCreateAudit = async () => {
    try {
      const response = await fetch('/api/compliance-audit/audits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(auditForm),
      });

      if (response.ok) {
        setShowAuditDialog(false);
        setAuditForm({
          name: '',
          type: '',
          scope: '',
          objectives: '',
          scheduledStart: '',
          scheduledEnd: '',
          leadAuditor: '',
          riskLevel: '',
        });
        fetchData();
      }
    } catch (error) {
      console.error('Error creating audit:', error);
    }
  };

  const handleCreateRisk = async () => {
    try {
      const response = await fetch('/api/compliance-audit/risks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(riskForm),
      });

      if (response.ok) {
        setShowRiskDialog(false);
        setRiskForm({
          name: '',
          description: '',
          category: '',
          source: '',
          likelihood: '',
          impact: '',
          riskLevel: '',
          mitigation: '',
          owner: '',
          status: 'Open',
          targetDate: '',
        });
        fetchData();
      }
    } catch (error) {
      console.error('Error creating risk:', error);
    }
  };

  const handleCreateReport = async () => {
    try {
      const response = await fetch('/api/compliance-audit/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportForm),
      });

      if (response.ok) {
        setShowReportDialog(false);
        setReportForm({
          name: '',
          type: '',
          period: '',
          startDate: '',
          endDate: '',
          summary: '',
        });
        fetchData();
      }
    } catch (error) {
      console.error('Error creating report:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'completed':
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'in progress':
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'critical':
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredData = (data: any[]) => {
    return data.filter(item => {
      const matchesSearch = searchTerm === '' || 
        Object.values(item).some(value => 
          typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesType = filterType === 'all' || item.type === filterType || item.category === filterType;
      return matchesSearch && matchesType;
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Compliance & Audit Management</h1>
          <p className="text-muted-foreground">
            Ensure regulatory compliance and streamline audit processes
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Regulations</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{regulations.filter(r => r.isActive).length}</div>
            <p className="text-xs text-muted-foreground">
              Total: {regulations.length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Audits</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{audits.filter(a => a.status === 'In Progress').length}</div>
            <p className="text-xs text-muted-foreground">
              Total: {audits.length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Risks</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{risks.filter(r => r.status === 'Open').length}</div>
            <p className="text-xs text-muted-foreground">
              High Risk: {risks.filter(r => r.riskLevel === 'High').length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reports Generated</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.length}</div>
            <p className="text-xs text-muted-foreground">
              This Month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search across all modules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="GDPR">GDPR</SelectItem>
            <SelectItem value="SOX">SOX</SelectItem>
            <SelectItem value="HIPAA">HIPAA</SelectItem>
            <SelectItem value="Internal">Internal</SelectItem>
            <SelectItem value="External">External</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="regulations" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="regulations">Regulations</TabsTrigger>
          <TabsTrigger value="audits">Audits</TabsTrigger>
          <TabsTrigger value="risks">Risks</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Regulations Tab */}
        <TabsContent value="regulations" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Regulatory Compliance</h2>
            <Dialog open={showRegulationDialog} onOpenChange={setShowRegulationDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Regulation
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Regulation</DialogTitle>
                  <DialogDescription>
                    Create a new regulatory compliance framework
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={regulationForm.name}
                        onChange={(e) => setRegulationForm({ ...regulationForm, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="code">Code</Label>
                      <Input
                        id="code"
                        value={regulationForm.code}
                        onChange={(e) => setRegulationForm({ ...regulationForm, code: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="type">Type</Label>
                      <Select onValueChange={(value) => setRegulationForm({ ...regulationForm, type: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="GDPR">GDPR</SelectItem>
                          <SelectItem value="SOX">SOX</SelectItem>
                          <SelectItem value="HIPAA">HIPAA</SelectItem>
                          <SelectItem value="PCI-DSS">PCI-DSS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select onValueChange={(value) => setRegulationForm({ ...regulationForm, category: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Data Privacy">Data Privacy</SelectItem>
                          <SelectItem value="Financial">Financial</SelectItem>
                          <SelectItem value="Security">Security</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={regulationForm.description}
                      onChange={(e) => setRegulationForm({ ...regulationForm, description: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="jurisdiction">Jurisdiction</Label>
                      <Input
                        id="jurisdiction"
                        value={regulationForm.jurisdiction}
                        onChange={(e) => setRegulationForm({ ...regulationForm, jurisdiction: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="effectiveDate">Effective Date</Label>
                      <Input
                        id="effectiveDate"
                        type="date"
                        value={regulationForm.effectiveDate}
                        onChange={(e) => setRegulationForm({ ...regulationForm, effectiveDate: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleCreateRegulation}>Create Regulation</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {filteredData(regulations).map((regulation) => (
              <Card key={regulation.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{regulation.name}</CardTitle>
                      <CardDescription>{regulation.code} • {regulation.type}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(regulation.isActive ? 'active' : 'inactive')}>
                      {regulation.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Category:</span>
                      <p className="text-muted-foreground">{regulation.category}</p>
                    </div>
                    <div>
                      <span className="font-medium">Jurisdiction:</span>
                      <p className="text-muted-foreground">{regulation.jurisdiction || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="font-medium">Effective Date:</span>
                      <p className="text-muted-foreground">
                        {regulation.effectiveDate ? new Date(regulation.effectiveDate).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Last Updated:</span>
                      <p className="text-muted-foreground">
                        {regulation.lastUpdated ? new Date(regulation.lastUpdated).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                  {regulation.description && (
                    <div className="mt-4">
                      <span className="font-medium">Description:</span>
                      <p className="text-muted-foreground mt-1">{regulation.description}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Audits Tab */}
        <TabsContent value="audits" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Audit Management</h2>
            <Dialog open={showAuditDialog} onOpenChange={setShowAuditDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Audit
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Schedule New Audit</DialogTitle>
                  <DialogDescription>
                    Create a new audit plan and schedule
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="auditName">Audit Name</Label>
                      <Input
                        id="auditName"
                        value={auditForm.name}
                        onChange={(e) => setAuditForm({ ...auditForm, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="auditType">Type</Label>
                      <Select onValueChange={(value) => setAuditForm({ ...auditForm, type: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Internal">Internal</SelectItem>
                          <SelectItem value="External">External</SelectItem>
                          <SelectItem value="Regulatory">Regulatory</SelectItem>
                          <SelectItem value="IT">IT</SelectItem>
                          <SelectItem value="Financial">Financial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="scope">Scope</Label>
                    <Textarea
                      id="scope"
                      value={auditForm.scope}
                      onChange={(e) => setAuditForm({ ...auditForm, scope: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="objectives">Objectives</Label>
                    <Textarea
                      id="objectives"
                      value={auditForm.objectives}
                      onChange={(e) => setAuditForm({ ...auditForm, objectives: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="scheduledStart">Start Date</Label>
                      <Input
                        id="scheduledStart"
                        type="date"
                        value={auditForm.scheduledStart}
                        onChange={(e) => setAuditForm({ ...auditForm, scheduledStart: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="scheduledEnd">End Date</Label>
                      <Input
                        id="scheduledEnd"
                        type="date"
                        value={auditForm.scheduledEnd}
                        onChange={(e) => setAuditForm({ ...auditForm, scheduledEnd: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="leadAuditor">Lead Auditor</Label>
                      <Input
                        id="leadAuditor"
                        value={auditForm.leadAuditor}
                        onChange={(e) => setAuditForm({ ...auditForm, leadAuditor: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="riskLevel">Risk Level</Label>
                      <Select onValueChange={(value) => setAuditForm({ ...auditForm, riskLevel: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select risk level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleCreateAudit}>Schedule Audit</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {filteredData(audits).map((audit) => (
              <Card key={audit.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{audit.name}</CardTitle>
                      <CardDescription>{audit.type} • Risk: {audit.riskLevel}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(audit.status)}>
                      {audit.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Scheduled:</span>
                      <p className="text-muted-foreground">
                        {new Date(audit.scheduledStart).toLocaleDateString()} - {new Date(audit.scheduledEnd).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Lead Auditor:</span>
                      <p className="text-muted-foreground">{audit.leadAuditor || 'TBD'}</p>
                    </div>
                    <div>
                      <span className="font-medium">Actual Start:</span>
                      <p className="text-muted-foreground">
                        {audit.actualStart ? new Date(audit.actualStart).toLocaleDateString() : 'Not started'}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Risk Level:</span>
                      <p className="text-muted-foreground">{audit.riskLevel}</p>
                    </div>
                  </div>
                  {audit.scope && (
                    <div className="mt-4">
                      <span className="font-medium">Scope:</span>
                      <p className="text-muted-foreground mt-1">{audit.scope}</p>
                    </div>
                  )}
                  {audit.objectives && (
                    <div className="mt-4">
                      <span className="font-medium">Objectives:</span>
                      <p className="text-muted-foreground mt-1">{audit.objectives}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Risks Tab */}
        <TabsContent value="risks" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Risk Assessment</h2>
            <Dialog open={showRiskDialog} onOpenChange={setShowRiskDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Risk
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Risk</DialogTitle>
                  <DialogDescription>
                    Identify and document a new compliance risk
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="riskName">Risk Name</Label>
                      <Input
                        id="riskName"
                        value={riskForm.name}
                        onChange={(e) => setRiskForm({ ...riskForm, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="riskCategory">Category</Label>
                      <Select onValueChange={(value) => setRiskForm({ ...riskForm, category: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Operational">Operational</SelectItem>
                          <SelectItem value="Financial">Financial</SelectItem>
                          <SelectItem value="Legal">Legal</SelectItem>
                          <SelectItem value="Reputational">Reputational</SelectItem>
                          <SelectItem value="Strategic">Strategic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="riskDescription">Description</Label>
                    <Textarea
                      id="riskDescription"
                      value={riskForm.description}
                      onChange={(e) => setRiskForm({ ...riskForm, description: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="source">Source</Label>
                      <Select onValueChange={(value) => setRiskForm({ ...riskForm, source: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select source" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Internal">Internal</SelectItem>
                          <SelectItem value="External">External</SelectItem>
                          <SelectItem value="Regulatory">Regulatory</SelectItem>
                          <SelectItem value="Technology">Technology</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="owner">Owner</Label>
                      <Input
                        id="owner"
                        value={riskForm.owner}
                        onChange={(e) => setRiskForm({ ...riskForm, owner: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="likelihood">Likelihood</Label>
                      <Select onValueChange={(value) => setRiskForm({ ...riskForm, likelihood: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select likelihood" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Very Low">Very Low</SelectItem>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Very High">Very High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="impact">Impact</Label>
                      <Select onValueChange={(value) => setRiskForm({ ...riskForm, impact: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select impact" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Very Low">Very Low</SelectItem>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Very High">Very High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="riskLevel">Risk Level</Label>
                      <Select onValueChange={(value) => setRiskForm({ ...riskForm, riskLevel: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select risk level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Critical">Critical</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="mitigation">Mitigation Plan</Label>
                    <Textarea
                      id="mitigation"
                      value={riskForm.mitigation}
                      onChange={(e) => setRiskForm({ ...riskForm, mitigation: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select onValueChange={(value) => setRiskForm({ ...riskForm, status: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Open">Open</SelectItem>
                          <SelectItem value="Mitigated">Mitigated</SelectItem>
                          <SelectItem value="Accepted">Accepted</SelectItem>
                          <SelectItem value="Transferred">Transferred</SelectItem>
                          <SelectItem value="Closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="targetDate">Target Date</Label>
                      <Input
                        id="targetDate"
                        type="date"
                        value={riskForm.targetDate}
                        onChange={(e) => setRiskForm({ ...riskForm, targetDate: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleCreateRisk}>Add Risk</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {filteredData(risks).map((risk) => (
              <Card key={risk.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{risk.name}</CardTitle>
                      <CardDescription>{risk.category} • {risk.source}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(risk.riskLevel)}>
                        {risk.riskLevel}
                      </Badge>
                      <Badge className={getStatusColor(risk.status)}>
                        {risk.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Likelihood:</span>
                      <p className="text-muted-foreground">{risk.likelihood}</p>
                    </div>
                    <div>
                      <span className="font-medium">Impact:</span>
                      <p className="text-muted-foreground">{risk.impact}</p>
                    </div>
                    <div>
                      <span className="font-medium">Owner:</span>
                      <p className="text-muted-foreground">{risk.owner || 'Unassigned'}</p>
                    </div>
                    <div>
                      <span className="font-medium">Target Date:</span>
                      <p className="text-muted-foreground">
                        {risk.targetDate ? new Date(risk.targetDate).toLocaleDateString() : 'Not set'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="font-medium">Description:</span>
                    <p className="text-muted-foreground mt-1">{risk.description}</p>
                  </div>
                  {risk.mitigation && (
                    <div className="mt-4">
                      <span className="font-medium">Mitigation Plan:</span>
                      <p className="text-muted-foreground mt-1">{risk.mitigation}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Compliance Reports</h2>
            <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Generate New Report</DialogTitle>
                  <DialogDescription>
                    Create a new compliance report
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="reportName">Report Name</Label>
                      <Input
                        id="reportName"
                        value={reportForm.name}
                        onChange={(e) => setReportForm({ ...reportForm, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="reportType">Type</Label>
                      <Select onValueChange={(value) => setReportForm({ ...reportForm, type: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Status Report">Status Report</SelectItem>
                          <SelectItem value="Summary Report">Summary Report</SelectItem>
                          <SelectItem value="Detailed Report">Detailed Report</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="period">Period</Label>
                      <Select onValueChange={(value) => setReportForm({ ...reportForm, period: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Monthly">Monthly</SelectItem>
                          <SelectItem value="Quarterly">Quarterly</SelectItem>
                          <SelectItem value="Yearly">Yearly</SelectItem>
                          <SelectItem value="Custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="summary">Summary</Label>
                      <Textarea
                        id="summary"
                        value={reportForm.summary}
                        onChange={(e) => setReportForm({ ...reportForm, summary: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={reportForm.startDate}
                        onChange={(e) => setReportForm({ ...reportForm, startDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={reportForm.endDate}
                        onChange={(e) => setReportForm({ ...reportForm, endDate: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleCreateReport}>Generate Report</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {filteredData(reports).map((report) => (
              <Card key={report.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{report.name}</CardTitle>
                      <CardDescription>{report.type} • {report.period}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Period:</span>
                      <p className="text-muted-foreground">
                        {new Date(report.startDate).toLocaleDateString()} - {new Date(report.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Generated By:</span>
                      <p className="text-muted-foreground">{report.generatedBy || 'System'}</p>
                    </div>
                    <div>
                      <span className="font-medium">Generated At:</span>
                      <p className="text-muted-foreground">
                        {new Date(report.generatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Type:</span>
                      <p className="text-muted-foreground">{report.type}</p>
                    </div>
                  </div>
                  {report.summary && (
                    <div className="mt-4">
                      <span className="font-medium">Summary:</span>
                      <p className="text-muted-foreground mt-1">{report.summary}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}