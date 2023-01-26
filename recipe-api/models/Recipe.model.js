module.exports=(sequelize, Sequelize) =>{
    const Recipe=sequelize.define("recipe", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    })

    return Recipe
}