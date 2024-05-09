const express =require('express');
const cors = require('cors');
const respuestas=require('../../red/respuestas');
const controllador=require('./index');
const router=express.Router();
router.get('/',todos)
router.get('/:id',uno)
router.post('/',agregar)
router.put('/',eliminar)

async function todos(req,res,next){
    try {
        const items =await controllador.todos();
        respuestas.success(req,res,items,200);
    } catch (err) {
        next(err)
    }
};

async function uno(req,res,next){
    try {
        const items =await controllador.uno(req.params.id);
        respuestas.success(req,res,items,200);
    } catch (err) {
        next(err)
    }

};
async function agregar(req,res,next){
    try {
        const items =await controllador.agregar(req.body);
        if (req.body.id==0) {
            mensaje="item guardado con exito";
        }
        else{
            mensaje="item actualizado con exito";
        }
        respuestas.success(req,res,mensaje,201);
    } catch (err) {
        next(err)
    }

};
async function eliminar(req,res,next){
    try {
        const items =await controllador.eliminar(req.body);
        respuestas.success(req,res,' eliminado',200);
    } catch (err) {
        next(err)
    }

};

//
module.exports=router;