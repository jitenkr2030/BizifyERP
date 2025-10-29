'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Building2, 
  ShoppingCart, 
  Package, 
  Wallet, 
  Users, 
  BarChart3, 
  Wrench, 
  Truck, 
  Briefcase, 
  RefreshCw, 
  File,
  BookOpen,
  Brain,
  Shield,
  Star,
  Zap,
  Rocket,
  Crown,
  CheckCircle,
  ArrowRight,
  Play,
  Database,
  Cloud,
  Lock,
  Globe,
  Headphones,
  Award,
  TrendingUp,
  Code
} from "lucide-react"

export default function ProductPage() {
  const [activeTab, setActiveTab] = useState('features')

  const features = [
    {
      title: "All-in-One ERP Platform",
      description: "Comprehensive business management with 30+ integrated modules covering every aspect of your operations.",
      icon: Building2,
      color: "bg-blue-100 text-blue-700"
    },
    {
      title: "Real-Time Analytics",
      description: "Make data-driven decisions with live dashboards and advanced business intelligence tools.",
      icon: BarChart3,
      color: "bg-green-100 text-green-700"
    },
    {
      title: "AI-Powered Insights",
      description: "Leverage machine learning for predictive analytics, automation, and intelligent business recommendations.",
      icon: Brain,
      color: "bg-purple-100 text-purple-700"
    },
    {
      title: "Cloud-Native Architecture",
      description: "Scalable, secure, and accessible from anywhere with enterprise-grade cloud infrastructure.",
      icon: Cloud,
      color: "bg-indigo-100 text-indigo-700"
    },
    {
      title: "Advanced Security",
      description: "Enterprise-grade security with encryption, compliance, and comprehensive audit trails.",
      icon: Shield,
      color: "bg-red-100 text-red-700"
    },
    {
      title: "Seamless Integration",
      description: "Connect with your existing tools through robust APIs and pre-built integrations.",
      icon: Database,
      color: "bg-orange-100 text-orange-700"
    }
  ]

  const modules = [
    {
      category: "Core Business",
      items: [
        { name: "Financial Accounting", icon: Building2, description: "Complete financial management with chart of accounts, journals, and transactions" },
        { name: "Sales & CRM", icon: Users, description: "Lead management, opportunities, and customer relationship tracking" },
        { name: "Inventory Management", icon: Package, description: "Real-time inventory tracking across multiple warehouses" },
        { name: "Purchasing", icon: ShoppingCart, description: "RFQs, purchase orders, and supplier management" },
        { name: "Project Management", icon: Briefcase, description: "Project planning, task management, and time tracking" },
        { name: "Manufacturing", icon: Wrench, description: "Bill of materials, work orders, and production planning" }
      ]
    },
    {
      category: "Advanced Operations",
      items: [
        { name: "Supply Chain", icon: Truck, description: "Logistics, shipping, and supply chain optimization" },
        { name: "Asset Management", icon: Package, description: "Fixed assets tracking, maintenance, and depreciation" },
        { name: "Quality Management", icon: Shield, description: "Quality control, inspections, and compliance management" },
        { name: "Human Resources", icon: Users, description: "Employee management, payroll, and performance reviews" },
        { name: "Document Management", icon: File, description: "Centralized document storage with approval workflows" },
        { name: "Subscription Management", icon: RefreshCw, description: "Recurring billing and subscription automation" }
      ]
    },
    {
      category: "Intelligence & Analytics",
      items: [
        { name: "Business Intelligence", icon: BarChart3, description: "Advanced analytics, custom reports, and dashboards" },
        { name: "AI & Machine Learning", icon: Brain, description: "Predictive analytics and intelligent automation" },
        { name: "Advanced Analytics", icon: TrendingUp, description: "Data science capabilities with machine learning models" },
        { name: "E-commerce Integration", icon: ShoppingCart, description: "Multi-channel sales and inventory synchronization" }
      ]
    },
    {
      category: "Enterprise & Compliance",
      items: [
        { name: "Contract Management", icon: File, description: "Contract lifecycle management and approval workflows" },
        { name: "GRC (Governance, Risk & Compliance)", icon: Shield, description: "Risk management, policies, and compliance tracking" },
        { name: "Tax & Regulatory Compliance", icon: Shield, description: "Tax calculations and regulatory reporting" },
        { name: "R&D Management", icon: Brain, description: "Research project management and intellectual property tracking" },
        { name: "Learning Management", icon: BookOpen, description: "Employee training and skill development tracking" },
        { name: "Customer Success", icon: Users, description: "Customer health scoring and relationship management" }
      ]
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
        "AI-powered insights"
      ],
      cta: "Start Free Trial",
      popular: false,
      icon: Rocket,
      color: "bg-purple-100 text-purple-700"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Custom solution for large organizations",
      features: [
        "Unlimited users",
        "Unlimited storage",
        "All modules",
        "Dedicated support",
        "Custom development",
        "SLA guarantee",
        "On-premise option",
        "Advanced AI capabilities"
      ],
      cta: "Contact Sales",
      popular: false,
      icon: Crown,
      color: "bg-orange-100 text-orange-700"
    }
  ]

  const enterpriseFeatures = [
    {
      title: "Unlimited Scalability",
      description: "Handle millions of transactions and support unlimited users with our enterprise-grade infrastructure.",
      icon: TrendingUp
    },
    {
      title: "Advanced Security",
      description: "Military-grade encryption, SOC 2 compliance, and comprehensive audit trails for maximum security.",
      icon: Lock
    },
    {
      title: "Custom Development",
      description: "Tailor-made solutions and custom module development to meet your specific business requirements.",
      icon: Wrench
    },
    {
      title: "Global Deployment",
      description: "Multi-region deployment with data residency options and global compliance support.",
      icon: Globe
    },
    {
      title: "Dedicated Support",
      description: "24/7 dedicated support team with account managers and priority response times.",
      icon: Headphones
    },
    {
      title: "Advanced Integration",
      description: "Custom API development and integration with legacy systems and third-party applications.",
      icon: Database
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CFO, TechCorp Inc.",
      content: "BizifyERP transformed our financial operations. The real-time analytics and automated reporting saved us countless hours and improved our decision-making significantly.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Operations Director, Global Manufacturing",
      content: "The comprehensive module coverage and seamless integration capabilities made BizifyERP the perfect choice for our complex manufacturing operations.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "CEO, StartupIO",
      content: "As a growing startup, we needed a scalable solution that could grow with us. BizifyERP's modular approach and affordable pricing made it ideal for our needs.",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              All-in-One Business Solution
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              BizifyERP
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              The comprehensive ERP system that grows with your business. 
              30+ integrated modules covering every aspect of modern enterprise operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-3 bg-white text-blue-600 hover:bg-blue-50">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600">
                <Play className="w-4 h-4 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-16 z-40 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'features', label: 'Features' },
              { id: 'modules', label: 'Modules' },
              { id: 'pricing', label: 'Pricing' },
              { id: 'enterprise', label: 'Enterprise' },
              { id: 'docs', label: 'API Documentation' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Features Section */}
      {activeTab === 'features' && (
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Powerful Features for Modern Business
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to run your business efficiently, from financial management to advanced analytics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Stats Section */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">30+</div>
                  <p className="text-sm text-gray-600">Integrated Modules</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
                  <p className="text-sm text-gray-600">Uptime SLA</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                  <p className="text-sm text-gray-600">Support</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-orange-600 mb-2">50K+</div>
                  <p className="text-sm text-gray-600">Happy Customers</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Modules Section */}
      {activeTab === 'modules' && (
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                30+ Comprehensive Business Modules
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every tool you need to manage your business operations in one integrated platform.
              </p>
            </div>

            <div className="space-y-12">
              {modules.map((category, index) => (
                <div key={index}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.items.map((module, moduleIndex) => {
                      const IconComponent = module.icon
                      return (
                        <Card key={moduleIndex} className="hover:shadow-md transition-shadow">
                          <CardHeader>
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <IconComponent className="w-5 h-5 text-blue-600" />
                              </div>
                              <CardTitle className="text-lg">{module.name}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="text-sm">
                              {module.description}
                            </CardDescription>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing Section */}
      {activeTab === 'pricing' && (
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose the plan that fits your business needs. Upgrade or downgrade at any time.
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
                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-gray-600">{plan.period}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                        variant={plan.popular ? 'default' : 'outline'}
                      >
                        {plan.cta}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* FAQ Section */}
            <div className="mt-20 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h3>
              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-2">Can I change plans anytime?</h4>
                    <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-2">What payment methods do you accept?</h4>
                    <p className="text-gray-600">We accept all major credit cards, PayPal, and bank transfers for enterprise customers.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-2">Is there a long-term contract?</h4>
                    <p className="text-gray-600">No, we offer month-to-month billing. Annual plans are available with a discount for committed customers.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Enterprise Section */}
      {activeTab === 'enterprise' && (
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Enterprise-Grade Solutions
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Built for large organizations with complex requirements and high-security needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {enterpriseFeatures.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <IconComponent className="w-6 h-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Enterprise CTA */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-4">Ready for Enterprise Solutions?</h3>
                <p className="text-xl mb-8 opacity-90">
                  Let our enterprise team design a custom solution tailored to your organization's specific needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                    Contact Sales Team
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600">
                    Schedule Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* API Documentation Section */}
      {activeTab === 'docs' && (
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                API Documentation
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive REST API and SDKs to integrate BizifyERP with your existing systems.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Database className="w-5 h-5 mr-2" />
                      REST API
                    </CardTitle>
                    <CardDescription>
                      Full-featured REST API with comprehensive documentation and examples.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold mb-2">Authentication</h4>
                        <p className="text-sm text-gray-600">OAuth 2.0 and API Key authentication</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold mb-2">Rate Limits</h4>
                        <p className="text-sm text-gray-600">Generous limits with enterprise options</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold mb-2">Webhooks</h4>
                        <p className="text-sm text-gray-600">Real-time event notifications</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold mb-2">Pagination</h4>
                        <p className="text-sm text-gray-600">Efficient data retrieval with cursor pagination</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Code className="w-5 h-5 mr-2" />
                      SDKs & Libraries
                    </CardTitle>
                    <CardDescription>
                      Official SDKs for popular programming languages and frameworks.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['JavaScript', 'Python', 'Java', 'C#', 'PHP', 'Ruby'].map((lang) => (
                        <div key={lang} className="p-3 border rounded-lg text-center hover:bg-gray-50 cursor-pointer">
                          <div className="font-medium">{lang}</div>
                          <div className="text-sm text-gray-500">Available</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Start</CardTitle>
                    <CardDescription>Get started in minutes</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm">
                      <div className="font-medium mb-2">1. Get API Key</div>
                      <p className="text-gray-600">Generate your API key from the dashboard</p>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium mb-2">2. Install SDK</div>
                      <code className="block bg-gray-100 p-2 rounded text-xs">
                        npm install bizifyerp-sdk
                      </code>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium mb-2">3. Make First Call</div>
                      <code className="block bg-gray-100 p-2 rounded text-xs">
                        const client = new BizifyERP('your-api-key');
                      </code>
                    </div>
                    <Button className="w-full" size="sm">
                      View Full Documentation
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>API Endpoints</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>REST API</span>
                        <Badge variant="outline">v2</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>GraphQL</span>
                        <Badge variant="outline">Beta</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Webhooks</span>
                        <Badge variant="outline">v1</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>File Upload</span>
                        <Badge variant="outline">v1</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Thousands of Businesses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what our customers have to say about their experience with BizifyERP.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of businesses that have already streamlined their operations with BizifyERP.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}