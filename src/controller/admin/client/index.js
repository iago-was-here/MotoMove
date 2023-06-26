const database = require('../../../database');
const bcrypt = require('bcrypt');

const getAll = async function () {
  var query = `
      SELECT
        pa.cpf,
        u.nome
      FROM
        usuario u
      INNER JOIN passageiro pa
        ON pa.cpf = u.cpf
    `;
  const clients = await database.query(query);
  return clients;
}

module.exports = {
  getAll,
  create: async (req) => {
    const { cpf, nome, telefone, email, dataNascimento, senha } = req.body;
    const senhaHash = await bcrypt.hash(senha, 10);
    return await database.query('CALL InsertPassageiro(?, ?, ?, ?, ?, ?)', [cpf, nome, telefone, email, dataNascimento, senhaHash]);
  },
};