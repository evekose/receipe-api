const { db } = require("../db")
const Recipe = db.recipes

exports.getAll = async (req, res) => {
 const recipes = await Recipe.findAll({attributes:["name"]})
 res.send(recipes)
}

exports.getById = async (req, res) => {
    const recipes = await Recipe.findByPk(req.params.id)
    if (recipes === null) {
        res.status(404).send({"error": "Recipe not found"})
        return
    }
    res.send(recipes)
}

exports.createNew = async (req,res) => {
    let game
    try {
        game = await Recipe.create(req.body)
    } catch (error) {
        if (error instanceof db.Sequelize.ValidationError) {
            res.status(400).send({"error":error.errors.map((item)=> item.message)})
        } else {
            console.log("RecipesCreate: ",error)
            res.status(500).send({"error":"Something went wrong on our side. Sorry :("})
        }
        return
    }
    res
        .status(201)
        .location(`${getBaseUrl(req)}/games/${recipe.id}`)
        .json(recipe)
}

getBaseUrl = (request) => {
    return (
      (request.connection && request.connection.encrypted ? "https" : "http") +
      `://${request.headers.host}`
    )
  }