const express = require('express');
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcryptjs');

router.get('/admin/users/',(req,res)=>{
    res.render('admin/users/create');
})

router.post('/admin/users/create',(req,res)=>{
    const email = req.body.email;
    const pass = req.body.pass;
    const confPass = req.body.pass1;

    if(pass === confPass){
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(confPass,salt);

        User.findOne({where:{email:email}}).then(user=>{
            if(user == undefined){

                User.create({
                    email:email,
                    password:hash
                }).then(()=>
                res.redirect('/'))
                .catch((err) => {
                    alert("Usuario ja cadastrado")
                    res.redirect('/home')
                })

            }else{
                res.redirect('/');
            }
        })
    }
})

router.get('/users/admin/list',(req,res)=>{
    User.findAll().then(users=>{
        res.render('admin/users/listUser',{users:users})
    })
})

router.post('/users/login',(req,res)=>{
    User.findAll({
        where:{
            user:user
        }
    })
})

User.sync({foce:false})
module.exports = router;