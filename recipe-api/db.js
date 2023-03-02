const Sequelize = require("sequelize")
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: "mariadb",
        dialectOptions: {
            connectTimeout:1000},
        define: {
            timestamps: false
        }
    }
)

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.recipes = require("./models/Recipe.model")(sequelize,Sequelize)
db.ingredients = require("./models/Ingredient.model")(sequelize,Sequelize)
db.recipeIngredients = require("./models/RecipeIngredient.model")(sequelize, Sequelize, db.recipes, db.ingredients)


async function Sync() {
    await sequelize.sync({alter:true}) //alter existing table
    //                  {force:true} erase and recreate
}

module.exports = {db, Sync }