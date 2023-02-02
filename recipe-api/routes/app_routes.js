const recipesController = require("../controllers/RecipesController.js")

module.exports = (app) => {
    app.route("/recipes")
        .get(recipesController.getAll)
    //     .post(recipesController.createNew)    // Create
    // app.route("/recipes/:id")
    //     .get(recipesController.getById)       // Read
    //     .put(recipesController.updateById)    // Update
    //     .delete(recipesController.deleteById) // Delete
}