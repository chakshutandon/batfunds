module.exports = function (db, Sequelize) {
    return User = db.define('user', {
        uid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1
        },
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        phone: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        verified: Sequelize.BOOLEAN
    })
}