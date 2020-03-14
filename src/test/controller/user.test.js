import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';

import app from '../../app';

chai.use(chaiHttp);
const { should, expect } = chai;
chai.should();
should();

const User1 = {
  id: 'swissman',
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  gender: 'female',
  jobRole: 'support assist',
  department: 'support',
  address: faker.address.streetAddress(),
};

describe('Create Users', () => {
  let adminToken;
  it('It should error for invalid request data', (done) => {
    const testUser = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: 'invalidMail',
      password: faker.internet.password(),
    };
    chai.request(app).post('/api/v1/auth/create-user').send(testUser).end((err, res) => {
      if (err) throw Error(`Error making test request ${route}`);
      expect(res).to.have.status(422);
      expect(res.body).to.have.property('errors');
      expect(res.body.errors).to.have.property('email');
      done();
    });
  });
  it('Should authenticate request', (done) => {
    chai.request(app).post('/api/v1/auth/signin').send(User1).end((err, res) => {
      if (err) throw Error(`Error making test request ${route}`);
      expect(res).to.have.status(401);
      expect(res.body).to.have.property('error');
      done();
    });
  });
  it('Should not allow none admin user', (done) => {
    const noneAdmin = {
      email: 'chiamaka@gmail.com',
      password: 'password',
    };
    chai.request(app).post('/api/v1/auth/signin').send(noneAdmin).end((err, res) => {
      const { token } = res.body.data;
      const tokenBearer = `Bearer ${token}`;
      chai.request(app).post('/api/v1/auth/signin').set('authorization', tokenBearer).send(User1)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.error).to.eq('Authorization failed');
          done();
        });
    });
  });
  it('Should allow admin user to create user', (done) => {
    const admin = {
      email: 'admin@gmail.com',
      password: 'mickey',
    };
    chai.request(app).post('/api/v1/auth/signin').send(admin)
      .end((err, res) => {
        const { token } = res.body.data;
        adminToken = `Bearer ${token}`;
        chai.request(app).post('/api/v1/auth/create-user').set('authorization', adminToken)
          .send(User1)
          .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.body).to.have.property('data');
            done();
          });
      });
  });
  it('Should prevent creating rootAdim with invalid secret', (done) => {
    const rootAdmin = {
      ...User1,
      secret: 'unknow secret',
      userRole: 'admin',
    };
    chai.request(app).post('/api/v1/auth/create-user-root').send(rootAdmin)
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });
  it('Should allow admin get all users', (done) => {
    chai.request(app).get('/api/v1/auth/users').set('authorization', adminToken).end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('data');
      done();
    });
  });
});
