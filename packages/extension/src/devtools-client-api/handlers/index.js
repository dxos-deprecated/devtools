//
// Copyright 2020 DxOS.
//

import feed from './feed';
import feedstore from './feedstore';
import keys from './keys';
import metrics from './metrics';
import topic from './topic';

export const initDevToolClientApi = ({ hook, bridge }) => {
  [feed, feedstore, keys, metrics, topic]
    .forEach(register => register({ hook, bridge }));
};
