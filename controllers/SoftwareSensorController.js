var SWSensor = require('../models/SoftwareSensor')

module.exports = {
	find:function(params, callback){
		SWSensor.find(params, function(err, swsensors){
			if(err){
				callback(err, null)
				return 
			}
			callback(null, swsensors)
		})
	},
	create: function(params, callback){
		SWSensor.create(params, function(err, swsensor){
			if(err){
				callback(err, null)
				return
			}
			callback(null, swsensor)
		})
	}
}