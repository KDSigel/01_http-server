/* eslint-disable no-console */
// bring in thing that has the routes?
const coffeeRouter = require('./coffee');

// takes the word after the slash in url and connects it to the imported (?)thing(?)
const routes = {
  coffee: coffeeRouter,
};

// this is a function?? method?? that takes in a request by the client and returns a response to the client.
const app = async (req, res) => {


  // this takes in the url in the request and splits it into parts separated by the slash. then grabs the value at [1] and calls it 'resource'.
  const [, resource] = req.url.split('/');

  // this takes the previously saved 'resource' and uh, pull the value off of routes? Then it saves that as "route", calling the coffeeRouter ??function?? ??method?? ??class??
  const route = routes[resource];

  // if there is ???something?? a call? a url? then do the following
  if (route) {
    try {

      // this is taking the request?? from the ???_______??? and makes it lowercase
      const routeHandlerFn = route[req.method.toLowerCase()];

      // this returns the info from coffeeRouter's res
      await routeHandlerFn(req, res);

      // unsure how all this error catching works
    } catch (err){
      console.error(err);

      // tells the client that an error of 500 occurred.
      res.statusCode = 500;

      // unsure what the message is pulling from
      res.end(err.message);
    }

    // unsure how this error differs from previous handling
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
};

// this exports the app to use in server.js
module.exports = app;
