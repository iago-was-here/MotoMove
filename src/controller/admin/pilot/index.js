const database = require('../../../database');

const getAll = async function () {
  var query = `
    SELECT
      pt.cnh,
      u.nome
    FROM
      usuario u
    INNER JOIN piloto pt
      ON pt.cpf = u.cpf
  `;
  const [pilots] = await database.query(query);
  return pilots;
}

module.exports = {
  getAll,
  create: async (req) => {
    console.log(req.body);
    const { cpf, nome, telefone, email, dataNascimento, cnh, dadosBancarios, documentoVeiculo, cnpj, senha } = req.body;
    return await database.query('CALL InsertPiloto(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [cpf, nome, telefone, email, dataNascimento, cnh, dadosBancarios, documentoVeiculo, cnpj, senha]);
  },
};