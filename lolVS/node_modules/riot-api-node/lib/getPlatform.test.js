const regions = require('./regions.json');
const getPlatform = require('./getPlatform');

regions.foo = '';

describe('getPlatform', () => {
  it('should only accept string', () => {
    expect(() => getPlatform(1337)).toThrowError();
  });

  it('should throw error if region is not found', () => {
    expect(() => getPlatform('1337')).toThrowError();
  });

  it('should check for return value', () => {
    expect(() => getPlatform('foo')).toThrowError();
  });

  it('should return a string for correct region', () => {
    const region = Object.keys(regions)[0];
    const result = getPlatform(region);

    expect(result).toBe(regions[region]);
  });
});
