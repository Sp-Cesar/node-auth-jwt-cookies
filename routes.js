const express = require('express');

const conexion = require('./models/bd');
const route = express.Router();
const authController = require('./controllers/authController')

route.get('/login', (req, res)=>{
    res.render('auth/login', {datosErrore:''})
})

route.get('/register', (req, res)=>{
    res.render('auth/register')
})

route.get('/dash', (req, res)=>{
    res.render('dashboard/dash')
})

route.post('/auth', authController.auth);

module.exports= route;