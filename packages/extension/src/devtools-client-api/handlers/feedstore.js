//
// Copyright 2020 DXOS.org
//

export default ({ hook, bridge }) => {
  bridge.onMessage('feedstore.descriptors', () => {
    return hook.client.feedStore
      .getDescriptors()
      .map(({ feed, path, opened, metadata }) => ({ path, opened, metadata, blocks: feed.length }));
  });
};
