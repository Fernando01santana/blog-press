const express = require('express');
const Category = require('./category')
const slugify = require('slugify');
const router = express.Router();
const adminAuth = require('../middlewars/adminAuth');

router.get("/admin/categories/new",adminAuth,(req,res)=>{
    Category.findAll().then(categories=>{
    res.render('admin/categories/new',{categories:categories})
    })
})

router.get("/admin/categories",(req,res)=>{
    Category.findAll().then(categories=>{
        res.render("admin/categories/index.ejs",{categories:categories});
    })
})

router.post('/categories/delete',adminAuth,(req,res)=>{
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Category.destroy({
                where:{
                    id:id
                }
            }).then(()=>{
                res.redirect('/admin/categories')
            })
        }else{
            res.redirect('/admin/categories')
        }
    }else{
        res.redirect('/admin/categories/')
    }
})

router.post('/categories/edit/:id',adminAuth,(req,res)=>{
    var id = req.body.id;
    
    if(isNaN(id)){
        res.redirect("/admin/categories")
    }else{
        Category.findByPk(id).then(categoria => {
            if(categoria != undefined){
                Category.findAll().then(categories=>{
                res.render('admin/categories/edit',{categoria:categoria,categories:categories})
                })
            }else{
                res.redirect('/admin/categories')
            }
        }).catch(erro => {
            console.log(erro)
            res.redirect("/admin/categories")
        })        
    }

})

router.post('/categorie/update',adminAuth,(req,res)=>{
    var id = req.body.id;
    var title = req.body.title;

    Category.update({
        title:title,
        slug:slugify(title)},{
        where:{
            id:id
        }
    }).then(()=>{
        res.redirect('/admin/categories')
    }).catch(error =>{
        console.log(error)
    })
})
//pega os dados do formulario e salva no banco de dados
router.post("/categories/save",adminAuth,(req,res)=>{
    var title = req.body.title;
    if(title != undefined){
        Category.create({
            title:title,
            slug:slugify(title)
        }).then(()=>{
            res.redirect("/admin/categories")
        })
    }else{
        res.redirect("/admin/categories/new");
    }
})
module.exports = router;