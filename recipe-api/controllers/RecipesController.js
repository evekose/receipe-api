const { db } = require("../db")
const Recipe = db.recipes

exports.getAll = async (req, res) => {
 const recipes = await Recipe.findAll({attributes:["id","name"]})
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
    let recipe
    try {
        recipe = await Recipe.create(req.body)
    } catch (error) {
        if (error instanceof db.Sequelize.ValidationError) {
            res.status(400).send({error: error.errors.map((item)=> item.message)})
        } else {
            console.log("RecipesCreate: ",error)
            res
                .status(500)
                .send({"error":"Something went wrong on our side. Sorry :("})
        }
        return
    }
    res
        .status(201)
        .location(`${getBaseUrl(req)}/recipes/${recipe.id}`)
        .json(recipe)
}
exports.deleteById = async (req, res) => {
    let result
    try {
      result = await Recipe.destroy({ where: { id: req.params.id } })
    } catch (error) {
      console.log("RecipesDelete: ",error)
      res.status(500).send({ error: "Something went wrong on our side. Sorry :(" })
      return
    }
    if (result === 0) {
      res.status(404).send({ error: "Recipe not found" })
      return
    }
    res.status(204).send()
  }
 
  exports.updateById = async (req,res) => {
    let result
    delete req.body.id
    try {
      result = await Recipe.update(req.body,{ where: { id: req.params.id } })
    } catch (error) {
      console.log("RecipesUpdate: ",error)
      res.status(500).send({ error: "Something went wrong on our side. Sorry :(" })
      return
    }
    if (result === 0) {
      res.status(404).send({ error: "Recipe not found" })
      return
    }
    const recipe = await Recipe.findByPk(req.params.id)
    res.status(200)
        .location(`${getBaseUrl(req)}/recipes/${recipe.id}`)
        .json(recipe)  
  }

getBaseUrl = (request) => {
    return (
      (request.connection && request.connection.encrypted ? "https" : "http") +
      `://${request.headers.host}`
    )
  }