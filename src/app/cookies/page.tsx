import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Cookie, Settings, Shield, CheckCircle } from "lucide-react"

export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Cookie className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">Cookie Policy</h1>
          </div>
          <p className="text-xl text-muted-foreground mb-8">
            Last updated: January 15, 2024
          </p>
          <p className="text-lg text-muted-foreground">
            This Cookie Policy explains how BizifyERP uses cookies and similar tracking technologies 
            to enhance your experience on our website and services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-primary" />
                <span>Cookie Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                You can manage your cookie preferences at any time through our cookie settings panel.
              </p>
              <Button className="w-full">Manage Preferences</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary" />
                <span>Your Privacy</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We respect your privacy and provide options to control how your data is collected and used.
              </p>
              <Button variant="outline" className="w-full">View Privacy Policy</Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle>What Are Cookies?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Cookies are small text files stored on your device when you visit websites. 
              They help us remember your preferences, understand how you use our services, 
              and provide you with a personalized experience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Essential</h4>
                <p className="text-sm text-muted-foreground">Required for basic functionality</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Analytics</h4>
                <p className="text-sm text-muted-foreground">Help us improve our services</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Marketing</h4>
                <p className="text-sm text-muted-foreground">Personalized advertising</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center bg-muted/50 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Need More Information?</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Our privacy team is here to help answer any questions about cookies and your data
          </p>
          <Button size="lg">Contact Privacy Team</Button>
        </div>
      </div>
    </div>
  )
}