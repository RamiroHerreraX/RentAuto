//Código del servidor

//Se empieza la API Restful
const cors = require('cors');
const express = require('express');
const path = require('path');
const app = express();

//const indexRoutes = require('./routes/index');
const loginRoutes = require('./routes/tasks');

//settings
app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 3000);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


// moddlewares
// Funciones que se ejecutan antes de 
//recibir la información de los clientes
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
//app.use(indexRoutes);
app.use('/api',loginRoutes);

//Statics files
app.use(express.static(path.join(__dirname, 'dist')));

// start server
app.listen(3000, () => {
    console.log('Server on port', app.get('port'));
});
