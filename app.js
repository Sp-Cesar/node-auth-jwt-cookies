//Importamos express
const express = require('express');
const path = require('path');
const app = express();

//Capturar datos del For
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Middleware para archivos estáticos (CSS, imágenes, JS)
app.use(express.static(path.join(__dirname, 'public')));

//Configurar el EJS
app.set('view engine', 'ejs')

//Usar las Rutas
app.use('/', require('./routes'));

app.listen(3000, () => {
    console.log('Servidor se esta ejecuntando en http://localhost:3000/login');
})
