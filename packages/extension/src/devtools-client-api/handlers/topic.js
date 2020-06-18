//
// Copyright 2020 DxOS.
//

export default ({ hook, bridge }) => {
  bridge.onMessage('topics', () => {
    return hook.client.feedStore
      .getDescriptors()
      .filter(d => d.opened)
      .map(({ metadata }) => metadata.topic);
  });
};
