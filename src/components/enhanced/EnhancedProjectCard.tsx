import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Avatar,
  AvatarGroup,
  LinearProgress,
  IconButton,
  Tooltip,
  Box,
  Badge,
  Fab,
} from '@mui/material';
import {
  LocationOn,
  Group,
  Visibility,
  Warning,
  TrendingUp,
  PhotoCamera,
  Schedule,
  MoreVert,
  PlayArrow,
} from '@mui/icons-material';
import { HoverScale, AnimatedProgressBar } from '../animations/MotionComponents';
import { SpringNumberCounter } from '../animations/SpringComponents';

interface EnhancedProjectCardProps {
  id: string;
  name: string;
  location: string;
  progress: number;
  status: 'on-track' | 'delayed' | 'ahead';
  lastUpdate: string;
  teamSize: number;
  imageUrl: string;
  totalImages: number;
  alerts?: number;
  teamMembers?: { name: string; avatar: string }[];
  budget?: number;
  budgetUsed?: number;
  startDate?: string;
  endDate?: string;
}

export const EnhancedProjectCard = ({
  id,
  name,
  location,
  progress,
  status,
  lastUpdate,
  teamSize,
  imageUrl,
  totalImages,
  alerts = 0,
  teamMembers = [],
  budget = 0,
  budgetUsed = 0,
  startDate,
  endDate,
}: EnhancedProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'success';
      case 'delayed': return 'error';
      case 'ahead': return 'primary';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'on-track': return 'On Track';
      case 'delayed': return 'Delayed';
      case 'ahead': return 'Ahead';
      default: return 'Unknown';
    }
  };

  const budgetPercentage = budget > 0 ? (budgetUsed / budget) * 100 : 0;

  return (
    <HoverScale scale={1.02} duration={0.3}>
      <Card
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 3,
          background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
          border: '1px solid',
          borderColor: 'rgba(28, 73, 128, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            borderColor: 'primary.main',
            boxShadow: '0 8px 32px -8px rgba(28, 73, 128, 0.3)',
          },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Hero Image Section */}
        <Box sx={{ position: 'relative', height: 200, overflow: 'hidden' }}>
          <motion.img
            src={imageUrl}
            alt={name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ 
              scale: imageLoaded ? (isHovered ? 1.05 : 1) : 1.1,
              opacity: imageLoaded ? 1 : 0,
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Gradient Overlay */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
            }}
          />

          {/* Status Chip */}
          <Chip
            label={getStatusText(status)}
            color={getStatusColor(status) as any}
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              fontWeight: 600,
              backdropFilter: 'blur(8px)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            }}
          />

          {/* Alerts Badge */}
          {alerts > 0 && (
            <Badge
              badgeContent={alerts}
              color="warning"
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                '& .MuiBadge-badge': {
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  fontWeight: 600,
                },
              }}
            >
              <Warning sx={{ color: '#f59e0b' }} />
            </Badge>
          )}

          {/* Image Count */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 12,
              right: 12,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              fontSize: '0.75rem',
              fontWeight: 500,
            }}
          >
            <PhotoCamera sx={{ fontSize: 14 }} />
            <SpringNumberCounter value={totalImages} duration={1500} />
          </Box>

          {/* Play Button Overlay */}
          <motion.div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.3 }}
          >
            <Fab
              size="medium"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                },
              }}
            >
              <PlayArrow sx={{ color: 'primary.main' }} />
            </Fab>
          </motion.div>
        </Box>

        {/* Content */}
        <CardContent sx={{ p: 3 }}>
          {/* Project Header */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 0.5 }}>
              {name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
              <LocationOn sx={{ fontSize: 16, mr: 0.5 }} />
              <Typography variant="body2">{location}</Typography>
            </Box>
          </Box>

          {/* Progress Section */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Progress
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                <SpringNumberCounter value={progress} suffix="%" duration={2000} />
              </Typography>
            </Box>
            <AnimatedProgressBar
              progress={progress}
              height={6}
              color="#1c4980"
              className="rounded-full"
            />
          </Box>

          {/* Team Section */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 28, height: 28, fontSize: '0.75rem' } }}>
                {teamMembers.slice(0, 4).map((member, index) => (
                  <Tooltip key={index} title={member.name} arrow>
                    <Avatar src={member.avatar} alt={member.name} />
                  </Tooltip>
                ))}
              </AvatarGroup>
              <Typography variant="body2" sx={{ color: 'text.secondary', ml: 1 }}>
                <SpringNumberCounter value={teamSize} duration={1500} /> members
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
              <Schedule sx={{ fontSize: 16, mr: 0.5 }} />
              <Typography variant="body2">{lastUpdate}</Typography>
            </Box>
          </Box>

          {/* Budget Progress (if available) */}
          {budget > 0 && (
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Budget Used
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  ${budgetUsed.toLocaleString()} / ${budget.toLocaleString()}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={budgetPercentage}
                sx={{
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 2,
                    backgroundColor: budgetPercentage > 90 ? '#dc2626' : budgetPercentage > 75 ? '#f59e0b' : '#059669',
                  },
                }}
              />
            </Box>
          )}
        </CardContent>

        {/* Actions */}
        <CardActions sx={{ px: 3, pb: 3, pt: 0, justifyContent: 'space-between' }}>
          <motion.button
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium flex-1 mr-2"
            whileHover={{ scale: 1.02, boxShadow: '0 4px 16px -4px rgba(28, 73, 128, 0.3)' }}
            whileTap={{ scale: 0.98 }}
          >
            View Details
          </motion.button>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="View Gallery" arrow>
              <IconButton size="small" sx={{ border: '1px solid', borderColor: 'divider' }}>
                <Visibility fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="More Options" arrow>
              <IconButton size="small" sx={{ border: '1px solid', borderColor: 'divider' }}>
                <MoreVert fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </CardActions>

        {/* Trend Indicator */}
        <motion.div
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            backgroundColor: status === 'ahead' ? '#10b981' : status === 'on-track' ? '#3b82f6' : '#ef4444',
            borderRadius: '50%',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
        >
          <TrendingUp sx={{ fontSize: 16, color: 'white' }} />
        </motion.div>
      </Card>
    </HoverScale>
  );
};
