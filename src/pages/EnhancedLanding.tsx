import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSpring, animated } from "@react-spring/web";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Typography,
  Box,
} from "@mui/material";
import {
  Business,
  CameraAlt,
  Group,
  Message,
  Speed,
  Security,
  PlayArrow,
  ArrowForward,
  CheckCircle,
  Star,
} from "@mui/icons-material";
import { muiTheme } from "@/theme/muiTheme";
import {
  AnimatedContainer,
  FloatingElement,
  HoverScale,
  PageTransition,
} from "@/components/animations/MotionComponents";
import {
  SpringContainer,
  SpringNumberCounter,
  BouncyButton,
} from "@/components/animations/SpringComponents";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const EnhancedLanding = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    setHeroLoaded(true);
  }, []);

  const features = [
    {
      icon: CameraAlt,
      title: "Aerial Progress Monitoring",
      description: "Real-time aerial imagery with AI-powered progress tracking and automated reporting.",
      color: "#3b82f6",
    },
    {
      icon: Message,
      title: "Two-Way Communication", 
      description: "Seamless communication between owners, contractors, and architects with instant notifications.",
      color: "#10b981",
    },
    {
      icon: Business,
      title: "Plan Management",
      description: "Upload, annotate, and version control construction plans with collaborative review tools.",
      color: "#f59e0b",
    },
    {
      icon: Group,
      title: "Multi-Role Dashboard",
      description: "Role-based access with customized views for owners, contractors, and project stakeholders.",
      color: "#8b5cf6",
    },
    {
      icon: Speed,
      title: "Real-Time Updates",
      description: "Live progress updates, milestone tracking, and automated progress reports.",
      color: "#ef4444",
    },
    {
      icon: Security,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime and comprehensive data protection.",
      color: "#06b6d4",
    }
  ];

  const stats = [
    { number: 500, label: "Active Projects", suffix: "+" },
    { number: 2, label: "Images Processed", suffix: "M+" },
    { number: 98, label: "Client Satisfaction", suffix: "%" },
    { number: 24, label: "Support Available", suffix: "/7" }
  ];

  const handleRoleSelection = (role: 'owner' | 'contractor') => {
    if (user) {
      navigate(role === 'owner' ? '/dashboard' : '/contractor-dashboard');
    } else {
      navigate('/auth');
    }
  };

  const heroSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(50px) scale(0.9)' },
    to: { 
      opacity: heroLoaded ? 1 : 0, 
      transform: heroLoaded ? 'translateY(0px) scale(1)' : 'translateY(50px) scale(0.9)' 
    },
    config: { tension: 280, friction: 60 },
    delay: 200,
  });

  // Show loading spinner while auth is initializing
  if (loading) {
    return (
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
          <SpringContainer className="text-white text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"
            />
            <Typography variant="h6" color="inherit">Loading...</Typography>
          </SpringContainer>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <PageTransition>
        <div className="min-h-screen">
          {/* Hero Section */}
          <section className="relative py-20 px-4 gradient-hero text-white overflow-hidden">
            {/* Animated Background Elements */}
            <FloatingElement amplitude={15} duration={4} className="absolute top-20 left-10">
              <div className="w-20 h-20 bg-white/10 rounded-full blur-xl" />
            </FloatingElement>
            <FloatingElement amplitude={20} duration={5} className="absolute bottom-20 right-10">
              <div className="w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
            </FloatingElement>
            
            {/* Particles Background */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 2 }}
            >
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                  }}
                />
              ))}
            </motion.div>

            <div className="absolute inset-0 bg-black/20" />
            <Container maxWidth="lg" className="relative z-10">
              <animated.div style={heroSpring} className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30">
                    🚀 Next-Gen Construction Monitoring
                  </Badge>
                </motion.div>
                
                <motion.h1
                  className="text-5xl md:text-7xl font-bold mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                    Sky View Build Track
                  </span>
                </motion.h1>
                
                <motion.p
                  className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  Revolutionary aerial monitoring platform connecting owners, contractors, and architects 
                  with real-time progress tracking and seamless collaboration.
                </motion.p>
                
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <BouncyButton
                    className="text-lg px-8 py-4 bg-white text-primary hover:bg-white/90 transition-all duration-300 rounded-lg font-medium flex items-center gap-2"
                    onClick={() => navigate('/demo')}
                  >
                    <PlayArrow />
                    Watch Demo
                  </BouncyButton>
                  
                  <BouncyButton
                    className="text-lg px-8 py-4 border-white/30 text-white bg-white/10 transition-all duration-300 rounded-lg font-medium flex items-center gap-2 border"
                    onClick={() => navigate(user ? '/dashboard' : '/auth')}
                  >
                    {user ? "Go to Dashboard" : "Get Started"}
                    <ArrowForward />
                  </BouncyButton>
                </motion.div>
              </animated.div>
            </Container>
          </section>

          {/* Stats Section */}
          <section className="py-16 px-4 border-b bg-white/50">
            <Container maxWidth="lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <AnimatedContainer key={index} delay={index * 0.1} direction="up">
                    <HoverScale scale={1.05}>
                      <Box className="text-center">
                        <Typography variant="h3" className="font-bold text-primary mb-2">
                          <SpringNumberCounter 
                            value={stat.number} 
                            suffix={stat.suffix}
                            duration={2000}
                          />
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {stat.label}
                        </Typography>
                      </Box>
                    </HoverScale>
                  </AnimatedContainer>
                ))}
              </div>
            </Container>
          </section>

          {/* Role Selection */}
          <section className="py-20 px-4">
            <Container maxWidth="md">
              <AnimatedContainer direction="up" className="text-center mb-12">
                <Typography variant="h3" className="font-bold mb-6 text-foreground">
                  Choose Your Access Level
                </Typography>
                <Typography variant="h6" color="text.secondary" className="mb-12">
                  Experience tailored dashboards designed for your specific role in the construction process.
                </Typography>
              </AnimatedContainer>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    role: 'owner' as const,
                    icon: Business,
                    title: 'Project Owner',
                    description: 'Monitor progress, review plans, and communicate with your construction team',
                    features: [
                      'Real-time progress monitoring',
                      'Plan review and approval',
                      'Direct contractor communication',
                      'Budget and timeline tracking'
                    ],
                    color: '#3b82f6',
                  },
                  {
                    role: 'contractor' as const,
                    icon: Group,
                    title: 'Contractor/Architect',
                    description: 'Update progress, manage plans, and coordinate with project stakeholders',
                    features: [
                      'Progress updates and reporting',
                      'Plan uploads and annotations',
                      'Material request management',
                      'Team collaboration tools'
                    ],
                    color: '#f59e0b',
                  }
                ].map((option, index) => (
                  <AnimatedContainer key={option.role} delay={index * 0.2} direction="up">
                    <HoverScale scale={1.02}>
                      <Card 
                        className="cursor-pointer border-2 hover:border-primary transition-all duration-300"
                        onClick={() => handleRoleSelection(option.role)}
                        style={{
                          background: `linear-gradient(135deg, ${option.color}10 0%, #ffffff 100%)`,
                          borderColor: `${option.color}20`,
                        }}
                      >
                        <CardHeader className="pb-4 text-center">
                          <Box className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" 
                               style={{ backgroundColor: `${option.color}20` }}>
                            <option.icon style={{ fontSize: 32, color: option.color }} />
                          </Box>
                          <CardTitle className="text-2xl">{option.title}</CardTitle>
                          <CardDescription className="text-base">
                            {option.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Box component="ul" className="space-y-3">
                            {option.features.map((feature, featureIndex) => (
                              <motion.li
                                key={featureIndex}
                                className="flex items-center"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: featureIndex * 0.1 }}
                              >
                                <CheckCircle style={{ color: '#10b981', fontSize: 20, marginRight: 12 }} />
                                <Typography variant="body2">{feature}</Typography>
                              </motion.li>
                            ))}
                          </Box>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button 
                              className="w-full mt-6" 
                              style={{ backgroundColor: option.color }}
                            >
                              Access {option.title.split('/')[0]} Dashboard
                            </Button>
                          </motion.div>
                        </CardContent>
                      </Card>
                    </HoverScale>
                  </AnimatedContainer>
                ))}
              </div>
            </Container>
          </section>

          {/* Features Section */}
          <section className="py-20 px-4 gradient-feature">
            <Container maxWidth="lg">
              <AnimatedContainer direction="up" className="text-center mb-16">
                <Typography variant="h3" className="font-bold mb-6 text-foreground">
                  Powerful Features for Modern Construction
                </Typography>
                <Typography variant="h6" color="text.secondary" className="max-w-3xl mx-auto">
                  Everything you need to monitor, manage, and collaborate on construction projects with cutting-edge technology.
                </Typography>
              </AnimatedContainer>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <AnimatedContainer key={index} delay={index * 0.1} direction="up">
                    <HoverScale scale={1.03}>
                      <Card className="border-0 bg-white/80 backdrop-blur-sm h-full">
                        <CardHeader>
                          <Box 
                            className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                            style={{ backgroundColor: `${feature.color}20` }}
                          >
                            <feature.icon style={{ color: feature.color, fontSize: 24 }} />
                          </Box>
                          <CardTitle className="text-xl">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-base">
                            {feature.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </HoverScale>
                  </AnimatedContainer>
                ))}
              </div>
            </Container>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4 gradient-hero text-white">
            <Container maxWidth="md" className="text-center">
              <AnimatedContainer direction="up">
                <Typography variant="h3" className="font-bold mb-6">
                  Ready to Transform Your Construction Projects?
                </Typography>
                <Typography variant="h6" className="mb-8 text-blue-100">
                  Join hundreds of successful projects using Sky View Build Track for seamless construction monitoring and collaboration.
                </Typography>
                
                <Box className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <BouncyButton
                    className="text-lg px-8 py-4 bg-white text-primary hover:bg-white/90 transition-all duration-300 rounded-lg font-medium"
                    onClick={() => navigate(user ? '/dashboard' : '/auth')}
                  >
                    Start Free Trial
                  </BouncyButton>
                  <BouncyButton
                    className="text-lg px-8 py-4 border-white/30 text-white bg-white/10 transition-all duration-300 rounded-lg font-medium border"
                    onClick={() => navigate('/contact')}
                  >
                    Contact Sales
                  </BouncyButton>
                </Box>
                
                <Box className="flex items-center justify-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star style={{ color: '#fbbf24', fontSize: 20 }} />
                    </motion.div>
                  ))}
                  <Typography variant="body1" className="ml-3 text-blue-100">
                    4.9/5 from <SpringNumberCounter value={200} suffix="+" duration={1500} /> reviews
                  </Typography>
                </Box>
              </AnimatedContainer>
            </Container>
          </section>
        </div>
      </PageTransition>
    </ThemeProvider>
  );
};

export default EnhancedLanding;
