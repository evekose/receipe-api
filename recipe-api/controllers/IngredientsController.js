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

  exports.deleteById = async (req, res) => {
    let result
    try{
      result = await Ingredient.destroy({where: {id: req.params.id}})
  } catch (error) {
    console.log("IngredientsDelete: ", error)
    res.status(500).send({error:"Something went wrong on our side. Sorry :("})
    return
  }
    if (result===0) {
        res.status(404).send({"error": "Ingredient not found"})
        return
    }
    
    res.status(204).send()
  }
  
  exports.updateById = async (req, res) => {
    let result
    delete req.body.id

    try {
      result = await Ingredient.update(req.body, {where: {id: req.params.id}})
    } catch (error) {
      if (error instanceof db.Sequelize.ValidationError) {
        res.status(400).send({"error":error.errors.map((item)=> item.message)})
      } else {
        console.log("IngredientsUpdate: ",error)
        res.status(500).send({"error":"Something went wrong on our side. Sorry :("})
      }
      return
    }
    if (ingredient[0]===0) {
      res.status(404).send({"error": "Ingredient not found"})
      return
    }
    const ingredient = await Ingredient.findByPk(req.params.id)
    res.status(200).location(`${getBaseUrl(req)}/ingredients/${ingredient.id}`).json(ingredient)
  }

  getBaseUrl = (request) => {
    return (
      (request.connection && request.connection.encrypted ? "https" : "http") +
      `://${request.headers.host}`
    )
  }
  