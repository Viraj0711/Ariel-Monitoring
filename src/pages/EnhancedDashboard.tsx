import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Typography,
  Box,
  Fab,
  Chip,
} from '@mui/material';
import {
  Business,
  CameraAlt,
  TrendingUp,
  Schedule,
  Warning,
  Group,
  Add,
  FilterList,
} from '@mui/icons-material';
import { muiTheme } from '@/theme/muiTheme';
import { Navigation } from '@/components/Navigation';
import { EnhancedProjectCard } from '@/components/enhanced/EnhancedProjectCard';
import { EnhancedStatsDashboard } from '@/components/enhanced/EnhancedStatsDashboard';
import { ImageComparison } from '@/components/ImageComparison';
import {
  AnimatedContainer,
  HoverScale,
  PageTransition,
} from '@/components/animations/MotionComponents';
import { BouncyButton } from '@/components/animations/SpringComponents';
import buildingImage from '@/assets/Building.png';

const EnhancedDashboard = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const statsData = [
    {
      title: 'Active Projects',
      value: 12,
      change: 2,
      changeType: 'positive' as const,
      icon: Business,
      description: '2 new this month',
      color: '#3b82f6',
    },
    {
      title: 'Images Processed',
      value: 2847,
      change: 15,
      changeType: 'positive' as const,
      icon: CameraAlt,
      description: 'This week',
      color: '#10b981',
    },
    {
      title: 'Progress Rate',
      value: 87,
      change: 5,
      changeType: 'positive' as const,
      icon: TrendingUp,
      description: 'Average completion',
      color: '#f59e0b',
    },
    {
      title: 'Pending Reviews',
      value: 23,
      change: 3,
      changeType: 'negative' as const,
      icon: Schedule,
      description: 'Require attention',
      color: '#ef4444',
    },
  ];

  const projectsData = [
    {
      id: '1',
      name: 'Skyline Tower Complex',
      location: 'Downtown District',
      progress: 75,
      status: 'on-track' as const,
      lastUpdate: '2 hours ago',
      teamSize: 24,
      imageUrl: buildingImage,
      totalImages: 156,
      alerts: 0,
      teamMembers: [
        { name: 'John Doe', avatar: '/api/placeholder/32/32' },
        { name: 'Jane Smith', avatar: '/api/placeholder/32/32' },
        { name: 'Mike Johnson', avatar: '/api/placeholder/32/32' },
      ],
      budget: 2500000,
      budgetUsed: 1875000,
      startDate: '2024-01-15',
      endDate: '2024-12-15',
    },
    {
      id: '2',
      name: 'Metro Business Center',
      location: 'Financial District',
      progress: 45,
      status: 'delayed' as const,
      lastUpdate: '1 day ago',
      teamSize: 18,
      imageUrl: buildingImage,
      totalImages: 89,
      alerts: 2,
      teamMembers: [
        { name: 'Sarah Wilson', avatar: '/api/placeholder/32/32' },
        { name: 'Tom Brown', avatar: '/api/placeholder/32/32' },
      ],
      budget: 1800000,
      budgetUsed: 990000,
      startDate: '2024-03-01',
      endDate: '2024-11-30',
    },
    {
      id: '3',
      name: 'Residential Plaza',
      location: 'Westside',
      progress: 92,
      status: 'ahead' as const,
      lastUpdate: '3 hours ago',
      teamSize: 31,
      imageUrl: buildingImage,
      totalImages: 203,
      alerts: 0,
      teamMembers: [
        { name: 'Emily Davis', avatar: '/api/placeholder/32/32' },
        { name: 'Chris Lee', avatar: '/api/placeholder/32/32' },
        { name: 'Alex Chen', avatar: '/api/placeholder/32/32' },
        { name: 'Maria Garcia', avatar: '/api/placeholder/32/32' },
      ],
      budget: 3200000,
      budgetUsed: 2656000,
      startDate: '2023-11-01',
      endDate: '2024-08-15',
    },
  ];

  const comparisonData = {
    beforeImage: {
      id: 'before',
      url: buildingImage,
      date: 'March 15, 2024',
      label: 'Foundation Phase',
      description: 'Initial foundation work completed',
    },
    afterImage: {
      id: 'after',
      url: buildingImage,
      date: 'July 20, 2024',
      label: 'Structure Phase',
      description: 'Vertical construction in progress',
    },
  };

  const filters = [
    { id: 'all', label: 'All Projects', count: projectsData.length },
    { id: 'on-track', label: 'On Track', count: projectsData.filter(p => p.status === 'on-track').length },
    { id: 'delayed', label: 'Delayed', count: projectsData.filter(p => p.status === 'delayed').length },
    { id: 'ahead', label: 'Ahead', count: projectsData.filter(p => p.status === 'ahead').length },
  ];

  const filteredProjects = selectedFilter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.status === selectedFilter);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <PageTransition>
        <div className="min-h-screen bg-background">
          <Navigation />
          
          <Container maxWidth="xl" className="py-8 space-y-8">
            {/* Header */}
            <AnimatedContainer direction="up">
              <Box className="flex justify-between items-center">
                <Box>
                  <Typography variant="h3" className="font-bold text-foreground mb-2">
                    Construction Dashboard
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Monitor your construction projects with aerial imagery and real-time progress tracking
                  </Typography>
                </Box>
                <Box className="flex items-center space-x-3">
                  <BouncyButton className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <FilterList fontSize="small" />
                    Filter
                  </BouncyButton>
                  <BouncyButton className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium">
                    <Add fontSize="small" />
                    New Project
                  </BouncyButton>
                </Box>
              </Box>
            </AnimatedContainer>

            {/* Stats Dashboard */}
            <AnimatedContainer delay={0.1} direction="up">
              <EnhancedStatsDashboard stats={statsData} />
            </AnimatedContainer>

            {/* Project Filters */}
            <AnimatedContainer delay={0.2} direction="up">
              <Box className="flex flex-wrap gap-3">
                {filters.map((filter) => (
                  <motion.div
                    key={filter.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Chip
                      label={`${filter.label} (${filter.count})`}
                      onClick={() => setSelectedFilter(filter.id)}
                      variant={selectedFilter === filter.id ? 'filled' : 'outlined'}
                      color={selectedFilter === filter.id ? 'primary' : 'default'}
                      className="cursor-pointer font-medium"
                    />
                  </motion.div>
                ))}
              </Box>
            </AnimatedContainer>

            {/* Progress Comparison */}
            <AnimatedContainer delay={0.3} direction="up">
              <ImageComparison
                beforeImage={comparisonData.beforeImage}
                afterImage={comparisonData.afterImage}
                title="Skyline Tower - Progress Comparison"
              />
            </AnimatedContainer>

            {/* Projects Grid */}
            <Box className="space-y-6">
              <AnimatedContainer delay={0.4} direction="up">
                <Box className="flex justify-between items-center">
                  <Typography variant="h4" className="font-semibold text-foreground">
                    Active Projects
                  </Typography>
                  <BouncyButton className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-medium">
                    View All
                  </BouncyButton>
                </Box>
              </AnimatedContainer>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <AnimatedContainer
                    key={project.id}
                    delay={0.5 + index * 0.1}
                    direction="up"
                  >
                    <EnhancedProjectCard {...project} />
                  </AnimatedContainer>
                ))}
              </div>
            </Box>

            {/* Quick Actions */}
            <AnimatedContainer delay={0.8} direction="up">
              <Box className="bg-gradient-card rounded-xl p-6 shadow-soft border border-border/50">
                <Typography variant="h5" className="font-semibold text-foreground mb-6">
                  Quick Actions
                </Typography>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: CameraAlt, label: 'Upload Images', color: '#3b82f6', route: '/upload-images' },
                    { icon: Business, label: 'Create Project', color: '#10b981', route: '/create-project' },
                    { icon: Group, label: 'Team Management', color: '#f59e0b', route: '/team-management' },
                    { icon: Warning, label: 'View Alerts', color: '#ef4444', route: '/alerts' },
                  ].map((action, index) => (
                    <HoverScale key={index} scale={1.05}>
                      <motion.button
                        className="h-24 flex-col space-y-2 border border-gray-200 rounded-xl hover:border-gray-300 transition-all duration-300 bg-white/80 backdrop-blur-sm flex items-center justify-center"
                        whileHover={{
                          backgroundColor: `${action.color}10`,
                          borderColor: action.color,
                        }}
                        onClick={() => navigate(action.route)}
                      >
                        <action.icon style={{ fontSize: 24, color: action.color }} />
                        <Typography variant="body2" className="font-medium">
                          {action.label}
                        </Typography>
                      </motion.button>
                    </HoverScale>
                  ))}
                </div>
              </Box>
            </AnimatedContainer>

            {/* Floating Action Button */}
            <motion.div
              className="fixed bottom-8 right-8 z-50"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1, type: 'spring', stiffness: 200 }}
            >
              <Fab
                color="primary"
                size="large"
                sx={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <Add />
              </Fab>
            </motion.div>
          </Container>
        </div>
      </PageTransition>
    </ThemeProvider>
  );
};

export default EnhancedDashboard;
