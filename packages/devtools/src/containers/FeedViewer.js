//
// Copyright 2020 DXOS.org
//

import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { useBridge } from '../Provider';
import AutocompleteFilter from '../components/AutocompleteFilter';
import Feed from '../components/Feed';

const useStyles = makeStyles((theme) => ({
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

  feed: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflow: 'hidden'
  }
}));

const FeedViewer = () => {
  const [bridge] = useBridge();
  const [topics, setTopics] = useState();
  const [topic, setTopic] = useState();
  const [type, setType] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    bridge.send('topics').then(topics => setTopics(topics));

    bridge.listen('feed.data', ({ data }) => {
      setMessages(data);
    });

    let feedListenerKey;

    if (topic) {
      (async () => {
        feedListenerKey = await bridge.send('feed.subscribe', { topic, type });
      })();
    }

    return () => {
      if (feedListenerKey) {
        bridge.send('feed.unsubscribe', { key: feedListenerKey });
      }
    };
  }, [bridge, topic, type]);

  const onTopicChange = (value) => {
    setTopic(value);
    setType(undefined);
  };

  const onTypeChange = (value) => {
    setType(value);
  };

  const types = [...new Set([...messages].map(({ data: { __type_url: type } }) => type))];

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.filter}>
        <AutocompleteFilter label='Topic' types={topics} onChange={onTopicChange} value={topic} />
        <AutocompleteFilter label='Message Type' types={types} onChange={onTypeChange} value={type} />
      </div>

      <div className={classes.feed}>
        <Feed messages={messages} onSelect={(_, type) => setType(type)} />
      </div>
    </div>
  );
};

export default FeedViewer;
