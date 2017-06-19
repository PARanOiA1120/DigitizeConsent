var mongoose = require('mongoose')


var SoftwareSensorSchema = new mongoose.Schema({
	sensor: String
})


module.exports = mongoose.model('SoftwareSensorSchema', SoftwareSensorSchema)