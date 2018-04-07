const PORT = process.env.PORT || 8080

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport'
)
const router = express.Router()
const app = express()

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(session({secret: 'MGRNdBOox*wvG$J%TXpPrX1nVQ^i@3#fouW0xjLv!6LN&iy^', resave: true, saveUninitialized: false}))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const dbClass = require('./utils/database.js')

require('./utils/passport.js')(passport, dbClass)

app.use(passport.initialize())
app.use(passport.session())

require('./routes/routes.js')(path, app, dbClass, passport, router)

app.use('/api', router);

app.listen(PORT, () => {
    console.log("Server listening on port: " + PORT)
})