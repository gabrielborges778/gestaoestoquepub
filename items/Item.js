const Sequelize = require("sequelize");
const connection = require("../database/database");
const Classe = require("../classes/Classe")


const Item = connection.define("items", {
    codigo: {
        type: Sequelize.STRING,
        allowNull: true
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: true
    },

    medida: {
        type: Sequelize.STRING,
        allowNull: true

    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: true

    },
    valor: {
        type: Sequelize.STRING,
        allowNull: true

    }    
})

Classe.hasMany(Item);
Item.belongsTo(Classe);

//Item.sync({alter: true});


module.exports = Item;