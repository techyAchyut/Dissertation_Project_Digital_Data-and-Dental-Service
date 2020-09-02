const {sequelize, DataTypes} = require("./sequelize");

const Appointment = sequelize.define('Appointment', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    query: DataTypes.TEXT,
    email: DataTypes.STRING,
    date: DataTypes.DATE,
    branch: DataTypes.STRING,
    practice: DataTypes.STRING,
    purpose: DataTypes.STRING,
    approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Appointment;