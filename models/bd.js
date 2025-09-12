const mysql = require('mysql');
require('dotenv').config();

const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

conexion.connect((error)=>{
    if(error){
        console.log(error)
        return;
    }else{
        console.log('Se conecto a la base de datos correctamente!!!')
        console.log(process.env.DB_HOST)
    }
});

module.exports = conexion;