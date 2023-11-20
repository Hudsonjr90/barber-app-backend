import pkg from 'pg';
const { Pool } = pkg;

const connectDataBase = async () => {
  console.log("Aguarde, conectando ao banco de dados...");

  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'roottester',
    password: '123456',
    port: 5432,
  });

  try {
    // Testa a conexão
    const client = await pool.connect();
    console.log("Conectado ao PostgreSQL");

    // Criação de tabela (substitua com sua própria estrutura)
    await client.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255),
        email VARCHAR(255),
        senha VARCHAR(255)
      );
    `);

    // Encerra a conexão
    client.release();
  } catch (error) {
    console.error("Erro de conexão:", error);
  } finally {
    // Encerra a pool de conexão
    await pool.end();
  }
};

export default connectDataBase;
