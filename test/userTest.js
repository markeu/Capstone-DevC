import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';

chai.use(chaiHttp);
const { should, expect } = chai;
chai.should();
should();

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

const User2 = {
  firstName: 'Clara',
  lastName: 'Smith',
  email: 'smithC@gmail.com',
  password: 'vanish',
  gender: 'female',
  jobRole: 'Receiptionist',
  department: 'customer-success',
  address: 'No 5, Braithwaite street Woji',
};

const User3 = {
  lastName: 'kimutai',
  email: 'KossyUche@gmail.com',
  password: 'Augustine',
  gender: 'female',
  jobRole: 'Receiptionist',
  department: 'customer-success',
  address: 'No 5, Braithwaite street Woji',
};

const User4 = {
  firstName: 'Clara',
  email: 'smithC@gmail.com',
  password: 'vanish',
  gender: 'female',
  jobRole: 'Receiptionist',
  department: 'customer-success',
  address: 'No 5, Braithwaite street Woji',
};

const User5 = {
  firstName: 'Clara',
  lastName: 'Florish',
  password: 'vanish',
  gender: 'female',
  jobRole: 'Receiptionist',
  department: 'customer-success',
  address: 'No 5, Braithwaite street Woji',
};

const User6 = {
  firstName: 'Clara',
  lastName: 'Smith',
  email: 'smithC@gmail.com',
  gender: 'female',
  jobRole: 'Receiptionist',
  department: 'customer-success',
  address: 'No 5, Braithwaite street Woji',
};


const nullUser = {};

describe('Test for landing page and USER sign-in/sign-up', () => {
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
  before('Before block', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(User1)
      .end((res) => {
        console.log(res);
        done();
      });
  });

  it('It should add user to the database', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(User2)
      .end((_err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });

  it('It should not add user to the database', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(nullUser)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('It should return 400 for an undefined first name', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(User3)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('It should return 400 for an undefined last name', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(User4)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('It should return 400 for an undefined email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(User5)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('It should return 400 for an undefined password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(User6)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('Should login a user with valid inputs', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'mar@gmail.com', password: 'mickey' })
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        expect(res).to.have.status(201);
        done();
      });
  });

  it('Should login a user with invalid inputs', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'mr@gmail.com', password: 'mickey' })
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        expect(res).to.have.status(404);
        done();
      });
  });

  it('Should login a user with invalid inputs', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({ password: 'mickey' })
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        expect(res).to.have.status(400);
        done();
      });
  });

  it('Should not login a user with undefined email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({ email: '', password: 'mickey' })
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        expect(res).to.have.status(400);
        done();
      });
  });
});
