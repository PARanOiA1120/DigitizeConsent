var mongoose = require('mongoose')


var UserContributionSchema = new mongoose.Schema({
	authorID: String,
  action: String,
  tableName: String,
  content: String,
  status: String
})


module.exports = mongoose.model('UserContributionSchema', UserContributionSchema)
