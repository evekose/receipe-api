const ingredientsController = require("../controllers/IngredientsController.js")

module.exports = (app) => {
    app.route("/ingredients")
        .get(ingredientsController.getAll)
    //     .post(ingredientsController.createNew)    // Create
     app.route("/ingredients/:id")
        .get(ingredientsController.getById)       // Read
    //     .put(ingredientsController.updateById)    // Update
    //     .delete(ingredientsController.deleteById) // Delete
}