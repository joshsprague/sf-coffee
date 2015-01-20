var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CafeSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    default: '',
    trim: true,
    required: "Name cannot be blank"
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  coordinates: {
    latitude: Number,
    longitude: Number
  }
});

mongoose.model('Cafe', CafeSchema);
