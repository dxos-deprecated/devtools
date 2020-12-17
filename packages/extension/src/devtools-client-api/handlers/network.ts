//
// Copyright 2020 DXOS.org
//

import Bridge, { Stream } from 'crx-bridge';

import { DevtoolsContext } from '@dxos/client';

async function subscribeToNetworkTopics (hook: DevtoolsContext, stream: Stream) {
  async function update () {
    try {
      const res = await getData(client);
      console.log(res);
      stream.send(res);
    } catch (err) {
      console.error('DXOS DevTools: Snapshots update error');
      console.error(err);
    }
  }

  try {
    await hook.client.initialize();
    const unsubscribe = hook.networkManager..subscribe(() => {
      update();
    });

    stream.onClose(() => {
      unsubscribe();
    });

    update();
  } catch (e) {
    console.error('DXOS DevTools: Network handler failed to subscribe.');
    console.error(e);
  }
}

export default ({ hook, bridge }: {hook: DevtoolsContext, bridge: typeof Bridge }) => {
  bridge.onOpenStreamChannel('network.topics', (stream) => {
    subscribeToNetworkTopics(hook, stream);
  });
};
