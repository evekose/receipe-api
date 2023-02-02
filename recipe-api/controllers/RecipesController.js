const { db } = require("../db")
const Recipe = db.recipes

exports.getAll = async (req, res) => {
 const recipes = await Recipe.findAll({attributes:["name"]})
 res.send(recipes)
}

exports.getById = async (req, res) => {
    const recipes = await Recipe.findByPk(req.params.id)
    res.send(recipes)
}