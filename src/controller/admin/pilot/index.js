const database = require('../../../database');
const bcrypt = require('bcrypt');

module.exports = {
  getForRaces: async () => {
    return await database.query('SELECT pt.cnh, u.nome FROM usuario u INNER JOIN piloto pt ON pt.cpf = u.cpf');
  },
  getAll: async () => {
    return await database.query('SELECT usuario.* FROM usuario INNER JOIN piloto WHERE usuario.cpf = piloto.cpf');
  },
  getByCpf: async (req) => {
    return await database.query('SELECT usuario.*, piloto.cnh, piloto.dadosBancarios, piloto.documentoVeiculo, piloto.cnpjEmpresa FROM usuario INNER JOIN piloto ON usuario.cpf = piloto.cpf WHERE piloto.cpf = ?', [req.params.cpf]);
  },
  create: async (req) => {
    const { cpf, nome, telefone, email, dataNascimento, cnh, dadosBancarios, documentoVeiculo, cnpj, senha } = req.body;
    return await database.query('CALL InsertPiloto(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [cpf, nome, telefone, email, dataNascimento, cnh, dadosBancarios, documentoVeiculo, cnpj ? cnpj : null, await bcrypt.hash(senha, 10)]);
  },
  delete: async (req) => {
    return await database.query('CALL DeletePiloto(?)', [req.params.cpf]);
  },
  update: async (req) => {
    const { cpf } = req.params;
    const { nome, telefone, email, dataNascimento, cnh, dadosBancarios, documentoVeiculo, cnpj, senha } = req.body;
    return await database.query('UPDATE piloto JOIN usuario ON piloto.cpf = usuario.cpf SET usuario.nome = ?, usuario.telefone = ?, usuario.email = ?, usuario.dataNascimento = ?, piloto.cnh = ?, piloto.dadosBancarios = ?, piloto.documentoVeiculo = ?, piloto.cnpjEmpresa = ? WHERE piloto.cpf = ?', [nome, telefone, email, dataNascimento, cnh, dadosBancarios, documentoVeiculo, cnpj, await bcrypt.hash(senha, 10), cpf]);
  }
};