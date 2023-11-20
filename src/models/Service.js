import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'roottester',
  password: '123456',
  port: 5432,
});

const createServiceTable = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL,
        price VARCHAR(255),
        info VARCHAR(255)
      );
    `);
  } catch (error) {
    console.error("Erro ao criar tabela de serviços:", error);
  } finally {
    client.release();
  }
};

export default createServiceTable;
