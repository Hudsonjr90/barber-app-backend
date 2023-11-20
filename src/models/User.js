import pg from "pg";
import bcrypt from "bcrypt";

const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'roottester',
  password: '123456',
  port: 5432,
});

const createUserTable = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        avatar VARCHAR(255) NOT NULL,
        background VARCHAR(255) NOT NULL
      );
    `);
  } catch (error) {
    console.error("Erro ao criar tabela de usuários:", error);
  } finally {
    client.release();
  }
};

const createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const client = await pool.connect();
  try {
    await client.query(`
      INSERT INTO users (name, username, email, password, avatar, background)
      VALUES ($1, $2, $3, $4, $5, $6)
    `, [userData.name, userData.username, userData.email, hashedPassword, userData.avatar, userData.background]);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
  } finally {
    client.release();
  }
};

export { createUserTable, createUser };
