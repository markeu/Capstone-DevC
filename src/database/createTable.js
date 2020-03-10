import pool from './index';


const tablesQuerry = `    
    CREATE TABLE IF NOT EXISTS 
    users(
      "id" VARCHAR(128) PRIMARY KEY,
      "firstName" VARCHAR(128) NOT NULL,
      "lastName" VARCHAR(128) NOT NULL,
      "email" VARCHAR(128) NOT NULL,
      "password" VARCHAR(128) NOT NULL,
      "gender" VARCHAR(128) NOT NULL,
      "jobRole" VARCHAR(128) NOT NULL,
      "department" VARCHAR(128) NOT NULL,
      "address" VARCHAR(128) NOT NULL,
      "avaterUrl" VARCHAR(128),
      "userRole" VARCHAR(128),
      "secret" VARCHAR(128),
      UNIQUE(email)
    );

    CREATE TABLE IF NOT EXISTS
      articles(
        "id" SERIAL PRIMARY KEY,
        "ownerId" VARCHAR(128) NOT NULL REFERENCES users(id),
        "title" VARCHAR(128) NOT NULL,
        "article" TEXT NOT NULL,
        "createdOn" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "authorName" VARCHAR(128) NOT NULL,
        "share" boolean DEFAULT true,
        "coverImageUrl" VARCHAR(128) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS
      comments(
        "id" SERIAL PRIMARY KEY,
        "ownerId" VARCHAR(128) NOT NULL REFERENCES users(id),
        "postId" VARCHAR(128) NOT NULL,
        "createdOn" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "authorName" VARCHAR(128) NOT NULL,
        "comment" VARCHAR(128) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS
      gifs(
        "id" SERIAL PRIMARY KEY,
        "ownerId" VARCHAR(128) NOT NULL REFERENCES users(id),
        "title" VARCHAR(128) NOT NULL,
        "createdOn" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "authorName" VARCHAR(128) NOT NULL,
        "share" boolean DEFAULT true,
        "imageUrl" VARCHAR(128) NOT NULL
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
