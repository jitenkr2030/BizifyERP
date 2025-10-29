import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, MessageSquare, Phone, Mail, Search } from "lucide-react"

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Help Center</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Find answers to common questions and get support for your BizifyERP account.
        </p>
        
        <div className="relative mb-8">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search for help articles..." 
            className="w-full pl-10 pr-4 py-3 border rounded-lg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>Knowledge Base</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Browse our comprehensive help articles</p>
              <Button variant="outline" className="w-full">Browse Articles</Button>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>Live Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Chat with our support team in real-time</p>
              <Button variant="outline" className="w-full">Start Chat</Button>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>Phone Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Speak with a support representative</p>
              <Button variant="outline" className="w-full">Call Us</Button>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>Email Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Send us a detailed message</p>
              <Button variant="outline" className="w-full">Email Us</Button>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-muted-foreground mb-6">
            Our support team is available 24/7 to assist you with any questions or issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Contact Support</Button>
            <Button variant="outline" size="lg">Schedule a Call</Button>
          </div>
        </div>
      </div>
    </div>
  )
}