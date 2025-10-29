'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Building2, 
  ShoppingCart, 
  Package, 
  Wallet, 
  Users, 
  ShoppingCart as PurchaseIcon, 
  BarChart3, 
  Wrench, 
  Truck, 
  Briefcase, 
  RefreshCw, 
  Network,
  UserCheck,
  Box,
  Shield,
  Star,
  Zap,
  Rocket,
  Crown,
  File,
  BookOpen,
  FileText,
  Brain,
  Share2,
  FlaskConical
} from "lucide-react"

const modules = [
  {
    id: "financial-accounting",
    title: "Financial Accounting",
    description: "Record all transactions in your chart of accounts.",
    icon: Building2,
    color: "bg-blue-100 text-blue-700",
    status: "active",
    tier: "free"
  },
  {
    id: "sales",
    title: "Sales",
    description: "Follow orders from quotation to customer satisfaction.",
    icon: ShoppingCart,
    color: "bg-green-100 text-green-700",
    status: "active",
    tier: "free"
  },
  {
    id: "inventory",
    title: "Inventory & Stock",
    description: "Track goods in your warehouses from receipt to delivery.",
    icon: Package,
    color: "bg-orange-100 text-orange-700",
    status: "active",
    tier: "free"
  },
  {
    id: "analytic-accounting",
    title: "Analytic Accounting",
    description: "Break down your expenses and revenues by category.",
    icon: Wallet,
    color: "bg-purple-100 text-purple-700",
    status: "active",
    tier: "free"
  },
  {
    id: "crm",
    title: "CRM",
    description: "Convert your leads and opportunities into sales.",
    icon: Users,
    color: "bg-pink-100 text-pink-700",
    status: "active",
    tier: "free"
  },
  {
    id: "purchasing",
    title: "Purchasing",
    description: "Follow your requests for quotation and reduce costs by grouping orders.",
    icon: PurchaseIcon,
    color: "bg-yellow-100 text-yellow-700",
    status: "active",
    tier: "free"
  },
  {
    id: "supply-chain",
    title: "Supply Chain",
    description: "Fill your warehouses just in time.",
    icon: BarChart3,
    color: "bg-indigo-100 text-indigo-700",
    status: "active",
    tier: "basic"
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    description: "Transform raw materials into finished products with bill of materials and routing.",
    icon: Wrench,
    color: "bg-red-100 text-red-700",
    status: "active",
    tier: "basic"
  },
  {
    id: "shipping",
    title: "Shipping",
    description: "Package shipments for your carriers.",
    icon: Truck,
    color: "bg-teal-100 text-teal-700",
    status: "active",
    tier: "basic"
  },
  {
    id: "project-management",
    title: "Project Management",
    description: "Check the profitability of projects and never forget to invoice customers.",
    icon: Briefcase,
    color: "bg-cyan-100 text-cyan-700",
    status: "active",
    tier: "basic"
  },
  {
    id: "subscription-management",
    title: "Subscription Management",
    description: "Create recurring invoices for your customer contracts.",
    icon: RefreshCw,
    color: "bg-lime-100 text-lime-700",
    status: "active",
    tier: "basic"
  },
  {
    id: "document-management",
    title: "Document Management",
    description: "Centralized document storage with approval workflows and version control.",
    icon: File,
    color: "bg-amber-100 text-amber-700",
    status: "active",
    tier: "pro"
  },
  {
    id: "business-intelligence",
    title: "Business Intelligence",
    description: "Advanced analytics, custom reports, and data visualization dashboards.",
    icon: BarChart3,
    color: "bg-violet-100 text-violet-700",
    status: "active",
    tier: "pro"
  },
  {
    id: "ecommerce-integration",
    title: "E-commerce Integration",
    description: "Multi-channel sales management with inventory synchronization.",
    icon: ShoppingCart,
    color: "bg-emerald-100 text-emerald-700",
    status: "active",
    tier: "pro"
  },
  {
    id: "third-party-integration",
    title: "Third Party Integration",
    description: "Automate your communication with banks, carriers, websites etc.",
    icon: Network,
    color: "bg-gray-100 text-gray-700",
    status: "active",
    tier: "pro"
  },
  {
    id: "human-resources",
    title: "Human Resources",
    description: "Manage employees, attendance, payroll, and performance reviews.",
    icon: UserCheck,
    color: "bg-rose-100 text-rose-700",
    status: "active",
    tier: "pro"
  },
  {
    id: "asset-management",
    title: "Asset Management",
    description: "Track physical assets, equipment, and maintenance schedules.",
    icon: Box,
    color: "bg-orange-100 text-orange-700",
    status: "active",
    tier: "pro"
  },
  {
    id: "tax-regulatory-compliance",
    title: "Tax & Regulatory Compliance",
    description: "Local tax rules engine, VAT/GST, tax reports and e-filing helpers.",
    icon: Shield,
    color: "bg-red-100 text-red-700",
    status: "active",
    tier: "pro"
  },
  {
    id: "compliance-audit-trail",
    title: "Compliance / Audit Trail & eSignature",
    description: "Immutable audit logs, document signing, role-based approvals.",
    icon: File,
    color: "bg-indigo-100 text-indigo-700",
    status: "active",
    tier: "pro"
  },
  {
    id: "ai-machine-learning",
    title: "Artificial Intelligence & Machine Learning",
    description: "Advanced automation and predictive capabilities with AI-powered insights.",
    icon: BarChart3,
    color: "bg-purple-100 text-purple-700",
    status: "active",
    tier: "enterprise"
  },
  {
    id: "quality-management",
    title: "Quality Management",
    description: "Ensure quality standards with inspections, audits, and CAPA.",
    icon: Shield,
    color: "bg-emerald-100 text-emerald-700",
    status: "active",
    tier: "pro"
  },
  {
    id: "learning-management",
    title: "Learning Management System",
    description: "Employee training, skill development, compliance tracking, and knowledge base.",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-700",
    status: "active",
    tier: "pro"
  },
  {
    id: "customer-success",
    title: "Customer Success Management",
    description: "Proactively manage customer relationships to reduce churn and increase lifetime value.",
    icon: Users,
    color: "bg-green-100 text-green-700",
    status: "active",
    tier: "pro"
  },
  {
    id: "contract-management",
    title: "Contract Lifecycle Management",
    description: "Streamline contract management and reduce legal risks.",
    icon: FileText,
    color: "bg-purple-100 text-purple-700",
    status: "active",
    tier: "pro"
  },
  {
    id: "business-intelligence-ai",
    title: "Advanced Business Intelligence & AI",
    description: "Transform raw data into actionable business insights using advanced AI/ML capabilities.",
    icon: Brain,
    color: "bg-indigo-100 text-indigo-700",
    status: "active",
    tier: "enterprise"
  },
  {
    id: "compliance-audit-management",
    title: "Advanced Compliance & Audit Management",
    description: "Ensure regulatory compliance and streamline audit processes with comprehensive risk assessment.",
    icon: Shield,
    color: "bg-red-100 text-red-700",
    status: "active",
    tier: "pro"
  },
  {
    id: "social-media-management",
    title: "Social Media Management",
    description: "Manage social media presence, campaigns, and analytics across all platforms from one central hub.",
    icon: Share2,
    color: "bg-purple-100 text-purple-700",
    status: "active",
    tier: "pro"
  },
  {
    id: "advanced-analytics-data-science",
    title: "Advanced Analytics & Data Science",
    description: "Beyond basic BI, companies need advanced data science capabilities with machine learning and predictive analytics.",
    icon: Brain,
    color: "bg-indigo-100 text-indigo-700",
    status: "active",
    tier: "enterprise"
  },
  {
    id: "grc",
    title: "Governance, Risk & Compliance (GRC)",
    description: "Enhanced enterprise risk management, policy management, compliance monitoring, and internal audit management.",
    icon: Shield,
    color: "bg-red-100 text-red-700",
    status: "active",
    tier: "enterprise"
  },
  {
    id: "research-development",
    title: "Research & Development Management",
    description: "R&D project portfolio management, research budget allocation, intellectual property management, and innovation pipeline tracking.",
    icon: FlaskConical,
    color: "bg-purple-100 text-purple-700",
    status: "active",
    tier: "enterprise"
  }
]

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for small teams getting started",
    features: [
      "Up to 5 users",
      "1GB storage",
      "6 core modules",
      "Email support",
      "Basic reporting",
      "Document templates"
    ],
    cta: "Get Started",
    popular: false,
    icon: Star,
    color: "bg-gray-100 text-gray-700"
  },
  {
    name: "Basic",
    price: "$29",
    period: "/month",
    description: "Great for growing businesses",
    features: [
      "Up to 20 users",
      "10GB storage",
      "11 modules",
      "Priority support",
      "Advanced reporting",
      "API access",
      "Basic document management",
      "Inventory optimization"
    ],
    cta: "Start Free Trial",
    popular: true,
    icon: Zap,
    color: "bg-blue-100 text-blue-700"
  },
  {
    name: "Pro",
    price: "$99",
    period: "/month",
    description: "For established businesses",
    features: [
      "Up to 100 users",
      "100GB storage",
      "25 modules",
      "24/7 phone support",
      "Custom integrations",
      "Advanced analytics",
      "White-label options",
      "Document management with workflows",
      "Business intelligence dashboards",
      "E-commerce integration",
      "Advanced HR & quality management",
      "Tax & regulatory compliance",
      "Audit trail & eSignature"
    ],
    cta: "Start Free Trial",
    popular: false,
    icon: Rocket,
    color: "bg-purple-100 text-purple-700"
  },
  {
    name: "Enterprise",
    price: "$299",
    period: "/month",
    description: "Custom solution for large organizations",
    features: [
      "Unlimited users",
      "Unlimited storage",
      "All modules",
      "Dedicated support",
      "Custom development",
      "SLA guarantee",
      "On-premise option",
      "Advanced AI-powered analytics",
      "Multi-channel e-commerce",
      "BizifyERP document workflows",
      "Custom reporting & BI",
      "Advanced tax compliance engine",
      "Enterprise audit trail & eSignature",
      "AI-powered automation & ML insights"
    ],
    cta: "Contact Sales",
    popular: false,
    icon: Crown,
    color: "bg-orange-100 text-orange-700"
  }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center py-16 md:py-24">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            BizifyERP
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-8">
            All you need to run your business - A comprehensive ERP system with fully integrated modules
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="text-lg px-8 py-3" onClick={() => window.location.href = '/product'}>
              View Product Details
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3">
              Schedule Demo
            </Button>
          </div>
          <p className="text-sm text-slate-500 mt-4">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Active Modules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">30</div>
              <p className="text-xs text-slate-600">All modules operational</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Happy Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">1,234</div>
              <p className="text-xs text-slate-600">Businesses worldwide</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Uptime</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">99.9%</div>
              <p className="text-xs text-slate-600">System reliability</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">24/7</div>
              <p className="text-xs text-slate-600">Customer support</p>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Start with our free plan and scale as your business grows
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan, index) => {
              const IconComponent = plan.icon
              return (
                <Card key={index} className={`relative ${plan.popular ? 'border-blue-500 shadow-lg' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-500 text-white">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <div className={`w-12 h-12 rounded-lg ${plan.color} flex items-center justify-center mx-auto mb-3`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                      <span className="text-slate-600">{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Modules Grid */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Complete Business Solution
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              28 integrated modules to manage every aspect of your business including advanced DMS, BI, E-commerce, Tax Compliance, Audit Trail, AI, Customer Success, Contract Management, Advanced Business Intelligence, Compliance & Audit Management, Social Media Management, Advanced Analytics & Data Science, and Governance, Risk & Compliance (GRC)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {modules.map((module) => {
              const IconComponent = module.icon
              return (
                <Card key={module.id} className="hover:shadow-lg transition-shadow duration-200 group">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-3 rounded-lg ${module.color} group-hover:scale-110 transition-transform duration-200`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Badge variant="outline" className="text-xs">
                          {module.status}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {module.tier}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-lg font-semibold text-slate-900">
                      {module.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-sm text-slate-600 mb-4">
                      {module.description}
                    </CardDescription>
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => {
                        // Navigate to module page
                        if (module.id === 'financial-accounting') {
                          window.location.href = '/financial-accounting'
                        } else if (module.id === 'sales') {
                          window.location.href = '/sales'
                        } else if (module.id === 'inventory') {
                          window.location.href = '/inventory'
                        } else if (module.id === 'crm') {
                          window.location.href = '/crm'
                        } else if (module.id === 'purchasing') {
                          window.location.href = '/purchasing'
                        } else if (module.id === 'supply-chain') {
                          window.location.href = '/supply-chain'
                        } else if (module.id === 'manufacturing') {
                          window.location.href = '/manufacturing'
                        } else if (module.id === 'shipping') {
                          window.location.href = '/shipping'
                        } else if (module.id === 'project-management') {
                          window.location.href = '/project-management'
                        } else if (module.id === 'subscription-management') {
                          window.location.href = '/subscription-management'
                        } else if (module.id === 'document-management') {
                          window.location.href = '/document-management'
                        } else if (module.id === 'business-intelligence') {
                          window.location.href = '/business-intelligence'
                        } else if (module.id === 'ecommerce-integration') {
                          window.location.href = '/ecommerce-integration'
                        } else if (module.id === 'third-party-integration') {
                          window.location.href = '/third-party-integration'
                        } else if (module.id === 'human-resources') {
                          window.location.href = '/human-resources'
                        } else if (module.id === 'asset-management') {
                          window.location.href = '/asset-management'
                        } else if (module.id === 'tax-regulatory-compliance') {
                          window.location.href = '/tax-regulatory-compliance'
                        } else if (module.id === 'compliance-audit-trail') {
                          window.location.href = '/compliance-audit-trail'
                        } else if (module.id === 'ai-machine-learning') {
                          window.location.href = '/ai-machine-learning'
                        } else if (module.id === 'quality-management') {
                          window.location.href = '/quality-management'
                        } else if (module.id === 'learning-management') {
                          window.location.href = '/learning-management'
                        } else if (module.id === 'customer-success') {
                          window.location.href = '/customer-success'
                        } else if (module.id === 'contract-management') {
                          window.location.href = '/contract-management'
                        } else if (module.id === 'business-intelligence-ai') {
                          window.location.href = '/business-intelligence-ai'
                        } else if (module.id === 'compliance-audit-management') {
                          window.location.href = '/compliance-audit'
                        } else if (module.id === 'social-media-management') {
                          window.location.href = '/social-media'
                        } else if (module.id === 'advanced-analytics-data-science') {
                          window.location.href = '/advanced-analytics-data-science'
                        } else if (module.id === 'grc') {
                          window.location.href = '/grc'
                        }
                      }}
                    >
                      {module.tier === 'free' ? 'Open Module' : 'Upgrade Required'}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white mb-16">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of businesses that have already streamlined their operations with our ERP system
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}