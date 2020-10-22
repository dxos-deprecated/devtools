//
// Copyright 2020 DXOS.org
//

import feed from './feed';
import feedstore from './feedstore';
import items from './items';
import keys from './keys';
import metrics from './metrics';
import storage from './storage';
import topic from './topic';

export const initDevToolClientApi = ({ hook, bridge }) => {
  [feed, feedstore, keys, metrics, topic, storage, items]
    .forEach(register => register({ hook, bridge }));
};
