//
// Copyright 2020 DXOS.org
//

import Bridge, { Stream } from 'crx-bridge';

import { DevtoolsContext } from '@dxos/client/dist/src/devtools-context';

async function subscribeToNetworkStatus (hook: DevtoolsContext, stream: Stream) {
  async function update () {
    try {
      const status = hook.networkManager.signal.getStatus();
      console.log('status in update:', status);
      stream.send(status);
    } catch (err) {
      console.error('DXOS DevTools: Network status update error');
      console.error(err);
    }
  }
  try {
    console.log('network subscribing to status changed events');
    hook.networkManager.signal.statusChanged.on(update);
    await update();
  } catch (e) {
    console.error('DXOS DevTools: Network handler failed to subscribe.');
    console.error(e);
  }
}

export default ({ hook, bridge }: {hook: DevtoolsContext, bridge: typeof Bridge }) => {
  bridge.onOpenStreamChannel('network.signal.status', (stream) => {
    subscribeToNetworkStatus(hook, stream);
  });
};
