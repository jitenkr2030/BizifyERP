import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Building2, 
  Shield, 
  Users, 
  Zap, 
  Globe, 
  BarChart3, 
  Settings,
  Database,
  Crown,
  Check,
  Star,
  Phone,
  Mail,
  Calendar
} from "lucide-react"

export default function EnterprisePage() {
  const features = [
    {
      title: "Unlimited Scale",
      description: "Handle unlimited users, transactions, and data volume with our enterprise-grade infrastructure.",
      icon: Zap
    },
    {
      title: "Advanced Security",
      description: "Military-grade encryption, SOC 2 compliance, and advanced threat protection.",
      icon: Shield
    },
    {
      title: "Dedicated Support",
      description: "24/7 dedicated support team with guaranteed response times and account management.",
      icon: Users
    },
    {
      title: "Custom Development",
      description: "Tailored solutions and custom feature development to meet your specific business needs.",
      icon: Settings
    },
    {
      title: "Global Infrastructure",
      description: "Multi-region deployment with data residency options and global CDN.",
      icon: Globe
    },
    {
      title: "Advanced Analytics",
      description: "AI-powered insights, predictive analytics, and custom reporting capabilities.",
      icon: BarChart3
    }
  ]

  const benefits = [
    "Unlimited users and storage",
    "All 30 modules included",
    "99.9% uptime SLA guarantee",
    "Dedicated account manager",
    "Custom training and onboarding",
    "Priority feature requests",
    "Advanced API access",
    "Custom integrations",
    "On-premise deployment option",
    "Advanced security features",
    "Compliance certification support",
    "Custom branding and white-label"
  ]

  const industries = [
    {
      name: "Manufacturing",
      description: "Streamline production, supply chain, and quality control processes.",
      icon: Building2
    },
    {
      name: "Financial Services",
      description: "Meet strict compliance requirements while optimizing financial operations.",
      icon: Crown
    },
    {
      name: "Healthcare",
      description: "Manage patient data, compliance, and operations with HIPAA-ready solutions.",
      icon: Shield
    },
    {
      name: "Retail",
      description: "Unify inventory, sales, and customer data across multiple channels.",
      icon: Globe
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Enterprise Solution
          </Badge>
          <h1 className="text-5xl font-bold mb-6">Built for Enterprise Scale</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Transform your organization with our comprehensive enterprise platform, 
            designed to handle the complexity and scale of large businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              Contact Sales
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8">
              Schedule Demo
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Enterprise Benefits</h2>
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform?</h3>
            <p className="mb-6 text-blue-100">
              Let our enterprise experts help you design the perfect solution for your organization.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5" />
                <span>enterprise@bizifyerp.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5" />
                <span>Available 24/7 for enterprise clients</span>
              </div>
            </div>
          </div>
        </div>

        {/* Industries Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Trusted by Leading Industries</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <industry.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{industry.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {industry.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pricing Overview */}
        <div className="bg-muted/50 rounded-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Enterprise Pricing</h2>
            <p className="text-lg text-muted-foreground">
              Custom pricing based on your organization's needs and scale
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">Starting at $299</div>
              <p className="text-muted-foreground">per month</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">Custom</div>
              <p className="text-muted-foreground">deployment options</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
              <p className="text-muted-foreground">uptime SLA</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Enterprise Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "BizifyERP Enterprise has transformed our global operations. The scalability and 
                  custom features have helped us streamline processes across 15 countries."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full"></div>
                  <div>
                    <div className="font-semibold">Sarah Johnson</div>
                    <div className="text-sm text-muted-foreground">CTO, Global Manufacturing Inc.</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The enterprise support team is exceptional. They helped us implement 
                  custom solutions that saved us millions in operational costs."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full"></div>
                  <div>
                    <div className="font-semibold">Michael Chen</div>
                    <div className="text-sm text-muted-foreground">CFO, Financial Services Group</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-12 text-white">
          <h2 className="text-4xl font-bold mb-6">Ready for Enterprise Transformation?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Let our enterprise solutions team design a custom plan for your organization
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Contact Enterprise Sales
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-blue-600">
              Download Whitepaper
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}