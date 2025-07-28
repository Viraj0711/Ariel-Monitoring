import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Avatar,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Remove,
  MoreVert,
  Assessment,
  Speed,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { AnimatedContainer, CountUp } from '../animations/MotionComponents';
import { SpringNumberCounter, WaveProgress } from '../animations/SpringComponents';

interface StatData {
  title: string;
  value: number;
  change: number;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ElementType;
  description?: string;
  trend?: { period: string; data: number[] };
  color?: string;
}

interface EnhancedStatsDashboardProps {
  stats: StatData[];
}

const mockTrendData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 700 },
  { name: 'Jun', value: 900 },
];

export const EnhancedStatsDashboard = ({ stats }: EnhancedStatsDashboardProps) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const getChangeIcon = (type: string) => {
    switch (type) {
      case 'positive': return <TrendingUp sx={{ fontSize: 16, color: '#10b981' }} />;
      case 'negative': return <TrendingDown sx={{ fontSize: 16, color: '#ef4444' }} />;
      default: return <Remove sx={{ fontSize: 16, color: '#6b7280' }} />;
    }
  };

  const getChangeColor = (type: string) => {
    switch (type) {
      case 'positive': return '#10b981';
      case 'negative': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index}>
          <AnimatedContainer delay={index * 0.1} direction="up">
            <motion.div
              whileHover={{ 
                y: -4,
                transition: { duration: 0.2, ease: 'easeOut' }
              }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <Card
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${stat.color || '#ffffff'} 0%, rgba(255,255,255,0.9) 100%)`,
                  border: '1px solid',
                  borderColor: 'rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: '0 8px 32px -8px rgba(28, 73, 128, 0.3)',
                  },
                }}
              >
                {/* Background Pattern */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '60%',
                    height: '100%',
                    background: `radial-gradient(circle at 80% 20%, ${stat.color || 'rgba(59, 130, 246, 0.1)'} 0%, transparent 70%)`,
                    opacity: 0.3,
                  }}
                />

                <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
                  {/* Header */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        sx={{
                          backgroundColor: `${stat.color || '#3b82f6'}20`,
                          color: stat.color || '#3b82f6',
                          width: 48,
                          height: 48,
                        }}
                      >
                        <stat.icon />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                          {stat.title}
                        </Typography>
                        {stat.description && (
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {stat.description}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    
                    <Tooltip title="More options" arrow>
                      <IconButton size="small" sx={{ opacity: 0.6 }}>
                        <MoreVert fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>

                  {/* Main Value */}
                  <Box sx={{ mb: 2 }}>
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        fontWeight: 700, 
                        color: 'text.primary',
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: 1,
                      }}
                    >
                      <SpringNumberCounter 
                        value={stat.value} 
                        duration={2000} 
                        className="text-2xl font-bold"
                      />
                      {typeof stat.value === 'number' && stat.value > 1000 && (
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {stat.value > 1000000 ? 'M' : 'K'}
                        </Typography>
                      )}
                    </Typography>
                  </Box>

                  {/* Change Indicator */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Chip
                      icon={getChangeIcon(stat.changeType)}
                      label={`${stat.change > 0 ? '+' : ''}${stat.change}%`}
                      size="small"
                      sx={{
                        backgroundColor: `${getChangeColor(stat.changeType)}20`,
                        color: getChangeColor(stat.changeType),
                        fontWeight: 600,
                        '& .MuiChip-icon': {
                          color: getChangeColor(stat.changeType),
                        },
                      }}
                    />
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      vs last month
                    </Typography>
                  </Box>

                  {/* Progress Wave */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hoveredCard === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <WaveProgress
                      progress={Math.abs(stat.change) * 2}
                      height={24}
                      color={getChangeColor(stat.changeType)}
                      className="rounded-lg"
                    />
                  </motion.div>

                  {/* Mini Chart */}
                  {stat.trend && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ 
                        opacity: hoveredCard === index ? 1 : 0,
                        height: hoveredCard === index ? 60 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      style={{ marginTop: 16 }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={mockTrendData}>
                          <defs>
                            <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={stat.color || '#3b82f6'} stopOpacity={0.3}/>
                              <stop offset="95%" stopColor={stat.color || '#3b82f6'} stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke={stat.color || '#3b82f6'}
                            strokeWidth={2}
                            fill={`url(#gradient-${index})`}
                            dot={false}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </motion.div>
                  )}

                  {/* Performance Indicator */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCard === index ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                      <Speed sx={{ fontSize: 14, color: 'text.secondary' }} />
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Performance: {stat.changeType === 'positive' ? 'Excellent' : stat.changeType === 'negative' ? 'Needs Attention' : 'Stable'}
                      </Typography>
                    </Box>
                  </motion.div>
                </CardContent>

                {/* Animated Border */}
                <motion.div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: `linear-gradient(90deg, ${stat.color || '#3b82f6'}, transparent)`,
                    originX: 0,
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredCard === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Card>
            </motion.div>
          </AnimatedContainer>
        </div>
      ))}
    </div>
  );
};
