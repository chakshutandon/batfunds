// module.exports = function() {
//     const Sequelize = require('sequelize');

//     const config = require('./config/database.json')

//     database = config.database
//     username = config.username
//     password = config.password
//     options = config.options

//     const db = new Sequelize(database, username, password, options)

//     db.authenticate().then(() => {
//         console.log('Connection has been established successfully.')
//     }).catch(err => {
//         console.error('Unable to connect to the database:', err)
//     })

//     return db, Sequelize
// }

const config = require('./config/database.json')
const Sequelize = require('sequelize');

database = config.database
username = config.username
password = config.password
options = config.options

const db = new Sequelize(database, username, password, options)
db.authenticate().then(() => {
    console.log('Connection has been established successfully.')
}).catch(err => {
    console.error('Unable to connect to the database:', err)
})

module.exports.db = db
module.exports.Sequelize = Sequelize