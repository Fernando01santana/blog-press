const express = require('express');
const router = express.Router();
const Article = require('./article');
const slugify = require('slugify');

router.get('/articles',(req,res)=>{
    res.send('Pagina de artigos');
})
router.get('/admin/articles/new',(req,res)=>{
    res.render("admin/articles/new");
})

router.post('/article/save',(req,res)=>{
    var title = req.body.title;
    var body = req.body.body;

    if((title != undefined) && (body != undefined)){
        Article.create({
            title:title,
            slug:slugify(title),
            body:body
        }).then(()=>{
            console.log("insert category");
            res.redirect("/")
        })
    }else{
        res.redirect("/admin/articles/new")
    }
})
module.exports = router;