//
// Copyright 2020 DXOS.org
//

import Bridge from 'crx-bridge';
import EventEmitter from 'events';

Bridge.setNamespace('dxos.devtools');
Bridge.allowWindowMessaging('dxos.devtools');

export default class BridgeProxy extends EventEmitter {
  constructor () {
    super();
    this._init();
  }

  _init () {
    Bridge.onMessage('api.ready', () => {
      console.log('api.ready');
      this.emit('api', true);
    });

    Bridge.onMessage('api.timeout', () => {
      this.emit('api', false);
    });
  }

  async injectClientScript () {
    await Bridge.sendMessage('extension.inject-client-script', {}, 'content-script');
  }

  async send (message, payload = {}) {
    return Bridge.sendMessage(message, payload, 'window');
  }

  async openStream (channel) {
    return Bridge.openStream(channel, 'window');
  }

  listen (message, fn) {
    Bridge.onMessage(message, fn);
  }
}
