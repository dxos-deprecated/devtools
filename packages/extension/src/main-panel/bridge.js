//
// Copyright 2020 DXOS.org.
//

import EventEmitter from 'events';
import Bridge from 'crx-bridge';

Bridge.setNamespace('dxos.devtools');
Bridge.allowWindowMessaging('dxos.devtools');

export default class BridgeProxy extends EventEmitter {
  constructor () {
    super();
    this._init();
  }

  _init () {
    Bridge.onMessage('api.ready', () => {
      this.emit('api', true);
    });

    Bridge.onMessage('api.timeout', () => {
      this.emit('api', false);
    });
  }

  async send (message, payload = {}) {
    return Bridge.sendMessage(message, payload, 'window');
  }

  listen (message, fn) {
    Bridge.onMessage(message, fn);
  }
}
