const express=require('express');
const config =require('./config');

const clientes=require('./modulos/clientes/rutas');
const app = express();

app.set('port',config.app.port)

app.use('/api/clientes',clientes)

module.exports=app;