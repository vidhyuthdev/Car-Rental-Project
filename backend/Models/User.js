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
// const Cars = sequelize.define('Cars', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true, 
//         allowNull: false
//     },
//     model: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     location: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     registrationNumber: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true 
//     },
//     type: {
//         type: DataTypes.ENUM('Electric', 'Petrol', 'Diesel'),
//         allowNull: false
//     },
//     price: {
//         type: DataTypes.INTEGER,  // or DataTypes.DECIMAL if you want to store it as a float
//         allowNull: false,
//         validate: {
//             min: 0  // Make sure the price is not negative
//         }
//     }
// }, {
//     tableName: 'Cars',
//     timestamps: false
// });
const Cars = sequelize.define('Cars', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    registrationNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
    },
    type: {
        type: DataTypes.ENUM('Electric', 'Petrol', 'Diesel'),
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    imageURL: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: true
        }
    }
}, {
    tableName: 'Cars',
    timestamps: false
});

module.exports = {User,Cars};
