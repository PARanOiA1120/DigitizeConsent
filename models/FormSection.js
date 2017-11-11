var mongoose = require('mongoose')

var FormSectionSchema = new mongoose.Schema({
	category: { type: String, default: '' },
	title: { type: String, default: '' },
	sensors: { type: Array, default: [] },
	content: { type: String, default: '' }
	
})

module.exports = mongoose.model('FormSectionSchema', FormSectionSchema)
