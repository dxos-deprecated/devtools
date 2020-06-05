import Bridge from 'crx-bridge';

Bridge.setNamespace('dxos.devtools');
Bridge.allowWindowMessaging('dxos.devtools');

// ensure that client is ready before init
let started = false;
const init = () => {
  if (window.__DXOS_GLOBAL_HOOK__) {
    started = true;
    const hook = window.__DXOS_GLOBAL_HOOK__;

    // TODO(elmasse): Create handlers and an initDevToolClientApi({hook, bridge}) method?

    // METRICS ++++++++++++++++

    const metricslisteners = new Map();

    const onMetrics = senderName => () => {
      const data =  {
        values: hook.metrics.values,
        events: hook.metrics.events
      };
      Bridge.sendMessage('metrics.data', data, senderName);
    };

    Bridge.onMessage('metrics.listen', ({ sender }) => {
      const metricsHandler = onMetrics(sender.name);
      const handlerOff = hook.metrics.on(null, metricsHandler);
      // send first grab of metrics right away
      metricsHandler();

      const listenerKey = Date.now();
      metricslisteners.set(listenerKey, () => {
        handlerOff();
      });

      return listenerKey;
    });

    Bridge.onMessage('metrics.removeListen', async ({ data: { key } }) => {
      const removeListener = metricslisteners.get(key);
      if (removeListener) {
        removeListener();
      }
    });

    // FEEDSTORE  ++++++++++

    Bridge.onMessage('feedstore.descriptors', () => {
      return hook.client.feedStore
        .getDescriptors()
        .map(({ feed, path, opened, metadata }) => ({ path, opened, metadata, blocks: feed.length }));
    });

    // TOPICS +++++

    Bridge.onMessage('topics', () => {
      return hook.client.feedStore
        .getDescriptors()
        .filter(d => d.opened)
        .map(({ metadata }) => metadata.topic);
    });


    // FEED +++++++++++

    const feedListeners = new Map();

    const messagesHandler = senderName => model => {
      const data = model ? [
        ...model.messages
          .map(({ key, seq, data  }) => ({ key: key.toString('hex'), seq, data  }))]
        : [];
      Bridge.sendMessage('feed.data', data, senderName);
    };

    Bridge.onMessage('feed.listen', async ({ sender, data: { topic, type = '' } }) => {
      const handler = messagesHandler(sender.name);

      const model = await hook.client.modelFactory
        .createModel(undefined, {
          readStreamOptions: { feedLevelIndexInfo: true },
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

    Bridge.onMessage('feed.removeListen', async ({ data: { key } }) => {
      const removeListener = feedListeners.get(key);
      if (removeListener) {
        removeListener();
      }
    });

    // Keys ++++

    Bridge.onMessage('party.keys', async ({ data: { topic } }) => {
      const { client: { keyring, partyManager } } = hook;

      // For some reason the check under getParty throws.
      // const party = partyManager.getParty(Buffer.from(topic, 'hex'))
      const party = partyManager._parties.get(topic);

      const partyKeys = new Map();

      partyKeys.set(party.publicKey.toString('hex'), keyring.getKey(party.publicKey));
      party.memberKeys.forEach(key => partyKeys.set(key.toString('hex'), keyring.getKey(key)));
      party.memberFeeds.forEach(key => partyKeys.set(key.toString('hex'), keyring.getKey(key)));

      return Array.from(partyKeys.values())
        .map(({ type, publicKey, added, own, trusted }) => ({
          type, publicKey: publicKey.toString('hex'), added, own, trusted
        }));
    });

    Bridge.onMessage('keyring.keys',  () => {
      const { client: { keyring } } = hook;

      return keyring.keys
        .map(({ type, publicKey, added, own, trusted }) => ({
          type, publicKey: publicKey.toString('hex'), added, own, trusted
        }));
    });

    return;
  }
  setTimeout(init, 500);
};

init();
if (!started) setTimeout(init, 500);
