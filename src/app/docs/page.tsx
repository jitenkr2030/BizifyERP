import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Code, 
  BookOpen, 
  Zap, 
  Shield, 
  Database, 
  Users,
  FileText,
  Settings,
  Globe,
  Check,
  Copy,
  ExternalLink
} from "lucide-react"

export default function DocsPage() {
  const apiSections = [
    {
      title: "Authentication",
      description: "Secure API authentication using API keys and OAuth 2.0",
      icon: Shield,
      endpoints: 5,
      codeExample: `curl -X POST https://api.bizifyerp.com/v1/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{"client_id": "your_client_id", "client_secret": "your_client_secret"}'`
    },
    {
      title: "Users & Teams",
      description: "Manage users, teams, and permissions across your organization",
      icon: Users,
      endpoints: 12,
      codeExample: `curl -X GET https://api.bizifyerp.com/v1/users \\
  -H "Authorization: Bearer your_access_token" \\
  -H "Content-Type: application/json"`
    },
    {
      title: "Financial Data",
      description: "Access financial records, transactions, and accounting data",
      icon: Database,
      endpoints: 25,
      codeExample: `curl -X GET https://api.bizifyerp.com/v1/financial/transactions \\
  -H "Authorization: Bearer your_access_token" \\
  -d '{"start_date": "2024-01-01", "end_date": "2024-12-31"}'`
    },
    {
      title: "Inventory Management",
      description: "Track inventory levels, products, and warehouse operations",
      icon: Database,
      endpoints: 18,
      codeExample: `curl -X POST https://api.bizifyerp.com/v1/inventory/products \\
  -H "Authorization: Bearer your_access_token" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Product Name", "sku": "SKU123", "quantity": 100}'`
    },
    {
      title: "Sales & CRM",
      description: "Manage customers, leads, opportunities, and sales pipelines",
      icon: Users,
      endpoints: 20,
      codeExample: `curl -X GET https://api.bizifyerp.com/v1/sales/leads \\
  -H "Authorization: Bearer your_access_token" \\
  -d '{"status": "qualified", "assigned_to": "user_id"}'`
    },
    {
      title: "Documents & Files",
      description: "Upload, manage, and retrieve documents and files",
      icon: FileText,
      endpoints: 15,
      codeExample: `curl -X POST https://api.bizifyerp.com/v1/documents/upload \\
  -H "Authorization: Bearer your_access_token" \\
  -F "file=@document.pdf" \\
  -F "category=contracts"`
    }
  ]

  const features = [
    {
      title: "RESTful API",
      description: "Clean, intuitive REST API design with standard HTTP methods"
    },
    {
      title: "JSON Responses",
      description: "Consistent JSON response format with proper error handling"
    },
    {
      title: "Rate Limiting",
      description: "Generous rate limits with burst protection for enterprise clients"
    },
    {
      title: "Webhooks",
      description: "Real-time notifications via webhooks for important events"
    },
    {
      title: "SDKs",
      description: "Official SDKs for Python, JavaScript, Java, and more"
    },
    {
      title: "Sandbox",
      description: "Free sandbox environment for testing and development"
    }
  ]

  const quickStart = [
    { step: 1, title: "Get API Key", description: "Sign up and generate your API keys from the dashboard" },
    { step: 2, title: "Choose SDK", description: "Download our SDK for your preferred programming language" },
    { step: 3, title: "Test in Sandbox", description: "Use our sandbox environment to test your integration" },
    { step: 4, title: "Go Live", description: "Switch to production API and start building your solution" }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Code className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">API Documentation</h1>
          </div>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Integrate BizifyERP into your applications with our comprehensive REST API. 
            Build custom solutions, automate workflows, and extend functionality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Get API Key
            </Button>
            <Button variant="outline" size="lg">
              View OpenAPI Spec
            </Button>
          </div>
        </div>

        {/* Quick Start */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Quick Start Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickStart.map((item) => (
              <Card key={item.step}>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-primary">{item.step}</span>
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* API Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">API Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* API Endpoints */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">API Endpoints</h2>
          <div className="space-y-6">
            {apiSections.map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <section.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{section.title}</CardTitle>
                        <CardDescription>{section.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">{section.endpoints} endpoints</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-primary">Example Request</span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => navigator.clipboard.writeText(section.codeExample)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <pre className="whitespace-pre-wrap break-all">{section.codeExample}</pre>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <BookOpen className="w-4 h-4 mr-2" />
                      View Documentation
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Try in Console
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Rate Limits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Rate Limits</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted rounded">
                <span>Free Plan</span>
                <Badge variant="secondary">1,000 requests/hour</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded">
                <span>Basic Plan</span>
                <Badge variant="secondary">10,000 requests/hour</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded">
                <span>Pro Plan</span>
                <Badge variant="secondary">50,000 requests/hour</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-primary/10 rounded">
                <span>Enterprise Plan</span>
                <Badge>Custom limits</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Authentication</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>API Key Authentication</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>OAuth 2.0 Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>JWT Tokens</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Webhook Signatures</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>IP Whitelisting</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SDKs */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Official SDKs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Python", version: "2.1.0", installs: "500K+" },
              { name: "JavaScript", version: "3.0.0", installs: "1M+" },
              { name: "Java", version: "1.8.0", installs: "300K+" },
              { name: "Ruby", version: "1.5.0", installs: "200K+" }
            ].map((sdk, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{sdk.name}</CardTitle>
                  <CardDescription>Version {sdk.version}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm text-muted-foreground">
                      {sdk.installs} downloads
                    </div>
                    <Button variant="outline" className="w-full">
                      <Code className="w-4 h-4 mr-2" />
                      Install
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-muted/50 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Building?</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Join thousands of developers building amazing solutions with BizifyERP API
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Get Your API Key
            </Button>
            <Button variant="outline" size="lg">
              Join Developer Community
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}