var mongoose = require('mongoose')

var SensorInferenceSchema = new mongoose.Schema({
	sensorList: [{
		sensorID: String, 
		attributes: [{
			attriName: String,
			value: String,
		}]
	}],
	inferenceList: [{
		inferenceName: String,
		inferenceID: String
	}],
	reference: String
})

module.exports = mongoose.model('SensorInferenceSchema', SensorInferenceSchema)