const Sequelize = require('sequelize');

const connection = new Sequelize('fernandodev_yahoobr','fernandodev_fernando','santana32',{
    host: '31.170.161.113',
    dialect:'mysql',
    timezone:"-03:00"
});

module.exports = connection