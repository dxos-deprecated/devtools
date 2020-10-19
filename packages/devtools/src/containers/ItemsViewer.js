import React, { useEffect, useState } from 'react'
import { useBridge } from '../hooks/bridge'
import JsonTreeView from '@dxos/react-ux/dist/es/components/JsonTreeView';

export default function ItemsViewer() {
  const [bridge] = useBridge();
  
  const [data, setData] = useState({});
  useEffect(() => {
    bridge.send('echo.items').then(data => setData(data));
  }, [])

  return (
    <JsonTreeView
      size='small'
      data={data}
      depth={4}
    />
  )
}
