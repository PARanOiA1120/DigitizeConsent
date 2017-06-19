var FormSectionController = require('./FormSectionController')
var DeviceSensorController = require('./DeviceSensorController')
var SensorInferenceController = require('./SensorInferenceController')
var InferenceController = require('./InferenceController')
var AppSensorController = require('./AppSensorController')
var SoftwareSensorController = require('./SoftwareSensorController')

module.exports = {
	formsection: FormSectionController,
	devicesensor: DeviceSensorController,
	sensorinference: SensorInferenceController,
	inferencedescription: InferenceController,
	appsensor: AppSensorController,
	swsensor: SoftwareSensorController
}