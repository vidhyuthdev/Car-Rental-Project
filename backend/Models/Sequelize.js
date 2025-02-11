const {Sequelize,DataTypes}=require('sequelize');
const dotenv=require('dotenv').config();
const sequelize = new Sequelize(process.env.DB_URI,{logging:false});
module.exports={sequelize,DataTypes};