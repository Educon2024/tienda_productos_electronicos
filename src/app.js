const express=require('express');
const cors = require('cors');
const morgan=require('morgan');
const config =require('./config');

const clientes=require('./modulos/clientes/rutas');
const usuarios=require('./modulos/usuarios/rutas');
const error = require('./red/errors');
const auth = require('./modulos/auth/rutas');
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('port',config.app.port);


app.use('/api/clientes',clientes);
app.use('/api/usuarios',usuarios);
app.use('/api/auth',auth);
app.use(error)
module.exports=app;