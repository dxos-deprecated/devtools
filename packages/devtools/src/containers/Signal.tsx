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

  // const refreshTopics = async () => {
  //   try {
  //     const topics = await bridge.send('topics', {});
  //     setTopics(topics);
  //   } catch (e) {
  //     console.error('DXOS DevTools: failed to get topics');
  //     console.log(e);
  //   }
  // };

  // useAsyncEffect(async () => {
  //   await refreshTopics;
  // }, [bridge]);

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
      {/* <div className={classes.filter}>
        <AutocompleteFilter label='Topic' options={topics} onChange={setSelectedTopic} value={selectedTopic} />
        <Button variant="contained" onClick={refreshTopics}>Refresh</Button>
      </div>
      <div className={classes.graph}>
        {selectedTopic ? (
          <p>Selected topic: ${selectedTopic}</p>
        ) : (
          <p>Select a topic.</p>
        )}
      </div> */}
      <SignalStatus status={[]} />
    </div>
  );
}
