const invariant = require('invariant');
const _ = require('lodash');

const regions = require('./regions.json');

invariant(_.isObject(regions), 'regions.json must contain an object');

function getPlatform(region) {
  invariant(_.isString(region), 'region must be a string');

  region = region.toLowerCase();

  invariant(_.has(regions, region), `unknown region: ${region}`);

  const result = regions[region];

  invariant(result, `No data for region: ${region}`);

  return result;
}

module.exports = getPlatform;
