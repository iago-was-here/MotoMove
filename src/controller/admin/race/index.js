const db = require('../../../database/index');

const getAll = async function () {
  var query = `
        SELECT 
            passageiro.*,
            piloto.*,
            co.HorarioInicio horario_inicio,
            co.HorarioFinal horario_final,
            co.Duracao duracao,
            co.valor valor,
            lo.destino destino
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
        INNER JOIN localizacao lo
		    ON lo.id = co.ID_Localizacao
    `;
  const [races] = await db.query(query);
  return races;
};

module.exports = {
  getAll
};