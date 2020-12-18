//
// Copyright 2020 DXOS.org
//

export default ({ hook, bridge }) => {
  bridge.onMessage('topics', () => {
    try {
      return Array.from(new Set(hook.feedStore
        .getDescriptors()
        .filter(descriptor => descriptor.opened)
        .map(({ metadata }) => metadata.partyKey.toString('hex'))));
    } catch (e) {
      console.error('DXOS DevTools: topics handler failed to respond');
      console.log(e);
    }
  });
};
