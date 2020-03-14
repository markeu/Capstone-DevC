import pool from './index';

const dropTables = () => {
  try {
    const queryText = `DROP TABLE IF EXISTS users CASCADE;
        DROP TABLE IF EXISTS comments CASCADE;
        DROP TABLE IF EXISTS gifs CASCADE;
        DROP TABLE IF EXISTS articles CASCADE;`;
    pool.query(queryText).then((res) => {
      console.log('Table succesfully dropped');
      pool.end();
    });
  } catch (error) {
    console.log(error);
    pool.end();
  }
};

dropTables();
