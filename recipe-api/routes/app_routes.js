const recipesController = require("../controllers/RecipesController.js")
const ingredientsController = require("../controllers/IngredientsController.js")

module.exports = (app) => {
    app.route("/recipes")
        .get(recipesController.getAll)
    //     .post(recipesController.createNew)    // Create
    app.route("/recipes/:id")
        .get(recipesController.getById)       // Read
    //     .put(recipesController.updateById)    // Update
    //     .delete(recipesController.deleteById) // Delete
}
module.exports = (app) => {
app.route("/ingredients")
.get(ingredientsController.getAll)
//     .post(ingredientsController.createNew)    // Create
app.route("/ingredients/:id")
.get(ingredientsController.getById)       // Read
//     .put(ingredientsController.updateById)    // Update
//     .delete(ingredientsController.deleteById) // Delete
}