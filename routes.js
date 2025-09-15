const express = require('express');

const conexion = require('./models/bd');
const route = express.Router();
const jwt = require('jsonwebtoken');
const authController = require('./controllers/authController')

//FUNCION PARA PROTEGER
function verificarJWT (req, res, next){
    const token = req.cookies.token; //leemos la cookie
    if(!token){
        return res.redirect('/login');
    }
    jwt.verify(token, process.env.JWT_SECRET,(err, decoded)=>{
        if(err){
            console.log('Error verificando token: ', err);
            return res.redirect('/login'); // token inválido o expirado
        }
        req.user = decoded; //req.user almacena todos los datos del payload
        console.log(req.cookies);
        next();
    })
};

route.get('/login', (req, res)=>{
    const token = req.cookies.token;
    if(token){
        res.redirect('/dash');
    }else{
        res.render('auth/login', {datosErrore:''})
    }
});

route.get('/register', (req, res)=>{
    const token = req.cookies.token;
    if(token){
        return res.redirect('/dash');
    }
    res.render('auth/register')
});

route.get('/dash', verificarJWT, (req, res)=>{
    res.render('dashboard/dash',
        {nombre:req.user.nombre}
    )
    console.log(req.user.nombre)
});

route.get('/logout', (req,res)=>{
    res.clearCookie('token');  //borra la cookie que guarda el JWT
    res.redirect('/login');

})

route.post('/auth', authController.auth);
route.post('/register', authController.register)

module.exports= route;