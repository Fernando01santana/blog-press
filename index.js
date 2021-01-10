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
//importantdo models
const Article = require('./articles/article')
const Category = require('./categories/category')
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
    Article.findAll({
        order:[
            ['id','DESC']
        ]
    }).then(article => {
        Category.findAll().then(categories => {
            res.render('index',{article:article,categories:categories});
        })
    })
})

app.get("/:slug",(req,res)=>{
    const slug = req.params.slug;
    Article.findOne({
        where:{
            slug:slug
        }
    }).then(article=>{
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render('admin/articles/viewArticle',{article:article,categories:categories});
            })
        }else{
            res.redirect('/')
        }
    })
})
app.get('/articles/categorie/:slug',(req,res)=>{
    const slug = req.params.slug;
    console.log(slug)
    Category.findOne({
        where:{
            slug:slug
        },
        include:[{model:Article}]
    }).then(categories =>{
        Category.findAll().then(category=>{
            res.render('admin/articles/one',{articles:categories.articles,categories:category})
        })
    })
    .catch((error)=>{
            console.log(error)
            res.redirect('/')
    })
})

app.listen(8080,()=>{
    console.log("SERVER ON");
})