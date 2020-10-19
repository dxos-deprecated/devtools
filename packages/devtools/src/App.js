//
// Copyright 2020 DXOS.org
//

import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import ConfigIcon from '@material-ui/icons/Settings';
import MetricsIcon from '@material-ui/icons/BugReport';
import EventsIcon from '@material-ui/icons/Timer';
import StorageIcon from '@material-ui/icons/Dns';
import KeyIcon from '@material-ui/icons/VpnKey';
import StoreIcon from '@material-ui/icons/Storage';
import FeedIcon from '@material-ui/icons/PageView';
import SwarmIcon from '@material-ui/icons/Router';

import JsonTreeView from '@dxos/react-ux/dist/es/components/JsonTreeView';

import FeedStore from './containers/FeedStore';
import FeedViewer from './containers/FeedViewer';
import Keys from './containers/Keys';
import StorageTab from './containers/StorageTab';
import { useMetrics } from './hooks/metrics';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    height: '100vh'
  },
  sidebar: {
    flexShrink: 0,
    width: 140,
    backgroundColor: colors.grey[100],
    borderRight: `1px solid ${theme.palette.divider}`
  },
  icon: {
    minWidth: 28
  },
  content: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden'
  },
  contentHidden: {
    display: 'none'
  }
}));

const items = [
  {
    title: 'Application',
    items: [
      {
        id: 'config',
        title: 'Config',
        icon: ConfigIcon
      },
      {
        id: 'metrics.values',
        title: 'Metrics',
        icon: MetricsIcon
      },
      {
        id: 'metrics.events',
        title: 'Events',
        icon: EventsIcon
      },
      {
        id: 'storage',
        title: 'Storage',
        icon: StorageIcon
      }
    ]
  },
  {
    title: 'HALO',
    items: [
      {
        id: 'halo.keyring',
        title: 'Keyring',
        icon: KeyIcon
      }
    ]
  },
  {
    title: 'ECHO',
    items: [
      {
        id: 'echo.feedstore',
        title: 'Feed Store',
        icon: StoreIcon
      },
      {
        id: 'echo.feedview',
        title: 'Feed View',
        icon: FeedIcon
      }
    ]
  },
  {
    title: 'MESH',
    items: [
      {
        id: 'mesh.swarm',
        title: 'Swarm',
        icon: SwarmIcon
      }
    ]
  }
];

const App = () => {
  const classes = useStyles();
  const [selected, setSelected] = useState(items[0].items[0].id);
  const metrics = useMetrics();

  const handleListItemClick = (event, index) => {
    setSelected(index);
  };

  const className = id => selected === id ? classes.content : classes.contentHidden;

  return (
    <div className={classes.root}>
      <div className={classes.sidebar}>
        <List dense aria-label='main tools'>
          {items.map(({ title, items = [] }) => (
            <>
              <ListItem>
                <ListItemText primary={title} />
              </ListItem>
              {items.map(({ id, title, icon: Icon }) => (
                <ListItem
                  key={id}
                  button
                  selected={selected === id}
                  onClick={(event) => handleListItemClick(event, id)}
                >
                  <ListItemIcon classes={{ root: classes.icon }}>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={title} />
                </ListItem>
              ))}
              <Divider />
            </>
          ))}
        </List>
      </div>

      {/* Display hidden so that components maintain state. */}

      <div className={className('config')}>
        {/* TODO(burdon): Get config. */}
        <JsonTreeView
          size='small'
          depth={4}
        />
      </div>
      <div className={className('metrics.values')}>
        <JsonTreeView
          size='small'
          data={{ ...metrics.values }}
          depth={4}
        />
      </div>
      <div className={className('metrics.events')}>
        <JsonTreeView
          size='small'
          data={{ ...metrics.events }}
          depth={4}
        />
      </div>
      <div className={className('storage')}>
        <StorageTab />
      </div>
      <div className={className('halo.keyring')}>
        <Keys />
      </div>
      <div className={className('echo.feedstore')}>
        <FeedStore />
      </div>
      <div className={className('echo.feedview')}>
        <FeedViewer />
      </div>
      <div className={className('mesh.swarm')}>
        {/* TODO(burdon): Any presence information? */}
        <div>SWARM CONNECTIONS</div>
      </div>
    </div>
  );
};

export default App;
