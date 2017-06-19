var mongoose = require('mongoose')


var AppSensorSchema = new mongoose.Schema({
	application: String,
	softwareSensor: Array,
	supportedDevices: Array,
})


module.exports = mongoose.model('AppSensorSchema', AppSensorSchema)