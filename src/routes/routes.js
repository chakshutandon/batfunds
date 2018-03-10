function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next()
    res.redirect('/login')
}

module.exports = function(path, app, dbClass, passport) {

    app.get('/', function(req, res) {
        if (req.user) res.redirect('/protected')
        res.sendFile(path.join(__dirname + '/../views/index.html'))
    })

    app.get('/getCurrentUser', function(req, res) {
        user = req.user
        if (user) delete user[password]
        res.json(user)
    })

    require('./loginFlow.js')(path, app, dbClass, passport)

    app.get('/protected', isLoggedIn, function(req, res) {
        res.sendFile(path.join(__dirname + '/../views/protected.html'))
    })

}
