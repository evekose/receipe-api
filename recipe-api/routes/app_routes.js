const recipesController = require("../controllers/RecipesController.js")

module.exports=(app)=>{
    app.route("/recipes")
        .get(recipesController.getAll)
        .post(recipesController.createNew) //CREATE
    app.route("/recipe/:id")
        .get(recipesController.getById) //READ
        .put(recipesController.updateById) //Update
        .delete(recipesController.deleteById) //Delete
} 