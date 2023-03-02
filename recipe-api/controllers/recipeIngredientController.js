const { db } = require("../db")
const Ingredient = db.ingredients
const Recipe = db.recipes
const RecipeIngredient = db.recipeIngredients
const Sequelize = require("sequelize")

RecipeIngredient.belongsTo(Recipe, { foreignKey: 'recipeId' })
RecipeIngredient.belongsTo(Ingredient, { foreignKey: 'ingredientId' })

exports.getAll = async (req, res) => {
    try {
        const recipes = await Recipe.findAll()
        const ingredients = await Ingredient.findAll()
        const recipeIngredientPromises = []

        for (const recipe of recipes) {
            for (const ingredient of ingredients) {
                if (recipe.ingredient === ingredient.name) {
                    recipeIngredientPromises.push(RecipeIngredient.findOrCreate({
                        where: {
                            recipeId: recipe.id,
                            ingredientId: ingredient.id
                        },
                        defaults: {
                            recipeId: recipe.id,
                            ingredientId: ingredient.id
                        }
                    }))
                }
            }
        }

        await Promise.all(recipeIngredientPromises)

        const recipeIngredients = await RecipeIngredient.findAll({
            include: { all: true },
            logging: console.log
        })

        const result = recipeIngredients.map((af) => {
            return {
                "name": af.recipe.name,
                "fingredient": af.ingredient.name
            }
        })

        res.send(result)
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: "Something went wrong on our side. Sorry" })
    }
}



getBaseUrl = (request) => {
    return (
      (request.connection && request.connection.encrypted ? "https" : "http") +
      `://${request.headers.host}`
    )
}
