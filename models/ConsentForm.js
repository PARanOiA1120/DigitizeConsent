var mongoose = require('mongoose')

var ConsentFormSchema = new mongoose.Schema({
	authorID: String,
  title: String,
  timeCreated: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
  sections: [{
    title: String,
    content: String,
    sensors:{type: Array, default: []}
  }]
})

module.exports = mongoose.model('ConsentFormSchema', ConsentFormSchema)
