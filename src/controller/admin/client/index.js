const database = require('../../../database');
const bcrypt = require('bcrypt');

module.exports = {
  getForRaces: async () => {
    return await database.query('SELECT pa.cpf, u.nome FROM usuario u INNER JOIN passageiro pa ON pa.cpf = u.cpf');
  },
  getAll: async () => {
    return await database.query('SELECT usuario.* FROM usuario INNER JOIN passageiro WHERE usuario.cpf = passageiro.cpf');
  },
  getByCpf: async (req) => {
    return await database.query('SELECT usuario.* FROM usuario WHERE cpf = ?', [req.params.cpf]);
  },
  create: async (req) => {
    const { cpf, nome, telefone, email, dataNascimento, senha } = req.body;
    return await database.query('CALL InsertPassageiro(?, ?, ?, ?, ?, ?)', [cpf, nome, telefone, email, dataNascimento, await bcrypt.hash(senha, 10)]);
  },
  delete: async (req) => {
    return await database.query('CALL DeletePassageiro(?)', [req.params.cpf]);
  },
  update: async (req) => {
    const { cpf, nome, telefone, email, dataNascimento, senha } = req.body;
    return await database.query('UPDATE passageiro JOIN usuario ON passageiro.cpf = usuario.cpf SET usuario.nome = ?, usuario.email = ?, usuario.telefone = ?, usuario.dataNascimento = ?, passageiro.senha = ? WHERE passageiro.cpf = ?;', [nome, email, telefone, dataNascimento, await bcrypt.hash(senha, 10), cpf]);
  },
};