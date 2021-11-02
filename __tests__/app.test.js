// stuff I need to bring in to make tests work
const request = require('supertest');
const { rm, mkdir } = require('fs/promises');
const app = require('../lib/app');
const SimpleDb = require('../lib/simple-db');

// place where the test save data?
const rootDir = `${__dirname}/store`;

// holds all the test stuff
describe('coffee CRUD API', () => {

  // clearing out the rootDir? to make the tests run right...
  beforeEach(() => {
    return rm(rootDir, { force: true, recursive: true }).then(() =>
      mkdir(rootDir, { recursive: true })
    );
  });
  
  afterAll(() => {
    return rm(rootDir, { force: true, recursive: true }).then(() =>
      mkdir(rootDir, { recursive: true })
    );
  });

  // put tests here?

});
