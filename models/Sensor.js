var mongoose = require('mongoose')

var SensorSchema = new mongoose.Schema({
	combo: {
		id: String,
		sensorList: [{
			sensorName: String, 
			attributes: [{
				attriName: String,
				value: String,
			}]
		}],
		inferenceList: [{
			inferenceName: String,
			description: String
		}],
		reference: String
	} 
})

module.exports = mongoose.model('SensorSchema', SensorSchema)