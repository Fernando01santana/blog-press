const express = require('express');
const router = express.Router();
const Article = require('./article');
const Category = require('../categories/category')
const slugify = require('slugify');

router.get('/articles',(req,res)=>{
    Article.findAll({
        order:[['id','DESC']],
        include:[{model:Category}]
    }).then(articles=>{
        Category.findAll().then(categories => {
            res.render('admin/articles/',{articles:articles,categories:categories});
        })
               
    })
})

router.get('/admin/articles/new',(req,res)=>{
    Category.findAll().then(categories=>{
        res.render("admin/articles/new",{categories:categories});
    })
})

router.post('/article/save',(req,res)=>{
    var title = req.body.title;
    var body = req.body.body;
    var idCategory = req.body.idCategory;
    if((title != undefined) && (body != undefined)){
        Article.create({
            title:title,
            slug:slugify(title),
            body:body,
            categoryId:idCategory
        }).then(()=>{
            console.log("insert category");
            res.redirect("/")
        })
    }else{
        res.redirect("/admin/articles/new")
    }
})

router.post('/articles/delete',(req,res)=>{
    var id = req.body.id;
    console.log(id)
    if((id != undefined) && (!isNaN(id))){
        Article.destroy({
            where:{
                id:id
            }
        }).then(()=>{
            res.redirect('/articles/');
        })
    }else{
        res.redirect('/articles/');
    }
})

router.post('/articles/edit',(req,res)=>{
    const id = req.body.id;
    Article.findByPk(id).then(article=>{
        Category.findAll().then(categories => {
            res.render('admin/articles/edit',{article:article,categories:categories});
        })
    }).catch(error => {
        console.log(error)
        res.redirect("/admin/articles")
    })
})



router.post('/articles/update',(req,res)=>{
    const id = req.body.id;
    const title = req.body.title;
    const body = req.body.body; 
    
    if((id != undefined) && (!isNaN(id))){

        Article.update({
            title:title,
            slug:slugify(title),
            body:body},{
            where:{
                id:id
            }
        }).then(()=>{
            res.redirect('/articles/');
        })
    }else{
        res.redirect('/articles/');
    }
})
module.exports = router;