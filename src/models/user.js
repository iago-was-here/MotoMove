const mysql = require(`${__dirname}/config/db`);

const User = {
    create: async (userData) => {
        try {
            const query = `INSERT INTO usuarios (cpf, nome, telefone, email, data_de_nascimento, senha) VALUES (?, ?, ?, ?, ?, ?)`;
            const values = [userData.cpf, userData.nome, userData.telefone, userData.email, userData.dataDeNascimento, userData.senha];
            const [rows] = await mysql.connection.query(query, values);

            return rows.insertId; // Retorna o ID do usuário inserido
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw error;
        }
    },

    // Implemente outras operações do modelo, como buscar, atualizar e excluir usuários
};

module.exports = User;
