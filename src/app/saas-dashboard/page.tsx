'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Users, 
  Database, 
  CreditCard, 
  Settings, 
  BarChart3, 
  Shield,
  Upgrade,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react"

interface User {
  id: string
  email: string
  name: string
  role: string
  tenantId: string
  isTenantAdmin: boolean
  subscriptionTier: string
  subscriptionStatus: string
  subscriptionEndsAt?: string
}

interface Tenant {
  id: string
  name: string
  slug: string
  plan: string
  status: string
  maxUsers: number
  maxStorage: number
  trialEndsAt?: string
  features: string[]
}

interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price: number
  interval: string
  features: string[]
  maxUsers: number
  maxStorage: number
}

export default function SaaSDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [tenant, setTenant] = useState<Tenant | null>(null)
  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching user data
    const fetchUserData = async () => {
      try {
        // In a real app, you would fetch from your API
        const mockUser: User = {
          id: '1',
          email: 'admin@example.com',
          name: 'John Doe',
          role: 'admin',
          tenantId: '1',
          isTenantAdmin: true,
          subscriptionTier: 'free',
          subscriptionStatus: 'active',
          subscriptionEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
        }

        const mockTenant: Tenant = {
          id: '1',
          name: 'Acme Corporation',
          slug: 'acme-corp',
          plan: 'free',
          status: 'active',
          maxUsers: 5,
          maxStorage: 1024,
          trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          features: ['Basic modules', 'Email support', '1GB storage']
        }

        const mockPlans: SubscriptionPlan[] = [
          {
            id: '1',
            name: 'Free',
            description: 'Perfect for small teams getting started',
            price: 0,
            interval: 'monthly',
            features: ['Up to 5 users', '1GB storage', 'Basic modules', 'Email support'],
            maxUsers: 5,
            maxStorage: 1024
          },
          {
            id: '2',
            name: 'Basic',
            description: 'Great for growing businesses',
            price: 29,
            interval: 'monthly',
            features: ['Up to 20 users', '10GB storage', 'All modules', 'Priority support', 'Advanced reporting'],
            maxUsers: 20,
            maxStorage: 10240
          },
          {
            id: '3',
            name: 'Pro',
            description: 'For established businesses',
            price: 99,
            interval: 'monthly',
            features: ['Up to 100 users', '100GB storage', 'All modules + premium features', '24/7 phone support', 'Custom integrations', 'API access'],
            maxUsers: 100,
            maxStorage: 102400
          },
          {
            id: '4',
            name: 'Enterprise',
            description: 'Custom solution for large organizations',
            price: 299,
            interval: 'monthly',
            features: ['Unlimited users', 'Unlimited storage', 'All features', 'Dedicated support', 'Custom development', 'SLA guarantee', 'On-premise option'],
            maxUsers: 999999,
            maxStorage: 999999
          }
        ]

        setUser(mockUser)
        setTenant(mockTenant)
        setPlans(mockPlans)
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleUpgrade = async (planId: string) => {
    try {
      // In a real app, you would call your upgrade API
      console.log('Upgrading to plan:', planId)
      alert('Upgrade functionality would be implemented here')
    } catch (error) {
      console.error('Error upgrading subscription:', error)
    }
  }

  const getDaysRemaining = (endDate?: string) => {
    if (!endDate) return 0
    const end = new Date(endDate)
    const now = new Date()
    const diffTime = end.getTime() - now.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'free': return 'bg-gray-100 text-gray-700'
      case 'basic': return 'bg-blue-100 text-blue-700'
      case 'pro': return 'bg-purple-100 text-purple-700'
      case 'enterprise': return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-slate-900 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user || !tenant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900">Access Denied</h1>
            <p className="text-slate-600 mt-2">Please log in to access the dashboard.</p>
          </div>
        </div>
      </div>
    )
  }

  const daysRemaining = getDaysRemaining(user.subscriptionEndsAt || tenant.trialEndsAt)
  const isTrialActive = tenant.trialEndsAt && new Date() < new Date(tenant.trialEndsAt)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">SaaS Dashboard</h1>
          <p className="text-slate-600 mt-2">Manage your subscription and tenant settings</p>
        </div>

        {/* Alert for Trial */}
        {isTrialActive && (
          <Card className="mb-6 border-amber-200 bg-amber-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-amber-600" />
                <div className="flex-1">
                  <p className="text-amber-800 font-medium">
                    Free Trial Active - {daysRemaining} days remaining
                  </p>
                  <p className="text-amber-700 text-sm">
                    Upgrade to a paid plan to continue using all features after your trial ends.
                  </p>
                </div>
                <Button 
                  onClick={() => handleUpgrade('2')}
                  className="bg-amber-600 hover:bg-amber-700"
                >
                  <Upgrade className="h-4 w-4 mr-2" />
                  Upgrade Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Current Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Badge className={getPlanColor(tenant.plan)}>
                      {tenant.plan.charAt(0).toUpperCase() + tenant.plan.slice(1)}
                    </Badge>
                    {tenant.status === 'active' && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    {tenant.plan === 'free' ? 'Trial Plan' : 'Paid Plan'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">1/{tenant.maxUsers}</div>
                  <p className="text-xs text-slate-600">Active users</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Storage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">0 MB/{tenant.maxStorage} MB</div>
                  <p className="text-xs text-slate-600">Used storage</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Active
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">All systems operational</p>
                </CardContent>
              </Card>
            </div>

            {/* Tenant Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Tenant Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600">Company Name</label>
                    <p className="text-slate-900">{tenant.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Tenant Slug</label>
                    <p className="text-slate-900">{tenant.slug}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Admin Email</label>
                    <p className="text-slate-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Role</label>
                    <p className="text-slate-900">{user.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscription" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan) => (
                <Card key={plan.id} className="relative">
                  {plan.name.toLowerCase() === tenant.plan && (
                    <div className="absolute -top-2 -right-2">
                      <Badge className="bg-green-500">Current</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <span className="text-3xl font-bold">${plan.price}</span>
                      <span className="text-slate-600">/{plan.interval}</span>
                    </div>
                    <ul className="space-y-2 mb-4">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full"
                      variant={plan.name.toLowerCase() === tenant.plan ? "outline" : "default"}
                      onClick={() => handleUpgrade(plan.id)}
                      disabled={plan.name.toLowerCase() === tenant.plan}
                    >
                      {plan.name.toLowerCase() === tenant.plan ? 'Current Plan' : 'Upgrade'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>User Management</span>
                </CardTitle>
                <CardDescription>Manage users in your tenant</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-slate-200 rounded-full flex items-center justify-center">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-slate-600">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{user.role}</Badge>
                      {user.isTenantAdmin && (
                        <Badge className="bg-blue-100 text-blue-700">Admin</Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-center py-8 text-slate-500">
                    <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Invite team members to collaborate</p>
                    <Button className="mt-2" variant="outline">
                      Invite User
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Tenant Settings</span>
                </CardTitle>
                <CardDescription>Configure your tenant preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-600">Company Name</label>
                      <input 
                        type="text" 
                        defaultValue={tenant.name}
                        className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Tenant Slug</label>
                      <input 
                        type="text" 
                        defaultValue={tenant.slug}
                        className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Security</span>
                </CardTitle>
                <CardDescription>Manage security settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-slate-600">Add an extra layer of security</p>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Session Timeout</p>
                      <p className="text-sm text-slate-600">Automatically log out after inactivity</p>
                    </div>
                    <select className="px-3 py-2 border border-slate-300 rounded-md">
                      <option>30 minutes</option>
                      <option>1 hour</option>
                      <option>4 hours</option>
                      <option>24 hours</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}