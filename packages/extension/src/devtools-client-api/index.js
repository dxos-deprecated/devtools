//
// Copyright 2020 DxOS.
//

import Bridge from 'crx-bridge';
import { initDevToolClientApi } from './handlers';

Bridge.setNamespace('dxos.devtools');
Bridge.allowWindowMessaging('dxos.devtools');

// ensure that client is ready before init
let started = false;
let checkCount = 0;

const init = () => {
  if (checkCount++ > 10) {
    if (loadCheckInterval) clearInterval(loadCheckInterval);
    Bridge.sendMessage('api.timeout', {}, 'devtools');
    return;
  }

  if (window.__DXOS_GLOBAL_HOOK__ && !started) {
    started = true;

    initDevToolClientApi({
      hook: window.__DXOS_GLOBAL_HOOK__,
      bridge: Bridge
    });

    if (loadCheckInterval) clearInterval(loadCheckInterval);
    Bridge.sendMessage('api.ready', {}, 'devtools');
  }
};

const loadCheckInterval = setInterval(init, 1000);
init();
