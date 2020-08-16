const {sequelize, DataTypes} = require('./sequelize');
const Image = require('./Image');

const Hospital = sequelize.define('Hospital', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    est_date: DataTypes.DATE,
    type: {
        type: DataTypes.ENUM(['Goverment', 'Private', 'Semi-Government']),
        defaultValue: 'Private'
    },
    add1: DataTypes.STRING,
    add2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    city: DataTypes.STRING,
    zip: {
        type: DataTypes.STRING,
        allowNull: true
    },
    state: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: DataTypes.STRING,
    telephone: DataTypes.STRING
});

module.exports = Hospital;