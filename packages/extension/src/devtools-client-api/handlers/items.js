import { humanize } from '@dxos/crypto';

//
// Copyright 2020 DXOS.org
//

export default ({ hook, bridge }) => {
  bridge.onMessage('echo.items', () => {
    const parties = hook.client.echo.queryParties().value;
    console.log(parties)

    // TODO(marik-d): Display items hierarhically 
    const res = {}
    for(const party of parties) {
      const partyInfo = {};
      res[`Party ${humanize(party.key)}`] = partyInfo;

      const items = party.database.queryItems().value;
      for(const item of items) {
        const modelName = item.model.__proto__.constructor.name;
        partyInfo[`${modelName} ${item.type} ${humanize(item.id)}`] = {
          id: humanize(item.id),
          type: item.type,
          modelType: item.model._meta.type,
          modelName,
        }
      }
    }
    
    return res;
  });
};
