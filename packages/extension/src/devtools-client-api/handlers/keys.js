//
// Copyright 2020 DXOS.org
//

import { PublicKey } from '@dxos/crypto';

export default ({ hook, bridge }) => {
  bridge.onMessage('party.keys', async ({ data: { topic } }) => {
    try {
      const { keyring, client } = hook;

      // For some reason the check under getParty throws.
      // const party = partyManager.getParty(Buffer.from(topic, 'hex'))
      console.log('topic', topic);
      const party = client.echo.getParty(PublicKey.from(topic));
      if (!party) {
        console.error('DXOS DevTools: Party not found');
        return [];
      }

      const partyKeys = new Map();
      partyKeys.set(party.key.toHex(), keyring.getKey(party.key));
      party._internal._partyProcessor.memberKeys.forEach(key => partyKeys.set(key.toHex(), keyring.getKey(key)));
      party._internal._partyProcessor.feedKeys.forEach(key => partyKeys.set(key.toHex(), keyring.getKey(key)));

      return Array.from(partyKeys.values())
        .map(({ type, publicKey, added, own, trusted }) => ({
          type, publicKey: publicKey.toHex(), added, own, trusted
        }));
    } catch (e) {
      console.error('DXOS DevTools: party keys handler failed to respond');
      console.log(e);
    }
  });

  bridge.onMessage('keyring.keys', () => {
    try {
      const { keyring } = hook;

      return keyring.keys
        .map(({ type, publicKey, added, own, trusted }) => ({
          type, publicKey: publicKey.toHex(), added, own, trusted
        }));
    } catch (e) {
      console.error('DXOS DevTools: keyring handler failed to respond');
      console.log(e);
    }
  });
};
