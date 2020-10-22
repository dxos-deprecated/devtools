import { humanize } from '@dxos/crypto';

//
// Copyright 2020 DXOS.org
//

const feedListeners = new Map();

const getItems = (hook) => {
  const parties = hook.client.echo.queryParties().value;
  console.log(parties);

  // TODO(marik-d): Display items hierarhically
  const res = {};
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
};

export default ({ hook, bridge }) => {
  bridge.onMessage('echo.items', () => getItems(hook));

  bridge.onMessage('echo.items.subscribe', async ({ sender }) => {
    const items = [];

    // TODO: subscribe to items
    // const feedDescriptors = hook.client.feedStore.
    // and send: bridge.sendMessage('echo.items.data', items, sender.name);

    const listenerKey = Date.now();

    return listenerKey;
  });

  bridge.onMessage('echo.items.unsubscribe', async ({ data: { key } }) => {
    const removeListener = feedListeners.get(key);
    if (removeListener) {
      removeListener();
    }
  });
};
