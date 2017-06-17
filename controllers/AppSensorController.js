var App = require('../models/AppSensor')

module.exports = {
	find:function(params, callback){
		App.find(params, function(err, appsensors){
			if(err){
				callback(err, null)
				return 
			}
			callback(null, appsensors)
		})
	},
	create: function(params, callback){
		// var sensors = params['softwareSensor']
		// var sensor = devices.split(',')
		// var sensorList = []
		// sensor.forEach(function(softwaresensor){
		// 	sensorList.push(softwaresensor)
		// })

		// params['softwareSensor'] = sensorList

		App.create(params, function(err, appsensor){
			if(err){
				callback(err, null)
				return
			}
			callback(null, appsensor)
			console.log("[controller]:" + appsensor)
		})
	}
}