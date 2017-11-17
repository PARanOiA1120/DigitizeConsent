var Sensor = require('../models/DeviceSensor')

module.exports = {
	find:function(params, callback){
		Sensor.find(params, function(err, devicesensors){
			if(err){
				callback(err, null)
				return
			}
			callback(null, devicesensors)
		})
	},
	create: function(params, callback){
		Sensor.create(params, function(err, devicesensor){
			if(err){
				callback(err, null)
				return
			}
			callback(null, devicesensor)
		})
	}
}
