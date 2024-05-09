const app=require('./src/app');

app.listen(app.get('port'),()=>{
    console.log("servidor escuchando el puerto",app.get("port"));
});