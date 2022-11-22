const { Tipo, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Tipo model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators Tipo model', () => {
    beforeEach(() => Tipo.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Tipo.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Tipo.create({ nombre: 'Copper' })
          .then(() => done())
          .catch(() => done(new Error('It requires a valid name')))
      });
    });
  });
});
