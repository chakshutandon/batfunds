var uid = "00529a96-e599-3fba-8424-2f7243abd6cc";

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

    router.route('/groups/')         // Whoever creates the group is also in it... get this from req.user DONE
        .post(function(req, res) {
            // var uid;
            // if (req.user) uid = req.user.dataValues.uid;
            // else {
            //     res.redirect('/login');
            //     return;
            // }
            var name = req.body.name;
            var desc = req.body.desc;
            if(name === undefined || desc === undefined) {
                res.status(400).json({success: 0, error: "Invalid Request"});
                return;
            }
            console.log(name + ' ' + desc);
            var group = dbClass.groups.create({
                name: name,
                description: desc
            }).then((group) => {
                var gid = group.dataValues.gid;
                dbClass.usersgroups.create({
                    uid: uid,
                    gid: gid
                }).then(() => {
                    console.log("Added " + uid + " to the group: " + name);
                }).catch(dbClass.Sequelize.DatabaseError, (err) => {
                    res.status(400).send("Database Error: " + err)
                    console.log(err)
                });
                res.sendStatus(201);
            }).catch(dbClass.Sequelize.DatabaseError, (err) => {
                res.status(500).json({success: 0, error: "Database Error: " + err});
                console.log(err)
            });
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
            // if (req.user) var uid = req.user.dataValues.uid;                                    // only allowed to see your own groups. Check if logged in.
            // else res.redirect('/login')

            dbClass.users.find({
                where: {
                    uid: uid
                }
            }).then((user) => {
                user.getGroups()
                .then((groups) => {
                    if(!groups) {
                        res.status(404).json({success: 0, error: "Error finding groups for user."});
                        return;
                    }
                    res.json({success: 1, groups: groups});
                });
            })
            .catch(dbClass.Sequelize.DatabaseError, (err) => {
                res.status(500).json({success: 0, error: "Database Error: " + err});
                console.log(err)
            });
        });

    router.route('/groups/:groupId/users/')
        .get(function(req, res) {
            res.setHeader('Content-Type', 'application/json');
            // var uid;
            // if (req.user) uid = req.user.dataValues.uid;
            // else {
            //     res.redirect('/login');
            //     return;
            // }
            var usergroup = dbClass.usersgroups.find({
                where: {
                    uid: uid,
                    gid: req.params.groupId
                }
            }).then(function (usergroup) {
                if(!usergroup) {
                    res.status(404).json({success: 0, error: "Error finding users for group."});
                    return;
                }
                var group = dbClass.groups.find({
                    where: {
                        gid: req.params.groupId
                    }
                }).then((group) => {
                    group.getUsers({
                        attributes: ['uid', 'first_name', 'last_name', 'email', 'username']
                    })
                    .then((users) => {
                        res.json({success: 1, users: users});
                    })
                })
                //console.log(dbClass.groups.prototype);
                /*console.log(group);
                var users = group.getUsers()
                .then((users) => {
                    res.json({success: 1, users: users});
                })*/
            }).catch(dbClass.Sequelize.DatabaseError, (err) => {
                res.status(500).json({success: 0, error: "Database Error: " + err});
                console.log(err)
            });
        });

    router.route('/groups/member')
        .post(function(req, res) {
            var username = req.body.username;   // add users by either email/username and not uid. Change query. DONE
            var gid = req.body.gid;
            if(username === undefined || gid === undefined) {
                res.status(400).json({success: 0, error: "Invalid Request"});
                return;
            }
            // var uid;
            // if (req.user) uid = req.user.dataValues.uid;
            // else {
            //     res.redirect('/login');
            //     return;
            // }
            dbClass.usersgroups.find({
                where: {
                    uid: uid,
                    gid: gid
                }
            }).then((usergroup) => {
                if(!usergroup) {
                    res.status(404).json({success: 0, error: "Error finding group."});
                    return;
                }
                dbClass.users.find({
                    where: {
                        [dbClass.Sequelize.Op.or]: [{username: username}, {email: username}]
                    }
                }).then((newUid) => {
                    if(!newUid) {
                        res.status(404).json({success: 0, error: "Error finding user."});
                        return;
                    }
                    dbClass.usersgroups.create({
                        uid: newUid.uid,
                        gid: gid
                    }).then(() => {
                        res.status(201).json({success: 1, message: "Successfully added " + username + " to group " + gid});
                    })
                })
            })
            .catch(dbClass.Sequelize.DatabaseError, (err) => {
                res.status(500).json({success: 0, error: "Database Error: " + err});
                console.log(err)
            })
        });

    router.route('/groups/member/:userId/:groupId')
        .delete(function(req, res) {                              // only allowed for groups you are in.
            var userId = req.params.userId;
            var groupId = req.params.groupId;
            if(userId === undefined || groupId === undefined) {
                res.status(400).json({success: 0, error: "Invalid Request"});
                return;
            }
            // if (req.user) uid = req.user.dataValues.uid;
            // else {
            //     res.redirect('/login');
            //     return;
            // }
            dbClass.usersgroups.find({
                where: {
                    uid: userId,
                    gid: groupId
                }
            }).then((usergroup) => {
                if(!usergroup) {
                    res.status(404).json({success: 0, error: "Error finding group."});
                    return;
                }
                dbClass.usersgroups.destroy({
                    where: {
                        uid : userId,
                        gid : groupId
                    }
                }).then(() => {
                    res.status(200).json({success: 1, message: "Successfully removed " + userId + " from group " + groupId});
                })
            })
            .catch(dbClass.Sequelize.DatabaseError, (err) => {
                res.status(500).json({success: 0, error: "Database Error: " + err});
                console.log(err)
            })
    });
}