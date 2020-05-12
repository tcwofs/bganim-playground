import { MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { Router } from '../components';
import darkTheme from '../theme';

const App = () => {
  return (
    <MuiThemeProvider theme={darkTheme}>
      <Router />
    </MuiThemeProvider>
  );
};

export default App;
