//
// Copyright 2020 DXOS.org
//

export default ({ hook, bridge }) => {
  bridge.onMessage('party.keys', async ({ data: { topic } }) => {
    try {
      const { keyring, partyManager } = hook;

      // For some reason the check under getParty throws.
      // const party = partyManager.getParty(Buffer.from(topic, 'hex'))
      const party = partyManager._parties.get(topic);

      const partyKeys = new Map();
      partyKeys.set(party.publicKey.toString('hex'), keyring.getKey(party.publicKey));
      party.memberKeys.forEach(key => partyKeys.set(key.toString('hex'), keyring.getKey(key)));
      party.memberFeeds.forEach(key => partyKeys.set(key.toString('hex'), keyring.getKey(key)));

      return Array.from(partyKeys.values())
        .map(({ type, publicKey, added, own, trusted }) => ({
          type, publicKey: publicKey.toString('hex'), added, own, trusted
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
          type, publicKey: publicKey.toString('hex'), added, own, trusted
        }));
    } catch (e) {
      console.error('DXOS DevTools: keyring handler failed to respond');
      console.log(e);
    }
  });
};
