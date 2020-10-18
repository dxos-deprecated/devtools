//
// Copyright 2020 DXOS.org
//

const feedListeners = new Map();

export default ({ hook, bridge }) => {
  const messagesHandler = senderName => model => {
    const data = model ? [
      ...model.messages
        .map(({ key, seq, data }) => ({ key: key.toString('hex'), seq, data }))]
      : [];
    bridge.sendMessage('feed.data', data, senderName);
  };

  bridge.onMessage('feed.subscribe', async ({ sender, data: { topic, type = '' } }) => {
    const handler = messagesHandler(sender.name);

    const model = await hook.client.modelFactory
      .createModel(undefined, {
        subscriptionOptions: { feedLevelIndexInfo: true },
        topic,
        type
      });

    model.on('update', handler);

    const listenerKey = Date.now();

    feedListeners.set(listenerKey, () => {
      model.off('update', handler);
      model.destroy();
    });

    return listenerKey;
  });

  bridge.onMessage('feed.unsubscribe', async ({ data: { key } }) => {
    const removeListener = feedListeners.get(key);
    if (removeListener) {
      removeListener();
    }
  });
};
