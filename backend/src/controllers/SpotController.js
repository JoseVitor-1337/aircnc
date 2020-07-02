const User = require('../models/User')
const Spot = require('../models/Spot')

module.exports = {
  async index(req, res) {

    let { tech } = req.query 

    tech = tech.toLowerCase().replace(/ /g,"")
     
    const spots = await Spot.find({ techs: tech })

    return res.json(spots) 
  },

  async store(req, res) {

    let { filename } = req.file;
    let { company, price, techs } = req.body;
    let { user_id } = req.headers;

    let user = await User.findById(user_id)

    if (!user) {
      return res.status(400).json({ message: "User does not exist"})
    }

    techs = techs.toLowerCase().replace(/ /g,"")

    const spot = await Spot.create({  
      user: user_id,
      thumbnail: filename,
      company,
      price,
      techs: techs.split(',').map(tech => tech.replace(" ", )) // Tornar uma string em array e tirar os espaços
    })

    return res.json(spot)
  }
}