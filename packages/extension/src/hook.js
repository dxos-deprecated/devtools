// Executes in inspectedWindow


export const installHook = window => {
  console.log('install hook');

  let loadCheckInterval;

  const createGlobal = () => {

    if (window.__DXOS__) {

      clearInterval(loadCheckInterval);

      const { client, metrics } = window.__DXOS__;


      window.__DXOS_GLOBAL_HOOK__ = {
        client,
        metrics,
        async createModel(modelType, options) {
          return client.modelFactory.createModel(modelType, options);
        }
      };
    }
  };

  loadCheckInterval = setInterval(createGlobal, 1000);

  createGlobal();
};
