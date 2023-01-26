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
        },
        ingredientsAmount: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        howToMake: {
            type: Sequelize.STRING(4096),
            allowNull: false,
        },
        pictureURL: {
            type: Sequelize.STRING,
            allowNull: true
        }
        
    })

    return Recipe
}