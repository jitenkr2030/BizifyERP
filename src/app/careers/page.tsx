import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  MapPin, 
  Clock, 
  DollarSign, 
  Building2, 
  Heart,
  Star,
  Zap,
  Award,
  Briefcase,
  Calendar,
  CheckCircle
} from "lucide-react"

export default function CareersPage() {
  const benefits = [
    {
      title: "Competitive Salary",
      description: "Above-market compensation with regular performance reviews",
      icon: DollarSign
    },
    {
      title: "Health Insurance",
      description: "Comprehensive health, dental, and vision coverage for you and your family",
      icon: Heart
    },
    {
      title: "Flexible Work",
      description: "Remote-first culture with flexible working hours",
      icon: Clock
    },
    {
      title: "Professional Growth",
      description: "Annual learning budget and career development opportunities",
      icon: Award
    },
    {
      title: "Equity Options",
      description: "Stock options for all full-time employees",
      icon: Briefcase
    },
    {
      title: "Unlimited PTO",
      description: "Take the time you need to recharge and stay productive",
      icon: Calendar
    }
  ]

  const jobOpenings = [
    {
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      salary: "$120k - $160k",
      description: "Join our engineering team to build scalable enterprise software solutions.",
      requirements: ["5+ years experience", "TypeScript/Next.js", "Cloud infrastructure", "Team leadership"]
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$130k - $170k",
      description: "Lead product strategy and development for our core ERP modules.",
      requirements: ["3+ years PM experience", "B2B SaaS background", "Analytical skills", "Cross-functional leadership"]
    },
    {
      title: "Sales Development Representative",
      department: "Sales",
      location: "New York, NY",
      type: "Full-time",
      salary: "$60k - $80k + Commission",
      description: "Drive new business opportunities and build our sales pipeline.",
      requirements: ["1+ years sales experience", "CRM proficiency", "Communication skills", "Target-driven mindset"]
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote",
      type: "Full-time",
      salary: "$80k - $110k",
      description: "Ensure customer success and drive adoption of our ERP platform.",
      requirements: ["2+ years CSM experience", "SaaS background", "Technical aptitude", "Relationship building"]
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      salary: "$110k - $150k",
      description: "Build and maintain our cloud infrastructure and deployment pipelines.",
      requirements: ["3+ years DevOps experience", "AWS/GCP", "Kubernetes", "CI/CD pipelines"]
    },
    {
      title: "UX Designer",
      department: "Design",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$90k - $130k",
      description: "Create intuitive user experiences for our complex business software.",
      requirements: ["3+ years UX design", "Enterprise software", "Figma/Sketch", "User research"]
    }
  ]

  const values = [
    {
      title: "Innovation First",
      description: "We encourage creative thinking and innovative solutions to complex problems."
    },
    {
      title: "Customer Obsessed",
      description: "Our customers' success is our primary focus and drives every decision we make."
    },
    {
      title: "Collaborative Spirit",
      description: "We believe in the power of teamwork and diverse perspectives."
    },
    {
      title: "Continuous Growth",
      description: "We're committed to learning, growing, and improving every day."
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Join Our Team
          </Badge>
          <h1 className="text-5xl font-bold mb-6">Build the Future of Business Software</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Join a passionate team of innovators building comprehensive business management 
            solutions that help organizations worldwide thrive and grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              View Open Positions
            </Button>
            <Button variant="outline" size="lg">
              Learn About Our Culture
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl">200+</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Team Members</CardDescription>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl">50+</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Countries</CardDescription>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl">4.8</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Employee Rating</CardDescription>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl">15</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Open Positions</CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Join BizifyERP?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Star className="w-5 h-5 text-primary" />
                    <span>{value.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Job Openings */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Open Positions</h2>
          <div className="space-y-6">
            {jobOpenings.map((job, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="outline">{job.department}</Badge>
                        <Badge variant="outline">
                          <MapPin className="w-3 h-3 mr-1" />
                          {job.location}
                        </Badge>
                        <Badge variant="outline">
                          <Clock className="w-3 h-3 mr-1" />
                          {job.type}
                        </Badge>
                        <Badge variant="outline">
                          <DollarSign className="w-3 h-3 mr-1" />
                          {job.salary}
                        </Badge>
                      </div>
                      <CardDescription className="text-base mb-4">
                        {job.description}
                      </CardDescription>
                    </div>
                    <Button>Apply Now</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Requirements:</h4>
                    <ul className="space-y-1">
                      {job.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Culture Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Culture</h2>
            <p className="text-lg text-muted-foreground mb-4">
              At BizifyERP, we've built a culture that fosters innovation, collaboration, 
              and personal growth. We believe that great people build great products, and 
              we're committed to creating an environment where everyone can do their best work.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Our remote-first approach allows us to hire the best talent from around the 
              world while maintaining strong team connections through regular virtual 
              meetups, team-building activities, and annual company retreats.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Zap className="w-5 h-5 text-primary" />
                <span>Fast-paced, innovative environment</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-primary" />
                <span>Collaborative and supportive team</span>
              </div>
              <div className="flex items-center space-x-3">
                <Building2 className="w-5 h-5 text-primary" />
                <span>Remote-first with optional offices</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Life at BizifyERP</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Flexible working hours and location</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Professional development opportunities</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Regular team events and social activities</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Comprehensive health and wellness benefits</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Opportunity to work on impactful projects</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-muted/50 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Us?</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Help us build the future of business management software
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Browse All Positions
            </Button>
            <Button variant="outline" size="lg">
              Connect with Recruiter
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}