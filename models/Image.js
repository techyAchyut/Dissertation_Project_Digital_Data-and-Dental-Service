const {sequelize, DataTypes} = require('./sequelize');

const Image = sequelize.define('Image', {
    table_id: DataTypes.INTEGER,
    table_name: DataTypes.STRING,
    name: DataTypes.STRING,
    path: DataTypes.STRING,
    main: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Image;