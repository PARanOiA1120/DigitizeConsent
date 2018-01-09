var UserContribution = require('../models/UserContribution')

module.exports = {

	find:function(params, callback){
		UserContribution.find(params, function(err, usercontribution){
			if(err){
				callback(err, null)
				return
			}
			callback(null, usercontribution)
		})
	},

	findById:function(id, callback){
		UserContribution.findById(id, function(err, usercontribution){
			if(err){
				callback(err, null)
				return
			}
			callback(null, usercontribution)
		})
	},

	create: function(params, callback){
		UserContribution.create(params, function(err, usercontribution){
			if(err){
				callback(err, null)
				return
			}
			callback(null, usercontribution)
		})
	},

	update: function(id, params, callback){
		UserContribution.findByIdAndUpdate(id, { $set: params}, {new:true}, function(err, usercontribution){
			if(err){
				callback(err, null)
				return
			}
		})
		callback(null, usercontribution)
	},

	delete: function(id, callback){
		UserContribution.findByIdAndRemove(id, function(err){
			if(err){
				callback(err, null)
				return
			}
			callback(null, null )
		})
	}
}
