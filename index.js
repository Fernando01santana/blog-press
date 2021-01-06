//importanto express
const express = require('express');
//invocando função express
const app = express();
//importando body-Parser
const bodyParser = require('body-parser');
//importanto conexao com o banco de dados
const connection = require('./database/database');
//importanto rotas do controler de categorias
const categoriesController = require('./categories/categoriesController');
//importanto controller de rotas de artigos
const articlesController = require('./articles/articlesController');
//view engine
app.set('view engine','ejs');

//static
app.use(express.static('public'));

//body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//connection
connection
    .authenticate()
    .then(()=>{
        console.log("connection start")
    })
    .catch((error)=>{
        console.log("error: "+error)
    })
//carregando controolers e definindo rotas
app.use("/",categoriesController);
app.use("/",articlesController);

//definindo rota raiz
app.get("/",(req,res)=>{
    res.render('index');
})

app.listen(8080,()=>{
    console.log("SERVER ON");
})