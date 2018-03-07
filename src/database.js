const Sequelize = require('sequelize');

const config = require('./config/database.json')

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

const User = db.define('user', {
    uid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1
    },
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    phone: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    verified: Sequelize.BOOLEAN,
    date: Sequelize.DATE
})

User.create({
    first_name: "Chakshu",
    last_name: "Tandon",
    phone: "9143343273",
    email: "chakshutandon@gmail.com",
    password: "123456789",
    verified: 1
}).then(user => {
    console.log(user.toJSON())
}).catch(Sequelize.ValidationError, (err) => {
    // Duplicate user (email)
    console.log(err)
})
