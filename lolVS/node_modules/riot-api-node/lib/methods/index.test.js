const _ = require('lodash');

const allMethods = require('./index');

describe('api methods', () => {
  _.forOwn(allMethods, (methods, group) => {
    describe(group, () => {
      _.forOwn(methods, (fn, method) => {
        describe(method, () => {
          it('should be a function', () => {
            expect(fn).toEqual(expect.any(Function));
          });

          it('should return not an empty string', () => {
            const result = fn('arg');

            expect(result).toEqual(expect.any(String));
            expect(result.length).toBeGreaterThan(0);
          });
        })
      });
    });
  });
});
