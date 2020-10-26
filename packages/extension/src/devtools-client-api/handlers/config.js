//
// Copyright 2020 DXOS.org
//

export default ({ hook, bridge }) => {
  bridge.onMessage('config', () => {
    return JSON.parse(JSON.stringify(hook.client.config)); // make sure the config is serializable
  });
};
