var Device = require('../models/Device')

module.exports = {
	find:function(params, callback){
		Device.find(params, function(err, devices){
			if(err){
				callback(err, null)
				return 
			}
			callback(null, devices)
		})
	},
	create: function(params, callback){
		Device.create(params, function(err, device){
			if(err){
				callback(err, null)
				return
			}
			callback(null, device)
			console.log("[controller]:" + device)
		})
	}
}