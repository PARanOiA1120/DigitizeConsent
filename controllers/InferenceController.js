var Inference = require('../models/InferenceDescription')

module.exports = {
	find:function(params, callback){
		Inference.find(params, function(err, inferences){
			if(err){
				callback(err, null)
				return 
			}
			callback(null, inferences)
		})
	},
	create: function(params, callback){
		Inference.create(params, function(err, inference){
			if(err){
				callback(err, null)
				return
			}
			callback(null, inference)
		})
	}
}