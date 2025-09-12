const conexion = require('../models/bd');
const bcrypt = require('bcrypt');

exports.auth = async(req, res)=>{
    const user = req.body.user;
    const pass = req.body.pass;
    if(user && pass){
        conexion.query('SELECT * FROM usuarios WHERE user = ?', [user],async(error,results)=>{
            // Si no se encuentra el usuario
            if (results.length === 0 || !(await bcrypt.compare(pass, results[0].pass))){
                res.render('auth/login', { datosErrore:'Contrasena o Usuario incorrecto'})
            }else{
                //confirma su identificacion
                res.redirect('/dash');
            }
        })
    }else{
        
        res.render('auth/login', { datosErrore:'Ingrese los datos requeridos'});
    }
};