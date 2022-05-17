import { createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

const Theme = createTheme({
  palette: {
    common: {black: '#000', white: '#FFF'},
    primary: {main: '#37A040', light: '#37A040', dark: '#37A040', contrastText: '#FED136'},
    secondary: {main: '#FED136', light: '#FED136', dark: '#FED136', contrastText: '#37A040'},
    text: {primary: '#000', secondary: '#37A040', disabled: grey[500]},
    action: {hover: 'rgba(0,0,0,0)'},
    background: {default: grey[100]}
  },
  shape: {
    borderRadius: 2
  },
  shadows: {
    0: "none"
  },
  typography: {
    fontFamily: "'Lato', 'sans-serif'",
    htmlFontSize: 4,
    fontSize: 4,
    fontWeightLight: 100,
    fontWeightRegular: 400,
    fontWeightMedium: 400,
    fontWeightBold: 900,
    body1: {
      textAlign: 'left',
      fontWeight: 400,
      fontSize: '0.9rem'
    },
    body2: {
      textAlign: 'center',
      fontWeight: 400,
      fontSize: '0.9rem'
    },
    button: {
      textTransform: 'none',
    },
    h1: {
        fontFamily: "'Lato', 'sans-serif'",
        fontWeight: 900,
        fontSize: '3rem',
    },
    h2: {
        fontFamily: "'Lato', 'sans-serif'",
        fontWeight: 900,
        fontSize: '3rem',
    },
    h3: {
        fontFamily: "'Lora', 'serif'",
        fontWeight: 700,
        fontSize: '3rem',
    },
    h4: {
        fontFamily: "'Lora', 'serif'",
        fontSize: '2rem',
    },
    h5: {
      fontSize: '1.5rem',
    },
    h6: {
      fontSize: '1.5rem',
    }
  }
});

export default Theme;