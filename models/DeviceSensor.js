var mongoose = require('mongoose')


var DeviceSensorSchema = new mongoose.Schema({
	device: String,
	sensorName: String,
})


module.exports = mongoose.model('DeviceSensorSchema', DeviceSensorSchema)