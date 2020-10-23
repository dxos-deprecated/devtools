//
// Copyright 2020 DXOS.org
//

import { useContext } from 'react';
import { DevtoolsBridge } from '../bridge';

import { Context } from '../Provider';
import { raise } from '../raise';

export const useBridge = (): [DevtoolsBridge] => {
  const { bridge } = useContext(Context) ?? raise(new Error('Devtools context not set'));
  return [bridge];
};
