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
  Avatar,
  Button,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Badge,
  Tabs,
  Tab,
  Alert,
  Switch,
  FormControlLabel,
  TextField,
  Divider,
  Menu,
  MenuItem,
  LinearProgress,
} from '@mui/material';
import {
  Notifications,
  NotificationsActive,
  Warning,
  Error,
  Info,
  CheckCircle,
  Schedule,
  Build,
  Group,
  Assignment,
  Security,
  MoreVert,
  Delete,
  DoneAll,
  Settings,
  FilterList,
  Search,
  Clear,
} from '@mui/icons-material';
import { muiTheme } from '@/theme/muiTheme';
import { Navigation } from '@/components/Navigation';
import {
  AnimatedContainer,
  HoverScale,
  PageTransition,
} from '@/components/animations/MotionComponents';
import { BouncyButton, SpringContainer } from '@/components/animations/SpringComponents';

interface NotificationItem {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  category: 'project' | 'team' | 'system' | 'safety' | 'schedule';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
  projectId?: string;
  projectName?: string;
  actionable: boolean;
  actionUrl?: string;
}

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
      id={`alerts-tabpanel-${index}`}
      aria-labelledby={`alerts-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const AlertsNotifications = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [notifications] = useState<NotificationItem[]>([
    {
      id: '1',
      type: 'error',
      category: 'safety',
      title: 'Safety Violation Detected',
      message: 'Workers not wearing safety helmets detected in Zone A of Downtown Plaza project.',
      timestamp: '2024-01-15T10:30:00Z',
      read: false,
      priority: 'critical',
      projectId: 'proj1',
      projectName: 'Downtown Plaza',
      actionable: true,
      actionUrl: '/projects/proj1/safety'
    },
    {
      id: '2',
      type: 'warning',
      category: 'schedule',
      title: 'Project Behind Schedule',
      message: 'Tech Campus project is 3 days behind the planned schedule. Immediate action required.',
      timestamp: '2024-01-15T09:15:00Z',
      read: false,
      priority: 'high',
      projectId: 'proj2',
      projectName: 'Tech Campus',
      actionable: true,
      actionUrl: '/projects/proj2/schedule'
    },
    {
      id: '3',
      type: 'info',
      category: 'team',
      title: 'New Team Member Added',
      message: 'Sarah Wilson has been added to the Downtown Plaza project team as Safety Officer.',
      timestamp: '2024-01-15T08:45:00Z',
      read: true,
      priority: 'medium',
      projectId: 'proj1',
      projectName: 'Downtown Plaza',
      actionable: false
    },
    {
      id: '4',
      type: 'success',
      category: 'project',
      title: 'Milestone Completed',
      message: 'Foundation work for Residential Complex has been completed successfully.',
      timestamp: '2024-01-14T16:20:00Z',
      read: false,
      priority: 'medium',
      projectId: 'proj3',
      projectName: 'Residential Complex',
      actionable: false
    },
    {
      id: '5',
      type: 'warning',
      category: 'system',
      title: 'Storage Limit Warning',
      message: 'Project image storage is at 85% capacity. Consider upgrading your plan.',
      timestamp: '2024-01-14T14:10:00Z',
      read: true,
      priority: 'medium',
      projectId: undefined,
      projectName: undefined,
      actionable: true,
      actionUrl: '/settings/billing'
    },
    {
      id: '6',
      type: 'error',
      category: 'project',
      title: 'Upload Failed',
      message: 'Failed to upload aerial images for Shopping Mall project. Please try again.',
      timestamp: '2024-01-14T12:30:00Z',
      read: false,
      priority: 'high',
      projectId: 'proj4',
      projectName: 'Shopping Mall',
      actionable: true,
      actionUrl: '/projects/proj4/upload'
    }
  ]);

  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      safety: true,
      schedule: true,
      team: false,
      system: true,
      project: true
    },
    push: {
      safety: true,
      schedule: true,
      team: true,
      system: false,
      project: true
    },
    frequency: 'immediate'
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getNotificationIcon = (type: string, category: string) => {
    switch (category) {
      case 'safety': return <Security />;
      case 'schedule': return <Schedule />;
      case 'team': return <Group />;
      case 'project': return <Assignment />;
      case 'system': return <Settings />;
      default: return <Notifications />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'error': return 'error';
      case 'warning': return 'warning';
      case 'success': return 'success';
      case 'info': return 'info';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const criticalCount = notifications.filter(n => n.priority === 'critical').length;

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || notification.category === filterType;
    return matchesSearch && matchesFilter;
  });

  const AlertsOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div>
        <Card className="h-full">
          <CardContent className="text-center">
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsActive className="text-blue-600 mb-2" style={{ fontSize: 48 }} />
            </Badge>
            <Typography variant="h4" className="font-bold text-foreground mb-1">
              {notifications.length}
            </Typography>
            <Typography color="text.secondary">
              Total Alerts
            </Typography>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card className="h-full">
          <CardContent className="text-center">
            <Error className="text-red-600 mb-2" style={{ fontSize: 48 }} />
            <Typography variant="h4" className="font-bold text-foreground mb-1">
              {criticalCount}
            </Typography>
            <Typography color="text.secondary">
              Critical Alerts
            </Typography>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card className="h-full">
          <CardContent className="text-center">
            <Warning className="text-orange-600 mb-2" style={{ fontSize: 48 }} />
            <Typography variant="h4" className="font-bold text-foreground mb-1">
              {notifications.filter(n => n.priority === 'high').length}
            </Typography>
            <Typography color="text.secondary">
              High Priority
            </Typography>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card className="h-full">
          <CardContent className="text-center">
            <CheckCircle className="text-green-600 mb-2" style={{ fontSize: 48 }} />
            <Typography variant="h4" className="font-bold text-foreground mb-1">
              {notifications.filter(n => n.read).length}
            </Typography>
            <Typography color="text.secondary">
              Resolved
            </Typography>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-4">
        <Card>
          <CardContent>
            <Box className="flex justify-between items-center mb-4">
              <Typography variant="h6" className="font-semibold">
                Recent Alerts
              </Typography>
              <Box className="flex gap-2">
                <TextField
                  size="small"
                  placeholder="Search alerts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: <Search className="text-gray-400 mr-2" fontSize="small" />,
                  }}
                />
                <Button
                  variant="outlined"
                  startIcon={<FilterList />}
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                >
                  Filter
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem onClick={() => { setFilterType('all'); setAnchorEl(null); }}>All</MenuItem>
                  <MenuItem onClick={() => { setFilterType('safety'); setAnchorEl(null); }}>Safety</MenuItem>
                  <MenuItem onClick={() => { setFilterType('schedule'); setAnchorEl(null); }}>Schedule</MenuItem>
                  <MenuItem onClick={() => { setFilterType('team'); setAnchorEl(null); }}>Team</MenuItem>
                  <MenuItem onClick={() => { setFilterType('project'); setAnchorEl(null); }}>Project</MenuItem>
                  <MenuItem onClick={() => { setFilterType('system'); setAnchorEl(null); }}>System</MenuItem>
                </Menu>
              </Box>
            </Box>

            {criticalCount > 0 && (
              <Alert severity="error" className="mb-4">
                You have {criticalCount} critical alert{criticalCount > 1 ? 's' : ''} that require immediate attention!
              </Alert>
            )}

            <List>
              {filteredNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ListItem
                    className={`border-l-4 ${
                      notification.type === 'error' ? 'border-red-500' :
                      notification.type === 'warning' ? 'border-orange-500' :
                      notification.type === 'success' ? 'border-green-500' :
                      'border-blue-500'
                    } ${!notification.read ? 'bg-blue-50' : ''}`}
                  >
                    <ListItemAvatar>
                      <Avatar 
                        className={`${
                          notification.type === 'error' ? 'bg-red-100 text-red-600' :
                          notification.type === 'warning' ? 'bg-orange-100 text-orange-600' :
                          notification.type === 'success' ? 'bg-green-100 text-green-600' :
                          'bg-blue-100 text-blue-600'
                        }`}
                      >
                        {getNotificationIcon(notification.type, notification.category)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box className="flex items-center gap-2">
                          <Typography variant="body1" className={`font-medium ${!notification.read ? 'font-bold' : ''}`}>
                            {notification.title}
                          </Typography>
                          <Chip 
                            label={notification.priority}
                            size="small"
                            className={getPriorityColor(notification.priority)}
                          />
                          {notification.projectName && (
                            <Chip 
                              label={notification.projectName}
                              size="small"
                              variant="outlined"
                            />
                          )}
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary" className="mb-1">
                            {notification.message}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatTimestamp(notification.timestamp)}
                          </Typography>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Box className="flex items-center gap-1">
                        {notification.actionable && (
                          <Button size="small" variant="outlined">
                            Take Action
                          </Button>
                        )}
                        <IconButton size="small">
                          <DoneAll fontSize="small" />
                        </IconButton>
                        <IconButton size="small">
                          <MoreVert fontSize="small" />
                        </IconButton>
                      </Box>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {index < filteredNotifications.length - 1 && <Divider />}
                </motion.div>
              ))}
            </List>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const NotificationSettings = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" className="font-semibold mb-4">
          Notification Preferences
        </Typography>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Typography variant="subtitle1" className="font-medium mb-3">
              Email Notifications
            </Typography>
            <div className="space-y-2">
              <FormControlLabel
                control={
                  <Switch 
                    checked={notificationSettings.email.safety}
                    onChange={(e) => setNotificationSettings(prev => ({
                      ...prev,
                      email: { ...prev.email, safety: e.target.checked }
                    }))}
                  />
                }
                label="Safety Alerts"
              />
              <FormControlLabel
                control={
                  <Switch 
                    checked={notificationSettings.email.schedule}
                    onChange={(e) => setNotificationSettings(prev => ({
                      ...prev,
                      email: { ...prev.email, schedule: e.target.checked }
                    }))}
                  />
                }
                label="Schedule Updates"
              />
              <FormControlLabel
                control={
                  <Switch 
                    checked={notificationSettings.email.team}
                    onChange={(e) => setNotificationSettings(prev => ({
                      ...prev,
                      email: { ...prev.email, team: e.target.checked }
                    }))}
                  />
                }
                label="Team Changes"
              />
              <FormControlLabel
                control={
                  <Switch 
                    checked={notificationSettings.email.project}
                    onChange={(e) => setNotificationSettings(prev => ({
                      ...prev,
                      email: { ...prev.email, project: e.target.checked }
                    }))}
                  />
                }
                label="Project Updates"
              />
              <FormControlLabel
                control={
                  <Switch 
                    checked={notificationSettings.email.system}
                    onChange={(e) => setNotificationSettings(prev => ({
                      ...prev,
                      email: { ...prev.email, system: e.target.checked }
                    }))}
                  />
                }
                label="System Notifications"
              />
            </div>
          </div>
          
          <div>
            <Typography variant="subtitle1" className="font-medium mb-3">
              Push Notifications
            </Typography>
            <div className="space-y-2">
              <FormControlLabel
                control={
                  <Switch 
                    checked={notificationSettings.push.safety}
                    onChange={(e) => setNotificationSettings(prev => ({
                      ...prev,
                      push: { ...prev.push, safety: e.target.checked }
                    }))}
                  />
                }
                label="Safety Alerts"
              />
              <FormControlLabel
                control={
                  <Switch 
                    checked={notificationSettings.push.schedule}
                    onChange={(e) => setNotificationSettings(prev => ({
                      ...prev,
                      push: { ...prev.push, schedule: e.target.checked }
                    }))}
                  />
                }
                label="Schedule Updates"
              />
              <FormControlLabel
                control={
                  <Switch 
                    checked={notificationSettings.push.team}
                    onChange={(e) => setNotificationSettings(prev => ({
                      ...prev,
                      push: { ...prev.push, team: e.target.checked }
                    }))}
                  />
                }
                label="Team Changes"
              />
              <FormControlLabel
                control={
                  <Switch 
                    checked={notificationSettings.push.project}
                    onChange={(e) => setNotificationSettings(prev => ({
                      ...prev,
                      push: { ...prev.push, project: e.target.checked }
                    }))}
                  />
                }
                label="Project Updates"
              />
              <FormControlLabel
                control={
                  <Switch 
                    checked={notificationSettings.push.system}
                    onChange={(e) => setNotificationSettings(prev => ({
                      ...prev,
                      push: { ...prev.push, system: e.target.checked }
                    }))}
                  />
                }
                label="System Notifications"
              />
            </div>
          </div>
        </div>
        
        <Box className="mt-6 pt-6 border-t">
          <Typography variant="subtitle1" className="font-medium mb-3">
            Notification Frequency
          </Typography>
          <div className="space-y-2">
            <FormControlLabel
              control={<input type="radio" name="frequency" checked={notificationSettings.frequency === 'immediate'} />}
              label="Immediate (as they happen)"
              onChange={() => setNotificationSettings(prev => ({ ...prev, frequency: 'immediate' }))}
            />
            <FormControlLabel
              control={<input type="radio" name="frequency" checked={notificationSettings.frequency === 'hourly'} />}
              label="Hourly digest"
              onChange={() => setNotificationSettings(prev => ({ ...prev, frequency: 'hourly' }))}
            />
            <FormControlLabel
              control={<input type="radio" name="frequency" checked={notificationSettings.frequency === 'daily'} />}
              label="Daily digest"
              onChange={() => setNotificationSettings(prev => ({ ...prev, frequency: 'daily' }))}
            />
          </div>
        </Box>
        
        <Box className="mt-6 pt-6 border-t">
          <Button
            variant="contained"
            className="bg-gradient-to-r from-blue-600 to-blue-700"
          >
            Save Preferences
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <PageTransition>
        <div className="min-h-screen bg-background">
          <Navigation />
          
          <Container maxWidth="xl" className="py-8">
            <AnimatedContainer direction="up">
              <Box className="text-center mb-8">
                <Typography variant="h3" className="font-bold text-foreground mb-2">
                  Alerts & Notifications
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Stay informed about your construction projects and team activities
                </Typography>
              </Box>
            </AnimatedContainer>

            <AnimatedContainer delay={0.1} direction="up">
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                  <Tab 
                    label={
                      <Badge badgeContent={unreadCount} color="error">
                        <span>Alerts</span>
                      </Badge>
                    }
                    icon={<NotificationsActive />}
                    iconPosition="start"
                  />
                  <Tab 
                    label="Settings" 
                    icon={<Settings />}
                    iconPosition="start"
                  />
                </Tabs>
              </Box>

              <TabPanel value={tabValue} index={0}>
                <AlertsOverview />
              </TabPanel>
              
              <TabPanel value={tabValue} index={1}>
                <NotificationSettings />
              </TabPanel>
            </AnimatedContainer>
          </Container>
        </div>
      </PageTransition>
    </ThemeProvider>
  );
};

export default AlertsNotifications;
