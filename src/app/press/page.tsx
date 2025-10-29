import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Calendar, Users, Mail } from "lucide-react"

export default function PressPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Press Center</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Welcome to the BizifyERP Press Center. Here you'll find the latest news, press releases, and media resources.
        </p>
        <div className="bg-muted/50 rounded-lg p-8">
          <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Press Resources</h2>
          <p className="text-muted-foreground mb-6">
            For media inquiries, press releases, and company information, please contact our press team.
          </p>
          <div className="space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <Mail className="w-4 h-4 text-primary" />
              <span>press@bizifyerp.com</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>Available 24/7 for media inquiries</span>
            </div>
          </div>
          <Button className="mt-6">Download Press Kit</Button>
        </div>
      </div>
    </div>
  )
}