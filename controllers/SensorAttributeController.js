var Attribute = require('../models/SensorAttribute')

module.exports = {
	find:function(params, callback){
		Attribute.find(params, function(err, attributes){
			if(err){
				callback(err, null)
				return
			}
			callback(null, attributes)
		})
	},
	create: function(params, callback){
		Attribute.create(params, function(err, attribute){
			if(err){
				callback(err, null)
				return
			}
			callback(null, attribute)
		})
	}
}
