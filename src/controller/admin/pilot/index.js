const database = require('../../../database');

module.exports = {
  create: async (req) => {
    const { cpf, nome, telefone, email, dataNascimento, cnh, dadosBancarios, documentoVeiculo, cnpj, senha} = req.body;
    return await database.query('CALL InsertPiloto(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [cpf, nome, telefone, email, dataNascimento, cnh, dadosBancarios, documentoVeiculo, cnpj, senha]);
  }
};