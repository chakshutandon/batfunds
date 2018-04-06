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

const dbClass = require('./utils/database.js')

require('./utils/passport.js')(passport, dbClass)

app.use(passport.initialize())
app.use(passport.session())

require('./routes/routes.js')(path, app, dbClass, passport)

router.route('/groups/:groupId')
    .get(function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        var group = dbClass.groups.find({
            where: {
                gid: req.params.groupId
            }
        }).then(function (group) {
            if(!group) {
                res.status(404).send('Not Found');
            }
            res.send(group);
        })
    });
router.route('/groups/')
    .post(function(req, res) {
        var name = req.body.name;
        var desc = req.body.desc;
        if(name === undefined || desc === undefined) {
            res.status(400).send("Invalid Request");
            return;
        }
        console.log(name + ' ' + desc);
        dbClass.groups.create({
            name: name,
            desc: desc
        }).then(() => {
            res.status(201).send("Successfully added " + name);
        }).catch(dbClass.Sequelize.DatabaseError, (err) => {
            res.status(400).send("Database Error: " + err)
            console.log(err)
        })
    });

router.route('/users/:userId')
    .get(function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        var user = dbClass.users.find({
            where: {
                uid: req.params.userId
            }
        }).then(function (user) {
            if(!user) {
                res.status(404).send('Not Found');
            }
            res.send(user);
        })
    });

router.route('/users/:userId/groups/')
    .get(function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        var groups = dbClass.usersgroups.findAll({
            where: {
                uid: req.params.userId
            }
        }).then(function (groups) {
            if(!groups) {
                res.status(404).send('Not Found');
            }
            res.send(groups);
        })
    });

router.route('/groups/:groupId/users/')
    .get(function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        var users = dbClass.usersgroups.findAll({
            where: {
                gid: req.params.groupId
            }
        }).then(function (users) {
            if(!users) {
                res.status(404).send('Not Found');
            }
            res.send(users);
        })
    });

router.route('/usergroups/')
    .post(function(req, res) {
        var uid = req.body.uid;
        var gid = req.body.gid;
        if(uid === undefined || gid === undefined) {
            res.status(400).send("Invalid Request");
            return;
        }
        console.log(uid + ' ' + gid);
        dbClass.usersgroups.create({
            uid: uid,
            gid: gid
        }).then(() => {
            res.status(201).send("Successfully added " + uid + " to group " + gid);
        }).catch(dbClass.Sequelize.DatabaseError, (err) => {
            res.status(400).send("Database Error: " + err)
            console.log(err)
        })
    });

router.route('/usergroups/:userId/:groupId')
    .delete(function(req, res) {
        var userId = req.params.userId;
        var groupId = req.params.groupId;
        if(uid === undefined || gid === undefined) {
            res.status(400).send("Invalid Request");
            return;
        }
        console.log(uid + ' ' + gid);
        dbClass.usersgroups.destroy({
            where: {
                uid : userId,
                gid : groupId
            }
        }).then(() => {
            res.status(201).send("Successfully removed " + uid + " from group " + gid);
        }).catch(dbClass.Sequelize.DatabaseError, (err) => {
            res.status(400).send("Database Error: " + err)
            console.log(err)
        })
    });

app.use('/api', router);

app.listen(PORT, () => {
    console.log("Server listening on port: " + PORT)
})