import React, { Component } from "react";
import { render } from "react-dom";
import superagent from 'superagent'
import Form from "react-jsonschema-form";
import styles from './styles'
import Review from './Review'


class JSONSchemaForm extends Component {
  constructor() {
    super()

    this.state = {
      switchToReview: false,
      formData: {},
      softwareSensors: [],
      devices: [],
      devicesensors: [],
      attributeList: [],
      inferenceList: [],
    }
  }

  componentDidMount(){

    // get the list of all software sensors
    superagent
      .get('/api/swsensor')
      .query(null)
      .set('Accept', 'application/json')
      .end((err, response) => {
        if(err){
          alert('ERROR: '+err)
          return
        }

        let results = response.body.results
        let sensors = Object.assign([], this.state.softwareSensors)
        for(var i=0; i<results.length; i++)
          sensors.push(results[i].sensor)

        this.setState({
          softwareSensors: sensors
        })
      })

    // get the list of device
    superagent
      .get('/api/device')
      .query(null)
      .set('Accept', 'application/json')
      .end((err, response) => {
        if(err){
          alert('ERROR: ' + err)
          return
        }

        let results = response.body.results
        let devices = Object.assign([], this.state.devices)
        for(var i=0; i<results.length; i++)
          devices.push(results[i].device)

        this.setState({
          devices: devices
        })
      })

    // get the list of hardware sensors
    superagent
      .get('/api/devicesensor')
      .query(null)
      .set('Accept', 'application/json')
      .end((err, response) => {
        if(err){
          alert('ERROR: ' + err)
          return
        }

        let results = response.body.results
        let devicesensors = Object.assign([], this.state.devicesensors)
        for(var i=0; i<results.length; i++){
          var sensor = results[i].sensorName + "(" + results[i].device + ")"
          devicesensors.push(sensor)
        }

        this.setState({
          devicesensors: devicesensors
        })
      })

    // get the list of attributes
    superagent
      .get('/api/sensorattribute')
      .query(null)
      .set('Accept', 'application/json')
      .end((err, response) => {
        if(err){
          alert('ERROR: ' + err)
          return
        }

        let results = response.body.results
        let attributes = Object.assign([], this.state.attributeList)
        for(var i=0; i<results.length; i++){
          var attribute = results[i].attributeName
          if(results[i].unit == '') {
            attribute += '(Unit: N/A, Value Type: ' + results[i].valueType + ')'
          } else {
            attribute += '(Unit: ' + results[i].unit + ', Value Type: ' + results[i].valueType + ')'
          }
          attributes.push(attribute)
        }

        this.setState({
          attributeList: attributes
        })
      })

      // get the list of inferences
      superagent
        .get('/api/inferencedescription')
        .set('Accept', 'application/json')
        .end((err, response) => {
          if(err){
            alert('ERROR: ' + err)
            return
          }

          let results = response.body.results
          let inferences = Object.assign([], this.state.inferenceList)
          for(var i=0; i<results.length; i++){
            var inference = results[i].inferenceName + ': ' + results[i].description + '('+ results[i]["_id"] + ')'
            inferences.push(inference)
          }

          this.setState({
            inferenceList: inferences
          })
        })
  }

  submit(formData){
    this.props.onChange(true)
    this.setState({
      switchToReview: !this.state.switchToReview,
      formData: formData.formData
    })

  }

  render (){
    const software_sensor_schema = {
      title: "Add Software Sensor",
      type: "object",
      properties:{
        sensor:{
          type: "string",
          title: "Data Collected"
        }
      }
    }

    const device_schema = {
      title: "Add Device",
      type: "object",
      properties:{
        device:{
          type: "string",
          title: "Device Name"
        }
      }
    }


    const device_sensor_schema = {
      title: "Add Raw Sensor from Device",
      type: "object",
      required: ["device"],
      properties: {
        device: {
            type: "string",
            enum: this.state.devices,
            title: "Device"
        },
        sensorName: {
            type: "string",
            title: "Sensor Name"
        }
      }
    }

    const sensor_inference_schema = {
      title: "Add Sensor Inference",
      type: "object",
      properties: {
        reference: {
          type: "string",
          title: "Reference (e.g. papers, any kind of source you get this inference)"
        },
        deviceList: {
          type: "array",
          title: "Device List",
          items: {
            type: "object",
            properties: {
              deviceType: {
                type: "string",
                enum: this.state.devices,
                title: "Device"
              },
              sensorList: {
                type:"array",
                title: "Sensor List",
                items: {
                  type: "object",
                  properties: {
                    sensorName: {
                      type: "string",
                      enum: this.state.devicesensors.concat(this.state.softwareSensors),
                      title: "Sensor Name"
                    },
                    attributes: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          attriName: {
                            type: "string",
                            title: "Attribute",
                            enum: this.state.attributeList
                          },
                          value: {
                            type: "string",
                            title: "Value (Note: do not enter unit for any numerical value as it has already been defined; enter Y or N for boolean values)"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        inference: {
          type: "string",
          title: "Inference",
          enum: this.state.inferenceList
        }
      }
    }

    const sensor_attribute_schema = {
      title: "Add Attribute",
      type: "object",
      properties: {
        attributeName: {
          type: "string",
          title: "Attribute Name"
        },
        unit: {
          type: "string",
          title: "Unit"
        },
        valueType: {
          type: "string",
          enum: ["number", "boolean"],
          title: "Value Type"
        }
      }
    }

    const inference_description_schema = {
      title: "Add Inference Description",
      type: "object",
      properties: {
        inferenceName: {
            type: "string",
            title: "Inference Name"
        },
        description: {
            type: "string",
            title: "Description"
        }
      }
    }

    const app_sensor_schema = {
      title: "Add Software Sensor from App",
      type: "object",
      properties: {
        application: {
          type: "string",
          title: "Application"
        },
        softwareSensor: {
          type: "array",
          title: "Software Sensor (data collected from software application)",
          items: {
            type: "string",
            enum: this.state.softwareSensors
          }
        },
        supportedDevices: {
          type: "array",
          title: "Supported Devices",
          items: {
            type: "string",
            enum: this.state.devices,
          }
        }
      }
    }


    const log = (type) => console.log.bind(console, type);
    const onSubmit = ({formData}) => this.submit({formData})
    const schema = this.props.collection.schema
    const schemaDict = {
                        'device_schema': device_schema,
                        'device_sensor_schema': device_sensor_schema,
                        'sensor_inference_schema': sensor_inference_schema,
                        'inference_description_schema': inference_description_schema,
                        'sensor_attribute_schema': sensor_attribute_schema,
                        'app_sensor_schema': app_sensor_schema,
                        'software_sensor_schema': software_sensor_schema
                      }

    return(
        <div style={styles.schemaform.form}>
          {this.state.switchToReview ?
            <Review formData={this.state.formData} collection={this.props.collection} />
            :
            <Form schema={schemaDict[schema]}
                  onSubmit={onSubmit}
                  onError={log("errors")} />
          }
        </div>
    )
  }
}

export default JSONSchemaForm
