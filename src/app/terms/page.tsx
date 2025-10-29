import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, 
  Shield, 
  Users, 
  Calendar, 
  CheckCircle, 
  AlertCircle,
  DollarSign,
  Globe,
  Lock,
  Scale,
  Ban,
  Zap
} from "lucide-react"

export default function TermsPage() {
  const sections = [
    {
      title: "Acceptance of Terms",
      icon: CheckCircle,
      content: [
        "By accessing and using BizifyERP services, you agree to be bound by these Terms of Service and all applicable laws and regulations.",
        "If you do not agree with any part of these terms, you may not access or use our services.",
        "These terms constitute a legally binding agreement between you and BizifyERP Inc."
      ]
    },
    {
      title: "Service Description",
      icon: Globe,
      content: [
        "BizifyERP provides a comprehensive enterprise resource planning (ERP) platform with 30 integrated modules for business management.",
        "Our services include but are not limited to: financial accounting, inventory management, human resources, customer relationship management, and business intelligence.",
        "Services are provided on a subscription basis with different tiers: Free, Basic, Pro, and Enterprise."
      ]
    },
    {
      title: "User Accounts and Responsibilities",
      icon: Users,
      content: [
        "You must provide accurate and complete information when creating your account.",
        "You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.",
        "You must be at least 18 years old to use our services or have parental consent.",
        "You agree to notify us immediately of any unauthorized use of your account."
      ]
    },
    {
      title: "Subscription and Payment Terms",
      icon: DollarSign,
      content: [
        "Subscription fees are billed in advance on a monthly or annual basis as selected during signup.",
        "All payments are processed securely through our payment partners.",
        "You may cancel your subscription at any time, but refunds are subject to our refund policy.",
        "We reserve the right to change pricing with 30 days notice for existing customers."
      ]
    },
    {
      title: "Acceptable Use Policy",
      icon: AlertCircle,
      content: [
        "You may not use our services for any illegal or unauthorized purpose.",
        "You agree not to: reverse engineer, decompile, or disassemble our services;",
        "You may not interfere with or disrupt our services or servers;",
        "You may not upload or transmit viruses, malware, or other malicious code;",
        "You may not use our services to send spam or unsolicited communications."
      ]
    },
    {
      title: "Intellectual Property Rights",
      icon: Scale,
      content: [
        "All content, features, and functionality of BizifyERP are owned by BizifyERP Inc. and are protected by intellectual property laws.",
        "You retain ownership of your business data and content uploaded to our platform.",
        "You grant us a license to use, reproduce, and process your data solely to provide and improve our services.",
        "You may not copy, modify, or distribute our services without explicit permission."
      ]
    },
    {
      title: "Data Privacy and Security",
      icon: Lock,
      content: [
        "We are committed to protecting your privacy and securing your data as described in our Privacy Policy.",
        "We implement industry-standard security measures to protect your information.",
        "You are responsible for maintaining the security of your account and devices.",
        "We may process your data in accordance with applicable data protection laws including GDPR and CCPA."
      ]
    },
    {
      title: "Service Level Agreement (SLA)",
      icon: Zap,
      content: [
        "We strive to provide 99.9% uptime for our services, excluding scheduled maintenance.",
        "Enterprise customers receive priority support and enhanced SLA guarantees.",
        "We are not liable for service interruptions caused by factors beyond our reasonable control.",
        "Maintenance windows are scheduled during off-peak hours with advance notice."
      ]
    },
    {
      title: "Limitation of Liability",
      icon: Ban,
      content: [
        "BizifyERP shall not be liable for any indirect, incidental, special, or consequential damages.",
        "Our total liability for any claim related to our services shall not exceed the fees paid by you in the 12 months preceding the claim.",
        "We make no warranties or representations about the accuracy, reliability, or completeness of our services.",
        "You use our services at your own risk and discretion."
      ]
    },
    {
      title: "Termination",
      icon: AlertCircle,
      content: [
        "You may terminate your account at any time by contacting our support team or through your account settings.",
        "We may suspend or terminate your account for violation of these terms or fraudulent activity.",
        "Upon termination, your right to use our services will cease immediately.",
        "We may retain certain data as required by law or for legitimate business purposes."
      ]
    }
  ]

  const keyPoints = [
    {
      title: "Service Availability",
      description: "99.9% uptime guarantee with scheduled maintenance windows"
    },
    {
      title: "Data Ownership",
      description: "You retain full ownership of your business data"
    },
    {
      title: "Payment Terms",
      description: "Monthly/annual billing with 30-day cancellation policy"
    },
    {
      title: "Support Levels",
      description: "Varies by subscription tier with 24/7 support for Enterprise"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <FileText className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">Terms of Service</h1>
          </div>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Last updated: January 15, 2024
          </p>
          <p className="text-lg text-muted-foreground">
            These Terms of Service govern your use of BizifyERP's services and platform. 
            Please read them carefully before using our services.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Badge variant="outline" className="cursor-pointer hover:bg-primary/80 transition-colors">
            Service Terms
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary/80 transition-colors">
            Payment Terms
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary/80 transition-colors">
            Acceptable Use
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary/80 transition-colors">
            Data Protection
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary/80 transition-colors">
            Liability
          </Badge>
        </div>

        {/* Key Points Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {keyPoints.map((point, index) => (
            <Card key={index} className="text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{point.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs">{point.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="space-y-8 mb-16">
          {sections.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center space-x-3">
                  <section.icon className="w-6 h-6 text-primary" />
                  <span>{section.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Governing Law Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-3">
              <Scale className="w-6 h-6 text-primary" />
              <span>Governing Law and Dispute Resolution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Governing Law</h4>
                <p className="text-muted-foreground text-sm">
                  These Terms of Service shall be governed by and construed in accordance with the laws of the State of California, 
                  United States, without regard to its conflict of law provisions.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Dispute Resolution</h4>
                <p className="text-muted-foreground text-sm">
                  Any disputes arising from these terms shall be resolved through binding arbitration in San Francisco, California, 
                  in accordance with the rules of the American Arbitration Association.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Jurisdiction</h4>
                <p className="text-muted-foreground text-sm">
                  You agree to submit to the personal jurisdiction of the courts located in San Francisco County, California 
                  for the purpose of litigating all such claims or disputes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Amendments Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-3">
              <Calendar className="w-6 h-6 text-primary" />
              <span>Amendments and Modifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting 
              the revised terms on our website. Your continued use of our services after any changes constitutes acceptance of the new terms.
            </p>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Notification of Changes</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Email notification for material changes</li>
                <li>• In-app notifications for term updates</li>
                <li>• Website banner for significant modifications</li>
                <li>• 30-day notice for pricing changes</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-3">
              <Shield className="w-6 h-6 text-primary" />
              <span>Contact Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="font-medium">Email:</span>
                <span>legal@bizifyerp.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-medium">Phone:</span>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-medium">Address:</span>
                <span>123 Market Street, San Francisco, CA 94105</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center bg-muted/50 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Have Questions About Our Terms?</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Our legal team is here to help clarify any questions you may have
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Contact Legal Team
            </Button>
            <Button variant="outline" size="lg">
              Download PDF Version
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}