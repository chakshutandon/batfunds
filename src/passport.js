const localStrategy = require('passport-local').Strategy
const db = require('./database.js').db
const Sequelize = require('./database.js').Sequelize

const userSchema = require('./schemas/user.js')(db, Sequelize)

module.exports = function(passport) {

    passport.use('localLogin', new localStrategy( function(username, password, callback) {
        userSchema.findOne({where:{email: username}}).then(user => {
            if (!user) return callback(null, false)
            if (user.password != password) return callback(null, false)
            return callback(null, user)
        }).catch(function(err) {
            return callback(err)
        })
    }))

    passport.serializeUser(function(user, callback) {
        callback(null, user.uid)
    })
      
    passport.deserializeUser(function(id, callback) {
        userSchema.findOne({where:{uid: id}}).then(result => {
            callback(null, result)
        })
    })
}