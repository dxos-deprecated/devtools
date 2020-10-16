//
// Copyright 2020 DXOS.org.
//

import React, { useState } from 'react';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

import Metrics from './containers/Metrics';
import FeedStore from './containers/FeedStore';
import FeedViewer from './containers/FeedViewer';
import Keys from './containers/Keys';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: '100vh'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  tabsRoot: {
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

export default function App () {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Tabs
        value={tab}
        onChange={handleTabChange}
      >
        <Tab label='Metrics' classes={{ root: classes.tabsRoot }} />
        <Tab label='FeedStore' classes={{ root: classes.tabsRoot }} />
        <Tab label='FeedViewer' classes={{ root: classes.tabsRoot }} />
        <Tab label='Keys' classes={{ root: classes.tabsRoot }} />
      </Tabs>
      <div className={classes.tabContent} hidden={tab !== 0}>
        <Metrics />
      </div>
      <div className={classes.tabContent} hidden={tab !== 1}>
        <FeedStore />
      </div>
      <div className={classes.tabContent} hidden={tab !== 2}>
        <FeedViewer />
      </div>
      <div className={classes.tabContent} hidden={tab !== 3}>
        <Keys />
      </div>
    </div>
  );
}
