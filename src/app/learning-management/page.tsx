'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BookOpen, 
  Users, 
  Award, 
  Target, 
  Database, 
  Clock, 
  TrendingUp, 
  CheckCircle,
  AlertCircle,
  PlayCircle,
  Calendar,
  BarChart3
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface TrainingProgram {
  id: string
  title: string
  description: string
  category: string
  duration: string
  participants: number
  status: 'active' | 'completed' | 'draft'
  progress: number
  instructor: string
  startDate: string
  endDate: string
}

interface Skill {
  id: string
  name: string
  category: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  employees: number
  progress: number
  demand: 'high' | 'medium' | 'low'
}

interface ComplianceTraining {
  id: string
  title: string
  type: string
  required: boolean
  dueDate: string
  completed: number
  total: number
  status: 'compliant' | 'pending' | 'overdue'
}

interface KnowledgeArticle {
  id: string
  title: string
  category: string
  author: string
  views: number
  rating: number
  lastUpdated: string
}

export default function LearningManagementPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState('training')
  const [trainingPrograms, setTrainingPrograms] = useState<TrainingProgram[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [complianceTrainings, setComplianceTrainings] = useState<ComplianceTraining[]>([])
  const [knowledgeArticles, setKnowledgeArticles] = useState<KnowledgeArticle[]>([])

  useEffect(() => {
    // Mock data - in real app, this would come from API
    setTrainingPrograms([
      {
        id: '1',
        title: 'Leadership Development Program',
        description: 'Comprehensive leadership training for managers',
        category: 'Leadership',
        duration: '8 weeks',
        participants: 24,
        status: 'active',
        progress: 65,
        instructor: 'Sarah Johnson',
        startDate: '2024-01-15',
        endDate: '2024-03-15'
      },
      {
        id: '2',
        title: 'Technical Skills Workshop',
        description: 'Advanced technical skills for development team',
        category: 'Technical',
        duration: '4 weeks',
        participants: 18,
        status: 'active',
        progress: 40,
        instructor: 'Mike Chen',
        startDate: '2024-02-01',
        endDate: '2024-02-29'
      },
      {
        id: '3',
        title: 'Communication Excellence',
        description: 'Improve communication skills across all levels',
        category: 'Soft Skills',
        duration: '6 weeks',
        participants: 32,
        status: 'completed',
        progress: 100,
        instructor: 'Emily Davis',
        startDate: '2024-01-01',
        endDate: '2024-02-15'
      }
    ])

    setSkills([
      {
        id: '1',
        name: 'Project Management',
        category: 'Management',
        level: 'intermediate',
        employees: 15,
        progress: 70,
        demand: 'high'
      },
      {
        id: '2',
        name: 'Data Analysis',
        category: 'Technical',
        level: 'advanced',
        employees: 12,
        progress: 85,
        demand: 'high'
      },
      {
        id: '3',
        name: 'Customer Service',
        category: 'Soft Skills',
        level: 'beginner',
        employees: 25,
        progress: 45,
        demand: 'medium'
      },
      {
        id: '4',
        name: 'Financial Planning',
        category: 'Finance',
        level: 'expert',
        employees: 8,
        progress: 95,
        demand: 'low'
      }
    ])

    setComplianceTrainings([
      {
        id: '1',
        title: 'Workplace Safety',
        type: 'Safety',
        required: true,
        dueDate: '2024-03-31',
        completed: 45,
        total: 50,
        status: 'compliant'
      },
      {
        id: '2',
        title: 'Data Privacy',
        type: 'Compliance',
        required: true,
        dueDate: '2024-02-28',
        completed: 35,
        total: 50,
        status: 'pending'
      },
      {
        id: '3',
        title: 'Anti-Harassment',
        type: 'HR',
        required: true,
        dueDate: '2024-01-31',
        completed: 48,
        total: 50,
        status: 'overdue'
      }
    ])

    setKnowledgeArticles([
      {
        id: '1',
        title: 'Best Practices for Remote Work',
        category: 'Workplace',
        author: 'HR Department',
        views: 234,
        rating: 4.5,
        lastUpdated: '2024-01-20'
      },
      {
        id: '2',
        title: 'Security Guidelines',
        category: 'Security',
        author: 'IT Security',
        views: 189,
        rating: 4.8,
        lastUpdated: '2024-01-18'
      },
      {
        id: '3',
        title: 'Performance Review Process',
        category: 'HR',
        author: 'People Operations',
        views: 156,
        rating: 4.2,
        lastUpdated: '2024-01-15'
      }
    ])
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'compliant':
        return 'bg-green-100 text-green-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'overdue':
        return 'bg-red-100 text-red-800'
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800'
      case 'intermediate':
        return 'bg-blue-100 text-blue-800'
      case 'advanced':
        return 'bg-purple-100 text-purple-800'
      case 'expert':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleCreateProgram = () => {
    toast({
      title: "Create Training Program",
      description: "Opening training program creation form...",
    })
  }

  const handleCreateSkill = () => {
    toast({
      title: "Add Skill",
      description: "Opening skill creation form...",
    })
  }

  const handleCreateCompliance = () => {
    toast({
      title: "Create Compliance Training",
      description: "Opening compliance training creation form...",
    })
  }

  const handleCreateArticle = () => {
    toast({
      title: "Create Knowledge Article",
      description: "Opening article creation form...",
    })
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Learning Management System</h1>
        <p className="text-muted-foreground">
          Develop employee skills and ensure compliance through integrated learning management
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Employees Trained</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">
              +3% from last quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Completion</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="training">Training Programs</TabsTrigger>
          <TabsTrigger value="skills">Skill Development</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
        </TabsList>

        <TabsContent value="training" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Training Programs</h2>
              <p className="text-muted-foreground">
                Create and manage employee training programs
              </p>
            </div>
            <Button onClick={handleCreateProgram}>
              <BookOpen className="mr-2 h-4 w-4" />
              Create Program
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {trainingPrograms.map((program) => (
              <Card key={program.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{program.title}</CardTitle>
                      <CardDescription>{program.description}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(program.status)}>
                      {program.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Category:</span>
                    <span>{program.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Duration:</span>
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Participants:</span>
                    <span>{program.participants}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Instructor:</span>
                    <span>{program.instructor}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress:</span>
                      <span>{program.progress}%</span>
                    </div>
                    <Progress value={program.progress} className="h-2" />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{program.startDate}</span>
                    <span>{program.endDate}</span>
                  </div>
                  <Button className="w-full" variant="outline">
                    <PlayCircle className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Skill Development</h2>
              <p className="text-muted-foreground">
                Track employee skills and competencies
              </p>
            </div>
            <Button onClick={handleCreateSkill}>
              <Target className="mr-2 h-4 w-4" />
              Add Skill
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <Card key={skill.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{skill.name}</CardTitle>
                      <CardDescription>{skill.category}</CardDescription>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Badge className={getLevelColor(skill.level)}>
                        {skill.level}
                      </Badge>
                      <Badge className={getDemandColor(skill.demand)}>
                        {skill.demand} demand
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Employees:</span>
                    <span>{skill.employees}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Avg. Progress:</span>
                      <span>{skill.progress}%</span>
                    </div>
                    <Progress value={skill.progress} className="h-2" />
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1" variant="outline">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Analytics
                    </Button>
                    <Button className="flex-1" variant="outline">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Compliance Training</h2>
              <p className="text-muted-foreground">
                Automated compliance training management
              </p>
            </div>
            <Button onClick={handleCreateCompliance}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Create Training
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {complianceTrainings.map((training) => (
              <Card key={training.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{training.title}</CardTitle>
                      <CardDescription>{training.type}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {training.required && (
                        <Badge variant="destructive">Required</Badge>
                      )}
                      <Badge className={getStatusColor(training.status)}>
                        {training.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Due Date:</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {training.dueDate}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Completion:</span>
                      <span>{training.completed}/{training.total}</span>
                    </div>
                    <Progress 
                      value={(training.completed / training.total) * 100} 
                      className="h-2" 
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1" variant="outline">
                      <Clock className="mr-2 h-4 w-4" />
                      Remind
                    </Button>
                    <Button className="flex-1" variant="outline">
                      <AlertCircle className="mr-2 h-4 w-4" />
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="knowledge" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Knowledge Base</h2>
              <p className="text-muted-foreground">
                Centralized repository for company knowledge
              </p>
            </div>
            <Button onClick={handleCreateArticle}>
              <Database className="mr-2 h-4 w-4" />
              Create Article
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {knowledgeArticles.map((article) => (
              <Card key={article.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{article.title}</CardTitle>
                      <CardDescription>{article.category}</CardDescription>
                    </div>
                    <Badge variant="outline">
                      ⭐ {article.rating}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Author:</span>
                    <span>{article.author}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Views:</span>
                    <span>{article.views}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last Updated:</span>
                    <span>{article.lastUpdated}</span>
                  </div>
                  <Button className="w-full" variant="outline">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Read Article
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}