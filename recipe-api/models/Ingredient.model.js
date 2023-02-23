module.exports=(sequelize, Sequelize) =>{
    const Ingredient=sequelize.define("ingredient", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        category: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        amount: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        
    })

    return Ingredient
}