//
// Copyright 2020 DXOS.org
//

import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core';

// import { PeerGraph } from '@dxos/network-devtools';
import { SignalStatus } from '@dxos/network-devtools';
import { SignalApi } from '@dxos/network-manager';

import { useAsyncEffect } from '../hooks/async-effect';
import { useBridge } from '../hooks/bridge';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflow: 'hidden',
    padding: theme.spacing(2),
    fontSize: '1.5em'
  },

  filter: {
    display: 'flex',
    flexShrink: 0,
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2)
  },

  graph: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflow: 'hidden'
  }
}));

export default function Trace () {
  const classes = useStyles();
  const [bridge] = useBridge();
  const [data, setData] = useState<SignalApi.Status[]>([]);

  useAsyncEffect(async () => {
    const stream = await bridge.openStream('network.signal.status');

    stream.onMessage(data => {
      console.log('network.signal.status received');
      console.log({ data });
      setData(data);
    });

    return () => stream.close();
  }, [bridge]);

  return (
    <div className={classes.root}>
      <SignalStatus status={data} />
    </div>
  );
}
