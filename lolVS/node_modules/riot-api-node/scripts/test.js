process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';

process.on('unhandledRejection', err => {
  throw err;
});

const jest = require('jest');
const argv = process.argv.slice(2);

if (process.env.CI) {
  argv.push('--coverage');
} else {
  argv.push('--watch');
}

jest.run(argv);
