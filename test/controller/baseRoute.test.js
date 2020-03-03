import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../app';

chai.use(chaiHttp);
const { should, expect } = chai;
chai.should();
should();


describe('Test for landing page and USER sign-in/sign-up', () => {
  it('should return 200 success status', (done) => {
    chai.request(app).get('/').end((_err, res) => {
      expect(res).to.have.status(200);
      res.body.should.be.a('object');
      expect(res.body.message).to.equal('Welcome to CapstoneDev-C');
      done();
    });
  });

  it('should return 404 for a non-found route', (done) => {
    chai.request(app).get('/badRoute').end((_err, res) => {
      expect(res).to.have.status(404);
      done();
    });
  });
});
