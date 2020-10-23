//
// Copyright 2020 DXOS.org
//

import React, { useState } from 'react';

import { JsonTreeView } from '@dxos/react-ux';

import { useBridge } from '../hooks/bridge';
import { useAsyncEffect } from '../hooks/async-effect';

export default function ItemsViewer () {
  const [bridge] = useBridge();
  const [data, setData] = useState({});

  useAsyncEffect(async () => {
    const stream = await bridge.openStream('echo.items');

    stream.onMessage(data => {
      console.log({ data });
      setData(data);
    });

    return () => stream.close();
  }, [bridge]);

  return (
    <JsonTreeView
      size='small'
      data={data}
      depth={4}
    />
  );
}
