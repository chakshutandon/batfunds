module.exports = function(router, dbClass) {
    router.route('/groups/:groupId')
        .get(function(req, res) {
            res.setHeader('Content-Type', 'application/json');
            var group = dbClass.groups.find({
                where: {
                    gid: req.params.groupId
                }
            }).then(function (group) {
                if(!group) {
                    res.status(404).json({success: 0, error: "Group not found"});
                    return;
                }
                res.json({success: 1, group: group});
            })
        });

    router.route('/groups/')                                                                    // Whoever creates the group is also in it... get this from req.user
        .post(function(req, res) {
            var name = req.body.name;
            var desc = req.body.desc;
            if(name === undefined || desc === undefined) {
                res.status(400).json({success: 0, error: "Invalid Request"});
                return;
            }
            console.log(name + ' ' + desc);
            dbClass.groups.create({
                name: name,
                desc: desc
            }).then(() => {
                res.status(201).send("Successfully added " + name);                                 // json response (see above)
            }).catch(dbClass.Sequelize.DatabaseError, (err) => {
                res.status(400).send("Database Error: " + err);                                     // json response
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
                    res.status(404).json({success: 0, error: "User not found"});
                    return;
                }
                delete user.dataValues['password'];
                res.json({success: 1, user: user});
            })
        });

    router.route('/user/groups/')
        .get(function(req, res) {
            res.setHeader('Content-Type', 'application/json');
            if (req.user) uid = req.user.dataValues.uid;                                    // only allowed to see your own groups. Check if logged in.
            else res.redirect('/login')
            var groups = dbClass.usersgroups.findAll({
                where: {
                    uid: req.params.userId
                }
            }).then(function (groups) {
                if(!groups) {
                    res.status(404).json({success: 0, error: "Error finding groups for user."});
                    return;
                }
                res.json({success: 1, groups: groups});
            })
        });

    router.route('/groups/:groupId/users/')
        .get(function(req, res) {
            res.setHeader('Content-Type', 'application/json');
                                                                                            // only allowed to see members of groups you are in.
            var users = dbClass.usersgroups.findAll({
                where: {
                    gid: req.params.groupId
                }
            }).then(function (users) {
                if(!users) {
                    res.status(404).json({success: 0, error: "Error finding users for group."});
                    return;
                }
                res.json({success: 1, users: users});
            })
        });

    router.route('/groups/member')
        .post(function(req, res) {
            var uid = req.body.uid;                                                        // add users by either email/username and not uid. Change query.
            var gid = req.body.gid;
            if(uid === undefined || gid === undefined) {
                res.status(400).json({success: 0, error: "Invalid Request"});
                return;
            }
            console.log(uid + ' ' + gid);
            dbClass.usersgroups.create({
                uid: uid,
                gid: gid
            }).then(() => {
                res.status(201).send("Successfully added " + uid + " to group " + gid);             // json response
            }).catch(dbClass.Sequelize.DatabaseError, (err) => {
                res.status(400).send("Database Error: " + err)                                      // json response
                console.log(err)
            })
        });

    router.route('/groups/member/:userId/:groupId')
        .delete(function(req, res) {                                                    // only allowed for groups you are in.
            var userId = req.params.userId;
            var groupId = req.params.groupId;
            if(uid === undefined || gid === undefined) {
                res.status(400).send("Invalid Request");                                // json
                return;
            }
            console.log(uid + ' ' + gid);
            dbClass.usersgroups.destroy({
                where: {
                    uid : userId,
                    gid : groupId
                }
            }).then(() => {
                res.status(201).send("Successfully removed " + uid + " from group " + gid);                 // json
            }).catch(dbClass.Sequelize.DatabaseError, (err) => {
                res.status(400).send("Database Error: " + err)                                              // json
                console.log(err)
            })
    });
}