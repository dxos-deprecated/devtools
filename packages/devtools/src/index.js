//
// Copyright 2020 DXOS.org
//

import React from 'react';
import ReactDOM from 'react-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import App from './App';
import Provider from './Provider';

const theme = createMuiTheme({
  typography: {
    fontSize: 10
  },
  props: {
    MuiButtonBase: {
      disableRipple: true
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
