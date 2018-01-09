var mongoose = require('mongoose')


var UserContributionSchema = new mongoose.Schema({
	authorID: String,
  action: String,
  tableName: String,
  content: String,
  status: String,
	timeSubmitted: Date,
	timeReviewed: {type: Date, default: null}
})


module.exports = mongoose.model('UserContributionSchema', UserContributionSchema)
