import { createTheme } from '@mui/material/styles';

export const themeCustomApp = createTheme({
  palette: {
    secondary: {
      main: "#21242C",
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
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: '3rem',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 'bold',
    },
    h3: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
    },
    h4: {
      fontSize: '1.4rem',
      fontWeight: 'bold',
    },
    h5: {
      fontSize: '1.2rem',
      color: '#ffffff',
    },
    h6: {
      fontSize: '1.1rem',
    },
    body1: {
      color: '#B0AEB5',
    },
    body2: {
      color: '#ffffff',
    }
  },
});