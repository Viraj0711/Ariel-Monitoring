import { useState } from "react";
import { motion } from "framer-motion";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { muiTheme } from "@/theme/muiTheme";
import { Navigation } from "@/components/Navigation";
import { EnhancedProjectCard } from "@/components/enhanced/EnhancedProjectCard";
import { EnhancedStatsDashboard } from "@/components/enhanced/EnhancedStatsDashboard";
import { ImageComparison } from "@/components/ImageComparison";
import { Button } from "@/components/ui/button";
import { AnimatedContainer, StaggeredList, PageTransition } from "@/components/animations/MotionComponents";
import { SpringContainer } from "@/components/animations/SpringComponents";
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

const EnhancedIndex = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const statsData = [
    {
      title: "Active Projects",
      value: 12,
      change: 15,
      changeType: "positive" as const,
      icon: Building2,
      description: "2 new this month",
      color: "#3b82f6",
    },
    {
      title: "Images Processed",
      value: 2847,
      change: 23,
      changeType: "positive" as const,
      icon: Camera,
      description: "This week",
      color: "#10b981",
    },
    {
      title: "Progress Rate",
      value: 87,
      change: 8,
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "Average completion",
      color: "#f59e0b",
    },
    {
      title: "Pending Reviews",
      value: 23,
      change: -12,
      changeType: "negative" as const,
      icon: Clock,
      description: "Require attention",
      color: "#ef4444",
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
      alerts: 0,
      teamMembers: [
        { name: "John Smith", avatar: "/api/placeholder/32/32" },
        { name: "Sarah Jones", avatar: "/api/placeholder/32/32" },
        { name: "Mike Wilson", avatar: "/api/placeholder/32/32" },
        { name: "Lisa Chen", avatar: "/api/placeholder/32/32" },
      ],
      budget: 2500000,
      budgetUsed: 1875000,
      startDate: "2024-01-15",
      endDate: "2024-12-15",
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
      alerts: 2,
      teamMembers: [
        { name: "David Brown", avatar: "/api/placeholder/32/32" },
        { name: "Emily Davis", avatar: "/api/placeholder/32/32" },
        { name: "Alex Johnson", avatar: "/api/placeholder/32/32" },
      ],
      budget: 1800000,
      budgetUsed: 1260000,
      startDate: "2024-02-01",
      endDate: "2024-11-30",
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
      alerts: 0,
      teamMembers: [
        { name: "Rachel Green", avatar: "/api/placeholder/32/32" },
        { name: "Tom Anderson", avatar: "/api/placeholder/32/32" },
        { name: "Maria Garcia", avatar: "/api/placeholder/32/32" },
        { name: "Chris Lee", avatar: "/api/placeholder/32/32" },
        { name: "James Taylor", avatar: "/api/placeholder/32/32" },
      ],
      budget: 3200000,
      budgetUsed: 2880000,
      startDate: "2023-10-01",
      endDate: "2024-08-31",
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
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <PageTransition>
        <div className="min-h-screen bg-background">
          <Navigation />
          
          <main className="container mx-auto px-4 py-8 space-y-8">
            {/* Header */}
            <AnimatedContainer direction="up">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">Enhanced Construction Dashboard</h1>
                  <p className="text-muted-foreground">Monitor your construction projects with advanced analytics, aerial imagery and real-time progress tracking</p>
                </div>
                <div className="flex items-center space-x-3">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="hero">
                      <Plus className="w-4 h-4 mr-2" />
                      New Project
                    </Button>
                  </motion.div>
                </div>
              </div>
            </AnimatedContainer>

            {/* Enhanced Stats Grid */}
            <SpringContainer delay={200}>
              <EnhancedStatsDashboard stats={statsData} />
            </SpringContainer>

            {/* Progress Comparison */}
            <AnimatedContainer direction="up" delay={0.3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ y: -2 }}
              >
                <ImageComparison 
                  beforeImage={comparisonData.beforeImage}
                  afterImage={comparisonData.afterImage}
                  title="Skyline Tower - AI-Powered Progress Comparison"
                />
              </motion.div>
            </AnimatedContainer>

            {/* Enhanced Projects Grid */}
            <div className="space-y-6">
              <AnimatedContainer direction="up" delay={0.5}>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-foreground">Active Projects</h2>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </motion.div>
                </div>
              </AnimatedContainer>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StaggeredList staggerDelay={0.1}>
                  {projectsData.map((project, index) => (
                    <motion.div
                      key={project.id}
                      onHoverStart={() => setHoveredCard(index)}
                      onHoverEnd={() => setHoveredCard(null)}
                    >
                      <EnhancedProjectCard {...project} />
                    </motion.div>
                  ))}
                </StaggeredList>
              </div>
            </div>

            {/* Enhanced Quick Actions */}
            <AnimatedContainer direction="up" delay={0.8}>
              <motion.div 
                className="bg-gradient-card rounded-xl p-6 shadow-soft border border-border/50"
                whileHover={{ boxShadow: "0 8px 32px -8px rgba(28, 73, 128, 0.2)" }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">Smart Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: Camera, label: "AI Image Analysis", color: "#3b82f6" },
                    { icon: Building2, label: "Create Project", color: "#10b981" },
                    { icon: Users, label: "Team Management", color: "#f59e0b" },
                    { icon: AlertTriangle, label: "Smart Alerts", color: "#ef4444" },
                  ].map((action, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Button 
                        variant="outline" 
                        className="h-20 flex-col space-y-2 w-full"
                        style={{ 
                          borderColor: `${action.color}30`,
                          background: `linear-gradient(135deg, ${action.color}10 0%, transparent 100%)`,
                        }}
                      >
                        <action.icon 
                          className="w-6 h-6" 
                          style={{ color: action.color }}
                        />
                        <span className="text-sm font-medium">{action.label}</span>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatedContainer>

            {/* Performance Metrics */}
            <AnimatedContainer direction="up" delay={1.0}>
              <motion.div 
                className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">AI-Powered Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">94%</div>
                    <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">23%</div>
                    <div className="text-sm text-muted-foreground">Cost Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">15 Days</div>
                    <div className="text-sm text-muted-foreground">Avg. Time Saved</div>
                  </div>
                </div>
              </motion.div>
            </AnimatedContainer>
          </main>
        </div>
      </PageTransition>
    </ThemeProvider>
  );
};

export default EnhancedIndex;
