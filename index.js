const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const categoriesController = require('./categories/categoriesController');
const Article = require('./articles/article')
const Category = require('./categories/category')
const articlesController = require('./articles/articlesController');
const usersController = require('./user/userControler');
const user = require("./user/user");
const session = require('express-session');

app.set('view engine','ejs');

app.use(session({
    secret:"duncs",
    cookie:{maxAge:3000000},
    resave: true,
    saveUninitialized: true
}))

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
app.use("/",usersController);



//definindo rota raiz
app.get('/',(req,res)=>{
    res.render('admin/users/create');
})

app.get("/home",(req,res)=>{
    Article.findAll({
        order:[
            ['id','DESC']
        ]
    }).then(article => {
        Category.findAll().then(categories => {
            res.render('home',{article:article,categories:categories});
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

app.listen(process.env.PORT || 8080,()=>{
    console.log("SERVER ON");
})