module.exports = function(app, passport) {

    var path = require('path')
    const db = require('./database.js').db
    const Sequelize = require('./database.js').Sequelize
    var bcrypt   = require('bcrypt-nodejs');

    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname + '/views/index.html'))
    })

    app.get('/login', function(req, res) {
        res.sendFile(path.join(__dirname + '/views/login.html'))
    })

    app.post('/login', passport.authenticate('localLogin', {
        successRedirect: '/protected',
        failureRedirect: '/login?code=-1'
    }))

    app.get('/getCurrentUser', function(req, res) {
        user = req.user
        if (user) delete user[password]
        res.json(req.user)
    })

    app.get('/signup', function(req, res) {
        res.sendFile(path.join(__dirname + '/views/signup.html'))
    })

    app.post('/signup', function(req, res) {
        const email = req.body.email
        const password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
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
            res.redirect('/login?code=1')
        }).catch(Sequelize.ValidationError, (err) => {
            res.redirect('/signup?code=-2')
        }).catch(Sequelize.DatabaseError, (err) => {
            console.log(err)
        })
    })

    app.get('/protected', isLoggedIn, function(req, res) {
        res.sendFile(path.join(__dirname + '/views/protected.html'))
    })

    app.get('/logout', function(req, res) {
        req.logout()
        res.redirect('/login?code=2')
    })
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next()
    res.redirect('/login')
}
