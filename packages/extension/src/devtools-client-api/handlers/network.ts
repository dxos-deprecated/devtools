//
// Copyright 2020 DXOS.org
//

import Bridge, { Stream } from 'crx-bridge';

import { DevtoolsContext } from '@dxos/client/dist/src/devtools-context';
import { SignalApi } from '@dxos/network-manager'

async function subscribeToNetworkStatus (hook: DevtoolsContext, stream: Stream) {
  async function update () {
    const status = hook.networkManager.signal.getStatus();
    console.log('status in update:', status);
    stream.send(status);
  }

  console.log('network subscribing to status changed events');
  hook.networkManager.signal.statusChanged.on(reportError(update));
  await update();
}

async function subscribeToNetworkTrace(hook: DevtoolsContext, stream: Stream) {
  const trace: SignalApi.CommandTrace[] = [];
  hook.networkManager.signal.commandTrace.on(msg => {
    reportError(() => {
      trace.push(msg);
      stream.send(trace);
    })();
  });
}

export default ({ hook, bridge }: {hook: DevtoolsContext, bridge: typeof Bridge }) => {
  bridge.onOpenStreamChannel('network.signal.status', (stream) => {
    reportError(subscribeToNetworkStatus)(hook, stream);
  });
  bridge.onOpenStreamChannel('network.signal.trace', (stream) => {
    reportError(subscribeToNetworkTrace)(hook, stream);
  });
};

function reportError<A extends any[]> (func: (...args: A) => any): (...args: A) => void {
  return async (...args) => {
    try {
      await func(...args);
    } catch (err) {
      console.error('DXOS DevTools API error:');
      console.error(err);
    }
  };
}
