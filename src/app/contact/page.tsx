import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Users, 
  Building2,
  MessageSquare,
  Calendar,
  CheckCircle,
  Star,
  Zap,
  Globe
} from "lucide-react"

export default function ContactPage() {
  const contactInfo = [
    {
      title: "Sales Inquiries",
      description: "Interested in learning more about our plans and pricing?",
      email: "sales@bizifyerp.com",
      phone: "+1 (555) 123-4567",
      hours: "Mon-Fri 9AM-6PM EST"
    },
    {
      title: "Customer Support",
      description: "Need help with your account or technical issues?",
      email: "support@bizifyerp.com",
      phone: "+1 (555) 987-6543",
      hours: "24/7 Support Available"
    },
    {
      title: "Partnerships",
      description: "Interested in becoming a BizifyERP partner?",
      email: "partners@bizifyerp.com",
      phone: "+1 (555) 456-7890",
      hours: "Mon-Fri 9AM-5PM EST"
    }
  ]

  const offices = [
    {
      city: "San Francisco",
      address: "123 Market Street, San Francisco, CA 94105",
      phone: "+1 (555) 123-4567",
      email: "sf@bizifyerp.com"
    },
    {
      city: "New York",
      address: "456 Broadway, New York, NY 10013",
      phone: "+1 (555) 234-5678",
      email: "ny@bizifyerp.com"
    },
    {
      city: "London",
      address: "789 Oxford Street, London W1C 1JL, UK",
      phone: "+44 20 7946 0958",
      email: "london@bizifyerp.com"
    }
  ]

  const supportOptions = [
    {
      title: "Help Center",
      description: "Browse our comprehensive knowledge base and FAQs",
      icon: MessageSquare,
      action: "Visit Help Center"
    },
    {
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      icon: MessageSquare,
      action: "Start Chat"
    },
    {
      title: "Schedule a Demo",
      description: "Book a personalized demo with our experts",
      icon: Calendar,
      action: "Book Demo"
    },
    {
      title: "Community Forum",
      description: "Connect with other BizifyERP users",
      icon: Users,
      action: "Join Community"
    }
  ]

  const responseTimes = [
    { type: "Critical Issues", time: "Within 1 hour", icon: Zap },
    { type: "High Priority", time: "Within 4 hours", icon: Star },
    { type: "Normal Priority", time: "Within 24 hours", icon: Clock },
    { type: "Low Priority", time: "Within 48 hours", icon: Globe }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Contact Us
          </Badge>
          <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            We're here to help! Whether you have questions about our products, 
            need support, or want to explore partnership opportunities, 
            our team is ready to assist you.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((contact, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <CardTitle className="text-xl">{contact.title}</CardTitle>
                <CardDescription>{contact.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                    {contact.email}
                  </a>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <a href={`tel:${contact.phone}`} className="text-primary hover:underline">
                    {contact.phone}
                  </a>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{contact.hours}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Support Options */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">How Can We Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportOptions.map((option, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <option.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{option.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{option.description}</CardDescription>
                  <Button variant="outline" className="w-full">
                    {option.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Response Times */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Response Times</h2>
            <p className="text-lg text-muted-foreground mb-6">
              We're committed to providing timely support to all our customers. 
              Our response times vary based on the priority and complexity of your inquiry.
            </p>
            <div className="space-y-4">
              {responseTimes.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{item.type}</div>
                    <div className="text-sm text-muted-foreground">{item.time}</div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Emergency Support</h3>
            <p className="mb-6 text-blue-100">
              For critical issues that require immediate attention, 
              our emergency support team is available 24/7 for enterprise customers.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5" />
                <span>Emergency Hotline: +1 (555) 999-0123</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5" />
                <span>emergency@bizifyerp.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5" />
                <span>Available 24/7 for Enterprise</span>
              </div>
            </div>
            <Button variant="secondary" className="w-full mt-6">
              Contact Emergency Support
            </Button>
          </div>
        </div>

        {/* Offices */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Offices</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offices.map((office, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center space-x-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    <span>{office.city}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span className="text-sm">{office.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-primary" />
                    <a href={`tel:${office.phone}`} className="text-primary hover:underline text-sm">
                      {office.phone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <a href={`mailto:${office.email}`} className="text-primary hover:underline text-sm">
                      {office.email}
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-muted/50 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Let our experts help you find the perfect solution for your business needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Schedule a Demo
            </Button>
            <Button variant="outline" size="lg">
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}