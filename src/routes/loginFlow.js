const bcrypt = require('../utils/bcrypt.js')

module.exports = function(path, app, dbClass, passport) {

    app.get('/login', function(req, res) {
        res.sendFile(path.join(__dirname + '/../views/login.html'))
    })

    app.post('/login', passport.authenticate('localLogin', {
        successRedirect: '/protected',
        failureRedirect: '/login?code=-1'
    }))

    app.get('/signup', function(req, res) {
        res.sendFile(path.join(__dirname + '/../views/signup.html'))
    })

    app.post('/signup', function(req, res) {

        const email = req.body.email
        const password = bcrypt.hash(req.body.password)
        const first_name = req.body.first_name
        const last_name = req.body.last_name
        const phone = req.body.phone

        dbClass.users.create({
            first_name: first_name,
            last_name: last_name,
            phone: phone,
            email: email,
            password: password, 
            verified: 1
        }).then(user => {
            res.redirect('/login?code=1')
        }).catch(dbClass.Sequelize.ValidationError, (err) => {
            res.redirect('/signup?code=-2')
            console.log(err)
        }).catch(dbClass.Sequelize.DatabaseError, (err) => {
            res.send("Database Error: " + err)
            console.log(err)
        })
    })

    app.get('/logout', function(req, res) {
        req.logout()
        res.redirect('/login?code=2')
    })
}