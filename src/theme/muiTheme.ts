import { createTheme } from '@mui/material/styles';

// Create MUI theme that integrates with our design system
export const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#1c4980', // hsl(209 95% 20%)
      light: '#3b82f6', // hsl(209 95% 35%)
      dark: '#0f172a',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f97316', // hsl(24 95% 53%)
      light: '#fb923c', // hsl(24 95% 65%)
      dark: '#ea580c',
      contrastText: '#ffffff',
    },
    success: {
      main: '#059669', // hsl(142 71% 45%)
      light: '#10b981',
      dark: '#047857',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#d97706', // hsl(45 93% 47%)
      light: '#f59e0b',
      dark: '#b45309',
      contrastText: '#ffffff',
    },
    error: {
      main: '#dc2626', // hsl(0 84% 60%)
      light: '#ef4444',
      dark: '#b91c1c',
      contrastText: '#ffffff',
    },
    background: {
      default: '#fafafa', // hsl(0 0% 98%)
      paper: '#ffffff',
    },
    text: {
      primary: '#334155', // hsl(215 25% 27%)
      secondary: '#64748b', // hsl(215 16% 47%)
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 2px 8px -2px rgba(28, 73, 128, 0.1)',
    '0 4px 16px -4px rgba(28, 73, 128, 0.15)',
    '0 8px 32px -8px rgba(28, 73, 128, 0.2)',
    '0 8px 32px -8px rgba(28, 73, 128, 0.2)',
    '0 8px 32px -8px rgba(28, 73, 128, 0.2)',
    '0 8px 32px -8px rgba(28, 73, 128, 0.2)',
    '0 8px 32px -8px rgba(28, 73, 128, 0.2)',
    '0 8px 32px -8px rgba(28, 73, 128, 0.2)',
    '0 8px 32px -8px rgba(28, 73, 128, 0.2)',
    '0 8px 32px -8px rgba(28, 73, 128, 0.2)',
    '0 8px 32px -8px rgba(28, 73, 128, 0.2)',
    '0 8px 32px -8px rgba(28, 73, 128, 0.2)',
    '0 8px 32px -8px rgba(28, 73, 128, 0.2)',
    '0 8px 32px -8px rgba(28, 73, 128, 0.2)',
    '0 8px 32px -8px rgba(28, 73, 128, 0.2)',
    '0 8px 32px -8px rgba(28, 73, 128, 0.2)',
    '0 8px 32px -8px rgba(28, 73, 128, 0.2)',
    '0 8px 32px -8px rgba(28, 73, 128, 0.2)',
    '0 8px 32px -8px rgba(28, 73, 128, 0.2)',
    '0 8px 32px -8px rgba(28, 73, 128, 0.2)',
    '0 8px 32px -8px rgba(28, 73, 128, 0.2)',
    '0 8px 32px -8px rgba(28, 73, 128, 0.2)',
    '0 8px 32px -8px rgba(28, 73, 128, 0.2)',
    '0 8px 32px -8px rgba(28, 73, 128, 0.2)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500,
          boxShadow: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 4px 16px -4px rgba(28, 73, 128, 0.15)',
            transform: 'translateY(-1px)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #1c4980 0%, #f97316 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #0f172a 0%, #ea580c 100%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid rgba(28, 73, 128, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 32px -8px rgba(28, 73, 128, 0.2)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});
