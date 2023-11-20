import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'roottester',
  password: '123456',
  port: 5432,
});


const createOpeningHoursTable = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS opening_hours (
        id SERIAL PRIMARY KEY,
        hours TEXT[] NOT NULL
      );
    `);
  } catch (error) {
    console.error("Erro ao criar tabela de horário de funcionamento:", error);
  } finally {
    client.release();
  }
};

export default createOpeningHoursTable;