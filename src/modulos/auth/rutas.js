const express =require('express');
const respuestas=require('../../red/respuestas');
const controllador=require('./index');
const router=express.Router();
router.post('/login',login);
async function login(req,res,next){
    try {
        const token =await controllador.login(req.body.usuario,req.body.password);
        respuestas.success(req,res,token,200);
    } catch (err) {
        next(err)
    }

};
module.exports=router;