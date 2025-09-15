
//Importamos express
const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');


//Capturar datos del For
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//MIDDELWARE
app.use(cookieParser()); // 👈 habilitar cookies

//Middleware para archivos estáticos (CSS, imágenes, JS)
app.use(express.static(path.join(__dirname, 'public')));

//Configurar el EJS
app.set('view engine', 'ejs')

//Usar las Rutas
app.use('/', require('./routes'));


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`El servidor se está ejecutando en http://localhost:${PORT}/login`);
});

