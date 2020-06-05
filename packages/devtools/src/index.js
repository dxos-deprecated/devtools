
//
// Copyright 2020 DxOS.
//

import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Provider from './Provider';
import App from './App';

const theme = createMuiTheme({
  typography: {
    fontSize: 10
  },
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true // No more ripple, on the whole application 💣!
    }
  }
});

export const initApp = (shell) => {
  shell.connect(bridge => {
    ReactDOM.render(
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Provider bridge={bridge}>
          <App />
        </Provider>
      </MuiThemeProvider>,
      document.getElementById('root')
    );
  });
};

export const initDevTool = (shell) => {
  initApp(shell);
  shell.onReload(() => {
    window.location.reload();
  });
};
