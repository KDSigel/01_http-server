const VALID = ['POST', 'PUT', 'PATCH'];

const parseBody = async (req) => {

  if (!VALID.includes(req.method)) return null;

  return new Promise((resolve, reject) => {

    // If the content-type of the request is anything other than JSON, throw an error
    if (req.headers['content-type'] !== 'application/json') {
      reject('Content-Type must be application/json');
      return;
    }

    // Create a variable to store our request body in
    let data = '';

    // Assemble each "chunk" of the request body as its received
    req.on('data', (chunk) => {
      data += chunk;
    });

    // Once we're done receiving data from the client, 'end' is
    // called and our `data` variable holds the entirety of the request body
    req.on('end', async () => {
      try {
        resolve(JSON.parse(data));
      } catch (err) {
        reject('Bad JSON');
      }
    });
  });
};

module.exports = parseBody;
