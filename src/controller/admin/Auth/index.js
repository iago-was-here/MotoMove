/* eslint-disable no-redeclare */
const db = require('../../../database/index');
const bcrypt = require('bcrypt');
const passageiro = 1;

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const [usuario] = await db.query('SELECT * FROM usuario WHERE Email = ?', [email]);
    try {
      if (usuario.tipoUsuario == passageiro) {
        var [usuarioFinal] = await db.query('SELECT * FROM passageiro WHERE cpf = ?', [usuario.cpf]);
      } else {
        var [usuarioFinal] = await db.query('SELECT * FROM piloto WHERE cpf = ?', [usuario.cpf]);
      }

      if (usuario) {
        bcrypt.compare(senha, usuarioFinal.senha, (err, isMatch) => {
          if (isMatch) {
            req.session.usuario = usuarioFinal;
            return res.redirect('/admin');
          } else {
            return res.redirect('/');
          }
        });
      }
    } catch (error) {
      console.log(error);
      return res.redirect('/');
    }
  } catch (error) {
    console.log(error);
    return res.redirect('/');
  }
};

module.exports = {
  login
};