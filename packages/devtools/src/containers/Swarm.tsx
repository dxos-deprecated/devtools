//
// Copyright 2020 DXOS.org
//

import React, { useState } from 'react';

import { PeerGraph } from '@dxos/network-devtools';
import { JsonTreeView } from '@dxos/react-ux';

import { useAsyncEffect } from '../hooks/async-effect';
import { useBridge } from '../hooks/bridge';

export default function Swarm () {
  const [bridge] = useBridge();
  const [data, setData] = useState({});

  useAsyncEffect(async () => {
    // const stream = await bridge.openStream('echo.items');

    // stream.onMessage(data => {
    //   console.log({ data });
    //   setData(data);
    // });

    // return () => stream.close();
  }, [bridge]);

  return (
    <PeerGraph size={{}} onClick={undefined} peers={[]}/>
  );
}
