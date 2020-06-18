//
// Copyright 2020 DxOS.
//

export default ({ hook, bridge }) => {
  bridge.onMessage('party.keys', async ({ data: { topic } }) => {
    const { client: { keyring, partyManager } } = hook;

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
  });

  bridge.onMessage('keyring.keys', () => {
    const { client: { keyring } } = hook;

    return keyring.keys
      .map(({ type, publicKey, added, own, trusted }) => ({
        type, publicKey: publicKey.toString('hex'), added, own, trusted
      }));
  });
};
