//
// Copyright 2020 DXOS.org
//

import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core';

// import { PeerGraph } from '@dxos/network-devtools';
import { PublicKey, keyToString } from '@dxos/crypto';
import { SignalStatus, SignalTrace } from '@dxos/network-devtools';
import { SignalApi } from '@dxos/network-manager';

import AutocompleteFilter from '../components/AutocompleteFilter';
import { useAsyncEffect } from '../hooks/async-effect';
import { useBridge } from '../hooks/bridge';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflow: 'hidden',
    padding: theme.spacing(2),
    fontSize: '1.5em',
    overflowY: 'auto',
    overflowX: 'auto'
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
  const [networkTopics, setNetworkTopics] = useState<{topic: string, label: string}[]>([]);
  const [selectedTopic, setSelectedTopic] = useState('');

  console.log('networkTopics', networkTopics);
  console.log('selectedTopic', selectedTopic);

  useAsyncEffect(async () => {
    const stream = await bridge.openStream('network.topics');
    stream.onMessage(data => {
      console.log('Swarm graph received', data);
      setNetworkTopics(data);
    });
    return () => stream.close();
  }, [bridge]);

  const options = networkTopics.map(topic => topic.topic);

  return (
    <div className={classes.root}>
      <div className={classes.filter}>
        <AutocompleteFilter label='Topic' options={options} onChange={setSelectedTopic} value={selectedTopic} />
      </div>
      <p>{selectedTopic ? `Selected ${selectedTopic}` : 'Topic not selected.'}</p>
    </div>
  );
}
