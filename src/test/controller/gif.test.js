import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'promise-fs';
import path from 'path';
import app from '../../app';
import pool from '../../database/index';

chai.use(chaiHttp);
const { should, expect } = chai;
chai.should();
should();

pool.query('SELECT MAX(id) from gifs', (err, result) => {
    const id = result.rows[0].max + 1;
  
    const user = {
        email:  'chiamaka@gmail.com',
        password: 'password'
      };
    
  
    describe('Gif controller test', () => {
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
  
      it('Should add gif post to the database', (done) => {
        let Bearertoken = `Bearer ${token}`
        chai.request(app)
          .post('/api/v1/gif')
          .set('authorization', Bearertoken)
          .field('title', 'Testing my gifs')
          .attach('image', fs.readFileSync('./src/temp/gif.png'), 'gif.png')
          .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.body.data).to.be.an('object');
            expect(res.body).to.have.a.property('data');
            done();
          });
      });

      it('Should not add gif post to the database', (done) => {
        let Bearertoken = `Bearer ${token}`
        chai.request(app)
          .post('/api/v1/gif')
          .set('authorization', Bearertoken)
          .field('title', 'Testing my gifs')
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error');
            done();
          });
      });

      it('should add comment', (done) => {
        const payload = { comment: 'hello i love your post' };
        let Bearertoken = `Bearer ${token}`
        chai.request(app)
          .post(`/api/v1/gif/${id}/comment`)
          .set('authorization', Bearertoken)
          .send(payload)
          .end((err, res) => {
            if (err) throw Error('Error making request');
            expect(res).to.have.status(201);
            expect(res.body).to.have.property('data');
            done();
          });
      });

      it('should not add comment for non existing postId', (done) => {
        const payload = { comment: 'hello i love your post' };
        let Bearertoken = `Bearer ${token}`
        chai.request(app)
          .post('/api/v1/gif/100/comment')
          .set('authorization', Bearertoken)
          .send(payload)
          .end((err, res) => {
            if (err) throw Error('Error making request');
            expect(res).to.have.status(500);
            expect(res.body).to.have.property('error');
            done();
          });
      });

    it('should get feeds', (done) => {
        const route = '/api/v1/feed';
        let Bearertoken = `Bearer ${token}`
        chai.request(app)
          .get(route)
          .set('authorization', Bearertoken)
          .end((err, res) => {
            if (err) throw Error('Error making request');
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('data');
            done();
          });
      });

      it('should get specific articles', (done) => {
        let Bearertoken = `Bearer ${token}`
        chai.request(app)
          .get(`/api/v1/gif/${id}`)
          .set('authorization', Bearertoken)
          .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('data');
          done();
        });
      });

    it('should delete gif', (done) => {
        let Bearertoken = `Bearer ${token}`
        chai.request(app)
          .delete(`/api/v1/gif/${id}`)
          .set('authorization', Bearertoken)
          .end((err, res) => {
            if (err) throw Error('Error making request');
            expect(res).to.have.status(200);
            done();
          });
      });

      it('send not found for none existing gif', (done) => {
        const dontExist = '012-20394-2039';
        let Bearertoken = `Bearer ${token}`
        chai.request(app)
          .delete(`/api/v1/gif/${dontExist}`)
          .set('authorization', Bearertoken)
          .end((err, res) => {
            if (err) throw Error('Error making request');
            expect(res).to.have.status(404);
            done();
          });
      });
    });
});
