const Booking = require('../models/Booking')

module.exports = {
  async store(req, res) {
    const { booking_id } = req.params;

    const booking = await Booking.findById(booking_id).populate('spot')

    // if (booking.approved !== undefined) { 
    //   return res.json({ message: "The booking as already be choose"})
    // }

    booking.approved = true;

    await booking.save()

    const bookingUserSocket = req.connectedUsers[booking.user];

    if (bookingUserSocket) {
      console.log(booking)
      req.io.to(bookingUserSocket).emit('booking_response', booking)
    }
    
    return res.json(booking)
  }
}