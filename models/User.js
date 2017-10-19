var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  id: String,
	name: String,
  family_name: String,
  given_name: String,
  email: String
})

module.exports = mongoose.model('UserSchema', UserSchema)
