const database = require('../../../database');
const bcrypt = require('bcrypt');

module.exports = {
  create: async (req) => {
    const { cpf, nome, telefone, email, dataNascimento, senha } = req.body;
    const senhaHash = await bcrypt.hash(senha, 10);
    return await database.query('CALL InsertPassageiro(?, ?, ?, ?, ?, ?)', [cpf, nome, telefone, email, dataNascimento, senhaHash]);
  }
};