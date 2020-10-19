//
// Copyright 2020 DXOS.org
//

import React, { useState, useEffect } from 'react';

export const Context = React.createContext({});

const Provider = ({ bridge, children }) => {
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
        <div style={{ padding: 8 }}>Waiting for DXOS client...</div>
      )}

      {ready && (
        <Context.Provider value={{ bridge }}>
          {children}
        </Context.Provider>
      )}

      {(!ready && initialized) && (
        <div>DXOS client not found.</div>
      )}
    </>
  );
};

export default Provider;
