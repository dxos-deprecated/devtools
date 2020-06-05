/* global chrome */

import Bridge from 'crx-bridge';

import { initDevTool } from '@dxos/devtools';

Bridge.setNamespace('dxos.devtools');
Bridge.allowWindowMessaging('dxos.devtools');

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

initDevTool({
  connect (onConnect) {
    injectScript(chrome.runtime.getURL('devtools-client-api.js'), () => {
      const bridge = {
        async send (message, payload = {}) {
          return Bridge.sendMessage(message, payload, 'window');
        },
        listen (message, fn) {
          Bridge.onMessage(message, fn);
        }
      };

      onConnect(bridge);
    });
  },

  tabId,

  onReload (reloadFn) {
    chrome.devtools.network.onNavigated.addListener(reloadFn);
  }
});
