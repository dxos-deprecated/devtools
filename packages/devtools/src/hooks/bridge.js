//
// Copyright 2020 DXOS.org
//

import { useContext } from 'react';

import { Context } from '../Provider';

export const useBridge = () => {
  const { bridge } = useContext(Context);
  return [bridge];
};
