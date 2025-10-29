import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, MessageSquare, Calendar, Star, Globe } from "lucide-react"

export default function CommunityPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Community</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Join our vibrant community of BizifyERP users, developers, and business professionals.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>Forums</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Connect with other users and share experiences</p>
              <Button variant="outline" className="w-full">Join Forums</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>Discord Server</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Real-time chat with community members</p>
              <Button variant="outline" className="w-full">Join Discord</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>Events</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Attend webinars and meetups</p>
              <Button variant="outline" className="w-full">View Events</Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl">10K+</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Active Members</CardDescription>
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
              <CardDescription>Community Rating</CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Get Involved</h2>
          <p className="text-muted-foreground mb-6">
            Whether you're a new user or an experienced professional, there's a place for you in our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Join Community</Button>
            <Button variant="outline" size="lg">Become a Contributor</Button>
          </div>
        </div>
      </div>
    </div>
  )
}