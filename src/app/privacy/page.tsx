import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Shield, 
  Eye, 
  Database, 
  Lock, 
  Calendar, 
  Users,
  CheckCircle,
  FileText,
  Globe,
  Mail,
  Phone
} from "lucide-react"

export default function PrivacyPage() {
  const sections = [
    {
      title: "Information We Collect",
      icon: Database,
      content: [
        {
          subtitle: "Personal Information",
          description: "We collect information you provide directly to us, such as your name, email address, phone number, and company information when you register for our services or contact us."
        },
        {
          subtitle: "Usage Data",
          description: "We automatically collect information about your interaction with our services, including IP addresses, browser type, device information, pages visited, and time spent on our platform."
        },
        {
          subtitle: "Business Data",
          description: "When you use our ERP system, we process business data including financial records, customer information, inventory data, and other business-related information you input into our system."
        }
      ]
    },
    {
      title: "How We Use Your Information",
      icon: Eye,
      content: [
        {
          subtitle: "Service Provision",
          description: "We use your information to provide, maintain, and improve our ERP services, process your business data, and deliver the features you request."
        },
        {
          subtitle: "Communication",
          description: "We use your contact information to communicate with you about your account, provide customer support, and send important service-related notifications."
        },
        {
          subtitle: "Analytics and Improvement",
          description: "We analyze usage data to understand how our services are used, improve our offerings, and develop new features that benefit our customers."
        }
      ]
    },
    {
      title: "Data Security",
      icon: Lock,
      content: [
        {
          subtitle: "Encryption",
          description: "All data transmitted between your device and our servers is encrypted using industry-standard SSL/TLS protocols. Data at rest is also encrypted using advanced encryption methods."
        },
        {
          subtitle: "Access Controls",
          description: "We implement strict access controls and authentication mechanisms to ensure that only authorized personnel can access your data."
        },
        {
          subtitle: "Regular Audits",
          description: "We conduct regular security audits and vulnerability assessments to maintain the highest security standards for our infrastructure."
        }
      ]
    },
    {
      title: "Data Sharing and Disclosure",
      icon: Users,
      content: [
        {
          subtitle: "Third-Party Service Providers",
          description: "We may share your information with trusted third-party service providers who assist us in operating our services, such as cloud hosting providers and payment processors."
        },
        {
          subtitle: "Legal Requirements",
          description: "We may disclose your information when required by law, regulation, or government request, or to protect our rights, property, or safety."
        },
        {
          subtitle: "Business Transfers",
          description: "In the event of a merger, acquisition, or sale of company assets, your information may be transferred as part of the business transaction."
        }
      ]
    },
    {
      title: "Your Rights and Choices",
      icon: CheckCircle,
      content: [
        {
          subtitle: "Access and Correction",
          description: "You have the right to access and update your personal information through your account settings or by contacting our support team."
        },
        {
          subtitle: "Data Portability",
          description: "You can request a copy of your business data in a machine-readable format, allowing you to transfer it to another service provider."
        },
        {
          subtitle: "Account Deletion",
          description: "You have the right to request the deletion of your account and associated personal data, subject to legal and contractual obligations."
        }
      ]
    }
  ]

  const cookiePolicy = {
    title: "Cookie Policy",
    description: "We use cookies and similar tracking technologies to enhance your experience on our website and services.",
    types: [
      {
        name: "Essential Cookies",
        description: "Necessary for the website to function properly, including authentication and security features."
      },
      {
        name: "Analytics Cookies",
        description: "Help us understand how visitors interact with our website by collecting anonymous usage data."
      },
      {
        name: "Marketing Cookies",
        description: "Used to track visitor behavior across websites to display relevant advertisements and marketing content."
      }
    ]
  }

  const contactInfo = {
    email: "privacy@bizifyerp.com",
    phone: "+1 (555) 123-4567",
    address: "123 Market Street, San Francisco, CA 94105"
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Last updated: January 15, 2024
          </p>
          <p className="text-lg text-muted-foreground">
            At BizifyERP, we are committed to protecting your privacy and ensuring the security of your data. 
            This Privacy Policy explains how we collect, use, and safeguard your information.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Badge variant="outline" className="cursor-pointer hover:bg-primary/80 transition-colors">
            Information Collection
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary/80 transition-colors">
            Data Usage
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary/80 transition-colors">
            Security Measures
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary/80 transition-colors">
            Your Rights
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary/80 transition-colors">
            Contact Us
          </Badge>
        </div>

        {/* Main Content */}
        <div className="space-y-12 mb-16">
          {sections.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center space-x-3">
                  <section.icon className="w-6 h-6 text-primary" />
                  <span>{section.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {section.content.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    <h3 className="text-lg font-semibold mb-2">{item.subtitle}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cookie Policy Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-3">
              <FileText className="w-6 h-6 text-primary" />
              <span>{cookiePolicy.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">{cookiePolicy.description}</p>
            <div className="space-y-4">
              {cookiePolicy.types.map((type, index) => (
                <div key={index} className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">{type.name}</h4>
                  <p className="text-muted-foreground text-sm">{type.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* International Data Transfers */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-3">
              <Globe className="w-6 h-6 text-primary" />
              <span>International Data Transfers</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              BizifyERP operates globally, and your information may be processed and stored on servers located outside of your country. 
              We ensure that any international data transfers comply with applicable data protection laws and maintain adequate safeguards.
            </p>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Data Processing Locations</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• United States (Primary data centers)</li>
                <li>• European Union (GDPR-compliant servers)</li>
                <li>• Singapore (Asia-Pacific region)</li>
                <li>• Brazil (South American region)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Policy Updates */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-3">
              <Calendar className="w-6 h-6 text-primary" />
              <span>Changes to This Policy</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. 
              When we make changes, we will update the "Last updated" date at the top of this policy.
            </p>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">How We Notify You</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Email notification for significant changes</li>
                <li>• In-app notifications for policy updates</li>
                <li>• Website banners for major policy revisions</li>
                <li>• Continued use constitutes acceptance of updated policies</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-3">
              <Mail className="w-6 h-6 text-primary" />
              <span>Contact Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <span>{contactInfo.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <span>{contactInfo.phone}</span>
              </div>
              <div className="flex items-start space-x-3">
                <FileText className="w-5 h-5 text-primary mt-1" />
                <span>{contactInfo.address}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center bg-muted/50 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Questions About Your Privacy?</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Our privacy team is here to help you understand your rights and how we protect your data
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Contact Privacy Team
            </Button>
            <Button variant="outline" size="lg">
              Download Data Policy
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}