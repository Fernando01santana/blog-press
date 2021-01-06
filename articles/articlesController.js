const express = require('express');
const router = express.Router();

router.get('/articles',(req,res)=>{
    res.send('Pagina de artigos')
})
router.get('/admin/articles/new',(req,res)=>{
    res.send('Painel de admin')
})
module.exports = router;