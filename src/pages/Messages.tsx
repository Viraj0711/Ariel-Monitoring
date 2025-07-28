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
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  TextField,
  InputAdornment,
  Fab,
  Button,
  Divider,
} from '@mui/material';
import {
  Search,
  Add,
  Send,
  AttachFile,
  MoreVert,
  Group,
  Person,
} from '@mui/icons-material';
import { muiTheme } from '@/theme/muiTheme';
import { Navigation } from '@/components/Navigation';
import {
  AnimatedContainer,
  HoverScale,
  PageTransition,
} from '@/components/animations/MotionComponents';

interface Message {
  id: string;
  from: string;
  avatar: string;
  subject: string;
  preview: string;
  timestamp: string;
  unread: boolean;
  type: 'direct' | 'group';
  project?: string;
}

const Messages = () => {
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const messages: Message[] = [
    {
      id: '1',
      from: 'Jane Smith',
      avatar: '/api/placeholder/40/40',
      subject: 'Safety Update - Downtown Plaza',
      preview: 'All safety protocols have been updated for the new construction phase...',
      timestamp: '2 min ago',
      unread: true,
      type: 'direct',
      project: 'Downtown Plaza'
    },
    {
      id: '2',
      from: 'Project Team',
      avatar: '/api/placeholder/40/40',
      subject: 'Weekly Progress Meeting',
      preview: 'Team meeting scheduled for tomorrow at 10 AM to discuss project milestones...',
      timestamp: '1 hour ago',
      unread: true,
      type: 'group',
      project: 'Tech Campus'
    },
    {
      id: '3',
      from: 'Mike Johnson',
      avatar: '/api/placeholder/40/40',
      subject: 'Blueprint Revisions',
      preview: 'The architectural team has completed the revised blueprints for review...',
      timestamp: '3 hours ago',
      unread: false,
      type: 'direct',
      project: 'Shopping Mall'
    },
    {
      id: '4',
      from: 'Safety Team',
      avatar: '/api/placeholder/40/40',
      subject: 'Monthly Safety Report',
      preview: 'Please review the attached monthly safety report for all active projects...',
      timestamp: 'Yesterday',
      unread: false,
      type: 'group'
    },
    {
      id: '5',
      from: 'Sarah Wilson',
      avatar: '/api/placeholder/40/40',
      subject: 'Material Delivery Update',
      preview: 'The concrete delivery for phase 2 has been rescheduled to next Monday...',
      timestamp: '2 days ago',
      unread: false,
      type: 'direct',
      project: 'Residential Complex'
    }
  ];

  const filteredMessages = messages.filter(message =>
    message.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTimestamp = (timestamp: string) => {
    return timestamp;
  };

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
                    Messages
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Stay connected with your team and project updates
                  </Typography>
                </Box>
                
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  className="bg-gradient-to-r from-blue-600 to-blue-700"
                >
                  New Message
                </Button>
              </Box>
            </AnimatedContainer>

            <AnimatedContainer delay={0.1} direction="up">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Messages List */}
                <div className="lg:col-span-1">
                  <Card>
                    <CardContent className="p-0">
                      <Box className="p-4 border-b">
                        <TextField
                          fullWidth
                          placeholder="Search messages..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Search className="text-gray-400" />
                              </InputAdornment>
                            ),
                          }}
                          size="small"
                        />
                      </Box>
                      
                      <List className="p-0">
                        {filteredMessages.map((message, index) => (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <ListItem
                              component="div"
                              onClick={() => setSelectedMessage(message.id)}
                              className={`border-l-4 cursor-pointer hover:bg-gray-50 ${
                                message.unread ? 'border-blue-500 bg-blue-50' : 'border-transparent'
                              } ${selectedMessage === message.id ? 'bg-gray-100' : ''}`}
                            >
                              <ListItemAvatar>
                                <Avatar src={message.avatar} alt={message.from}>
                                  {message.type === 'group' ? <Group /> : <Person />}
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={
                                  <Box className="flex items-center justify-between">
                                    <Typography
                                      variant="body2"
                                      className={`font-medium ${message.unread ? 'font-bold' : ''}`}
                                    >
                                      {message.from}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                      {formatTimestamp(message.timestamp)}
                                    </Typography>
                                  </Box>
                                }
                                secondary={
                                  <Box>
                                    <Typography
                                      variant="body2"
                                      className={`${message.unread ? 'font-medium' : ''}`}
                                      noWrap
                                    >
                                      {message.subject}
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                      className="block mt-1"
                                      noWrap
                                    >
                                      {message.preview}
                                    </Typography>
                                    {message.project && (
                                      <Chip
                                        label={message.project}
                                        size="small"
                                        variant="outlined"
                                        className="mt-1"
                                      />
                                    )}
                                  </Box>
                                }
                              />
                            </ListItem>
                            <Divider />
                          </motion.div>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </div>

                {/* Message View */}
                <div className="lg:col-span-2">
                  <Card className="h-full">
                    <CardContent className="h-full flex flex-col">
                      {selectedMessage ? (
                        <>
                          {/* Message Header */}
                          <Box className="border-b pb-4 mb-4">
                            <Box className="flex items-center justify-between">
                              <Box className="flex items-center gap-3">
                                <Avatar src="/api/placeholder/40/40" />
                                <Box>
                                  <Typography variant="h6" className="font-semibold">
                                    Safety Update - Downtown Plaza
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    From: Jane Smith • 2 min ago
                                  </Typography>
                                </Box>
                              </Box>
                              <Button variant="outlined" size="small">
                                <MoreVert />
                              </Button>
                            </Box>
                          </Box>

                          {/* Message Content */}
                          <Box className="flex-1 mb-4">
                            <Typography variant="body1" className="mb-4">
                              Hi team,
                            </Typography>
                            <Typography variant="body1" className="mb-4">
                              I wanted to update everyone on the new safety protocols that have been implemented 
                              for the Downtown Plaza project. Following our recent safety audit, we've made several 
                              important changes to ensure the wellbeing of all workers on site.
                            </Typography>
                            <Typography variant="body1" className="mb-4">
                              Key updates include:
                            </Typography>
                            <ul className="list-disc ml-6 mb-4">
                              <li>Mandatory hard hat inspections every morning</li>
                              <li>New fall protection equipment for all workers above 6 feet</li>
                              <li>Enhanced safety briefings at the start of each shift</li>
                              <li>Weekly safety walks with the project manager</li>
                            </ul>
                            <Typography variant="body1" className="mb-4">
                              Please review the attached updated safety manual and ensure all team members 
                              are aware of these changes. If you have any questions, don't hesitate to reach out.
                            </Typography>
                            <Typography variant="body1">
                              Best regards,<br />
                              Jane Smith<br />
                              Safety Officer
                            </Typography>
                          </Box>

                          {/* Reply Section */}
                          <Box className="border-t pt-4">
                            <TextField
                              fullWidth
                              multiline
                              rows={3}
                              placeholder="Type your reply..."
                              variant="outlined"
                              className="mb-3"
                            />
                            <Box className="flex justify-between items-center">
                              <Button
                                variant="outlined"
                                startIcon={<AttachFile />}
                                size="small"
                              >
                                Attach File
                              </Button>
                              <Button
                                variant="contained"
                                endIcon={<Send />}
                                className="bg-gradient-to-r from-blue-600 to-blue-700"
                              >
                                Send Reply
                              </Button>
                            </Box>
                          </Box>
                        </>
                      ) : (
                        <Box className="flex-1 flex items-center justify-center">
                          <Box className="text-center">
                            <Typography variant="h6" color="text.secondary" className="mb-2">
                              Select a message to view
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Choose a message from the list to read and reply
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </AnimatedContainer>

            {/* Floating Action Button */}
            <motion.div
              className="fixed bottom-8 right-8 z-50"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
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

export default Messages;
