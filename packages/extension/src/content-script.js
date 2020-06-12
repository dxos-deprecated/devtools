//
// Copyright 2020 DxOS.
//

/* global HTMLDocument */

import Bridge from 'crx-bridge';
import { installHook } from './hook';

Bridge.setNamespace('dxos.devtools');
Bridge.allowWindowMessaging('dxos.devtools');

// inject the hook
if (document instanceof HTMLDocument) {
  const script = document.createElement('script');
  script.textContent = `;(${installHook.toString()})(window)`;
  document.documentElement.appendChild(script);
  script.parentNode.removeChild(script);
}
