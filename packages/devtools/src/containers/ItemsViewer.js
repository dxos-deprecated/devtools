import React, { useEffect, useState } from 'react';
import { useBridge } from '../hooks/bridge';
import JsonTreeView from '@dxos/react-ux/dist/es/components/JsonTreeView';

export default function ItemsViewer () {
  const [bridge] = useBridge();
  const [data, setData] = useState({});

  useEffect(() => {
    let unsubscribe;

    (async () => {
      const stream = bridge.openStream('echo.items');

      stream.onMessage(data => {
        console.log({ data })
        setData(data)
      })

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
