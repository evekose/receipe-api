const { db } = require("../db")
const Ingredient = db.ingredients

exports.getAll = async (req, res) => {
 const ingredients = await Ingredient.findAll({attributes:["name"]})
 res.send(ingredients)
}

exports.getById = async (req, res) => {
  
    const ingredients = await Ingredient.findByPk(req.params.id)
    if (ingredients===null) {
        res.status(404).send({"error": "Ingredient not found"})
        return
    }
    res.send(ingredients)
}