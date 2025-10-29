import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar, 
  User, 
  Clock, 
  Eye, 
  Heart, 
  MessageSquare,
  TrendingUp,
  BookOpen,
  Zap,
  ArrowRight
} from "lucide-react"

export default function BlogPage() {
  const blogPosts = [
    {
      title: "The Future of ERP: AI and Machine Learning Integration",
      excerpt: "Explore how artificial intelligence is revolutionizing enterprise resource planning systems and what it means for your business.",
      author: "Sarah Johnson",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "Technology",
      image: "/api/placeholder/600/400",
      views: 2341,
      likes: 156,
      comments: 23,
      featured: true
    },
    {
      title: "10 Ways to Optimize Your Supply Chain with Modern ERP",
      excerpt: "Learn practical strategies to streamline your supply chain operations using integrated ERP solutions and real-time data analytics.",
      author: "Michael Chen",
      date: "2024-01-12",
      readTime: "6 min read",
      category: "Operations",
      image: "/api/placeholder/600/400",
      views: 1876,
      likes: 98,
      comments: 15,
      featured: false
    },
    {
      title: "Choosing the Right ERP System: A Comprehensive Guide",
      excerpt: "A detailed guide to help businesses select the perfect ERP system that matches their needs, budget, and growth objectives.",
      author: "Emily Rodriguez",
      date: "2024-01-10",
      readTime: "12 min read",
      category: "Business",
      image: "/api/placeholder/600/400",
      views: 3124,
      likes: 203,
      comments: 34,
      featured: false
    },
    {
      title: "Digital Transformation: Why Your Business Needs an ERP Now",
      excerpt: "Understand the critical role of ERP systems in digital transformation and how to implement them successfully in your organization.",
      author: "David Kim",
      date: "2024-01-08",
      readTime: "9 min read",
      category: "Strategy",
      image: "/api/placeholder/600/400",
      views: 2654,
      likes: 145,
      comments: 28,
      featured: false
    },
    {
      title: "Security Best Practices for Modern ERP Systems",
      excerpt: "Essential security measures and best practices to protect your ERP system from cyber threats and data breaches.",
      author: "Lisa Wang",
      date: "2024-01-05",
      readTime: "7 min read",
      category: "Security",
      image: "/api/placeholder/600/400",
      views: 1987,
      likes: 112,
      comments: 19,
      featured: false
    },
    {
      title: "ROI of ERP: Measuring the Impact on Your Bottom Line",
      excerpt: "Learn how to calculate and maximize the return on investment for your ERP implementation with practical metrics and case studies.",
      author: "James Wilson",
      date: "2024-01-03",
      readTime: "10 min read",
      category: "Finance",
      image: "/api/placeholder/600/400",
      views: 1543,
      likes: 89,
      comments: 12,
      featured: false
    }
  ]

  const categories = ["All", "Technology", "Operations", "Business", "Strategy", "Security", "Finance"]
  const popularTags = ["ERP", "Digital Transformation", "AI", "Supply Chain", "Security", "ROI", "Cloud", "Integration"]

  const newsletterContent = {
    title: "Stay Updated with Industry Insights",
    description: "Get the latest ERP trends, tips, and best practices delivered to your inbox weekly.",
    buttonText: "Subscribe Now"
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">BizifyERP Blog</h1>
          </div>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Insights, trends, and best practices in business management, ERP systems, 
            and digital transformation from industry experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Subscribe to Newsletter
            </Button>
            <Button variant="outline" size="lg">
              Browse Categories
            </Button>
          </div>
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <div className="relative rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
              <Badge className="mb-4 bg-white text-blue-600">Featured</Badge>
              <h2 className="text-3xl font-bold mb-4">
                {blogPosts.find(post => post.featured)?.title}
              </h2>
              <p className="text-lg mb-6 text-blue-100">
                {blogPosts.find(post => post.featured)?.excerpt}
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{blogPosts.find(post => post.featured)?.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{blogPosts.find(post => post.featured)?.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{blogPosts.find(post => post.featured)?.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge 
                key={category} 
                variant={category === "All" ? "default" : "secondary"}
                className="cursor-pointer hover:bg-primary/80 transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.filter(post => !post.featured).map((post, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-muted-foreground" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{post.category}</Badge>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-3 mb-4">
                  {post.excerpt}
                </CardDescription>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{post.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="w-3 h-3" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">{newsletterContent.title}</h3>
            <p className="text-lg mb-6 text-blue-100">
              {newsletterContent.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500"
              />
              <Button size="lg" variant="secondary">
                {newsletterContent.buttonText}
              </Button>
            </div>
          </div>
        </div>

        {/* Popular Tags */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Popular Tags</h3>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline"
                className="cursor-pointer hover:bg-primary/80 transition-colors"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Blog Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl">150+</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Blog Posts</CardDescription>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl">25K+</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Monthly Readers</CardDescription>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl">50+</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Contributors</CardDescription>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl">4.9</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Reader Rating</CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-muted/50 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Want to Contribute?</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Share your expertise and insights with our community of business professionals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Become a Contributor
            </Button>
            <Button variant="outline" size="lg">
              View Guidelines
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}