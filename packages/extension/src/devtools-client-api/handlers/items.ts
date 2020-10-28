//
// Copyright 2020 DXOS.org
//

import Bridge from 'crx-bridge';

import { humanize } from '@dxos/crypto';

function getData (echo: any) {
  // TODO(marik-d): Display items hierarchically
  const res: Record<string, any> = {};
  const parties = echo.queryParties().value;
  for (const party of parties) {
    const partyInfo: Record<string, any> = {};
    res[`Party ${humanize(party.key)}`] = partyInfo;

    const items = party.database.queryItems().value;
    for (const item of items) {
      const modelName = Object.getPrototypeOf(item.model).constructor.name;
      partyInfo[`${modelName} ${item.type} ${humanize(item.id)}`] = {
        id: humanize(item.id),
        type: item.type,
        modelType: item.model._meta.type,
        modelName
      };
    }
  }

  return res;
}

export default ({ hook, bridge }: {hook: any, bridge: typeof Bridge }) => {
  bridge.onOpenStreamChannel('echo.items', (stream) => {
    const partySubscriptions: any[] = [];

    const unsubscribe = hook.client.echo.queryParties().subscribe((parties: any) => {
      partySubscriptions.forEach(unsub => unsub());

      for (const party of parties) {
        const sub = party.database.queryItems().subscribe(() => {
          update();
        });
        partySubscriptions.push(sub);
      }
      update();
    });

    function update () {
      try {
        const res = getData(hook.client.echo);
        stream.send(res);
      } catch (err) {
        console.error('update error');
        console.error(err);
      }
    }

    stream.onClose(() => {
      partySubscriptions.forEach(unsub => unsub());
      unsubscribe();
    });

    update();
  });
};
