//
// Copyright 2020 DXOS.org
//

import Bridge from 'crx-bridge';

function getData (client: any) {
  return Promise.all(
    client.echo.queryParties().value.map(async (party: any) => {
      const snapshot = await client._snapshotStore.load(party.key);
      if (!snapshot) {
        return undefined;
      }

      // TODO(marik-d): Send this snapshot protobuf encoded.
      return {
        partyKey: snapshot.partyKey,
        timestamp: snapshot.timestamp,
        halo: snapshot.halo,
        itemCount: snapshot.database.items?.length
      };
    })
  );
}

export default ({ hook, bridge }: {hook: any, bridge: typeof Bridge }) => {
  bridge.onOpenStreamChannel('echo.snapshots', (stream) => {
    const unsubscribe = hook.client.echo.queryParties().subscribe(() => {
      update();
    });

    async function update () {
      try {
        const res = await getData(hook.client);
        console.log(res);
        stream.send(res);
      } catch (err) {
        console.error('update error');
        console.error(err);
      }
    }

    stream.onClose(() => {
      unsubscribe();
    });

    update();
  });
};
