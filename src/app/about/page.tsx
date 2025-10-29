import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Building2, 
  Users, 
  Globe, 
  Award, 
  Target, 
  Zap,
  Star,
  Heart,
  Lightbulb,
  TrendingUp,
  CheckCircle,
  Calendar
} from "lucide-react"

export default function AboutPage() {
  const timeline = [
    {
      year: "2019",
      title: "Founded",
      description: "BizifyERP was founded with a vision to democratize enterprise software for businesses of all sizes."
    },
    {
      year: "2020",
      title: "First Launch",
      description: "Released our first version with 5 core modules, serving 100+ early adopters."
    },
    {
      year: "2021",
      title: "Rapid Growth",
      description: "Expanded to 15 modules and reached 1,000+ customers across 10 countries."
    },
    {
      year: "2022",
      title: "Enterprise Ready",
      description: "Launched enterprise edition with advanced security and custom development options."
    },
    {
      year: "2023",
      title: "AI Integration",
      description: "Integrated AI and machine learning capabilities across all modules."
    },
    {
      year: "2024",
      title: "Global Leader",
      description: "Reached 10,000+ customers with 30 integrated modules, becoming a leader in business management software."
    }
  ]

  const values = [
    {
      title: "Innovation",
      description: "We constantly push the boundaries of what's possible with business management software.",
      icon: Lightbulb
    },
    {
      title: "Customer Success",
      description: "Our customers' success is our success. We're committed to helping them thrive.",
      icon: Heart
    },
    {
      title: "Integrity",
      description: "We operate with transparency, honesty, and ethical business practices.",
      icon: CheckCircle
    },
    {
      title: "Excellence",
      description: "We strive for excellence in everything we do, from code to customer support.",
      icon: Award
    }
  ]

  const stats = [
    { label: "Happy Customers", value: "10,000+", icon: Users },
    { label: "Countries Served", value: "50+", icon: Globe },
    { label: "Modules Available", value: "30", icon: Building2 },
    { label: "Uptime", value: "99.9%", icon: Zap },
    { label: "Team Members", value: "200+", icon: Users },
    { label: "API Calls", value: "1B+", icon: TrendingUp }
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "Former enterprise architect with 15+ years of experience in business software."
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio: "Technology leader with expertise in scalable systems and AI integration."
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Product",
      bio: "Product visionary focused on user experience and business value."
    },
    {
      name: "David Kim",
      role: "VP of Engineering",
      bio: "Engineering leader passionate about building robust, scalable solutions."
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            About Us
          </Badge>
          <h1 className="text-5xl font-bold mb-6">Transforming Business Management</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            We're on a mission to provide comprehensive, affordable, and scalable business management 
            solutions to organizations of all sizes around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Our Story
            </Button>
            <Button variant="outline" size="lg">
              Meet the Team
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-3xl">{stat.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg">{stat.label}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-4">
              At BizifyERP, we believe that every business deserves access to powerful, 
              enterprise-grade management tools. Our mission is to democratize business 
              technology by providing comprehensive, affordable, and easy-to-use solutions 
              that help organizations thrive in the digital age.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              We're committed to continuous innovation, customer success, and building 
              long-term partnerships with our clients. Our platform is designed to grow 
              with your business, providing the tools you need at every stage of your journey.
            </p>
            <div className="flex items-center space-x-4">
              <Target className="w-8 h-8 text-primary" />
              <div>
                <div className="font-semibold">Empowering Businesses Worldwide</div>
                <div className="text-sm text-muted-foreground">Since 2019</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Why Choose BizifyERP?</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>30 integrated modules in one platform</span>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>Serving businesses in 50+ countries</span>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>99.9% uptime reliability</span>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>24/7 customer support</span>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>Continuous innovation and updates</span>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-primary/20 h-full"></div>
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}>
                  <div className="w-1/2 pr-8">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{item.year}</Badge>
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{item.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                  <div className="w-1/2 pl-8"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CardDescription>{member.bio}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-muted/50 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Be part of the thousands of businesses transforming their operations with BizifyERP
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}