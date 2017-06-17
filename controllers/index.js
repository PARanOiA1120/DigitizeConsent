var FormSectionController = require('./FormSectionController')
var DeviceSensorController = require('./DeviceSensorController')
var SensorInferenceController = require('./SensorInferenceController')
var InferenceController = require('./InferenceController')
var AppSensorController = require('./AppSensorController')

module.exports = {
	formsection: FormSectionController,
	devicesensor: DeviceSensorController,
	sensorinference: SensorInferenceController,
	inferencedescription: InferenceController,
	appsensor: AppSensorController
}