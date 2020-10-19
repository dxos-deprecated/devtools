//
// Copyright 2020 DXOS.org
//

export default ({ hook, bridge }) => {
  bridge.onMessage('storage.reset', async () => {
    await hook.client.reset();
    window.location.reload();
  });
};
