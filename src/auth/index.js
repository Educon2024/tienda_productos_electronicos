
const jwt=require('jsonwebtoken');
config = require('../config');
const secret =config.jwt.secret;

function asignarToken(data) {
    return jwt.sign(data,secret)
}

function verificarToken(token) {
    return jwt.verify(token,secret);
}

const chequearToken={
    confirmatoken:function (req,id) {
        const decodificada=decodificarCabecera(req);
        if (decodificada.id!==id) {
            throw new Error("no tienes privilegios para esto");
        }
    }
}
function obtenerToken(autorizacion) {
    if (!autorizacion) {
        throw new Error('no viene token');
    }
    if (autorizacion.indexOf('Bearer')===-1) {
        throw new Error('nFormato invalido');
    }
    let token = autorizacion.replace('Bearer ','');
    return token;
}
function decodificarCabecera(req) {
    const autorizacion=req.headers.authorization||'';
    const token=obtenerToken(autorizacion);
    const decodificado=verificarToken(token);
    req.user=decodificado;
    return decodificado;
    
}
module.exports={
    asignarToken,
    chequearToken
}