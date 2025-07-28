import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  IconButton,
  Alert,
} from '@mui/material';
import {
  CloudUpload,
  Close,
  CheckCircle,
  Error,
  Info,
  Image as ImageIcon,
  Folder,
  CameraAlt,
} from '@mui/icons-material';
import { muiTheme } from '@/theme/muiTheme';
import { Navigation } from '@/components/Navigation';
import {
  AnimatedContainer,
  HoverScale,
  PageTransition,
} from '@/components/animations/MotionComponents';
import { BouncyButton, SpringContainer } from '@/components/animations/SpringComponents';

interface UploadFile {
  id: string;
  file: File;
  preview: string;
  status: 'uploading' | 'completed' | 'error';
  progress: number;
  project?: string;
}

const ImageUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const projects = [
    'Skyline Tower Complex',
    'Metro Business Center', 
    'Residential Plaza',
    'Downtown Office Hub'
  ];

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const newFile: UploadFile = {
          id: Math.random().toString(36).substr(2, 9),
          file,
          preview: URL.createObjectURL(file),
          status: 'uploading',
          progress: 0,
        };

        setUploadedFiles(prev => [...prev, newFile]);

        // Simulate upload progress
        const interval = setInterval(() => {
          setUploadedFiles(prev => prev.map(f => {
            if (f.id === newFile.id) {
              const newProgress = f.progress + Math.random() * 30;
              if (newProgress >= 100) {
                clearInterval(interval);
                return { ...f, progress: 100, status: 'completed' };
              }
              return { ...f, progress: newProgress };
            }
            return f;
          }));
        }, 500);
      }
    });
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const assignToProject = (fileId: string, project: string) => {
    setUploadedFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, project } : f
    ));
  };

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
                    Upload Aerial Images
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Upload and manage aerial images for your construction projects
                  </Typography>
                </Box>
                <Box className="flex items-center space-x-3">
                  <BouncyButton 
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Folder fontSize="small" />
                    Bulk Upload
                  </BouncyButton>
                </Box>
              </Box>
            </AnimatedContainer>

            {/* Upload Area */}
            <AnimatedContainer delay={0.1} direction="up">
              <Card className="border-2 border-dashed border-gray-300 bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardContent className="p-8">
                  <motion.div
                    className={`relative transition-all duration-300 ${
                      isDragging ? 'scale-105 bg-blue-100' : ''
                    }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                  >
                    <div className="text-center">
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <CloudUpload className="mx-auto h-16 w-16 text-blue-500 mb-4" />
                      </motion.div>
                      <Typography variant="h5" className="mb-2 font-semibold">
                        Drag & Drop Images Here
                      </Typography>
                      <Typography variant="body1" color="text.secondary" className="mb-4">
                        Or click to browse your files
                      </Typography>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleFileSelect(e.target.files)}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload">
                        <Button
                          variant="contained"
                          component="span"
                          startIcon={<ImageIcon />}
                          size="large"
                          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                        >
                          Select Images
                        </Button>
                      </label>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </AnimatedContainer>

            {/* Upload Stats */}
            <AnimatedContainer delay={0.2} direction="up">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: 'Total Uploaded', value: uploadedFiles.length, color: '#3b82f6' },
                  { label: 'Completed', value: uploadedFiles.filter(f => f.status === 'completed').length, color: '#10b981' },
                  { label: 'In Progress', value: uploadedFiles.filter(f => f.status === 'uploading').length, color: '#f59e0b' },
                  { label: 'Failed', value: uploadedFiles.filter(f => f.status === 'error').length, color: '#ef4444' },
                ].map((stat, index) => (
                  <SpringContainer key={index} delay={index * 0.1}>
                    <Card className="text-center p-4 bg-gradient-to-br from-white to-gray-50">
                      <CardContent>
                        <Typography variant="h4" className="font-bold mb-2" style={{ color: stat.color }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {stat.label}
                        </Typography>
                      </CardContent>
                    </Card>
                  </SpringContainer>
                ))}
              </div>
            </AnimatedContainer>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <AnimatedContainer delay={0.3} direction="up">
                <Typography variant="h5" className="font-semibold mb-4">
                  Uploaded Images ({uploadedFiles.length})
                </Typography>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {uploadedFiles.map((uploadFile, index) => (
                    <motion.div
                      key={uploadFile.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                        <Card className="overflow-hidden">
                          <Box className="relative">
                            <img
                              src={uploadFile.preview}
                              alt={uploadFile.file.name}
                              className="w-full h-48 object-cover"
                            />
                            <IconButton
                              onClick={() => removeFile(uploadFile.id)}
                              className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                              size="small"
                            >
                              <Close fontSize="small" />
                            </IconButton>
                            {uploadFile.status === 'completed' && (
                              <Box className="absolute top-2 left-2">
                                <CheckCircle className="text-green-500 bg-white rounded-full" />
                              </Box>
                            )}
                          </Box>
                          <CardContent>
                            <Typography variant="body2" className="font-medium mb-2 truncate">
                              {uploadFile.file.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" className="block mb-2">
                              {(uploadFile.file.size / 1024 / 1024).toFixed(2)} MB
                            </Typography>

                            {uploadFile.status === 'uploading' && (
                              <Box className="mb-3">
                                <Box className="flex justify-between items-center mb-1">
                                  <Typography variant="caption">Uploading...</Typography>
                                  <Typography variant="caption">{Math.round(uploadFile.progress)}%</Typography>
                                </Box>
                                <LinearProgress 
                                  variant="determinate" 
                                  value={uploadFile.progress}
                                  className="rounded-full"
                                />
                              </Box>
                            )}

                            {uploadFile.status === 'completed' && !uploadFile.project && (
                              <Box className="space-y-2">
                                <Typography variant="caption" className="block">
                                  Assign to Project:
                                </Typography>
                                <div className="flex flex-wrap gap-1">
                                  {projects.map((project) => (
                                    <Chip
                                      key={project}
                                      label={project}
                                      size="small"
                                      clickable
                                      onClick={() => assignToProject(uploadFile.id, project)}
                                      className="text-xs"
                                    />
                                  ))}
                                </div>
                              </Box>
                            )}

                            {uploadFile.project && (
                              <Chip
                                label={uploadFile.project}
                                color="primary"
                                size="small"
                                icon={<CheckCircle />}
                              />
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                  ))}
                </div>
              </AnimatedContainer>
            )}

            {/* Tips */}
            <AnimatedContainer delay={0.4} direction="up">
              <Alert severity="info" className="bg-blue-50 border-blue-200">
                <Typography variant="body2">
                  <strong>Pro Tips:</strong> For best results, upload high-resolution images (minimum 1920x1080). 
                  Supported formats: JPG, PNG, WEBP. Maximum file size: 50MB per image.
                </Typography>
              </Alert>
            </AnimatedContainer>
          </Container>
        </div>
      </PageTransition>
    </ThemeProvider>
  );
};

export default ImageUpload;
