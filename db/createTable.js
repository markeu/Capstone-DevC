import pool from './index';


const tablesQuerry = `    
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        gender VARCHAR(10) NOT NULL,
        jobRole TEXT NOT NULL,
        department TEXT NOT NULL,
        address TEXT NOT NULL,
        is_admin BOOLEAN NOT NULL
    );
`;

const createTable = () => {
  console.log('called');
  pool.query(`${tablesQuerry}`).then(() => {
    console.log('Tables created successfully');
    pool.end();
  })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


createTable();
