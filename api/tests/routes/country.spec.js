const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app');
const { Country, conn } = require('../../src/db.js');

const agent = session(app);


describe("country routes", () => {
  describe("GET Countries", () => {
    it("should get 200", () => agent.get("/countries").expect(200)).timeout(
      20000
    );
    it('debería retornar un objeto en formato json', () =>
      agent.get('/countries').expect('Content-type', "application/json; charset=utf-8")
    );
    it('debería retornar la informacion de todos los países', (done) => {
      agent.get('/countries')
        .end((err, res) => {
          // console.log(res.body);
          expect(res.body).to.have.length(250);
          done();
        })
    }
    );

  });
});

// Test 2
describe('GET /countries?name=queryValue', () => {

  describe('GET countries?name=ua', () => {
    it('debería responder con un status 200 cuando hay coincidencias', () =>
      agent.get('/countries?name=Arg').expect(200)
    );

    it('debería retornar la informacion de los paises que matchean', (done) => {
      agent.get('/countries?name=ua')
        .end((err, res) => {
          // console.log(res.body);
          expect(res.body.length).is.greaterThan(0);
          done();
        })
    }
    );

  })
});
describe('GET /countries/:idPais', () => {

  describe('GET /countries/ecu', () => {
    it('debería responder con un status 200 cuando matchea con un país', () =>
      agent.get('/countries/ECU').expect(200)
    );

    it('debería retornar la informacion del país que matchea', (done) => {
      agent.get('/countries/ECU')
        .end((err, res) => {
          expect(res.body[0].name).includes("Ecuador");
          done();
        })
    });
  })
})
