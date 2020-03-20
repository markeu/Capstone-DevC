import { Pool } from 'pg';
import 'dotenv/config';

// DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to database');
});

export default pool;
