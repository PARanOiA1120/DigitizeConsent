var Sensor = require('../models/SensorInference')

module.exports = {
	find:function(params, callback){
		Sensor.find(params, function(err, sensorinferences){
			if(err){
				callback(err, null)
				return 
			}
			callback(null, sensorinferences)
		})
	},
	create: function(params, callback){
		Sensor.create(params, function(err, sensorinference){
			if(err){
				callback(err, null)
				return
			}
			callback(null, sensorinference)
		})
	}
}