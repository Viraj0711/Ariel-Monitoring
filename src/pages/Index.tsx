import { Navigation } from "@/components/Navigation";
import { ProjectCard } from "@/components/ProjectCard";
import { StatsCard } from "@/components/StatsCard";
import { ImageComparison } from "@/components/ImageComparison";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Camera, 
  TrendingUp, 
  Clock,
  AlertTriangle,
  Users,
  Plus,
  Filter
} from "lucide-react";
import buildingImage from "@/assets/Building.png";

const Index = () => {
  const statsData = [
    {
      title: "Active Projects",
      value: "12",
      change: "2",
      changeType: "positive" as const,
      icon: Building2,
      description: "2 new this month"
    },
    {
      title: "Images Processed",
      value: "2,847",
      change: "15%",
      changeType: "positive" as const,
      icon: Camera,
      description: "This week"
    },
    {
      title: "Progress Rate",
      value: "87%",
      change: "5%",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "Average completion"
    },
    {
      title: "Pending Reviews",
      value: "23",
      change: "3",
      changeType: "negative" as const,
      icon: Clock,
      description: "Require attention"
    }
  ];

  const projectsData = [
    {
      id: "1",
      name: "Skyline Tower Complex",
      location: "Downtown District",
      progress: 75,
      status: "on-track" as const,
      lastUpdate: "2 hours ago",
      teamSize: 24,
      imageUrl: buildingImage,
      totalImages: 156,
      alerts: 0
    },
    {
      id: "2", 
      name: "Metro Business Center",
      location: "Financial District",
      progress: 45,
      status: "delayed" as const,
      lastUpdate: "1 day ago",
      teamSize: 18,
      imageUrl: buildingImage,
      totalImages: 89,
      alerts: 2
    },
    {
      id: "3",
      name: "Residential Plaza",
      location: "Westside",
      progress: 92,
      status: "ahead" as const,
      lastUpdate: "3 hours ago", 
      teamSize: 31,
      imageUrl: buildingImage,
      totalImages: 203,
      alerts: 0
    }
  ];

  const comparisonData = {
    beforeImage: {
      id: "before",
      url: buildingImage,
      date: "March 15, 2024",
      label: "Foundation Phase",
      description: "Initial foundation work completed"
    },
    afterImage: {
      id: "after", 
      url: buildingImage,
      date: "July 20, 2024",
      label: "Structure Phase",
      description: "Vertical construction in progress"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Construction Dashboard</h1>
            <p className="text-muted-foreground">Monitor your construction projects with aerial imagery and real-time progress tracking</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="hero">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <StatsCard {...stat} />
            </div>
          ))}
        </div>

        {/* Progress Comparison */}
        <div className="animate-slide-up">
          <ImageComparison 
            beforeImage={comparisonData.beforeImage}
            afterImage={comparisonData.afterImage}
            title="Skyline Tower - Progress Comparison"
          />
        </div>

        {/* Projects Grid */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-foreground">Active Projects</h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.map((project, index) => (
              <div 
                key={project.id} 
                className="animate-scale-in" 
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-card rounded-xl p-6 shadow-soft border border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Camera className="w-6 h-6" />
              <span className="text-sm">Upload Images</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Building2 className="w-6 h-6" />
              <span className="text-sm">Create Project</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Users className="w-6 h-6" />
              <span className="text-sm">Team Management</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <AlertTriangle className="w-6 h-6" />
              <span className="text-sm">View Alerts</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
