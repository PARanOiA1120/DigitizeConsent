var ConsentForm = require('../models/ConsentForm')

module.exports = {

	find:function(params, callback){
		ConsentForm.find(params, function(err, consentforms){
			if(err){
				callback(err, null)
				return
			}
			callback(null, consentforms)
		})
	},

	findById:function(id, callback){
		ConsentForm.findById(id, function(err, consentform){
			if(err){
				callback(err, null)
				return
			}
			callback(null, consentform)
		})
	},

	create: function(params, callback){
		ConsentForm.create(params, function(err, consentform){
			if(err){
				callback(err, null)
				return
			}
			callback(null, consentform)
		})
	},

	update: function(id, params, callback){
		ConsentForm.findByIdAndUpdate(id, params, {new:true}, function(err, consentform){
			if(err){
				callback(err, null)
				return
			}
		})
		callback(null, consentform)
	},

	delete: function(id, callback){
		ConsentForm.findByIdAndRemove(id, function(err){
			if(err){
				callback(err, null)
				return
			}
			callback(null, null )
		})
	}
}
