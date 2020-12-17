//
// Copyright 2020 DXOS.org
//

import Bridge, { Stream } from 'crx-bridge';

import { DevtoolsContext } from '@dxos/client/dist/src/devtools-context';

async function subscribeToNetworkStatus (hook: DevtoolsContext, stream: Stream) {
  async function update () {
    try {
      stream.send(hook.networkManager.signal.getStatus());
    } catch (err) {
      console.error('DXOS DevTools: Network status update error');
      console.error(err);
    }
  }
  try {
    hook.networkManager.signal.statusChanged.on(update);
    await update();
  } catch (e) {
    console.error('DXOS DevTools: Network handler failed to subscribe.');
    console.error(e);
  }
}

// async function subscribeToNetworkTopics (hook: DevtoolsContext, stream: Stream) {
//   async function update () {
//     try {
//       const res = await getData(client);
//       console.log(res);
//       stream.send(res);
//     } catch (err) {
//       console.error('DXOS DevTools: Snapshots update error');
//       console.error(err);
//     }
//   }

//   try {
//     await hook.client.initialize();
//     const unsubscribe = hook.networkManager.subscribe(() => {
//       update();
//     });

//     stream.onClose(() => {
//       unsubscribe();
//     });

//     update();
//   } catch (e) {
//     console.error('DXOS DevTools: Network handler failed to subscribe.');
//     console.error(e);
//   }
// }

export default ({ hook, bridge }: {hook: DevtoolsContext, bridge: typeof Bridge }) => {
  // bridge.onOpenStreamChannel('network.topics', (stream) => {
  //   subscribeToNetworkTopics(hook, stream);
  // });

  bridge.onOpenStreamChannel('network.signal.status', (stream) => {
    subscribeToNetworkStatus(hook, stream);
  });
};
