const mysql = require('mysql');
const config = require('../config.js');
const { error } = require('../red/respuestas.js');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

let conexion;

function conexionmysql() {
    conexion = mysql.createConnection({
        host: dbconfig.host,
        user: dbconfig.user,
        password: dbconfig.password,
    });

    conexion.connect((err) => {
        if (err) {
            console.log('[db erro]', err);
            setTimeout(conexionmysql, 200);
        } else {
            console.log('Conexión a la base de datos establecida');
            crearBaseDeDatos();
        }
    });

    conexion.on('error', err => {
        console.log('[db erro]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            conexionmysql();
        } else {
            throw err;
        }
    });
}

function crearBaseDeDatos() {
    conexion.query(`CREATE DATABASE IF NOT EXISTS ${dbconfig.database}`, (err) => {
        if (err) {
            console.error('Error al crear la base de datos:', err);
        } else {
            console.log('Base de datos creada correctamente o ya existente');
            conexion.changeUser({ database: dbconfig.database }, (err) => {
                if (err) {
                    console.error('Error al seleccionar la base de datos:', err);
                } else {
                    console.log('Base de datos seleccionada correctamente');
                    crearTablas();
                }
            });
        }
    });
}

function crearTablas() {
    const createTablesSQL = `
    CREATE TABLE IF NOT EXISTS autenticacion (
        Id INT AUTO_INCREMENT PRIMARY KEY,
        usuario VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        rol INT(1) NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS producto (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        descripcion VARCHAR(255) NOT NULL,
        cantidad INT NOT NULL,
        preciocompra INT (100) NOT NULL,
        preciopublico INT (100) NOT NULL,
        imagen VARCHAR(255) NOT NULL,
        categoria VARCHAR(255) NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS usuarios (
        Id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        dirreccion VARCHAR(255) NOT NULL,
        correo VARCHAR(255) NOT NULL,
        telefono INT(20) NOT NULL,
        rol INT(1) NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS ventas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        usuario INT NOT NULL,
        fecha DATE NOT NULL,
        productos TEXT NOT NULL,
        total DECIMAL(10, 2) NOT NULL
    );
    `;

    const queries = createTablesSQL.split(';').filter(query => query.trim() !== '');

    queries.forEach(query => {
        conexion.query(query, (err) => {
            if (err) {
                console.error('Error al crear las tablas:', err);
            } else {
                console.log('Tabla creada correctamente o ya existente');
            }
        });
    });
}
function agregar(tabla,data){
    return new Promise((resolve,reject)=>{
        conexion.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?`,[data,data],(error,result)=>{
            return error ? reject(error):resolve(result)
        })
    });
}

// Llamar a la función de conexión para establecer la conexión inicial
conexionmysql();


//esta es la primera consulta
function todos(tabla){
    return new Promise((resolve,reject)=>{
        conexion.query(`SELECT * FROM ${tabla}`,(error,result)=>{
            return error ? reject(error):resolve(result)
        })
    });
}

function uno(tabla, id){
    return new Promise((resolve,reject)=>{
        conexion.query(`SELECT * FROM ${tabla} WHERE id=${id}`,(error,result)=>{
            return error ? reject(error):resolve(result)
        })
    });
}

function eliminar(tabla,data){
    return new Promise((resolve,reject)=>{
        conexion.query(`DELETE FROM ${tabla} WHERE id=?`,data.id,(error,result)=>{
            return error ? reject(error):resolve(result)
        })
    });
}
function query(tabla,consulta){
    return new Promise((resolve,reject)=>{
        conexion.query(`SELECT * FROM ${tabla} WHERE ?`,consulta,(error,result)=>{
            return error ? reject(error):resolve(result[0])
        })
    });
}
module.exports={
    todos,
    uno,
    agregar,
    eliminar,
    query
}