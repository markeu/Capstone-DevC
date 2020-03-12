import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import pool from '../../database/index';

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

  const user = {
    email:  'chiamaka@gmail.com',
    password: 'password'
  };

  describe('Article endpoint tests', () => {
    let token;
    before((done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(user)
        .end((err, res) => {
          token = res.body.data.token;
          done();
        });
    });

    it('Should add valid article to the database', (done) => {
        let Bearertoken = `Bearer ${token}`
      chai.request(app)
        .post('/api/v1/articles')
        .set('authorization', Bearertoken)
        .send(validArticle)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.data).to.be.an('object');
          expect(res.body).to.have.a.property('data');
          done();
        });
    });


    it('Should Get all articles', (done) => {
      let Bearertoken = `Bearer ${token}`
	  chai.request(app)
        .get('/api/v1/articles')
        .set('authorization', Bearertoken)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.data).to.be.an('array');
          expect(res.body).to.have.a.property('data');
		    done();
        });
    });

    it('Should Get a specific article', (done) => {
      let Bearertoken = `Bearer ${token}`
      chai.request(app)
        .get(`/api/v1/articles/${id}`)
        .set('authorization', Bearertoken)
		  .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.data).to.be.an('object');
          expect(res.body).to.have.a.property('data');
          done();
		  });
    });

    it('Should not edit article when supplied inexistent item id', (done) => {
      let Bearertoken = `Bearer ${token}`
      chai.request(app)
        .patch('/api/v1/articles/100')
        .set('authorization', Bearertoken)
        .send(editArticle)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it('Should update article', (done) => {
      let Bearertoken = `Bearer ${token}`
      chai.request(app)
        .patch(`/api/v1/articles/${id}`)
        .set('authorization', Bearertoken)
        .send(editArticle)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.a.property('data');
          done();
        });
		  });

    it('Should not be able to delete articles', (done) => {
      let Bearertoken = `Bearer ${token}`
      chai.request(app)
        .delete('/api/v1/articles/100')
        .set('authorization', Bearertoken)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it('Should be able to delete articles', (done) => {
      let Bearertoken = `Bearer ${token}`
      chai.request(app)
        .delete(`/api/v1/articles/${id}`)
        .set('authorization', Bearertoken)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.data).to.be.an('object');
          done();
        });
    });
  });
});




