//
// Copyright 2020 DXOS.org.
//

/* global chrome */

import { initDevTool } from '@dxos/devtools';
import BridgeProxy from './bridge';

const { tabId } = chrome.devtools.inspectedWindow;

function injectScript (scriptName, cb) {
  const src = `
    (function() {
      var script = document.constructor.prototype.createElement.call(document, 'script');
      script.src = "${scriptName}";
      document.documentElement.appendChild(script);
      script.parentNode.removeChild(script);
    })()
  `;
  chrome.devtools.inspectedWindow.eval(src, (res, err) => {
    if (err) console.log(err);
    cb(res);
  });
}

let injected = false;

initDevTool({
  connect (onConnect) {
    const bridge = new BridgeProxy();
    onConnect(bridge);

    if (!injected) {
      injectScript(chrome.runtime.getURL('devtools-client-api.js'), () => {
        injected = true;
      });
    }
  },

  tabId,

  onReload (reloadFn) {
    chrome.devtools.network.onNavigated.addListener(reloadFn);
  }
});
