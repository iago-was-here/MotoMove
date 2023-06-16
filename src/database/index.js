require('dotenv').config();
const mysql = require('mysql2/promise');

module.exports = {
  getConnection: async () => {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    return connection;
  },
  query: async (sql = '', values = []) => {
    const connection = await this.getConnection();
    try {
      const [rows, fields] = await connection.execute(sql, values);
      console.log(rows, fields);
      return rows;
    } catch (error) {
      return {error: true, message: error};
    } finally {
      connection.end();
    }
  }
};