import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles'
import './App.css';
import Routes from './routes'
import { blue, indigo } from '@material-ui/core/colors'

import GlobalMessage from './components/GlobalMessage'

const theme = createMuiTheme({
  root: {
    backgroundColor: '#ffffff',
    height: "100%"
  },
  palette: {
    secondary: {
      main: blue[900]
    },
    primary: {
      main: indigo[700]
    },
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Lato"',
      'sans-serif'
    ].join(','),
  }
});


class App extends Component {
  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <GlobalMessage />
          <Routes />
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
