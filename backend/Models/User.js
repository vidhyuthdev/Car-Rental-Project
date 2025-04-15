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

const Bookings = sequelize.define('Bookings', {
    bookingId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: User,
            key: 'email'
        },
        onDelete: 'CASCADE'
    },
    carId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cars,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    tableName: 'Bookings',
    timestamps: false
});
User.hasMany(Bookings, { foreignKey: 'email' });
Bookings.belongsTo(User, { foreignKey: 'email' });

Cars.hasMany(Bookings, { foreignKey: 'carId' });
Bookings.belongsTo(Cars, { foreignKey: 'carId' });

module.exports = {User,Cars,Bookings};
