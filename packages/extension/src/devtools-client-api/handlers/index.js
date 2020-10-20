//
// Copyright 2020 DXOS.org
//

import feed from './feed';
import feedstore from './feedstore';
import keys from './keys';
import metrics from './metrics';
import topic from './topic';
import storage from './storage';
import items from './items';

export const initDevToolClientApi = ({ hook, bridge }) => {
  [feed, feedstore, keys, metrics, topic, storage, items]
    .forEach(register => register({ hook, bridge }));
};
