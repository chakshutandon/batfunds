module.exports = function(app, passport) {
    app.get('/', function(req, res) {
        res.send("Home")
    })

    app.get('/login', function(req, res) {
        res.send("Login")
    })

    app.post('/login', passport.authenticate('localLogin', {
        successRedirect: '/protected',
        failureRedirect: '/login'
        // flash messages
    }))

    app.get('/signup', function(req, res) {
        res.send("Signup")
    })

    app.get('/protected', isLoggedIn, function(req, res) {
        res.send(req.user.username + " has been successfully logged in!")
    })

    app.get('/logout', function(req, res) {
        req.logout()
        res.redirect('/')
    })
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next()
    res.redirect('/login')
}