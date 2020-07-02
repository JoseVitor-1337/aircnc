const Booking = require('../models/Booking')

module.exports = {
  async store(req, res) {
    const { user_id } = req.headers
    const { spot_id } = req.params
    const { date } = req.body

    const booking = await Booking.create({
      user: user_id,
      spot: spot_id,
      date,
    })

    await booking.populate('spot').populate('user').execPopulate()

    const ownerSocket = req.connectedUsers[booking.spot.user];

    if (ownerSocket) {
      req.io.to(ownerSocket).emit('booking_request', booking)
    }

    return res.json(booking)
  },

  async index(req, res) {
    const { user_id } = req.headers

    // È desta forma que se faz o populate() numa requisição GET
    await Booking.find().populate('spot').populate('user').exec(function (error, story) {
      if (error) {
        return error
      }
      let data = story.filter(data => {
        return (data.spot.user == user_id && data.approved == undefined)
      })

      return res.json(data)
    })    
  }
}