const { db } = require("../db")
const Users = db.users
const Recipes = db.recipes

exports.getAll = async (req,res)=>{
    const users = await Users.findAll({attributes:["id","firstName"]})
    if (users.length == 0){
        res.send({"message":"No users exist"})
  } else {
    res.send(JSON.stringify(users))
  }
}
exports.createNew = async (req,res)=>{    
    res.send({"message":"Not implemented yet"})
}
exports.getById = async (req, res) => {
    const User = await Users.findByPk(req.params.id, {
      logging: console.log,
      include: {
       
        include: {
          model: Recipes,
          attributes: ["id","name"]
        }
      },
    })
    if (user === null) {
      res.status(404).send({ error: "User not found" })
    } else {
      res.send(user)
    }
  }
exports.updateById = async (req,res)=>{    
    res.send({"message":"Not implemented yet"})
}
exports.deleteById = async (req,res)=>{    
    res.send({"message":"Not implemented yet"})
}