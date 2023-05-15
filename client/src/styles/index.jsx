import { createTheme } from '@mui/material/styles';

export const Colors = {
  primary: '#4153EF',
  secondary: 'rgba(187, 193, 243, 0.7)',
  notActive: 'rgba(53, 59, 110, 0.81)',
  white: '#fff',
  black: '#000',
  inputTextColor: '#717171',
  inputMainText: ' #6B6B6B',
  inputMainColor: '#CCD0F3',
};

const overrides = {
  palette: {
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.secondary,
    },
    third: {
      main: Colors.inputTextColor,
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: Colors.dark,
          color: Colors.dove_gray,
          borderRadius: '0px 10px 10px 0px',
          borderRight: `1px solid ${Colors.primary}`,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderColor: Colors.white,
        },
      },
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
};

const theme = createTheme(overrides);

export { overrides };
export default theme;
