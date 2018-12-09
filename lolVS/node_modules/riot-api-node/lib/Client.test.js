jest.mock('axios');

const _ = require('lodash');
const flat = require('flat');

const Client = require('./Client');
const allMethods = require('./methods');

describe('Client', () => {
  describe('constructor', () => {
    it('should accept a string apiKey', () => {
      expect(() => new Client(1337)).toThrowError();
      expect(() => new Client('1337')).not.toThrowError();
    });

    it('should initialize httpClient if region is passed', () => {
      const spy = spyOn(Client.prototype, 'createHttpClient');
      const region = 'kr';

      new Client('1337', region);

      expect(spy).toHaveBeenCalledWith(region);
    });

    describe('method injection', () => {
      const client = new Client('1337');
      const methods = _.keys(flat.flatten(allMethods));

      _.forEach(methods, (method) => {
        describe(method, () => {
          it('should present in the client', () => {
            expect(_.get(client, method)).toEqual(expect.any(Function));
          });
        });
      });
    });
  });

  describe('callMethod', () => {
    it('should hanldle client.get success', () => {
      const client = new Client('apiKey', 'kr');

      const fn = jest.fn(_.identity);
      const result = client.callMethod(fn, ['hello']);

      expect(fn).toHaveBeenCalledWith('hello');

      result.then((value) => {
        expect(value).toBe('hello');
      });
    });

    it('should handle client.get axios error', () => {
      const client = new Client('apiKey', 'kr');
      const http = client.getHttpClient();

      const axiosHttpErr = {
        response: {
          data: 'error',
        },
      };

      spyOn(http, 'get').and.returnValue(Promise.reject(axiosHttpErr));

      client.callMethod(_.identity, ['hello']).catch((error) => {
        expect(error).toEqual('error');
      });
    });

    it('should handle client.get common error', () => {
      const client = new Client('apiKey', 'kr');
      const http = client.getHttpClient();

      const commonErr = {
        message: 'error',
      };

      spyOn(http, 'get').and.returnValue(Promise.reject(commonErr));

      client.callMethod(_.identity, ['hello']).catch((error) => {
        expect(error).toEqual('error');
      });
    });

    it('should create httpClient if it was not present yet', () => {
      const client = new Client('apiKey');
      let http = client.getHttpClient();

      expect(http).toBeUndefined();

      client.callMethod(_.identity, ['hello', 'kr']);
      http = client.getHttpClient();

      expect(http).toEqual(expect.any(Object));
      expect(http).toHaveProperty('get');
      expect(http.get).toEqual(expect.any(Function));
    });
  });

  describe('createProxy', () => {
    it('should return object with the same keys', () => {
      const client = new Client('apiKey', 'kr');

      const object = {
        foo: 'bar',
        bar: 'baz',
      };

      const result = client.createProxy(object);

      expect(_.keys(object)).toEqual(_.keys(result));
    });

    it('should wrap object values', () => {
      const client = new Client('apiKey', 'kr');

      const object = {
        foo: jest.fn(_.identity),
        bar: jest.fn(_.identity),
      };

      const result = client.createProxy(object);

      expect(result.foo).toEqual(expect.any(Function));

      result.foo('hello').then((value) => {
        expect(value).toBe('hello');
      });
    });
  });
});
