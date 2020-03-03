import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../app';

chai.use(chaiHttp);
const { should, expect } = chai;
chai.should();
should();

describe('Test for App landing page', () => {
  it('should return 200 success status', (done) => {
    chai.request(app)
      .get('/')
      .end((_err, res) => {
        expect(res).to.have.status(200);
        res.body.should.be.a('object');
        expect(res.body.message).to.equal('Welcome to CapstoneDev-C');
        done();
      });
  });
});