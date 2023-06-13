const User = require('../models/user');

const UserController = {
    index: async (req, res) => {
        res.render('inicio');
    },
    createUser: async (req, res) => {
        try {
            const userData = req.body;
            const userId = await User.create(userData);

            res.status(201).json({ userId });
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            res.status(500).json({ error: 'Erro ao criar usuário' });
        }
    },

    // Implemente outras operações do controlador, como buscar, atualizar e excluir usuários
};

module.exports = UserController;
