//
// Copyright 2020 DxOS.
//

/* global chrome */

// import Bridge from 'crx-bridge';
import { initDevTool } from '@dxos/devtools';
import BridgeProxy from './bridge';

// Bridge.setNamespace('dxos.devtools');
// Bridge.allowWindowMessaging('dxos.devtools');

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
    // const bridge = {
    //   async send (message, payload = {}) {
    //     return Bridge.sendMessage(message, payload, 'window');
    //   },

    //   listen (message, fn) {
    //     Bridge.onMessage(message, fn);
    //   },

    //   _state: undefined,

    //   ready(value) {
    //     this._ready = value;
    //     if (this._readyCb) this._readyCb(value);
    //   },

    //   onReady(cb) {
    //     if(this._ready !== undefined) cb(this._ready);
    //     this._readyCb = cb;
    //   }
    // };
    const bridge = new BridgeProxy();
    onConnect(bridge);

    // Bridge.onMessage('api.ready', () => {x
    //   bridge.ready(true);
    // });

    // Bridge.onMessage('api.timeout', () => {
    //   bridge.ready(false);
    // });

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
