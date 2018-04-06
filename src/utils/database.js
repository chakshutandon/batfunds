const Sequelize = require('sequelize')

const config = require('../config/database.json')
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

const users = require('../schema/users.js')(db, Sequelize);
const groups = require('../schema/groups.js')(db,Sequelize);
const usersgroups = require('../schema/usersgroups.js')(db, Sequelize);

module.exports = {
    Sequelize: Sequelize,
    db: db,
    users: users,
    groups: groups,
    usersgroups: usersgroups
}