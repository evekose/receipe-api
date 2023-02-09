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
exports.createNew = async (req, res) => {
    let ingredient
    try {
        ingredient = await Ingredient.create(req.body)
    } catch (error) {
      if (error instanceof db.Sequelize.ValidationError) {
        res.status(400).send({"error":error.errors.map((item)=> item.message)})
      } else {
        console.log("IngredientsCreate: ",error)
        res.status(500).send({"error":"Something went wrong on our side. Sorry :("})
      }
      return
    }
    res
      .status(201)
      .location(`${getBaseUrl(req)}/ingredients/${ingredient.id}`)
      .json(ingredient)
  }
  
  getBaseUrl = (request) => {
    return (
      (request.connection && request.connection.encrypted ? "https" : "http") +
      `://${request.headers.host}`
    )
  }
  