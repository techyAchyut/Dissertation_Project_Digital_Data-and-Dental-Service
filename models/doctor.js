const {sequelize, DataTypes} = require("./sequelize");

const Doctor = sequelize.define('Doctor', {
    title: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    gender: DataTypes.ENUM(['Male', 'Female', 'Other']),
    quote: DataTypes.STRING,
    facebook: {
        type: DataTypes.STRING,
        allowNull: true
    },
    twiter: {
        type: DataTypes.STRING,
        allowNull: true
    },
    google: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: DataTypes.TEXT
});

module.exports = Doctor;