var localStrategy = require('passport-local').Strategy

// TODO: REMOVE
var user = {'id': 1, 'username': 'chakshutandon', 'password':'1234'}

module.exports = function(passport) {

    passport.use('localLogin', new localStrategy( function(username, password, callback) {
        // TODO: Verify credentials with Database and pass through callback. 
        // callback(null, false) <--> User does not exist or invalid credentials
        callback(null, user)
    }))

    passport.serializeUser(function(user, callback) {
        callback(null, user.id)
    })
      
    passport.deserializeUser(function(id, callback) {
        // TODO: Get user from id and pass through callback
        callback(null, user)
    })
}