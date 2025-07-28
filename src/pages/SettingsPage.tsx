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
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
  IconButton,
  Alert,
} from '@mui/material';
import {
  Settings,
  AccountCircle,
  Security,
  Notifications,
  Palette,
  Language,
  Storage,
  Help,
  Info,
  Edit,
  Save,
  Cancel,
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
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const SettingsPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@company.com',
    phone: '+1 234-567-8900',
    company: 'Construction Corp',
    role: 'Project Manager',
    timezone: 'America/New_York',
    language: 'en',
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    weekly: true,
    safety: true,
    budget: true,
    schedule: true,
  });

  const [preferences, setPreferences] = useState({
    theme: 'light',
    autoSave: true,
    compactView: false,
    showTutorials: true,
    dataRetention: '12months',
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const ProfileSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardContent>
          <Box className="flex justify-between items-center mb-4">
            <Typography variant="h6" className="font-semibold">
              Personal Information
            </Typography>
            <Button
              variant={isEditing ? "outlined" : "contained"}
              startIcon={isEditing ? <Cancel /> : <Edit />}
              onClick={() => setIsEditing(!isEditing)}
              className={!isEditing ? "bg-gradient-to-r from-blue-600 to-blue-700" : ""}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </Box>

          <div className="flex items-center gap-4 mb-6">
            <Avatar
              sx={{ width: 80, height: 80 }}
              src="/api/placeholder/80/80"
              alt={userProfile.name}
            />
            <Box>
              <Typography variant="h6" className="font-medium">
                {userProfile.name}
              </Typography>
              <Typography color="text.secondary">
                {userProfile.role} at {userProfile.company}
              </Typography>
              {isEditing && (
                <Button variant="text" size="small" className="mt-2">
                  Change Photo
                </Button>
              )}
            </Box>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              label="Full Name"
              value={userProfile.name}
              onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
              disabled={!isEditing}
              fullWidth
            />
            <TextField
              label="Email"
              value={userProfile.email}
              onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
              disabled={!isEditing}
              fullWidth
            />
            <TextField
              label="Phone"
              value={userProfile.phone}
              onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
              disabled={!isEditing}
              fullWidth
            />
            <TextField
              label="Company"
              value={userProfile.company}
              onChange={(e) => setUserProfile({...userProfile, company: e.target.value})}
              disabled={!isEditing}
              fullWidth
            />
            <FormControl fullWidth disabled={!isEditing}>
              <InputLabel>Role</InputLabel>
              <Select
                value={userProfile.role}
                label="Role"
                onChange={(e) => setUserProfile({...userProfile, role: e.target.value})}
              >
                <MenuItem value="Project Manager">Project Manager</MenuItem>
                <MenuItem value="Site Engineer">Site Engineer</MenuItem>
                <MenuItem value="Architect">Architect</MenuItem>
                <MenuItem value="Safety Officer">Safety Officer</MenuItem>
                <MenuItem value="Admin">Administrator</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth disabled={!isEditing}>
              <InputLabel>Timezone</InputLabel>
              <Select
                value={userProfile.timezone}
                label="Timezone"
                onChange={(e) => setUserProfile({...userProfile, timezone: e.target.value})}
              >
                <MenuItem value="America/New_York">Eastern Time</MenuItem>
                <MenuItem value="America/Chicago">Central Time</MenuItem>
                <MenuItem value="America/Denver">Mountain Time</MenuItem>
                <MenuItem value="America/Los_Angeles">Pacific Time</MenuItem>
                <MenuItem value="UTC">UTC</MenuItem>
              </Select>
            </FormControl>
          </div>

          {isEditing && (
            <Box className="flex gap-2 mt-6">
              <Button
                variant="contained"
                startIcon={<Save />}
                className="bg-gradient-to-r from-green-600 to-green-700"
                onClick={() => setIsEditing(false)}
              >
                Save Changes
              </Button>
              <Button
                variant="outlined"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" className="font-semibold mb-4">
            Account Security
          </Typography>
          <div className="space-y-4">
            <Box className="flex justify-between items-center">
              <Box>
                <Typography variant="body1" className="font-medium">
                  Change Password
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Last changed 3 months ago
                </Typography>
              </Box>
              <Button variant="outlined">
                Update Password
              </Button>
            </Box>
            <Divider />
            <Box className="flex justify-between items-center">
              <Box>
                <Typography variant="body1" className="font-medium">
                  Two-Factor Authentication
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Add an extra layer of security
                </Typography>
              </Box>
              <Button variant="outlined">
                Enable 2FA
              </Button>
            </Box>
            <Divider />
            <Box className="flex justify-between items-center">
              <Box>
                <Typography variant="body1" className="font-medium">
                  Active Sessions
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage your active sessions
                </Typography>
              </Box>
              <Button variant="outlined">
                View Sessions
              </Button>
            </Box>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const NotificationSettings = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" className="font-semibold mb-4">
          Notification Preferences
        </Typography>
        
        <div className="space-y-4">
          <Box>
            <Typography variant="subtitle1" className="font-medium mb-3">
              Delivery Methods
            </Typography>
            <div className="space-y-2">
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.email}
                    onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                  />
                }
                label="Email Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.push}
                    onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                  />
                }
                label="Push Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.sms}
                    onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                  />
                }
                label="SMS Notifications"
              />
            </div>
          </Box>

          <Divider />

          <Box>
            <Typography variant="subtitle1" className="font-medium mb-3">
              Notification Types
            </Typography>
            <div className="space-y-2">
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.safety}
                    onChange={(e) => setNotifications({...notifications, safety: e.target.checked})}
                  />
                }
                label="Safety Alerts"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.budget}
                    onChange={(e) => setNotifications({...notifications, budget: e.target.checked})}
                  />
                }
                label="Budget Updates"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.schedule}
                    onChange={(e) => setNotifications({...notifications, schedule: e.target.checked})}
                  />
                }
                label="Schedule Changes"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.weekly}
                    onChange={(e) => setNotifications({...notifications, weekly: e.target.checked})}
                  />
                }
                label="Weekly Reports"
              />
            </div>
          </Box>
        </div>

        <Box className="mt-6">
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

  const GeneralSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardContent>
          <Typography variant="h6" className="font-semibold mb-4">
            Appearance & Language
          </Typography>
          
          <div className="space-y-4">
            <FormControl fullWidth>
              <InputLabel>Theme</InputLabel>
              <Select
                value={preferences.theme}
                label="Theme"
                onChange={(e) => setPreferences({...preferences, theme: e.target.value})}
              >
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
                <MenuItem value="auto">Auto (System)</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Language</InputLabel>
              <Select
                value={userProfile.language}
                label="Language"
                onChange={(e) => setUserProfile({...userProfile, language: e.target.value})}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="es">Español</MenuItem>
                <MenuItem value="fr">Français</MenuItem>
                <MenuItem value="de">Deutsch</MenuItem>
              </Select>
            </FormControl>

            <div className="space-y-2">
              <FormControlLabel
                control={
                  <Switch
                    checked={preferences.autoSave}
                    onChange={(e) => setPreferences({...preferences, autoSave: e.target.checked})}
                  />
                }
                label="Auto-save changes"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={preferences.compactView}
                    onChange={(e) => setPreferences({...preferences, compactView: e.target.checked})}
                  />
                }
                label="Compact view"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={preferences.showTutorials}
                    onChange={(e) => setPreferences({...preferences, showTutorials: e.target.checked})}
                  />
                }
                label="Show tutorials and tips"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" className="font-semibold mb-4">
            Data & Storage
          </Typography>
          
          <div className="space-y-4">
            <FormControl fullWidth>
              <InputLabel>Data Retention</InputLabel>
              <Select
                value={preferences.dataRetention}
                label="Data Retention"
                onChange={(e) => setPreferences({...preferences, dataRetention: e.target.value})}
              >
                <MenuItem value="3months">3 Months</MenuItem>
                <MenuItem value="6months">6 Months</MenuItem>
                <MenuItem value="12months">12 Months</MenuItem>
                <MenuItem value="24months">24 Months</MenuItem>
                <MenuItem value="forever">Forever</MenuItem>
              </Select>
            </FormControl>

            <Alert severity="info">
              Storage used: 2.3 GB of 10 GB available
            </Alert>

            <Box className="flex gap-2">
              <Button variant="outlined">
                Export Data
              </Button>
              <Button variant="outlined" color="error">
                Clear Cache
              </Button>
            </Box>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <PageTransition>
        <div className="min-h-screen bg-background">
          <Navigation />
          
          <Container maxWidth="lg" className="py-8">
            <AnimatedContainer direction="up">
              <Box className="text-center mb-8">
                <Typography variant="h3" className="font-bold text-foreground mb-2">
                  Settings
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Manage your account preferences and application settings
                </Typography>
              </Box>
            </AnimatedContainer>

            <AnimatedContainer delay={0.1} direction="up">
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                  <Tab 
                    label="Profile" 
                    icon={<AccountCircle />}
                    iconPosition="start"
                  />
                  <Tab 
                    label="Notifications" 
                    icon={<Notifications />}
                    iconPosition="start"
                  />
                  <Tab 
                    label="General" 
                    icon={<Settings />}
                    iconPosition="start"
                  />
                </Tabs>
              </Box>

              <TabPanel value={tabValue} index={0}>
                <ProfileSettings />
              </TabPanel>
              
              <TabPanel value={tabValue} index={1}>
                <NotificationSettings />
              </TabPanel>
              
              <TabPanel value={tabValue} index={2}>
                <GeneralSettings />
              </TabPanel>
            </AnimatedContainer>
          </Container>
        </div>
      </PageTransition>
    </ThemeProvider>
  );
};

export default SettingsPage;
