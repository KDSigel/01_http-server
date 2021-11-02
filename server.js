/* eslint-disable no-console */
const http = require('http');
const app = require('./lib/app');
const PORT = 7890;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
