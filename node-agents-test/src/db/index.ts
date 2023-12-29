import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'prompts',
  user: 'postgres',
  password: 'postgres',
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const sql = async (query: string) => {
  return await pool.query(query);
};

export { sql };
