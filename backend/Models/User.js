const { sequelize, DataTypes } = require('./Sequelize');

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        primaryKey: true, 
        allowNull: false,
        validate: {
            isEmail: true  
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    hash: {
        type: DataTypes.STRING,
        allowNull: false  
    }
}, {
    tableName: 'Users',
    timestamps: false 
});

module.exports = User;
