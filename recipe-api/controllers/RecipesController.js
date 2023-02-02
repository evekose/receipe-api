const { db } = require("../db")
const Recipe = db.recipes

exports.getAll = async (req, res) => {
 const recipes = await Recipe.findAll({attributes:["name"]})
 res.send(recipes)
}