var Sensor = require('../models/Sensor')

module.exports = {
	find:function(params, callback){
		Sensor.find(params, function(err, sensorcombos){
			if(err){
				callback(err, null)
				return 
			}
			callback(null, sensorcombos)
		})
	},
	create: function(params, callback){
		Sensor.create(params, function(err, sensorcombo){
			if(err){
				callback(err, null)
				return
			}
			callback(null, sensorcombo)
		})
	}
}