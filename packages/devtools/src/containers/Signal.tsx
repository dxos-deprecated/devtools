//
// Copyright 2020 DXOS.org
//

import React, { useState } from 'react';

import { Button, makeStyles } from '@material-ui/core';

// import { PeerGraph } from '@dxos/network-devtools';
import { SignalStatus } from '@dxos/network-devtools';
import { JsonTreeView } from '@dxos/react-ux';

import AutocompleteFilter from '../components/AutocompleteFilter';
import { useAsyncEffect } from '../hooks/async-effect';
import { useBridge } from '../hooks/bridge';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflow: 'hidden',
    padding: theme.spacing(2)
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

export default function Signal () {
  const classes = useStyles();
  const [bridge] = useBridge();
  const [data, setData] = useState({});
  const [topics, setTopics] = useState();
  const [selectedTopic, setSelectedTopic] = useState();

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
      {/* <SignalStatus status={[]} /> */}
    </div>
  );
}
