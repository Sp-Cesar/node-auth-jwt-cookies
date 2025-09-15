const conexion = require('../models/bd');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = async(req, res)=>{
    const user = req.body.user;
    const pass = req.body.pass;
    if(user && pass){
        conexion.query('SELECT * FROM usuarios WHERE user = ?', [user],async(error,results)=>{
            // Si no se encuentra el usuario
            if (results.length === 0 || !(await bcrypt.compare(pass, results[0].pass))){
                res.render('auth/login', { datosErrore:'Contrasena o Usuario incorrecto'})
            }else{
                //Generamos el token
                const token = jwt.sign(
                    { //Informacion compartida (PAYLOAD)
                        id: results[0].id,
                        user:results[0].user,
                        nombre: results[0].nombre,
                    },
                    //clave secreta
                    process.env.JWT_SECRET,
                    {//tiempo de expiracion
                        expiresIn: process.env.JWT_EXPIRES
                    }
                );
                //Guardamos token en cookie
                res.cookie('token', token, {
                    httpOnly: true, //JS no pueda acceder 
                    secure: false, //true sirve para https:
                    sameSite:'strict'
                });
                //confirma su identificacion
                res.redirect('/dash');
            }
        })
    }else{
        
        res.render('auth/login', { datosErrore:'Ingrese los datos requeridos'});
    }
};

exports.register = async(req, res)=>{
    const nombre = req.body.nombre;
    const user = req.body.user;
    const pass = req.body.pass;
    let passHash = await bcrypt.hash(pass, 8);
    console.log('Hash generado para la contraseña:', passHash);
    console.log('Valores a insertar:', nombre, user, passHash);
    conexion.query('INSERT INTO usuarios SET ?', {nombre:nombre, user:user, pass:passHash},(error,results)=>{
        if(error){
            console.log(error);
        }else{
            console.log('Usuario registrado con éxito:', results);
            res.redirect('/login');
        }
    })
};