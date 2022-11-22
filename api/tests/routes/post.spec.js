/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  nombre: 'Pikachu',
};

describe('Pokemon Post route', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));

  describe('POST /pokemons', () => {
    it('POST should add a new pokemon + return confirmation masasge', function () {
      const pokeNombre = "asdflkj"
      agent.post('/pokemons')
        .send({nombre: pokeNombre})
        .expect(200)
        .expect(function (res) {
          expect(res.body).to.equal({ msg: 'Personaje creado con exito' })
          expect(function (){
            const allPokemons = agent.get('/pokemons')
            const result = allPokemons.filter(p => p.nombre === pokeNombre)
            return result
          }()).to.have.lengthOf(1)
        })
    });
  });
});
