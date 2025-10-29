import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Zap, 
  Shield, 
  BarChart3, 
  Users, 
  Smartphone, 
  Globe, 
  Clock, 
  Settings,
  Database,
  Lock,
  TrendingUp,
  MessageSquare
} from "lucide-react"

export default function FeaturesPage() {
  const features = [
    {
      title: "Real-time Analytics",
      description: "Get instant insights with our powerful analytics dashboard and real-time data processing.",
      icon: BarChart3,
      category: "Analytics"
    },
    {
      title: "Advanced Security",
      description: "Enterprise-grade security with end-to-end encryption and multi-factor authentication.",
      icon: Shield,
      category: "Security"
    },
    {
      title: "Lightning Fast",
      description: "Optimized performance with sub-second response times for all operations.",
      icon: Zap,
      category: "Performance"
    },
    {
      title: "Team Collaboration",
      description: "Built-in collaboration tools for seamless team communication and project management.",
      icon: Users,
      category: "Collaboration"
    },
    {
      title: "Mobile Responsive",
      description: "Full functionality on any device with our responsive design and mobile apps.",
      icon: Smartphone,
      category: "Accessibility"
    },
    {
      title: "Global Reach",
      description: "Multi-language support and global infrastructure for worldwide operations.",
      icon: Globe,
      category: "Global"
    },
    {
      title: "24/7 Automation",
      description: "Automate workflows and processes with our intelligent automation engine.",
      icon: Clock,
      category: "Automation"
    },
    {
      title: "Customizable",
      description: "Tailor the platform to your specific needs with extensive customization options.",
      icon: Settings,
      category: "Customization"
    },
    {
      title: "Scalable Database",
      description: "Handle massive amounts of data with our scalable and reliable database architecture.",
      icon: Database,
      category: "Infrastructure"
    },
    {
      title: "Data Protection",
      description: "Comprehensive data protection with regular backups and disaster recovery.",
      icon: Lock,
      category: "Security"
    },
    {
      title: "Growth Analytics",
      description: "Track business growth with advanced metrics and predictive analytics.",
      icon: TrendingUp,
      category: "Analytics"
    },
    {
      title: "Customer Support",
      description: "Integrated support system with ticketing and live chat capabilities.",
      icon: MessageSquare,
      category: "Support"
    }
  ]

  const categories = ["All", "Analytics", "Security", "Performance", "Collaboration", "Accessibility", "Global", "Automation", "Customization", "Infrastructure", "Support"]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Powerful Features</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Discover the comprehensive capabilities that make BizifyERP the ultimate business management solution
          </p>
          <Button size="lg" className="mb-8">
            Get Started Free
          </Button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
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

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant="outline">{feature.category}</Badge>
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

        {/* CTA Section */}
        <div className="text-center bg-muted/50 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Join thousands of businesses already using BizifyERP to streamline their operations
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