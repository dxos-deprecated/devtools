//
// Copyright 2020 DXOS.org
//

export default ({ hook, bridge }) => {
  bridge.onMessage('storage.reset', () => {
    hook.client.reset();
    window.location.reload();
  });
};
