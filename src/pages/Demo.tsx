import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  Camera, 
  Building2, 
  Users, 
  MessageSquare,
  ArrowLeft,
  Monitor,
  Smartphone,
  CheckCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ImageComparison } from "@/components/ImageComparison";
// Use public image path so the file can live in `public/Building.png`
const buildingImage = '/Building.png';

const Demo = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);

  const features = [
    {
      icon: Camera,
      title: "Real-time Aerial Monitoring",
      description: "Watch your construction progress with live aerial imagery and AI-powered analysis."
    },
    {
      icon: Building2,
      title: "Progress Tracking",
      description: "Automatic milestone detection and progress percentage calculations."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Seamless communication between owners, contractors, and architects."
    },
    {
      icon: MessageSquare,
      title: "Instant Notifications",
      description: "Real-time updates on project milestones and important changes."
    }
  ];

  const demoSteps = [
    {
      step: 1,
      title: "Upload Project Plans",
      description: "Start by uploading your construction plans and setting project parameters."
    },
    {
      step: 2,
      title: "Schedule Aerial Monitoring",
      description: "Set up automated drone flights or manual capture schedules."
    },
    {
      step: 3,
      title: "AI Analysis & Progress Tracking",
      description: "Our AI analyzes images and compares them to your plans automatically."
    },
    {
      step: 4,
      title: "Real-time Dashboard Updates",
      description: "View progress, communicate with your team, and track milestones."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <div className="h-6 w-px bg-border"></div>
              <h1 className="text-xl font-semibold">ConstructEye Demo</h1>
            </div>
            <Button onClick={() => navigate('/auth')}>
              Start Free Trial
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Interactive Demo
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            See ConstructEye in Action
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Experience how our platform transforms construction monitoring with real-time aerial imagery,
            AI-powered progress tracking, and seamless team collaboration.
          </p>
        </div>

        {/* Video Demo Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Interactive Platform Demo</span>
              <div className="flex items-center space-x-2">
                <Monitor className="w-4 h-4" />
                <span className="text-sm text-muted-foreground">Web Platform</span>
              </div>
            </CardTitle>
            <CardDescription>
              Watch how contractors and project owners use our platform for daily monitoring
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative bg-muted rounded-lg aspect-video flex items-center justify-center mb-6">
              <div className="text-center">
                <Button 
                  size="lg"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="mb-4"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-6 h-6 mr-2" />
                      Pause Demo
                    </>
                  ) : (
                    <>
                      <Play className="w-6 h-6 mr-2" />
                      Play Interactive Demo
                    </>
                  )}
                </Button>
                <p className="text-muted-foreground">
                  {isPlaying ? "Demo is playing..." : "Click to start the interactive demo"}
                </p>
              </div>
            </div>
            
            {/* Demo Controls */}
            <div className="flex items-center justify-center space-x-4">
              <Button variant="outline" size="sm">
                <Smartphone className="w-4 h-4 mr-2" />
                Mobile View
              </Button>
              <Button variant="outline" size="sm">
                <Monitor className="w-4 h-4 mr-2" />
                Desktop View
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Before/After Comparison */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Real Progress Comparison</CardTitle>
            <CardDescription>
              See how our AI detects and analyzes construction progress over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ImageComparison 
              beforeImage={{
                id: "1",
                url: buildingImage,
                date: "2024-01-15",
                label: "Week 1",
                description: "Project foundation start"
              }}
              afterImage={{
                id: "2", 
                url: buildingImage,
                date: "2024-03-10",
                label: "Week 8",
                description: "Foundation 87% complete"
              }}
              title="Construction Progress Tracking"
            />
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">87%</div>
                <div className="text-sm text-muted-foreground">Foundation Complete</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-2">24</div>
                <div className="text-sm text-muted-foreground">Days Ahead of Schedule</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success mb-2">98%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {demoSteps.map((step, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                    {step.step}
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Key Features in Action</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover-lift">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-success">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Available in all plans
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="text-center gradient-hero text-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-3xl mb-4">Ready to Get Started?</CardTitle>
            <CardDescription className="text-blue-100 text-lg">
              Join hundreds of construction teams already using ConstructEye
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => navigate('/auth')}
              >
                Start Free Trial
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
                onClick={() => navigate('/contact')}
              >
                Contact Sales
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Demo;