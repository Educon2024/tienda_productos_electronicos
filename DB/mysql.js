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
function insertar(tabla,data){
    return new Promise((resolve,reject)=>{
        conexion.query(`INSERT INTO ${tabla} SET ?`,data,(error,result)=>{
            return error ? reject(error):resolve(result)
        })
    });
}
function actualizar(tabla,data){
    return new Promise((resolve,reject)=>{
        conexion.query(`UPDATE  ${tabla} SET ? WHERE id=?`,[data,data.id],(error,result)=>{
            return error ? reject(error):resolve(result)
        })
    });
}
function agregar(tabla,datos){
    if (datos&&datos.id==0) {
        return insertar(tabla,datos);
    }
    else{
        return actualizar(tabla,datos);
    }
}

function eliminar(tabla,data){
    return new Promise((resolve,reject)=>{
        conexion.query(`DELETE FROM ${tabla} WHERE id=?`,data.id,(error,result)=>{
            return error ? reject(error):resolve(result)
        })
    });
}

module.exports={
    todos,
    uno,
    agregar,
    eliminar,
}