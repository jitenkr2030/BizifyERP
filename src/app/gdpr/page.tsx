import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, FileText, CheckCircle, Globe, Mail } from "lucide-react"

export default function GdprPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">GDPR Compliance</h1>
          </div>
          <p className="text-xl text-muted-foreground mb-8">
            Last updated: January 15, 2024
          </p>
          <p className="text-lg text-muted-foreground">
            BizifyERP is committed to protecting your personal data and complying with the 
            General Data Protection Regulation (GDPR) and other data protection laws.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary" />
                <span>Your Rights</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Right to access your data</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Right to rectification</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Right to erasure</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Right to data portability</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-primary" />
                <span>Data Processing</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We process your data lawfully, transparently, and for specific purposes only.
              </p>
              <Button variant="outline" className="w-full">View Processing Activities</Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-primary" />
              <span>Data Protection Officer</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Our Data Protection Officer (DPO) is responsible for overseeing our data protection strategy 
              and ensuring compliance with GDPR requirements.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>dpo@bizifyerp.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>Available for data protection inquiries</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center bg-muted/50 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Exercise Your Rights</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Submit a request to access, correct, or delete your personal data
          </p>
          <Button size="lg">Submit GDPR Request</Button>
        </div>
      </div>
    </div>
  )
}