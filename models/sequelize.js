const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize('dental', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = {sequelize, DataTypes};