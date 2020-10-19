//
// Copyright 2020 DXOS.org
//

import feed from './feed';
import feedstore from './feedstore';
import keys from './keys';
import metrics from './metrics';
import topic from './topic';
import storage from './storage';

export const initDevToolClientApi = ({ hook, bridge }) => {
  [feed, feedstore, keys, metrics, topic, storage]
    .forEach(register => register({ hook, bridge }));
};
