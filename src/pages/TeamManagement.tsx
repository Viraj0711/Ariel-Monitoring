import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Avatar,
  Chip,
  Box,
  Grid,
} from '@mui/material';
import {
  Edit,
  Delete,
  Group,
  PersonAdd,
  CheckCircle,
  Warning,
  Schedule,
} from '@mui/icons-material';
import { Navigation } from '../components/Navigation';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'pending' | 'inactive';
  projects?: string[];
}

const TeamManagement = () => {
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@company.com',
      role: 'Project Manager',
      department: 'Construction',
      status: 'active',
      projects: ['Tech Campus', 'Shopping Mall', 'Residential Complex']
    },
    {
      id: '2',
      name: 'Emily Davis',
      email: 'emily@company.com',
      role: 'Site Engineer',
      department: 'Engineering',
      status: 'active',
      projects: ['Tech Campus', 'Shopping Mall']
    },
    {
      id: '3',
      name: 'Michael Johnson',
      email: 'michael@company.com',
      role: 'Architect',
      department: 'Design',
      status: 'active',
      projects: ['Tech Campus', 'Shopping Mall']
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah@company.com',
      role: 'Safety Officer',
      department: 'Safety',
      status: 'pending',
      projects: ['Residential Complex']
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
            Team Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your construction team members, roles, and permissions
          </Typography>
        </Box>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              height: '120px',
              display: 'flex',
              alignItems: 'center',
              boxShadow: 3 
            }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Group sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {teamMembers.length}
                  </Typography>
                  <Typography variant="body2">
                    Total Members
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              height: '120px',
              display: 'flex',
              alignItems: 'center',
              boxShadow: 3 
            }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <CheckCircle sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {teamMembers.filter(m => m.status === 'active').length}
                  </Typography>
                  <Typography variant="body2">
                    Active Members
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: 'white',
              height: '120px',
              display: 'flex',
              alignItems: 'center',
              boxShadow: 3 
            }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Warning sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {teamMembers.filter(m => m.status === 'pending').length}
                  </Typography>
                  <Typography variant="body2">
                    Pending
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
              color: 'white',
              height: '120px',
              display: 'flex',
              alignItems: 'center',
              boxShadow: 3 
            }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Schedule sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {teamMembers.filter(m => m.status === 'inactive').length}
                  </Typography>
                  <Typography variant="body2">
                    Inactive
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Team Members Table */}
        <Card sx={{ boxShadow: 3 }}>
          <CardContent>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: 3,
              flexWrap: 'wrap',
              gap: 2
            }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Team Members
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage your construction team and their permissions
                </Typography>
              </Box>
              <Button
                variant="contained"
                startIcon={<PersonAdd />}
                sx={{ 
                  bgcolor: 'primary.main',
                  '&:hover': { bgcolor: 'primary.dark' }
                }}
              >
                Add Member
              </Button>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.100' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>Member</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Role & Department</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Projects</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            {member.name.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'medium' }}>
                              {member.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {member.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                            {member.role}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {member.department}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {member.projects?.slice(0, 2).map((project, index) => (
                            <Chip 
                              key={index}
                              label={project} 
                              size="small" 
                              variant="outlined"
                            />
                          ))}
                          {member.projects && member.projects.length > 2 && (
                            <Chip 
                              label={`+${member.projects.length - 2} more`} 
                              size="small" 
                              variant="outlined"
                            />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={member.status}
                          color={
                            member.status === 'active' ? 'success' :
                            member.status === 'pending' ? 'warning' : 'error'
                          }
                          size="small"
                          sx={{ textTransform: 'capitalize' }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton size="small" color="primary">
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton size="small" color="error">
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default TeamManagement;
