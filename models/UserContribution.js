var mongoose = require('mongoose')


var UserContributionSchema = new mongoose.Schema({
	authorID: String,
  action: String,
  tableName: String,
  content: String,
  status: String,
	timeSubmitted: { type: Date, default: Date.now },
	timeReviewed: {type: Date, default: null}
})


module.exports = mongoose.model('UserContributionSchema', UserContributionSchema)
