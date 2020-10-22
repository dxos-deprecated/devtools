//
// Copyright 2020 DXOS.org
//

import React, { useEffect, useState } from 'react';

import JsonTreeView from '@dxos/react-ux/dist/es/components/JsonTreeView';

import { useBridge } from '../hooks/bridge';

export default function ItemsViewer () {
  const [bridge] = useBridge();
  const [data, setData] = useState({});

  useEffect(() => {
    let unsubscribe;

    (async () => {
      const stream = await bridge.openStream('echo.items');

      stream.onMessage(data => {
        console.log({ data });
        setData(data);
      });

      unsubscribe = () => stream.close();
    })();

    return () => unsubscribe?.();
  }, [bridge]);

  return (
    <JsonTreeView
      size='small'
      data={data}
      depth={4}
    />
  );
}
