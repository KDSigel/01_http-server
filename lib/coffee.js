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
    {
      const [, , id] = req.url.split('/');
  
      if (id) {
        // Get a coffee by its id
        const coffee = await db.get(id);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(coffee));
      } else {
        // Get all coffee
        const coffees = await db.getAll();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(coffees));
      }
    }

    // async put(req, res) {
    // },

    // async delete(req, res) {
    // }

  }
};

module.exports = coffeeRouter;
