const localStrategy = require('passport-local').Strategy
const db = require('./database.js').db
const Sequelize = require('./database.js').Sequelize
var bcrypt   = require('bcrypt-nodejs');

const userSchema = require('./schemas/user.js')(db, Sequelize)

module.exports = function(passport) {

    passport.use('localLogin', new localStrategy( function(username, password, callback) {
        
        userSchema.findOne({where:{[Sequelize.Op.or]: [{email: username}, {phone: username}]}}).then(user => {
            if (!user) return callback(null, false)
            if (!bcrypt.compareSync(password, user.password)) return callback(null, false)
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
