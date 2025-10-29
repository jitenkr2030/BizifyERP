import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Handshake, Globe, Mail } from "lucide-react"

export default function PartnersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Partner Program</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Join our partner ecosystem and help businesses transform with BizifyERP's comprehensive ERP platform.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <Handshake className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>Strategic Partners</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Technology alliances and integration partnerships</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>Reseller Partners</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Sell BizifyERP solutions to your customers</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>Implementation Partners</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Help customers deploy and customize BizifyERP</p>
            </CardContent>
          </Card>
        </div>
        <div className="bg-muted/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Become a Partner</h2>
          <p className="text-muted-foreground mb-6">
            Contact our partnerships team to learn how you can join our growing ecosystem
          </p>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Mail className="w-4 h-4 text-primary" />
            <span>partners@bizifyerp.com</span>
          </div>
          <Button size="lg">Apply Now</Button>
        </div>
      </div>
    </div>
  )
}