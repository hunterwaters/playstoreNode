const supertest = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('GET /apps', () => {
  it('should return an array of apps with no params', () => {
    return supertest(app)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf.at.least(1);
        const app = res.body[0];
        expect(app).to.include.all.keys(
          'App', 'Category', 'Rating', 'Genres'
        );
      })
  });


  it('should return array of apps sorted according to slection', () => {
    return supertest(app)
      .get('/apps?sort=App')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf.at.least(1);
        const app = res.body[0];
        expect(app).to.include.all.keys(
          'App', 'Category', 'Rating', 'Genres'
        );
      })
  });

  it('should return an array of apps of selected genre', () => {
    return supertest(app)
      .get('/apps?genres=Arcade')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf.at.least(1);
        const app = res.body[0];
        expect(app).to.include.all.keys(
          'App', 'Category', 'Rating', 'Genres'
        );
      })
  });

})