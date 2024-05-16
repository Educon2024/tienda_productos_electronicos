const TABLA='autenticacion';
const auth=require('../../auth')
const bcrypt=require('bcrypt')
module.exports=function (dbintyectada) {
    let db=dbintyectada;
    if (!db) {
        db=require('../../DB/mysql');
    }
async function login(usuario,password){
    const data =await db.query(TABLA,{usuario:usuario});
    return bcrypt.compare(password,data.password).then(resultado=>{
        if (resultado===true) {
            //generar token
            return auth.asignarToken({...data})
        }
        else{
            throw new Error('informacion invalida')
        }
    })
}
    async function agregar(data){
        const authData={
            id:data.id,
        }
        if (data.usuario) {
            authData.usuario=data.usuario
        }
        if (data.password) {
            authData.password=await bcrypt.hash(data.password.toString(),5)
        }
        if (data.rol) {
            authData.rol=data.rol
        }
        return db.agregar(TABLA,authData);
    }

    return{
        agregar,login
    }
}