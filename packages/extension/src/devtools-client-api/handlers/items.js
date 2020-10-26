import { humanize } from '@dxos/crypto';

//
// Copyright 2020 DXOS.org
//

/**
 *
 * @param {ECHO} echo
 */
function getData (echo) {
  // TODO(marik-d): Display items hierarchically
  const res = {};
  const parties = echo.queryParties().value;
  for (const party of parties) {
    const partyInfo = {};
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

export default ({ hook, bridge }) => {
  bridge.onOpenStreamChannel('echo.items', stream => {
    const partySubscriptions = [];

    const unsubscribe = hook.client.echo.queryParties().subscribe(parties => {
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
