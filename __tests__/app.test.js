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

  it('creates a new coffee and returns it via POST', async () => {
    const coffee = { name: 'Ethiopia Suke Quto', cost: 8, body: 'Medium' };
    const res = await request(app).post('/coffee').send(coffee);

    expect(res.body).toEqual({ ...coffee, id: expect.any(String) });
  });

  it('gets a coffee by its id', async () => {
    const coffee = { name: 'Ethiopia Suke Quto', cost: 8, body: 'Medium' };
    const db = new SimpleDb(rootDir);
    await db.save(coffee);

    const res = await request(app).get(`/coffee/${coffee.id}`);

    expect(res.body).toEqual(coffee);
  });

  it('gets all coffee when no id specified', async () => {
    const SukeQuto = { name: 'Ethiopia Suke Quto', cost: 8, body: 'Medium' };
    const SumatraMandheling = { name: 'Sumatra Mandheling', cost: 7.5, body: 'Medium' };

    const db = new SimpleDb(rootDir);
    Promise.all([db.save(SukeQuto), db.save(SumatraMandheling)]);

    const res = await request(app).get('/coffee');

    expect(res.body).toEqual(expect.arrayContaining([SukeQuto, SumatraMandheling]));
  });

  it('edits a coffee entry', async () => {

    const coffee = { name: 'Ethiopia Suke Quto', cost: 8, body: 'Medium' };
    const newCoffee = { name: 'Ethiopia Suke Quto', cost: 9, body: 'Medium' };

    const firstCoffee = await request(app).post('/coffee').send(coffee);
    // need to get that id!!!

    const res = await request(app).put(`/coffee/${firstCoffee.body.id}`).send(newCoffee);

    expect(res.body).toEqual({ ...newCoffee, id: firstCoffee.body.id });
  });

  it('deletes a coffee entry', async () => {

    // create a record 
    const coffee = { name: 'Ethiopia Suke Quto', cost: 8, body: 'Medium' };
    const coffeeToDelete = await request(app).post('/coffee').send(coffee);

    // send that record's id to delete that record
    await request(app).delete(`/coffee/${coffeeToDelete.body.id}`);
    const res = await request(app).get(`/coffee/${coffeeToDelete.body.id}`);

    // get that record (by it's id) and it should return nothing or null?
    expect(res.body).toEqual(null);
  });

});
