import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Chip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Schedule,
  AttachMoney,
  Build,
  Group,
  Warning,
  CheckCircle,
  Assessment,
  Timeline,
  PieChart as PieChartIcon,
  ShowChart,
} from '@mui/icons-material';
import { muiTheme } from '@/theme/muiTheme';
import { Navigation } from '@/components/Navigation';
import {
  AnimatedContainer,
  HoverScale,
  PageTransition,
} from '@/components/animations/MotionComponents';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`analytics-tabpanel-${index}`}
      aria-labelledby={`analytics-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Analytics = () => {
  const [tabValue, setTabValue] = useState(0);
  const [timeRange, setTimeRange] = useState('6months');

  // Sample data for charts
  const projectProgressData = [
    { month: 'Jan', completed: 2, inProgress: 5, delayed: 1 },
    { month: 'Feb', completed: 3, inProgress: 6, delayed: 2 },
    { month: 'Mar', completed: 4, inProgress: 4, delayed: 1 },
    { month: 'Apr', completed: 5, inProgress: 7, delayed: 3 },
    { month: 'May', completed: 3, inProgress: 8, delayed: 2 },
    { month: 'Jun', completed: 6, inProgress: 5, delayed: 1 },
  ];

  const budgetData = [
    { month: 'Jan', allocated: 500000, spent: 450000, remaining: 50000 },
    { month: 'Feb', allocated: 600000, spent: 520000, remaining: 80000 },
    { month: 'Mar', allocated: 750000, spent: 680000, remaining: 70000 },
    { month: 'Apr', allocated: 800000, spent: 720000, remaining: 80000 },
    { month: 'May', allocated: 900000, spent: 850000, remaining: 50000 },
    { month: 'Jun', allocated: 1000000, spent: 920000, remaining: 80000 },
  ];

  const projectTypesData = [
    { name: 'Residential', value: 35, color: '#3b82f6' },
    { name: 'Commercial', value: 25, color: '#10b981' },
    { name: 'Industrial', value: 20, color: '#f59e0b' },
    { name: 'Infrastructure', value: 15, color: '#ef4444' },
    { name: 'Other', value: 5, color: '#8b5cf6' },
  ];

  const teamPerformanceData = [
    { month: 'Jan', productivity: 75, efficiency: 80, safety: 95 },
    { month: 'Feb', productivity: 78, efficiency: 82, safety: 92 },
    { month: 'Mar', productivity: 82, efficiency: 85, safety: 97 },
    { month: 'Apr', productivity: 80, efficiency: 83, safety: 94 },
    { month: 'May', productivity: 85, efficiency: 88, safety: 96 },
    { month: 'Jun', productivity: 88, efficiency: 90, safety: 98 },
  ];

  const kpiData = [
    {
      title: 'Project Completion Rate',
      value: '87%',
      change: '+5%',
      trend: 'up',
      icon: CheckCircle,
      color: '#10b981'
    },
    {
      title: 'Budget Efficiency',
      value: '92%',
      change: '+3%',
      trend: 'up',
      icon: AttachMoney,
      color: '#3b82f6'
    },
    {
      title: 'Average Delay',
      value: '2.3 days',
      change: '-1.2 days',
      trend: 'up',
      icon: Schedule,
      color: '#f59e0b'
    },
    {
      title: 'Safety Score',
      value: '96%',
      change: '+2%',
      trend: 'up',
      icon: Warning,
      color: '#ef4444'
    },
    {
      title: 'Team Productivity',
      value: '88%',
      change: '+7%',
      trend: 'up',
      icon: Group,
      color: '#8b5cf6'
    },
    {
      title: 'ROI',
      value: '15.2%',
      change: '+1.8%',
      trend: 'up',
      icon: TrendingUp,
      color: '#06b6d4'
    }
  ];

  const projectPerformanceTable = [
    { project: 'Downtown Plaza', progress: 85, budget: 92, timeline: 'On Track', safety: 98 },
    { project: 'Tech Campus', progress: 67, budget: 88, timeline: '3 days delay', safety: 95 },
    { project: 'Residential Complex', progress: 92, budget: 95, timeline: 'Ahead', safety: 97 },
    { project: 'Shopping Mall', progress: 78, budget: 90, timeline: 'On Track', safety: 94 },
    { project: 'Office Tower', progress: 45, budget: 87, timeline: '1 day delay', safety: 96 },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const ProjectOverview = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {kpiData.map((kpi, index) => (
            <AnimatedContainer delay={index * 0.1} direction="up" key={index}>
              <HoverScale scale={1.02}>
                <Card className="h-full">
                  <CardContent className="text-center p-4">
                    <Box className="flex items-center justify-center mb-2">
                      <Box
                        className="p-2 rounded-lg"
                        sx={{ backgroundColor: `${kpi.color}20` }}
                      >
                        <kpi.icon style={{ color: kpi.color, fontSize: 24 }} />
                      </Box>
                    </Box>
                    <Typography variant="h4" className="font-bold mb-1">
                      {kpi.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="mb-1">
                      {kpi.title}
                    </Typography>
                    <Box className="flex items-center justify-center gap-1">
                      {kpi.trend === 'up' ? (
                        <TrendingUp fontSize="small" className="text-green-600" />
                      ) : (
                        <TrendingDown fontSize="small" className="text-red-600" />
                      )}
                      <Typography
                        variant="caption"
                        className={kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}
                      >
                        {kpi.change}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </HoverScale>
            </AnimatedContainer>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Progress Chart */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent>
              <Typography variant="h6" className="font-semibold mb-4">
                Project Progress Overview
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={projectProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" fill="#10b981" name="Completed" />
                  <Bar dataKey="inProgress" fill="#3b82f6" name="In Progress" />
                  <Bar dataKey="delayed" fill="#ef4444" name="Delayed" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Project Types Distribution */}
        <div>
          <Card>
            <CardContent>
              <Typography variant="h6" className="font-semibold mb-4">
                Project Types Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={projectTypesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {projectTypesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Project Performance Table */}
      <div>
        <Card>
          <CardContent>
            <Typography variant="h6" className="font-semibold mb-4">
              Project Performance Summary
            </Typography>
            <TableContainer component={Paper} className="shadow-none border">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Project</TableCell>
                    <TableCell>Progress</TableCell>
                    <TableCell>Budget Efficiency</TableCell>
                    <TableCell>Timeline</TableCell>
                    <TableCell>Safety Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projectPerformanceTable.map((project) => (
                    <TableRow key={project.project} hover>
                      <TableCell className="font-medium">{project.project}</TableCell>
                      <TableCell>
                        <Box className="flex items-center gap-2">
                          <LinearProgress
                            variant="determinate"
                            value={project.progress}
                            className="flex-1"
                            sx={{ height: 8, borderRadius: 4 }}
                          />
                          <Typography variant="body2">{project.progress}%</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{project.budget}%</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={project.timeline}
                          size="small"
                          color={
                            project.timeline === 'On Track' ? 'success' :
                            project.timeline === 'Ahead' ? 'info' : 'warning'
                          }
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{project.safety}%</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const FinancialAnalysis = () => (
    <div className="space-y-6">
      <div>
        <Card>
          <CardContent>
            <Typography variant="h6" className="font-semibold mb-4">
              Budget Analysis
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={budgetData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="allocated"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                  name="Allocated"
                />
                <Area
                  type="monotone"
                  dataKey="spent"
                  stackId="2"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.6}
                  name="Spent"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const TeamPerformance = () => (
    <div className="space-y-6">
      <div>
        <Card>
          <CardContent>
            <Typography variant="h6" className="font-semibold mb-4">
              Team Performance Metrics
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={teamPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="productivity"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  name="Productivity %"
                />
                <Line
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="Efficiency %"
                />
                <Line
                  type="monotone"
                  dataKey="safety"
                  stroke="#ef4444"
                  strokeWidth={3}
                  name="Safety Score %"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <PageTransition>
        <div className="min-h-screen bg-background">
          <Navigation />
          
          <Container maxWidth="xl" className="py-8">
            <AnimatedContainer direction="up">
              <Box className="flex justify-between items-center mb-8">
                <Box>
                  <Typography variant="h3" className="font-bold text-foreground mb-2">
                    Analytics Dashboard
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Comprehensive insights into your construction projects and team performance
                  </Typography>
                </Box>
                
                <Box className="flex gap-2">
                  <FormControl size="small" style={{ minWidth: 120 }}>
                    <InputLabel>Time Range</InputLabel>
                    <Select
                      value={timeRange}
                      label="Time Range"
                      onChange={(e) => setTimeRange(e.target.value)}
                    >
                      <MenuItem value="1month">Last Month</MenuItem>
                      <MenuItem value="3months">Last 3 Months</MenuItem>
                      <MenuItem value="6months">Last 6 Months</MenuItem>
                      <MenuItem value="1year">Last Year</MenuItem>
                    </Select>
                  </FormControl>
                  <Button variant="outlined" startIcon={<Assessment />}>
                    Export Report
                  </Button>
                </Box>
              </Box>
            </AnimatedContainer>

            <AnimatedContainer delay={0.1} direction="up">
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                  <Tab 
                    label="Project Overview" 
                    icon={<ShowChart />}
                    iconPosition="start"
                  />
                  <Tab 
                    label="Financial Analysis" 
                    icon={<AttachMoney />}
                    iconPosition="start"
                  />
                  <Tab 
                    label="Team Performance" 
                    icon={<Group />}
                    iconPosition="start"
                  />
                </Tabs>
              </Box>

              <TabPanel value={tabValue} index={0}>
                <ProjectOverview />
              </TabPanel>
              
              <TabPanel value={tabValue} index={1}>
                <FinancialAnalysis />
              </TabPanel>
              
              <TabPanel value={tabValue} index={2}>
                <TeamPerformance />
              </TabPanel>
            </AnimatedContainer>
          </Container>
        </div>
      </PageTransition>
    </ThemeProvider>
  );
};

export default Analytics;
