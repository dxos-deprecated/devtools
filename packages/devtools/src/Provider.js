import React, { useContext } from 'react';

export const Context = React.createContext({ });

export default function Provider ({ bridge, children }) {
  return (
    <Context.Provider value={{ bridge }}>
      {children}
    </Context.Provider>
  );
}

export const useBridge = () => {
  const { bridge } = useContext(Context);
  return [bridge];
};
