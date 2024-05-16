const TABLA='producto';

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
    function agregar(body){
        return db.agregar(TABLA,body);
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