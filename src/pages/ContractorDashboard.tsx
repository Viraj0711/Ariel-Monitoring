import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { StatsCard } from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload,
  FileText,
  MessageSquare,
  Package,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
  Camera,
  Wrench,
  Building2
} from "lucide-react";

const ContractorDashboard = () => {
  const [activeProject, setActiveProject] = useState("skyline-tower");

  const contractorStats = [
    {
      title: "Active Tasks",
      value: "18",
      change: "3",
      changeType: "positive" as const,
      icon: Wrench,
      description: "In progress this week"
    },
    {
      title: "Plans Updated",
      value: "7",
      change: "2",
      changeType: "positive" as const,
      icon: FileText,
      description: "This month"
    },
    {
      title: "Material Requests",
      value: "12",
      change: "4",
      changeType: "pending" as const,
      icon: Package,
      description: "Pending approval"
    },
    {
      title: "Team Efficiency",
      value: "94%",
      change: "6%",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "Above target"
    }
  ];

  const recentMessages = [
    {
      id: "1",
      from: "John Smith (Owner)",
      subject: "Foundation Review Required",
      timestamp: "2 hours ago",
      priority: "high",
      unread: true
    },
    {
      id: "2", 
      from: "Sarah Wilson (Architect)",
      subject: "Updated Electrical Plans",
      timestamp: "5 hours ago",
      priority: "medium",
      unread: true
    },
    {
      id: "3",
      from: "Mike Chen (Owner)",
      subject: "Progress Update Request",
      timestamp: "1 day ago",
      priority: "low",
      unread: false
    }
  ];

  const upcomingTasks = [
    {
      id: "1",
      title: "Upload foundation progress photos",
      deadline: "Today, 5:00 PM",
      priority: "high",
      project: "Skyline Tower"
    },
    {
      id: "2",
      title: "Review architectural changes",
      deadline: "Tomorrow, 10:00 AM", 
      priority: "medium",
      project: "Metro Business Center"
    },
    {
      id: "3",
      title: "Submit material request for steel beams",
      deadline: "Dec 18, 2024",
      priority: "medium",
      project: "Residential Plaza"
    }
  ];

  const projects = [
    {
      id: "skyline-tower",
      name: "Skyline Tower Complex",
      progress: 75,
      nextMilestone: "Roofing Installation",
      dueDate: "Dec 20, 2024"
    },
    {
      id: "metro-center", 
      name: "Metro Business Center",
      progress: 45,
      nextMilestone: "Electrical Rough-in",
      dueDate: "Jan 15, 2025"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive';
      case 'medium': return 'bg-warning';
      case 'low': return 'bg-muted';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation userRole="contractor" />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Contractor Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage projects, update progress, and coordinate with stakeholders
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <MessageSquare className="w-4 h-4 mr-2" />
              Messages ({recentMessages.filter(m => m.unread).length})
            </Button>
            <Button className="interactive-button">
              <Upload className="w-4 h-4 mr-2" />
              Upload Progress
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contractorStats.map((stat, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <StatsCard {...stat} />
            </div>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="plans">Plans</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Quick Actions */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Wrench className="w-5 h-5 mr-2" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start interactive-button">
                    <Camera className="w-4 h-4 mr-2" />
                    Upload Progress Photos
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Update Project Plans
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Package className="w-4 h-4 mr-2" />
                    Request Materials
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Update to Owner
                  </Button>
                </CardContent>
              </Card>

              {/* Upcoming Tasks */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Upcoming Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingTasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`}></div>
                            <h4 className="font-medium">{task.title}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {task.project} • Due: {task.deadline}
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Active Projects */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="w-5 h-5 mr-2" />
                  Active Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {projects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-6 hover-lift">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-semibold text-lg">{project.name}</h3>
                        <Badge variant="outline">{project.progress}% Complete</Badge>
                      </div>
                      <div className="space-y-3">
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Next: {project.nextMilestone}</span>
                  <span>Due: {project.dueDate}</span>
                </div>
              </div>
              <Button className="w-full mt-4" variant="outline">
                View Details
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Recent Messages
                </CardTitle>
                <CardDescription>
                  Communication with project owners and architects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMessages.map((message) => (
                    <div key={message.id} className={`p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${message.unread ? 'border-primary bg-primary/5' : ''}`}>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h4 className="font-medium">{message.from}</h4>
                            {message.unread && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                            <div className={`w-2 h-2 rounded-full ${getPriorityColor(message.priority)}`}></div>
                          </div>
                          <p className="text-sm font-medium mt-1">{message.subject}</p>
                          <p className="text-sm text-muted-foreground mt-1">{message.timestamp}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          Reply
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Placeholder content for other tabs */}
          <TabsContent value="plans">
            <Card>
              <CardHeader>
                <CardTitle>Plan Management</CardTitle>
                <CardDescription>Upload and manage project plans</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Plan management interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="materials">
            <Card>
              <CardHeader>
                <CardTitle>Material Requests</CardTitle>
                <CardDescription>Manage material requests and inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Material request system coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Progress Reports</CardTitle>
                <CardDescription>Generate and share progress reports</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Reporting system coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ContractorDashboard;