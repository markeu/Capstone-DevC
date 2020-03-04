import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../app';

chai.use(chaiHttp);
const { should, expect } = chai;
chai.should();
should();

const User1 = {
id: "swissman",
firstName: "Mark",
lastName: "Uchay",
email: "uche4@gmail.com",
gender: "Male",
jobRole: "Sales",
department: "Logistics",
address: "No 12 Adenekan street, Abuja",
avaterUrl: "none",
userRole: ''
};


const nullUser = {};

describe('Create Users', () => {
//   before('Before block', (done) => {
//     chai
//       .request(app)
//       .post('/api/v1/auth/create-user')
//       .send(User1)
//       .end((res) => {
//         console.log(res);
//         done();
//       });
//   });
  let adminToken;
  // it('It should add user to the database', (done) => {
  //   chai.request(app).post('/api/v1/auth/create-user').send(User1)
  //     .end((_err, res) => {
  //       expect(res).to.have.status(201);
  //       done();
  //     });
  // });

  // it('It should not add user to the database', (done) => {
  //   chai.request(app)
  //     .post('/api/v1/auth/create-user')
  //     .send(nullUser)
  //     .end((err, res) => {
  //       expect(res).to.have.status(422);
  //       expect(res.body).to.have.property('errors');
  //       expect(res.body.errors).to.have.property('email');
  //       done();
  //     });
  // });
  // it('Should authenticate request', (done) => {
  //   chai.request(app).post('/api/v1/auth/create-user').send(User1)
  //     .end((err, res) => {
  //       expect(res).to.have.status(401);
  //       expect(res.body).to.have.property('error');
  //       done();
  //     });
  // });

  // it('Should not allow none admin user', (done) => {
  //   const noneAdmin = {
  //     email: 'Uche5@gmail.com',
  //     password: 'password',
  //   };
  //   chai.request(app).post('/api/v1/auth/signin').send(noneAdmin)
  //     .end((err, res) => {
  //       const { token } = res.body.data;
  //       const tokenBearer = `Bearer ${token}`;
  //       chai.request(app).post('/api/v1/auth/create-user').set('Authorization', tokenBearer).send(User1)
  //         .end((err, res) => {
  //           expect(res).to.have.status(401);
  //           expect(res.body.error).to.eq('Access denied, only admins');
  //           done();
  //         });
  //     });
  // });

  // it('Should allow admin user to create user', (done) => {
  //   const admin = {
  //     email: 'admin@gmail.com',
  //     password: 'devcAdmin',
  //   };
  //   chai.request(app).post('/api/v1/auth/signin').send(admin)
  //     .end((err, res) => {
  //       const { token } = res.body.data;
  //       adminToken = `Bearer ${token}`;
  //       chai.request(app).post('/api/v1/auth/create-user').set('Authorization', adminToken)
  //         .send(User1)
  //         .end((err, res) => {
  //           expect(res).to.have.status(201);
  //           expect(res.body).to.have.property('data');
  //           done();
  //         });
  //     });
  // });
  // it('Should allow admin get all users', (done) => {
  //   chai.request(app).get('/api/v1/auth/users').set('Authorization', adminToken)
  //     .end((err, res) => {
  //       expect(res).to.have.status(200);
  //       expect(res.body).to.have.property('data');
  //       done();
  //     });
  // });
  it('Should create rootAdmin with valid secret', (done) => {
    const rootAdmin = {
      ...User1,
      secret: 'rootMan',
      userRole: 'admin',
    };
    chai.request(app).post('/api/v1/auth/create-user-root').send(rootAdmin)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.data.userRole).to.eq('admin');
        done();
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
});

// const User2 = {
//     firstName: 'Clara',
//     lastName: 'Smith',
//     email: 'smithC@gmail.com',
//     password: 'vanish',
//     gender: 'female',
//     jobRole: 'Receiptionist',
//     department: 'customer-success',
//     address: 'No 5, Braithwaite street Woji',
//   };

//   const User3 = {
//     lastName: 'kimutai',
//     email: 'KossyUche@gmail.com',
//     password: 'Augustine',
//     gender: 'female',
//     jobRole: 'Receiptionist',
//     department: 'customer-success',
//     address: 'No 5, Braithwaite street Woji',
//   };

//   const User4 = {
//     firstName: 'Clara',
//     email: 'smithC@gmail.com',
//     password: 'vanish',
//     gender: 'female',
//     jobRole: 'Receiptionist',
//     department: 'customer-success',
//     address: 'No 5, Braithwaite street Woji',
//   };

//   const User5 = {
//     firstName: 'Clara',
//     lastName: 'Florish',
//     password: 'vanish',
//     gender: 'female',
//     jobRole: 'Receiptionist',
//     department: 'customer-success',
//     address: 'No 5, Braithwaite street Woji',
//   };

//   const User6 = {
//     firstName: 'Clara',
//     lastName: 'Smith',
//     email: 'smithC@gmail.com',
//     gender: 'female',
//     jobRole: 'Receiptionist',
//     department: 'customer-success',
//     address: 'No 5, Braithwaite street Woji',
//   };
