//
// Copyright 2020 DXOS.org
//

export default ({ hook, bridge }) => {
  bridge.onMessage('config', () => {
    try {
      return JSON.parse(JSON.stringify(hook.client.config)); // make sure the config is serializable
    } catch (e) {
      console.error('DXOS DevTools: Config handler failed to respond');
      console.log(e);
    }
  });
};
