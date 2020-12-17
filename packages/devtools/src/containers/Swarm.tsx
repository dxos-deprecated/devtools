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
  const [topics, setTopics] = useState();

  useAsyncEffect(async () => {
    bridge.send('topics', {}).then(topics => {
      setTopics(topics);
    });
  }, [bridge]);

  console.log('topics', topics);

  return (
    <PeerGraph size={{}} onClick={undefined} peers={[]}/>
  );
}
