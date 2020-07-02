const mongoose = require('mongoose')
const { port } = require('../common/enviroment')

const SpotSchema = new mongoose.Schema({ 
  thumbnail: {
    type: String,
    required: true  
  },
  company: {
    type: String,
    required: true  
  },
  price: {
    type: Number,
  },
  techs: {
    type: [String],
    required: true  
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  toJSON: {
    virtuals: true
  }
})

SpotSchema.virtual('thumbnail_url').get(function() {
  return `http://localhost:${port}/files/${this.thumbnail}`
})

module.exports = mongoose.model('Spot', SpotSchema)