var FormSectionController = require('./FormSectionController')
var DeviceSensorController = require('./DeviceSensorController')
var SensorInferenceController = require('./SensorInferenceController')
var InferenceController = require('./InferenceController')
var AppSensorController = require('./AppSensorController')
var SoftwareSensorController = require('./SoftwareSensorController')
var DeviceController = require('./DeviceController')
var UserController = require('./UserController')

module.exports = {
	formsection: FormSectionController,
	devicesensor: DeviceSensorController,
	sensorinference: SensorInferenceController,
	inferencedescription: InferenceController,
	appsensor: AppSensorController,
	swsensor: SoftwareSensorController,
	device: DeviceController,
	user: UserController
}
