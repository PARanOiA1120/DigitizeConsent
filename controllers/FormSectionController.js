var FormSection = require('../models/FormSection')

module.exports = {

	find:function(params, callback){
		FormSection.find(params, function(err, sections){
			if(err){
				callback(err, null)
				return
			}
			callback(null, sections)
		})
	},

	findById:function(id, callback){
		FormSection.findById(id, function(err, section){
			if(err){
				callback(err, null)
				return
			}
			callback(null, section)
		})
	},

	create: function(params, callback){
		var sensors = params['sensors']
		var sensor_arr = sensors.split(',')
		console.log(sensor_arr)
		var newSensors = []
		sensor_arr.forEach(function(sensor){
			newSensors.push(sensor.trim())
		})

		params['sensors'] = newSensors

		FormSection.create(params, function(err, section){
			if(err){
				callback(err, null)
				return
			}
			callback(null, section)
		})
	},

	update: function(id, params, callback){
		FormSection.findByIdAndUpdate(id, params, {new:true}, function(err, section){
			if(err){
				callback(err, null)
				return
			}
		})
		callback(null, section)
	},

	delete: function(id, callback){
		FormSection.findByIdAndRemove(id, function(err){
			if(err){
				callback(err, null)
				return
			}
			callback(null, null )
		})
	}
}
