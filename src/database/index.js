import { Pool } from 'pg';
import 'dotenv/config';


const pool = new Pool({
  connectionString: process.env.POSTGRES_DB_URL,
});

pool.on('connect', () => {
  console.log('connected to database');
});

export default pool;
