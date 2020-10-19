//
// Copyright 2020 DXOS.org
//

/**
 * Called by the content script that executes in the inspectedWindow.
 * @param window
 */
export const installHook = window => {
  const checkForClient = () => {
    if (window.__DXOS__) {
      clearInterval(checkForClientInterval);

      // TODO(burdon): Rename __DXOS_CLIENT___ (get config, metrics from client).
      // Global object set by SDK in debug mode.
      const { client, metrics } = window.__DXOS__;

      window.__DXOS_GLOBAL_HOOK__ = {
        client,
        metrics,

        // TODO(burdon): Why is this exposed?
        async createModel (modelType, options) {
          return client.modelFactory.createModel(modelType, options);
        }
      };
    }
  };

  // Keep checking until client loads.
  const checkForClientInterval = setInterval(checkForClient, 500);

  // Stop interval after.
  setTimeout(() => {
    clearInterval(checkForClientInterval);
  }, 5000);

  checkForClient();
};
