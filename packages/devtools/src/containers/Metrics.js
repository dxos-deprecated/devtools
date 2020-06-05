
import React, { useState, useEffect } from 'react';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

import { JsonTreeView } from '@dxos/react-ux';

import { useBridge } from '../Provider';

const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  tabsRoot: {
    minHeight: 32,
  },
  tabRoot: {
    minHeight: 32,
    padding: 0,
    lineHeight: 1.5,
    minWidth: 120
  },
  tabContent: {
    flex: 1,
    overflow: 'auto'
  },
  jsonTreeView: {
    flexDirection: 'column'
  }
}));

export default function Metrics() {
  const classes = useStyles();
  const [bridge] = useBridge();
  const [tab, setTab] = useState(0);

  const [metrics, setMetrics] = useState({});


  useEffect(() => {
    bridge.listen('metrics.data', ({ data }) => {
      setMetrics(data);
    });

    let metricListenerKey;

    (async () => {
      metricListenerKey = await bridge.send('metrics.listen');
    })();

    return () => {
      if (metricListenerKey) {
        bridge.send('metrics.removeListen', {  key: metricListenerKey });
      }
    };

  }, [bridge]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={tab}
        onChange={handleTabChange}
        className={classes.tabs}
        textColor="primary"
        indicatorColor="primary"
        classes={{ root: classes.tabsRoot }}
      >
        <Tab label="Data" classes={{ root: classes.tabRoot }} />
        <Tab label="Events" classes={{ root: classes.tabRoot }} />
      </Tabs>
      <div className={classes.tabContent} hidden={tab !== 0}>
        <JsonTreeView className={classes.jsonTreeView} size="small" data={{ ...metrics.values }} depth={4} />
      </div>
      <div className={classes.tabContent} hidden={tab !== 1}>
        <JsonTreeView className={classes.jsonTreeView} size="small" data={{ ...metrics.events }} depth={4} />
      </div>
    </div>
  );
}
