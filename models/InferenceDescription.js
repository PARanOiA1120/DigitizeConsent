var mongoose = require('mongoose')

var InferenceDescriptionSchema = new mongoose.Schema({
	inferenceName: String,
	description: String,
})


module.exports = mongoose.model('InferenceDescriptionSchema', InferenceDescriptionSchema)