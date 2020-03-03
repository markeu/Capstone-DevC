import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';
import pool from '../db/index';

chai.use(chaiHttp);
const { should, expect } = chai;
chai.should();
should();

pool.query('SELECT MAX(id) from articles', (err, result) => {
  const id = result.rows[0].max + 1;

  const validArticle = {
    title: 'The voyage',
    article: 'The sojourn to addis-ababa is a heart wrenching adventure to the east coast of africa',
  };
  const editArticle = {
    title: 'The voyage',
    article: 'lorem isum of the messus',
  };

  const User1 = {
    firstName: 'Mark',
    lastName: 'Opusunju',
    email: 'mar@gmail.com',
    password: 'mickey',
    gender: 'male',
    jobRole: 'Trainee',
    department: 'Logistics',
    address: 'No 14 Clifford road',
  };

  describe('Article endpoint tets', () => {
    let token;
    before((done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(User1)
        .end((err, res) => {
          token = res.body.data.token;
          done();
        });
    });

    it('Should add valid article to the database', (done) => {
      chai.request(app)
        .post('/api/v1/article')
        .set('token', token)
        .send(validArticle)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.data).to.be.an('object');
          expect(res.body).to.have.a.property('data');
          done();
        });
    });


    it('Should Get all article', (done) => {
	  chai.request(app)
        .get('/api/v1/article')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body.status).to.equal('success');
          expect(res.body.data).to.be.an('array');
          expect(res.body).to.have.a.property('data');
		    done();
        });
    });

    it('Should not Get a null article', (done) => {
      chai.request(app)
        .get('/api/v1/1/article')
        .set('token', token)
		  .end((err, res) => {
          res.should.have.status(404);
          done();
		  });
    });

    it('Should not edit article when supplied inexistent item id', (done) => {
      chai.request(app)
        .patch('/api/v1/100/article')
        .set('token', token)
        .send({ title: 'My lover' })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('Should update article', (done) => {
      chai.request(app)
        .patch(`/api/v1/${id}/article`)
        .set('token', token)
        .send(editArticle)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property('data');
          done();
        });
		  });

    it('Should not be able to delete articles', (done) => {
      chai.request(app)
        .delete('/api/v1/100/article')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});
