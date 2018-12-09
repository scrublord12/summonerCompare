const e = encodeURIComponent;

/**
 * @async
 * @returns SummonerDto
 */
function byAccountId(accountId) {
  return `summoner/v3/summoners/by-account/${e(accountId)}`;
}

/**
 * @async
 * @returns SummonerDto
 */
function byName(name) {
  return `summoner/v3/summoners/by-name/${e(name)}`;
}

/**
 * @async
 * @returns SummonerDto
 */
function bySummonerId(summonerId) {
  return `summoner/v3/summoners/${e(summonerId)}`;
}

module.exports = {
  byAccountId,
  byName,
  bySummonerId,
};
