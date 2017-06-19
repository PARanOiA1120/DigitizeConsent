var mongoose = require('mongoose')

var SensorInferenceSchema = new mongoose.Schema({
	reference: String,
	deviceList: [{
		deviceType: String,
		sensorList: [{
			// sensorID: String,
			sensorName: String,
			attributes: [{
				attriName: String,
				value: String,
			}]
		}]
	}],
	inference: {
		inferenceID: String,
		inferenceName: String
	}
})

module.exports = mongoose.model('SensorInferenceSchema', SensorInferenceSchema)