const Sequelize = require('sequelize');

const connection = new Sequelize('guiapress','root','',{
    host: '',
    dialect:'mysql',
    timezone:"-03:00"
});

module.exports = connection