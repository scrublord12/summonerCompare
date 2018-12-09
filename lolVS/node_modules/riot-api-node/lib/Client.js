const axios = require('axios');
const invariant = require('invariant');
const _ = require('lodash');

const getPlatform = require('./getPlatform');
const methods = require('./methods');

/**
 * region is not validated in the Client class
 * because getPlatform() validates region itself
 */
class Client {
  constructor(apiKey, region) {
    invariant(_.isString(apiKey), 'apiKey must be a string');

    this.apiKey = apiKey;
    this.region = region;

    if (this.region) {
      this.createHttpClient(this.region);
    }

    this.summoner = this.createProxy(methods.summoner);
  }

  callMethod(method, args) {
    const methodArgs = args.slice();

    if (!this.httpClient) {
      this.createHttpClient(methodArgs.pop());
    }

    const path = method(...args);

    return this.httpClient.get(path)
      .then(response => response.data)
      .catch(error => error.response ? error.response.data : error.message);
  }

  getHttpClient() {
    return this.httpClient;
  }

  createHttpClient(region) {
    const platform = getPlatform(region);

    const baseURL = `https://${platform}.api.riotgames.com/lol/`;

    this.httpClient = axios.create({
      baseURL,
      headers: {
        'X-Riot-Token': this.apiKey,
      },
    });
  }

  createProxy(target) {
    return _.mapValues(
      target,
      method => (...args) => this.callMethod(method, args),
    );
  }
}

module.exports = Client;
