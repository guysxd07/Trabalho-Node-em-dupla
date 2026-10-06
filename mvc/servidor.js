const express = require('express');
var session = require('express-session');
const app = express();
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use( express.static("public") );
app.use(session({
secret: '2C44-4D44-WppQ38S',
resave: false,
saveUninitialized: true
}));

// somente tem que adicionar essa parte que realiza a sincronização com o banco
(async () => {
 const database = require('./config/db');
 try {
 const resultado = await database.sync();
 console.log(resultado);
 } catch (error) {
 console.log(error);
 }
})();


const produtoController = require("./controller/produtoController");
const produtoController = require("./controller/produtoController");


app.get('/adicionar',produtoController.create); // rotas
app.post('/adicionar',produtoController.store);
app.get('/editar/:id',produtoController.edit);
app.post('/editar/:id',produtoController.update);
app.get('/apagar/:id',produtoController.destroy);
app.get('/', produtoController.index);
app.listen(3000,function(){
 console.log("Servidor Escutando na porta 3000");//rot
});