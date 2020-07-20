const Sequelize = require("sequelize");
const connection = require("../database/database");

const Classe = connection.define("classes", {
    grupo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    classe: {
        type: Sequelize.STRING,
        allowNull: true
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: true
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

/*
Classe
    .sequelize
    .query('SET FOREIGN_KEY_CHECKS = 0', {raw: true})
    .then(function(results) {
        Classe.sync({force: true});
    });
*/


module.exports = Classe;