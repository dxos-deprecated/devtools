//
// Copyright 2020 DxOS.
//

import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import { truncateString } from '@dxos/debug';

import { useBridge } from '../Provider';

const useStyles = makeStyles(() => ({
  table: {
    tableLayout: 'fixed'
  },

  colOpen: {
    width: 100
  },
  colPath: {
    width: 400
  },
  colMetadata: {
    width: 400
  },

  mono: {
    fontFamily: 'monospace',
    fontSize: 'large'
  }
}));

const FeedStore = () => {
  const [bridge] = useBridge();
  const [feedDescriptors, setFeedDescriptors] = useState([]);

  useEffect(() => {
    (async () => setFeedDescriptors(await bridge.send('feedstore.descriptors')))();
  });

  const classes = useStyles();

  // const descriptors = client.feedStore.getDescriptors().map(descriptor => {
  const descriptors = feedDescriptors.map(descriptor => {
    const { path, opened, metadata, blocks } = descriptor;

    return (
      <TableRow key={path}>
        <TableCell>
          <Switch disabled checked={opened} />
        </TableCell>
        <TableCell>
          <Typography title={path} className={classes.mono}>
            {truncateString(path, 16)}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography
            title={metadata.topic}
            className={classes.mono}
          >
            {truncateString(metadata.topic, 16)}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography>{blocks}</Typography>
        </TableCell>
      </TableRow>
    );
  });

  return (
    <TableContainer>
      <Table stickyHeader size='small' className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.colOpen}>Open</TableCell>
            <TableCell className={classes.colPath}>Path</TableCell>
            <TableCell className={classes.colMetadata}>Topic</TableCell>
            <TableCell className={classes.colBlocks}>Blocks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {descriptors}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FeedStore;
