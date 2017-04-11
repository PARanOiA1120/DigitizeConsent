var mongoose = require('mongoose')

var FormSectionSchema = new mongoose.Schema({
	title: {type: String, default: ''},
	sensors: {type: Array, default: []},
	content: {type: String, default: ''}
	
})

module.exports = mongoose.model('FormSectionSchema', FormSectionSchema)