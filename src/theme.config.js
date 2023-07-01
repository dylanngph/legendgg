import { createTheme } from '@mui/material/styles';

export const themeCustomApp = createTheme({
  typography: {
    fontFamily: [
      'Open Sans',
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
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: '#95008A',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#95008A',
          },
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#95008A',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#95008A',
            },
          },
        }
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        "& $notchedOutline": {
          borderColor: "#95008A"
        },
        "&:hover $notchedOutline": {
          borderColor: "#95008A"
        },
        "&$focused $notchedOutline": {
          borderColor: "#95008A"
        }
      }
    },
  },
});