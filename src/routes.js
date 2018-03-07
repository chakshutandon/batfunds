module.exports = function(app, passport) {

    const db = require('./database.js').db
    const Sequelize = require('./database.js').Sequelize

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

    app.post('/signup', function(req, res) {
        const email = req.body.email
        const password = req.body.password
        const first_name = req.body.first_name
        const last_name = req.body.last_name
        const phone = req.body.phone

        const userSchema = require('./schemas/user.js')(db, Sequelize)

        // TODO: Hash password before storing in database
        userSchema.create({
            first_name: first_name,
            last_name: last_name,
            phone: phone,
            email: email,
            password: password, 
            verified: 1
        }).then(user => {
            // redirect and flash message
            res.redirect('/login')
        }).catch(Sequelize.ValidationError, (err) => {
            // flash message
            res.redirect('/signup')
        }).catch(Sequelize.DatabaseError, (err) => {
            console.log(err)
        })
    })

    app.get('/protected', isLoggedIn, function(req, res) {
        res.send(req.user.email + " has been successfully logged in!")
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