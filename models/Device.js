var mongoose = require('mongoose')

var DeviceSchema = new mongoose.Schema({
	device: String,
})

module.exports = mongoose.model('DeviceSchema', DeviceSchema)