import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Chip,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Switch,
  FormControlLabel,
  Alert,
  Avatar,
  AvatarGroup,
} from '@mui/material';
import {
  Business,
  LocationOn,
  CalendarToday,
  AttachMoney,
  Group,
  Settings,
  CheckCircle,
  ArrowBack,
  ArrowForward,
} from '@mui/icons-material';
import { muiTheme } from '@/theme/muiTheme';
import { Navigation } from '@/components/Navigation';
import {
  AnimatedContainer,
  HoverScale,
  PageTransition,
} from '@/components/animations/MotionComponents';
import { BouncyButton, SpringContainer } from '@/components/animations/SpringComponents';
import { useNavigate } from 'react-router-dom';

interface ProjectData {
  name: string;
  description: string;
  location: string;
  type: string;
  startDate: string;
  endDate: string;
  budget: string;
  currency: string;
  teamMembers: string[];
  priority: string;
  tags: string[];
  notifications: {
    email: boolean;
    sms: boolean;
    weekly: boolean;
  };
}

const CreateProject = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [projectData, setProjectData] = useState<ProjectData>({
    name: '',
    description: '',
    location: '',
    type: '',
    startDate: '',
    endDate: '',
    budget: '',
    currency: 'USD',
    teamMembers: [],
    priority: 'medium',
    tags: [],
    notifications: {
      email: true,
      sms: false,
      weekly: true,
    }
  });

  const steps = ['Basic Info', 'Schedule & Budget', 'Team & Settings', 'Review'];

  const projectTypes = [
    'Residential Building',
    'Commercial Complex', 
    'Office Tower',
    'Shopping Mall',
    'Industrial Facility',
    'Infrastructure',
    'Renovation',
    'Other'
  ];

  const teamMembers = [
    { name: 'John Doe', role: 'Project Manager', avatar: '/api/placeholder/32/32' },
    { name: 'Jane Smith', role: 'Site Engineer', avatar: '/api/placeholder/32/32' },
    { name: 'Mike Johnson', role: 'Architect', avatar: '/api/placeholder/32/32' },
    { name: 'Sarah Wilson', role: 'Safety Officer', avatar: '/api/placeholder/32/32' },
    { name: 'Tom Brown', role: 'Quality Control', avatar: '/api/placeholder/32/32' },
  ];

  const predefinedTags = [
    'High Priority', 'Government', 'Private', 'Green Building', 
    'LEED Certified', 'Fast Track', 'Budget Sensitive', 'Complex'
  ];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    // Here you would submit the project data
    console.log('Creating project:', projectData);
    // Navigate to dashboard after creation
    navigate('/dashboard');
  };

  const updateProjectData = (field: string, value: any) => {
    setProjectData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <TextField
              fullWidth
              label="Project Name"
              variant="outlined"
              value={projectData.name}
              onChange={(e) => updateProjectData('name', e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Project Description"
              variant="outlined"
              multiline
              rows={4}
              value={projectData.description}
              onChange={(e) => updateProjectData('description', e.target.value)}
            />
            <TextField
              fullWidth
              label="Location"
              variant="outlined"
              value={projectData.location}
              onChange={(e) => updateProjectData('location', e.target.value)}
              required
              InputProps={{
                startAdornment: <LocationOn className="text-gray-400 mr-2" />,
              }}
            />
            <FormControl fullWidth>
              <InputLabel>Project Type</InputLabel>
              <Select
                value={projectData.type}
                label="Project Type"
                onChange={(e) => updateProjectData('type', e.target.value)}
              >
                {projectTypes.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <TextField
                  fullWidth
                  label="Start Date"
                  type="date"
                  value={projectData.startDate}
                  onChange={(e) => updateProjectData('startDate', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <CalendarToday className="text-gray-400 mr-2" />,
                  }}
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  label="End Date"
                  type="date"
                  value={projectData.endDate}
                  onChange={(e) => updateProjectData('endDate', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <CalendarToday className="text-gray-400 mr-2" />,
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
              <div className="sm:col-span-8">
                <TextField
                  fullWidth
                  label="Budget"
                  variant="outlined"
                  type="number"
                  value={projectData.budget}
                  onChange={(e) => updateProjectData('budget', e.target.value)}
                  InputProps={{
                    startAdornment: <AttachMoney className="text-gray-400 mr-2" />,
                  }}
                />
              </div>
              <div className="sm:col-span-4">
                <FormControl fullWidth>
                  <InputLabel>Currency</InputLabel>
                  <Select
                    value={projectData.currency}
                    label="Currency"
                    onChange={(e) => updateProjectData('currency', e.target.value)}
                  >
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="GBP">GBP</MenuItem>
                    <MenuItem value="INR">INR</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <FormControl fullWidth>
              <InputLabel>Priority Level</InputLabel>
              <Select
                value={projectData.priority}
                label="Priority Level"
                onChange={(e) => updateProjectData('priority', e.target.value)}
              >
                <MenuItem value="low">Low Priority</MenuItem>
                <MenuItem value="medium">Medium Priority</MenuItem>
                <MenuItem value="high">High Priority</MenuItem>
                <MenuItem value="critical">Critical</MenuItem>
              </Select>
            </FormControl>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <Box>
              <Typography variant="h6" className="mb-3 font-semibold">
                Team Members
              </Typography>
              <Autocomplete
                multiple
                options={teamMembers}
                getOptionLabel={(option) => `${option.name} - ${option.role}`}
                value={teamMembers.filter(member => projectData.teamMembers.includes(member.name))}
                onChange={(_, newValue) => 
                  updateProjectData('teamMembers', newValue.map(member => member.name))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Select Team Members"
                    placeholder="Add team members"
                  />
                )}
                renderOption={(props, option) => (
                  <Box component="li" {...props} className="flex items-center gap-3">
                    <Avatar src={option.avatar} alt={option.name} className="w-8 h-8" />
                    <Box>
                      <Typography variant="body2" className="font-medium">
                        {option.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {option.role}
                      </Typography>
                    </Box>
                  </Box>
                )}
              />
              {projectData.teamMembers.length > 0 && (
                <Box className="mt-3">
                  <AvatarGroup max={6}>
                    {teamMembers
                      .filter(member => projectData.teamMembers.includes(member.name))
                      .map((member) => (
                        <Avatar key={member.name} src={member.avatar} alt={member.name} />
                      ))}
                  </AvatarGroup>
                </Box>
              )}
            </Box>

            <Box>
              <Typography variant="h6" className="mb-3 font-semibold">
                Project Tags
              </Typography>
              <Autocomplete
                multiple
                freeSolo
                options={predefinedTags}
                value={projectData.tags}
                onChange={(_, newValue) => updateProjectData('tags', newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Add Tags"
                    placeholder="Type or select tags"
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      key={index}
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
              />
            </Box>

            <Box>
              <Typography variant="h6" className="mb-3 font-semibold">
                Notification Preferences
              </Typography>
              <div className="space-y-2">
                <FormControlLabel
                  control={
                    <Switch
                      checked={projectData.notifications.email}
                      onChange={(e) => updateProjectData('notifications', {
                        ...projectData.notifications,
                        email: e.target.checked
                      })}
                    />
                  }
                  label="Email Notifications"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={projectData.notifications.sms}
                      onChange={(e) => updateProjectData('notifications', {
                        ...projectData.notifications,
                        sms: e.target.checked
                      })}
                    />
                  }
                  label="SMS Notifications"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={projectData.notifications.weekly}
                      onChange={(e) => updateProjectData('notifications', {
                        ...projectData.notifications,
                        weekly: e.target.checked
                      })}
                    />
                  }
                  label="Weekly Progress Reports"
                />
              </div>
            </Box>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Alert severity="info" className="mb-6">
              Please review your project details before creating the project.
            </Alert>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Card className="h-full">
                  <CardContent>
                    <Typography variant="h6" className="mb-3 font-semibold flex items-center gap-2">
                      <Business fontSize="small" />
                      Project Details
                    </Typography>
                    <div className="space-y-2">
                      <Box>
                        <Typography variant="caption" color="text.secondary">Name</Typography>
                        <Typography variant="body2" className="font-medium">{projectData.name}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Type</Typography>
                        <Typography variant="body2" className="font-medium">{projectData.type}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Location</Typography>
                        <Typography variant="body2" className="font-medium">{projectData.location}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Priority</Typography>
                        <Chip 
                          label={projectData.priority}
                          size="small"
                          color={projectData.priority === 'high' ? 'error' : 'default'}
                        />
                      </Box>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="h-full">
                  <CardContent>
                    <Typography variant="h6" className="mb-3 font-semibold flex items-center gap-2">
                      <CalendarToday fontSize="small" />
                      Schedule & Budget
                    </Typography>
                    <div className="space-y-2">
                      <Box>
                        <Typography variant="caption" color="text.secondary">Duration</Typography>
                        <Typography variant="body2" className="font-medium">
                          {projectData.startDate} to {projectData.endDate}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Budget</Typography>
                        <Typography variant="body2" className="font-medium">
                          {projectData.currency} {Number(projectData.budget).toLocaleString()}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Team Size</Typography>
                        <Typography variant="body2" className="font-medium">
                          {projectData.teamMembers.length} members
                        </Typography>
                      </Box>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {projectData.tags.length > 0 && (
              <Box>
                <Typography variant="h6" className="mb-3 font-semibold">
                  Project Tags
                </Typography>
                <div className="flex flex-wrap gap-2">
                  {projectData.tags.map((tag, index) => (
                    <Chip key={index} label={tag} variant="outlined" />
                  ))}
                </div>
              </Box>
            )}
          </div>
        );

      default:
        return 'Unknown step';
    }
  };

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
                  Create New Project
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Set up a new construction project with aerial monitoring
                </Typography>
              </Box>
            </AnimatedContainer>

            <AnimatedContainer delay={0.1} direction="up">
              <Card className="mb-8">
                <CardContent className="p-6">
                  <Stepper activeStep={activeStep} className="mb-8">
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>

                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderStepContent(activeStep)}
                  </motion.div>

                  <Box className="flex justify-between mt-8">
                    <Button
                      onClick={handleBack}
                      disabled={activeStep === 0}
                      startIcon={<ArrowBack />}
                      variant="outlined"
                    >
                      Back
                    </Button>
                    
                    {activeStep === steps.length - 1 ? (
                      <BouncyButton
                        onClick={handleSubmit}
                        className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2"
                      >
                        <CheckCircle fontSize="small" />
                        Create Project
                      </BouncyButton>
                    ) : (
                      <Button
                        onClick={handleNext}
                        variant="contained"
                        endIcon={<ArrowForward />}
                        className="bg-gradient-to-r from-blue-600 to-blue-700"
                      >
                        Next
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </AnimatedContainer>
          </Container>
        </div>
      </PageTransition>
    </ThemeProvider>
  );
};

export default CreateProject;
