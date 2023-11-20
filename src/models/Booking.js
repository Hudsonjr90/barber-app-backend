import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'roottester',
  password: '123456',
  port: 5432,
});

const createBookingTable = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        service VARCHAR(255) NOT NULL,
        barber VARCHAR(255) NOT NULL,
        date VARCHAR(255) NOT NULL,
        hour VARCHAR(255) NOT NULL,
        userId INTEGER REFERENCES users(id) NOT NULL
      );
    `);
  } catch (error) {
    console.error("Erro ao criar tabela de reservas:", error);
  } finally {
    client.release();
  }
};

export default createBookingTable;
