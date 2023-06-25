const database = require('../../../database');

module.exports = {
  create: async (req) => {
    const { cpf, nome, telefone, email, dataNascimento, senha} = req.body;
    return await database.query('CALL InsertPassageiro(?, ?, ?, ?, ?, ?)', [cpf, nome, telefone, email, dataNascimento, senha]);
  }
};