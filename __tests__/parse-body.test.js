const { equal } = require('assert');
const EventEmitter = require('events');
const parseBody = require('../lib/parse-body.js');

it('returns null if method is not POST, PUT, or PATCH', async () => {
  expect(await parseBody({ method: 'GET' })).toBe(null);
  expect(await parseBody({ method: 'DELETE' })).toBe(null);
  expect(await parseBody({ method: 'KARL' })).toBe(null);

});

it('throws error if content-type is not application/json', async () => {
  // make a 'bad' content type req
  const req = {
    method: 'POST',
    headers: {
      'content-type': 'text/plain',
    },
  };
    // WHAT IS THIS???
  expect.assertions(1);
  
  try {
    await parseBody(req);
  } catch (e) {
    expect(e).toEqual('Content-Type must be application/json');
  }
});

it('returns deserialized body from req emitted events (using JSON.parse)', async () => {
  const req = new EventEmitter();
  req.headers = { 'content-type': 'application/json' };
  req.method = 'POST';
  const promise = parseBody(req);
  req.emit('data', '{"far":');
  req.emit('data', '"out"}');
  req.emit('end');

  const body = await promise;
  expect(body).toEqual({ far: 'out' });
});

it('throws if failure happens in deserialization', async () => {
  const req = new EventEmitter();
  req.headers = { 'content-type': 'application/json' };
  req.method = 'POST';
  const promise = parseBody(req);
  req.emit('data', '{"bad json"}');
  req.emit('end');

  // WHAT IS THIS???
  expect.assertions(1);

  try {
    await promise;
  } catch (e) {
    expect(e).toEqual('Bad JSON');
  }
});
