var mongoose = require('mongoose')


var UserContributionSchema = new mongoose.Schema({
	authorID: String,
  action: String,
  tableName: String,
  content: String,
  status: String,
	timeSubmitted: { type: Date, default: Date.now }
})


module.exports = mongoose.model('UserContributionSchema', UserContributionSchema)
