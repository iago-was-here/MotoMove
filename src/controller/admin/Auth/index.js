const db = require('../../../database/index');
const bcrypt = require('bcrypt');

const authenticate = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

// const login = async (req, res) => {
//     const { email, password } = req.body;
//     const [user] = db.query('SELECT * FROM usuario WHERE Email = ?', [email]);

//     if (user) {
//         bcrypt.compare(password, user[0].password, (err, isMatch) => {
//             if (isMatch) {
//                 req.session.user = user[0];
//                 return res.redirect('/admin');
//             } else {
//                 res.cookie('errorMessage', 'Senha incorreta');
//                 return res.redirect('/#register');
//             }
//         });
//     } else {
//         res.cookie('errorMessage', 'Usuário não encontrado');
//         return res.redirect('/');
//     }
// }

module.exports = {
    login
}