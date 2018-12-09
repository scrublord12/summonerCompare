const client = require('./client');
const log = require('./log');

log(
  'SummonerByName(Algalon Observer)',
  client.summoner.byName('Algalon Observer 123'),
);

log(
  'SummonerById(95299786)',
  client.summoner.bySummonerId(95299786),
);

log(
  'SummonerByAccountId(231429628)',
  client.summoner.byAccountId(231429628),
);

