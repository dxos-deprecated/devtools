import React, { useEffect, useState } from 'react';
import { useBridge } from '../hooks/bridge';
import JsonTreeView from '@dxos/react-ux/dist/es/components/JsonTreeView';

export default function ItemsViewer () {
  const [bridge] = useBridge();
  const [data, setData] = useState({});

  useEffect(() => {
    bridge.listen('echo.items.update', ({ data }) => {
      console.log({ data })
      setData(data);
    });

    let listenerKey;

    (async () => {
      listenerKey = await bridge.send('echo.items.subscribe');
    })();

    // return () => {
    //   if (listenerKey) {
    //     bridge.send('echo.items.unsubscribe', { key: listenerKey });
    //   }
    // };
  }, [bridge]);

  return (
    <JsonTreeView
      size='small'
      data={data}
      depth={4}
    />
  );
}
