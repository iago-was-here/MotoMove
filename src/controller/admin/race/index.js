const db = require('../../../database/index');
const moment = require('moment');

const getAll = async function () {
  var query = `
        SELECT 
            passageiro.*,
            piloto.*,
            co.HorarioInicio horario_inicio,
            co.HorarioFinal horario_final,
            co.valor valor,
            lo.destino destino,
            lo.LocalizacaoPassageiro origem
        FROM
            corridas co
        INNER JOIN
        (
            SELECT 
                u.nome nome_passageiro,
                u.cpf cpf_passageiro
            FROM
                usuario u
            INNER JOIN passageiro pa 
                ON pa.cpf = u.cpf
            ) passageiro
            ON passageiro.cpf_passageiro = co.CPF_Passageiro 
        INNER JOIN
        (
            SELECT 
                u.nome nome_piloto,
                pt.cnh cnh_piloto
            FROM
                usuario u
            INNER JOIN piloto pt 
                ON pt.cpf = u.cpf
            ) piloto
            ON piloto.cnh_piloto = co.CNH_Piloto
        INNER JOIN localizacao lo
		    ON lo.id = co.ID_Localizacao
    `;
  const resultados = await db.query(query);
  const corridas = resultados.map(resultado => {
    const inicio = moment(resultado.horario_inicio);
    const fim = moment(resultado.horario_final);
    const duracao = moment.utc(moment.duration(fim.diff(inicio)).asMilliseconds()).format('HH:mm:ss');

    return {
      ...resultado,
      horario_inicio_formatado: inicio.format('DD/MM/YYYY HH:mm'),
      horario_final_formatado: fim.format('DD/MM/YYYY HH:mm'),
      duracao
    };
  });
  return corridas;
};

const create = async (req) => {
  const { cpf, cnh, localizacaoPassageiro, horarioInicial, horarioFinal, destino, valor } = req.body;
  var origemPiloto = 'Empresa';

  try {
    const localizacao = await db.query('INSERT INTO localizacao VALUES (?, ?, ?, ?)', ['', origemPiloto, localizacaoPassageiro, destino]);
    var idLocalizacao = localizacao.insertId;
    if (localizacao) {
      await db.query('INSERT INTO corridas VALUES (?, ?, ?, ?, ?, ?, ?)', ['', horarioFinal, horarioInicial, valor, cnh, cpf, idLocalizacao]);
    }
  } catch (error) {
    console.log('error');
  }
};

module.exports = {
  getAll,
  create
};