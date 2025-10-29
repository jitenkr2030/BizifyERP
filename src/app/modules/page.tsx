import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Building2, 
  FileText, 
  BarChart3, 
  ShoppingCart, 
  Users, 
  Package, 
  Truck, 
  Factory,
  DollarSign,
  Calendar,
  MessageSquare,
  Shield,
  Brain,
  Zap,
  Star,
  Rocket,
  Crown,
  Heart,
  Globe,
  Wrench,
  Target,
  TrendingUp,
  CheckCircle,
  Clock,
  Award,
  BookOpen,
  Lightbulb,
  Microscope,
  FileCheck
} from "lucide-react"

export default function ModulesPage() {
  const modules = [
    {
      name: "Financial Accounting",
      description: "Complete financial management with general ledger, accounts payable/receivable, and financial reporting.",
      icon: Building2,
      category: "Finance",
      tier: "free",
      color: "bg-blue-100 text-blue-700"
    },
    {
      name: "Document Management",
      description: "Centralized document storage with version control, workflows, and e-signature capabilities.",
      icon: FileText,
      category: "Operations",
      tier: "free",
      color: "bg-green-100 text-green-700"
    },
    {
      name: "Business Intelligence",
      description: "Advanced analytics and reporting with customizable dashboards and data visualization.",
      icon: BarChart3,
      category: "Analytics",
      tier: "free",
      color: "bg-orange-100 text-orange-700"
    },
    {
      name: "E-commerce Integration",
      description: "Multi-channel e-commerce management with inventory sync and order processing.",
      icon: ShoppingCart,
      category: "Sales",
      tier: "free",
      color: "bg-purple-100 text-purple-700"
    },
    {
      name: "Human Resources",
      description: "Complete HR management including payroll, benefits, performance reviews, and recruitment.",
      icon: Users,
      category: "HR",
      tier: "free",
      color: "bg-pink-100 text-pink-700"
    },
    {
      name: "Inventory Management",
      description: "Real-time inventory tracking with barcode scanning and automated reorder points.",
      icon: Package,
      category: "Operations",
      tier: "free",
      color: "bg-yellow-100 text-yellow-700"
    },
    {
      name: "Supply Chain Management",
      description: "End-to-end supply chain visibility with supplier management and logistics tracking.",
      icon: Truck,
      category: "Operations",
      tier: "basic",
      color: "bg-indigo-100 text-indigo-700"
    },
    {
      name: "Manufacturing",
      description: "Production planning, shop floor control, and quality management for manufacturers.",
      icon: Factory,
      category: "Operations",
      tier: "basic",
      color: "bg-red-100 text-red-700"
    },
    {
      name: "Sales & CRM",
      description: "Customer relationship management with lead tracking and sales pipeline management.",
      icon: DollarSign,
      category: "Sales",
      tier: "basic",
      color: "bg-teal-100 text-teal-700"
    },
    {
      name: "Project Management",
      description: "Project planning, resource allocation, and progress tracking with Gantt charts.",
      icon: Calendar,
      category: "Management",
      tier: "basic",
      color: "bg-cyan-100 text-cyan-700"
    },
    {
      name: "Customer Service",
      description: "Ticket management, knowledge base, and customer communication tools.",
      icon: MessageSquare,
      category: "Service",
      tier: "basic",
      color: "bg-lime-100 text-lime-700"
    },
    {
      name: "Quality Management",
      description: "Quality control processes, inspections, and compliance management.",
      icon: Shield,
      category: "Operations",
      tier: "pro",
      color: "bg-amber-100 text-amber-700"
    },
    {
      name: "AI & Machine Learning",
      description: "Predictive analytics, automated insights, and intelligent process optimization.",
      icon: Brain,
      category: "Analytics",
      tier: "pro",
      color: "bg-violet-100 text-violet-700"
    },
    {
      name: "Asset Management",
      description: "Track and manage physical assets with maintenance scheduling and depreciation.",
      icon: Wrench,
      category: "Operations",
      tier: "pro",
      color: "bg-emerald-100 text-emerald-700"
    },
    {
      name: "Marketing Automation",
      description: "Campaign management, lead nurturing, and marketing analytics.",
      icon: Target,
      category: "Marketing",
      tier: "pro",
      color: "bg-gray-100 text-gray-700"
    },
    {
      name: "Business Analytics",
      description: "Advanced business intelligence with custom reports and data mining.",
      icon: TrendingUp,
      category: "Analytics",
      tier: "pro",
      color: "bg-rose-100 text-rose-700"
    },
    {
      name: "Compliance Management",
      description: "Regulatory compliance tracking and audit management for various industries.",
      icon: CheckCircle,
      category: "Compliance",
      tier: "pro",
      color: "bg-orange-100 text-orange-700"
    },
    {
      name: "Time & Attendance",
      description: "Employee time tracking, scheduling, and absence management.",
      icon: Clock,
      category: "HR",
      tier: "pro",
      color: "bg-red-100 text-red-700"
    },
    {
      name: "Risk Management",
      description: "Identify, assess, and mitigate business risks with comprehensive tools.",
      icon: Shield,
      category: "Management",
      tier: "pro",
      color: "bg-indigo-100 text-indigo-700"
    },
    {
      name: "Performance Management",
      description: "Employee performance tracking, goal setting, and review processes.",
      icon: Award,
      category: "HR",
      tier: "pro",
      color: "bg-emerald-100 text-emerald-700"
    },
    {
      name: "Knowledge Management",
      description: "Centralized knowledge base with document sharing and collaboration tools.",
      icon: BookOpen,
      category: "Operations",
      tier: "pro",
      color: "bg-blue-100 text-blue-700"
    },
    {
      name: "Training & Development",
      description: "Employee training programs, course management, and skill tracking.",
      icon: Brain,
      category: "HR",
      tier: "pro",
      color: "bg-green-100 text-green-700"
    },
    {
      name: "Sustainability Management",
      description: "Environmental impact tracking and sustainability reporting.",
      icon: Globe,
      category: "Compliance",
      tier: "pro",
      color: "bg-purple-100 text-purple-700"
    },
    {
      name: "Contract Management",
      description: "Contract lifecycle management with automated renewals and compliance.",
      icon: FileCheck,
      category: "Legal",
      tier: "pro",
      color: "bg-indigo-100 text-indigo-700"
    },
    {
      name: "Supplier Management",
      description: "Supplier relationship management with performance tracking.",
      icon: Users,
      category: "Operations",
      tier: "enterprise",
      color: "bg-red-100 text-red-700"
    },
    {
      name: "Advanced Analytics",
      description: "Machine learning-powered analytics with predictive modeling.",
      icon: Brain,
      category: "Analytics",
      tier: "enterprise",
      color: "bg-purple-100 text-purple-700"
    },
    {
      name: "Innovation Management",
      description: "Idea management, innovation tracking, and R&D project coordination.",
      icon: Lightbulb,
      category: "R&D",
      tier: "enterprise",
      color: "bg-indigo-100 text-indigo-700"
    },
    {
      name: "Research & Development",
      description: "Complete R&D management with project tracking, budgeting, and intellectual property.",
      icon: Microscope,
      category: "R&D",
      tier: "enterprise",
      color: "bg-red-100 text-red-700"
    },
    {
      name: "Advanced Security",
      description: "Enterprise-grade security with advanced threat detection and compliance.",
      icon: Shield,
      category: "Security",
      tier: "enterprise",
      color: "bg-purple-100 text-purple-700"
    }
  ]

  const categories = ["All", "Finance", "Operations", "Analytics", "Sales", "HR", "Management", "Service", "Marketing", "Compliance", "Legal", "R&D", "Security"]
  const tiers = ["All", "Free", "Basic", "Pro", "Enterprise"]

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "free": return "bg-green-100 text-green-700"
      case "basic": return "bg-blue-100 text-blue-700"
      case "pro": return "bg-purple-100 text-purple-700"
      case "enterprise": return "bg-red-100 text-red-700"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">30 Integrated Modules</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Comprehensive business management with specialized modules for every aspect of your organization
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Star className="w-4 h-4 mr-2" />
              6 Free Modules
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              5 Basic Modules
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2">
              <Crown className="w-4 h-4 mr-2" />
              14 Pro Modules
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2">
              <Rocket className="w-4 h-4 mr-2" />
              5 Enterprise Modules
            </Badge>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm font-medium text-muted-foreground mr-2">Categories:</span>
            {categories.map((category) => (
              <Badge 
                key={category} 
                variant={category === "All" ? "default" : "secondary"}
                className="cursor-pointer hover:bg-primary/80 transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-muted-foreground mr-2">Tiers:</span>
            {tiers.map((tier) => (
              <Badge 
                key={tier} 
                variant={tier === "All" ? "default" : "secondary"}
                className="cursor-pointer hover:bg-primary/80 transition-colors"
              >
                {tier}
              </Badge>
            ))}
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {modules.map((module, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${module.color}`}>
                    <module.icon className="w-6 h-6" />
                  </div>
                  <Badge className={getTierColor(module.tier)}>
                    {module.tier}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{module.name}</CardTitle>
                <Badge variant="outline">{module.category}</Badge>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  {module.description}
                </CardDescription>
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Modules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">30</div>
              <p className="text-xs text-slate-600">Fully integrated</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">13</div>
              <p className="text-xs text-slate-600">Business areas covered</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">API Endpoints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">500+</div>
              <p className="text-xs text-slate-600">For integration</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Customization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">100%</div>
              <p className="text-xs text-slate-600">Tailorable to your needs</p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-muted/50 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore All Modules?</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Start your free 14-day trial and experience the full power of BizifyERP
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}