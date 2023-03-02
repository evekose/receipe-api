module.exports = (sequelize, Sequelize, Recipe, Ingredient) => {
    const recipeIngredient = sequelize.define("recipeIngredient", {
      
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        recipeId: {
            type: Sequelize.INTEGER,
            references: {
                model: Recipe,
                key: "id",
            },
        },
        ingredientId: {
            type: Sequelize.INTEGER,
            references: {
                model: Ingredient,
                key: "id",
            },
        },
    })
  
    Ingredient.belongsToMany(Recipe, { through: recipeIngredient })
    Recipe.belongsToMany(Ingredient, { through: recipeIngredient })

    Ingredient.hasMany(recipeIngredient)
    recipeIngredient.belongsTo(Ingredient)
    Recipe.hasMany(recipeIngredient)
    recipeIngredient.belongsTo(Recipe)
  
    return recipeIngredient
  }