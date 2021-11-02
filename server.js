/* eslint-disable no-console */

// use this library? to do the things server needs to do
const http = require('http');

// get what's coming from app.js 
const app = require('./lib/app');

// this is the port that server is listening to in case a client "calls" it?
const PORT = 7890;

// this creates a server from the app???
const server = http.createServer(app);

// this sends back a message if ??something?? calls it.
server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
