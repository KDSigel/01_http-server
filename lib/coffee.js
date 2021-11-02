const SimpleDb = require('./simple-db');

const db = new SimpleDb('./__tests__/store');

//has methods on it
const coffeeRouter = {
  async post(req, res) {
    res.end('huh?');
  }

};
module.exports = coffeeRouter;
