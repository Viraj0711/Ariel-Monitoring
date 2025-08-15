import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Building2, 
  Camera, 
  Users, 
  MessageSquare,
  Zap,
  Shield,
  ArrowRight,
  CheckCircle,
  Star,
  Play
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Landing = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [userRole, setUserRole] = useState<'owner' | 'contractor' | null>(null);

  // Show loading spinner while auth is initializing
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const features = [
    {
      icon: Camera,
      title: "Aerial Progress Monitoring",
      description: "Real-time aerial imagery with AI-powered progress tracking and automated reporting."
    },
    {
      icon: MessageSquare,
      title: "Two-Way Communication",
      description: "Seamless communication between owners, contractors, and architects with instant notifications."
    },
    {
      icon: Building2,
      title: "Plan Management",
      description: "Upload, annotate, and version control construction plans with collaborative review tools."
    },
    {
      icon: Users,
      title: "Multi-Role Dashboard",
      description: "Role-based access with customized views for owners, contractors, and project stakeholders."
    },
    {
      icon: Zap,
      title: "Real-Time Updates",
      description: "Live progress updates, milestone tracking, and automated progress reports."
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime and comprehensive data protection."
    }
  ];

  const stats = [
    { number: "500+", label: "Active Projects" },
    { number: "2M+", label: "Images Processed" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "24/7", label: "Support Available" }
  ];

  const handleRoleSelection = (role: 'owner' | 'contractor') => {
    setUserRole(role);
    // Navigate to auth if not logged in, otherwise to appropriate dashboard
    if (user) {
      navigate(role === 'owner' ? '/dashboard' : '/contractor-dashboard');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30">
              🚀 Next-Gen Construction Monitoring
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              ConstructEye
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Revolutionary aerial monitoring platform connecting owners, contractors, and architects 
              with real-time progress tracking and seamless collaboration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4 bg-white text-primary hover:bg-white/90 transition-all duration-300"
                onClick={() => navigate('/demo')}
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-4 border-white/30 text-white bg-white/10 transition-all duration-300"
                onClick={() => navigate(user ? '/dashboard' : '/auth')}
              >
                {user ? "Go to Dashboard" : "Get Started"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-pulse"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 border-b bg-white/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Selection */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Choose Your Access Level
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Experience tailored dashboards designed for your specific role in the construction process.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover-lift cursor-pointer border-2 hover:border-primary transition-all duration-300" 
                  onClick={() => handleRoleSelection('owner')}>
              <CardHeader className="pb-4">
                <div className="w-16 h-16 gradient-feature rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Project Owner</CardTitle>
                <CardDescription className="text-base">
                  Monitor progress, review plans, and communicate with your construction team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-left">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-success mr-3" />
                    Real-time progress monitoring
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-success mr-3" />
                    Plan review and approval
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-success mr-3" />
                    Direct contractor communication
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-success mr-3" />
                    Budget and timeline tracking
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="default">
                  Access Owner Dashboard
                </Button>
              </CardContent>
            </Card>

            <Card className="hover-lift cursor-pointer border-2 hover:border-accent transition-all duration-300" 
                  onClick={() => handleRoleSelection('contractor')}>
              <CardHeader className="pb-4">
                <div className="w-16 h-16 gradient-feature rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-2xl">Contractor/Architect</CardTitle>
                <CardDescription className="text-base">
                  Update progress, manage plans, and coordinate with project stakeholders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-left">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-success mr-3" />
                    Progress updates and reporting
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-success mr-3" />
                    Plan uploads and annotations
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-success mr-3" />
                    Material request management
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-success mr-3" />
                    Team collaboration tools
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-accent hover:bg-accent/90">
                  Access Contractor Portal
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 gradient-feature">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Powerful Features for Modern Construction
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to monitor, manage, and collaborate on construction projects with cutting-edge technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover-lift border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-12 h-12 gradient-interactive rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 gradient-hero text-white">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Construction Projects?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join hundreds of successful projects using ConstructEye for seamless construction monitoring and collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-4 bg-white text-primary hover:bg-white/90 transition-all duration-300"
              onClick={() => navigate(user ? '/dashboard' : '/auth')}
            >
              Start Free Trial
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-4 border-white/30 text-white bg-white/10 transition-all duration-300"
              onClick={() => navigate('/contact')}
            >
              Contact Sales
            </Button>
          </div>
          
          <div className="mt-12 flex items-center justify-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-3 text-blue-100">4.9/5 from 200+ reviews</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;