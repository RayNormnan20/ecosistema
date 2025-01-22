const sequelize = require('sequelize');
//Configurar las variables de entorno
require("dotenv").config({path:"./properties.env"});

const conexion= new sequelize(process.env.DB_DATABASE,process.env.DB_USER,process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
});

module.exports=conexion;