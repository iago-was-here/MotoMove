const db = require('../../../database/index');
const bcrypt = require('bcrypt');
const passageiro = 1;
const piloto = 2;

const authenticate = (req, res, next) => {
    if (req.session.usuario) {
        next();
    } else {
        res.redirect('/');
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [usuario] = await db.query('SELECT * FROM usuario WHERE Email = ?', [email]);
        try {
            if (usuario.tipoUsuario == passageiro) {
                var [usuarioFinal] = await db.query('SELECT * FROM passageiro WHERE cpf = ?', [usuario.cpf]);
            } else {
                var [usuarioFinal] = await db.query('SELECT * FROM piloto WHERE cpf = ?', [usuario.cpf]);
            }

            if (usuario) {
                bcrypt.compare(password, usuarioFinal.senha, (err, isMatch) => {
                    if (isMatch) {
                        req.session.usuario = usuario;
                        return res.redirect('/admin');
                    } else {
                        res.cookie('errorMessage', 'Senha incorreta');
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
        res.cookie('errorMessage', 'Usuário não encontrado');
        return res.redirect('/');
    }
}

module.exports = {
    login,
    authenticate
}