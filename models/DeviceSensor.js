var mongoose = require('mongoose')

var DeviceSensorSchema = new mongoose.Schema({
	device: String,
	sensorList: [{
		sensorName: String,
		sensorID: String
	}]
	
})

module.exports = mongoose.model('DeviceSensorSchema', DeviceSensorSchema)