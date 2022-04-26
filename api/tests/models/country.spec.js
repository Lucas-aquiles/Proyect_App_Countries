const { Country, conn } = require('../../src/db.js');
const { expect } = require('chai');


const completeCountry = { name: "España", continent: "South America", flag_image: "www.imagenes/bandera.png", capital: "Madrid" };

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Country.sync({ force: true }));
    describe('name', () => {
      it('deberia lanzar un error si name es null', (done) => {

        Country.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('deberia validar si name es valido ', () => {
        Country.create({ name: 'Argentina' });
      });

    });
  });
});

describe('capital', () => {
  it('debería lanzar un error si el campo "capital" es null', (done) => {
    Country.create({ name: "España", flag_image: "www.imagenes/bandera.png" })
      .then(() => done(new Error('Se requiere una "capital" válida')))
      .catch(() => done());
  });
  it('debería funcionar cuando se envía una "capital" válida', () => {
    Country.create(completeCountry);
  });
})
