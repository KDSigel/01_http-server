const parseBody = require('./parse-body');
const SimpleDb = require('./simple-db');
const db = new SimpleDb('./__tests__/store');

const coffeeRouter = {

  async post(req, res) {
    const coffee = await parseBody(req);
    await db.save(coffee);
    const savedcoffee = await db.get(coffee.id);

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(savedcoffee));
  },

  async get(req, res) {
  },

  async put(req, res) {
  },

  async delete(req, res) {
  }

};

module.exports = coffeeRouter;
