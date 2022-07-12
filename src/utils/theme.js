import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    background: {
      default: "#262421"
    },
    primary: {
      main: '#ffffffa6',
    },
    action: {
      disabled: '#504f4f'
    },
    text: {
      primary: '#ffffffa6'
    }
  },
});

export default theme;
