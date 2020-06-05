//
// Copyright 2020 Wireline, Inc.
//

import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { useBridge } from '../Provider';
import AutocompleteFilter from '../components/AutocompleteFilter';
import KeyTable from '../components/KeyTable';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflow: 'hidden'
  },

  filter: {
    display: 'flex',
    flexShrink: 0,
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2)
  },

  keys: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflow: 'hidden'
  }
}));

const Keys = () => {
  const [bridge] = useBridge();
  const [topics, setTopics] = useState([]);
  const [topic, setTopic] = useState();
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    bridge.send('topics').then(topics => setTopics(topics));

    if (topic) {
      bridge.send('party.keys', { topic }).then(keys => setKeys(keys));
    } else {
      bridge.send('keyring.keys', { topic }).then(keys => setKeys(keys));
    }
  }, [bridge, topic]);

  const onTopicChange = (value) => {
    setTopic(value);
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.filter}>
        <AutocompleteFilter label='Topic' types={topics} onChange={onTopicChange} value={topic} />
      </div>
      <div className={classes.keys}>
        <KeyTable keys={keys} />
      </div>
    </div>
  );
};

export default Keys;
