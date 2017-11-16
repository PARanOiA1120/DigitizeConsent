var mongoose = require('mongoose')

var SensorAttributeSchema = new mongoose.Schema({
	attributeName: String,
	unit: { type: String, default:'' },
  valueType: { type: String, default:'' }
})


module.exports = mongoose.model('SensorAttributeSchema', SensorAttributeSchema)
