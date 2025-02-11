const {sequelize,DataTypes}=require('./Sequelize')
const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      primaryKey: true, 
      allowNull: false,
      validate: {
        isEmail: true  
      }
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false,  
    }
  }, {
    tableName: 'Users',
    timestamps: false 
  });

module.exports=User;