const { rm, mkdir } = require('fs/promises');
const SimpleDb = require('../lib/simple-db');

describe('simple db', () => {
  const rootDir = './__tests__/store';

  beforeEach(async () => {
    await rm(rootDir, { force: true, recursive: true });
    await mkdir(rootDir, { recursive: true });
  });

  it('saved object has id', async () => {
    const db = new SimpleDb(rootDir);

    const felix = { name: 'felix', type: 'tuxedo' };

    await db.save(felix);
    expect(felix.id).toEqual(expect.any(String));
  });

  it('save and get an object', async () => {
    const db = new SimpleDb(rootDir);

    const felix = { name: 'felix', type: 'tuxedo' };
    await db.save(felix);
    const got = await db.get(felix.id);
    expect(got).toEqual(felix);
  });

  it('returns null for non-existant id', async () => {
    const db = new SimpleDb(rootDir);

    const got = await db.get('non-existant');
    expect(got).toBeNull();
  });

  it('gets all objects', async () => {
    const cats = [
      { name: 'felix', type: 'tuxedo' },
      { name: 'garfield', type: 'orange tabby' },
      { name: 'duchess', type: 'angora' },
    ];

    const db = new SimpleDb(rootDir);

    await Promise.all(cats.map(cat => db.save(cat)));
    const got = await db.getAll();
    expect(got).toEqual(expect.arrayContaining(cats));
  });

  it('deletes an object', async () => {
    const db = new SimpleDb(rootDir);

    const felix = { name: 'felix', type: 'tuxedo' };

    await db.save(felix);
    await db.delete(felix.id);
    const got = await db.get(felix.id);
    expect(got).toBeNull();
  });

  it('updates an object', async () => {
    const db = new SimpleDb(rootDir);

    const felix = { name: 'felix', type: 'tuxedo' };
    await db.save(felix);
      
    felix.type = 'tabby';
    await db.update(felix);
     
    const got = await db.get(felix.id);
    expect(got).toEqual(felix);
  });

});
