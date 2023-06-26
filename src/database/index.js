require('dotenv').config();
const mysql = require('mysql2/promise');

async function getConnection() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  return connection;
}
async function query(sql = '', values = []) {
  const connection = await this.getConnection();
  try {
    const [rows] = await connection.execute(sql, values);
    return rows;
  } catch (error) {
    return { error: true, message: error };
  } finally {
    connection.end();
  }
}

module.exports = {
  getConnection,
  query
};