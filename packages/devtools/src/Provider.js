//
// Copyright 2020 DXOS.org.
//

import React, { useState, useEffect, useContext } from 'react';

export const Context = React.createContext({ });

export default function Provider ({ bridge, children }) {
  const [initialized, setInitialized] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    bridge.on('api', (ready) => {
      setReady(ready);
      setInitialized(true);
    });
  }, [bridge]);

  return (
    <>
      {!initialized && (
        <div>Waiting for DXOS client...</div>
      )}
      {ready && (
        <Context.Provider value={{ bridge }}>
          {children}
        </Context.Provider>
      )}
      {(!ready && initialized) && (
        <div>DXOS client Not Found.</div>
      )}
    </>
  );
}

export const useBridge = () => {
  const { bridge } = useContext(Context);
  return [bridge];
};
