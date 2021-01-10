const Sequelize = require('sequelize');
const connection = require('../database/database');
const Category = require('../categories/category');

const Article = connection.define('articles',{
    title:{
        type:Sequelize.STRING,
        allowNull:false
    },
    slug:{
     type:Sequelize.STRING,
     allowNull:false   
    },
    body:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    like:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    deslike:{
        type:Sequelize.INTEGER,
        allowNull:true
    }
})

Category.hasMany(Article);//1:N
Article.belongsTo(Category);//1:1

Article.sync({force:false})//sincroniza com o banco de dados
module.exports = Article;