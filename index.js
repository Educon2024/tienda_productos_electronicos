const app=require('./src/app');

app.set("view engine","ejs");

app.get("/view",function(req,res){
    res.render("registro_cliente");
})
app.listen(app.get('port'),()=>{
    console.log("servidor escuchando el puerto",app.get("port"));
});