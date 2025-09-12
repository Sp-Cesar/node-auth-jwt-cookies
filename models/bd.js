const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dblogin'
});

conexion.connect((error)=>{
    if(error){
        console.log(error)
        return;
    }else{
        console.log('Se conecto a la base de datos correctamente!!!')
    }
});

module.exports = conexion;