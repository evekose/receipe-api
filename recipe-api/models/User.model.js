module.exports = (sequelize,Sequelize) => {
    const User = sequelize.define("User", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName:{
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName:{
            type: Sequelize.STRING
        }
    })
    return User
}