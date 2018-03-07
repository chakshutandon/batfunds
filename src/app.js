const PORT = process.env.PORT || 8080

var express = require('express')
var app = express()
var passport = require('passport')

var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')

require('./passport.js')(passport)

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(session({secret: 'MGRNdBOox*wvG$J%TXpPrX1nVQ^i@3#fouW0xjLv!6LN&iy^', resave: true, saveUninitialized: false}))

app.use(passport.initialize())
app.use(passport.session())

require('./routes.js')(app, passport)

app.listen(PORT, function() {
    console.log("Server listening on port: " + PORT)
})