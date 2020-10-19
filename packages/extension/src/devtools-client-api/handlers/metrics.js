//
// Copyright 2020 DXOS.org
//

const metricslisteners = new Map();

export default ({ hook, bridge }) => {
  const onMetrics = senderName => () => {
    const data = {
      values: hook.metrics.values,
      events: hook.metrics.events
    };
    bridge.sendMessage('metrics.data', data, senderName);
  };

  bridge.onMessage('metrics.subscribe', ({ sender }) => {
    const metricsHandler = onMetrics(sender.name);
    const handlerOff = hook.metrics.on(null, metricsHandler);

    // Send first grab of metrics right away.
    metricsHandler();

    const listenerKey = Date.now();
    metricslisteners.set(listenerKey, () => {
      handlerOff();
    });

    return listenerKey;
  });

  bridge.onMessage('metrics.unsubscribe', async ({ data: { key } }) => {
    const removeListener = metricslisteners.get(key);
    if (removeListener) {
      removeListener();
    }
  });
};
