module.exports = function(db, Sequelize) {
    return db.define('user', {
        uid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        phone: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        verified: Sequelize.BOOLEAN
    })
}