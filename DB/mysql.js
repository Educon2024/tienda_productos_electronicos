const mysql=require('mysql');
const config=require('../src/config.js');
const { error } = require('../src/red/respuestas.js');
const dbconfig={
    host:config.mysql.host,
    user:config.mysql.user,
    password:config.mysql.password,
    database:config.mysql.database,
}
let conexion;
function conexionmysql(){
    conexion=mysql.createConnection(dbconfig);

    conexion.connect((err)=>{
        if(err){
            console.log('[db erro]',err);
            setTimeout(conexionmysql,200);
        }
        else{
            console.log(" conectada");
        }
    });

    conexion.on('error',err=>{
        console.log('[db erro]',err);
        if(err.code==='PROTOCOL_CONNECTION_LOST'){
            conexionmysql();
        }
        else{
            throw err;
        }
    })
}
//esta es la primera consulta
conexionmysql();
function todos(tabla){
    return new Promise((resolve,reject)=>{
        conexion.query(`SELECT * FROM ${tabla}`,(error,result)=>{
            if(error)return reject(error);
            resolve(result);
        })
    });
}

function uno(tabla, id){

}

function agregar(tabla,datos){

}

function eliminar(tabla,id){

}

module.exports={
    todos,
    uno,
    agregar,
    eliminar,
}