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
  },

  async put(req, res) {

    const [, , id] = req.url.split('/');

    if (id) {
      // new coffee information to update the existing record
      const editedCoffee = await parseBody(req);
      // update it
      await db.update({ ...editedCoffee, id });
      // grab updated coffee record from database
      const updatedCoffee = await db.get(id);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(updatedCoffee));

    } else {
      res.end('I need a ID with the request');
    }
  },

  async delete(req, res) {
    const [, , id] = req.url.split('/');
    if (id) {
      await db.delete(id);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end();
    } else {
      res.end('I need a ID with the request');
    }
  }

};

module.exports = coffeeRouter;
