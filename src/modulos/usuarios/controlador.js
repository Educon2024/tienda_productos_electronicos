const TABLA='usuarios';
const auth=require('../auth')
module.exports=function (dbintyectada) {
    let db=dbintyectada;
    if (!db) {
        db=require('../../DB/mysql');
    }
    function todos(){
        return db.todos(TABLA);
    }
    function uno(id){
        return db.uno(TABLA,id);
    }
    async function agregar(body){
        const usuario={
            id:body.id,
            nombre:body.nombre,
            correo:body.correo,
            dirreccion:body.dirreccion,	
            telefono:body.telefono,	
            rol:body.rol
        }

        const respuesta=await db.agregar(TABLA,usuario);
        var insertId=0;
        if (body.id==0) {
            insertId=respuesta.insertId;
        }else{
            insertId=body.id;
        }
        var respuesta2='';
        if (body.nombre||body.contraseña) {
            respuesta2 = await auth.agregar({
                id:insertId,
                usuario:body.correo,
                password:body.contraseña,	
                rol:body.rol
            })
        }

        return respuesta2
    }
    function eliminar(body){
        return db.eliminar(TABLA,body);
    }
    return{
        todos,
        uno,
        agregar,
        eliminar
    }
}