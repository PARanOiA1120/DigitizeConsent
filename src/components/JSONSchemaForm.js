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
      softwareSensors: []
    }
  }

  componentDidMount(){
    superagent
      .get('/api/swsensor')
      .query(null)
      .set('Accept', 'application/json')
      .end((err, response) => {
        if(err){
          alert('ERROR: '+err)
          return
        }

        console.log(JSON.stringify(response.body.results))
        let results = response.body.results
        let sensors = Object.assign([], this.state.softwareSensors)
        for(var i=0; i<results.length; i++)
          sensors.push(results[i].sensor)

        this.setState({ 
          softwareSensors: sensors
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
      title: "Software Sensor Form",
      type: "object",
      properties:{
        sensor:{
          type: "string",
          title: "Data Collected"
        }
      }
    }


    const device_sensor_schema = {
      title: "Device Sensor Form",
      type: "object",
      required: ["device"],
      properties: {
        device: {
            type: "string",
            title: "Device"
        },
        sensorName: {
            type: "string",
            title: "Sensor Name"
        }
      }
    }

    const sensor_inference_schema = {
      title: "Sensor Inference Form",
      type: "object",
      properties: {
        reference: {
          type: "string",
          title: "Reference"
        },
        deviceList: {
          type: "array",
          title: "Device List",
          items: {
            type: "object",
            properties: {              
              deviceType: {
                type: "string",
                enum: ["Phone", "Watch", "Shoes"],
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
                      title: "Sensor Name"
                    },
                    attributes: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          attriName: {
                            type: "string",
                            title: "Attribute"
                          },
                          value: {
                            type: "string",
                            title: "Value"
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
          type: "object",
          title: "Inference", 
          properties: {
            inferenceName: {
                type: "string",
                title: "Inference"
            },
            description: {
                type: "string",
                title: "Description"
            }
          }
        }
      }
    }

    const inference_description_schema = {
      title: "Inference Description Form",
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
      title: "Application Sensor Form",
      type: "object",
      properties: {
        application: {
          type: "string",
          title: "Application"
        },
        softwareSensor: {
          type: "array",
          items: {
            type: "string",
            enum: this.state.softwareSensors
          }
        },
        supportedDevices: {
          type: "array",
          items: {
            type: "string",
            enum: ["Phone", "Watch", "Shoes"],
          }
        }
      }
    }


    const log = (type) => console.log.bind(console, type);
    const onSubmit = ({formData}) => this.submit({formData})
    const schema = this.props.collection.schema
    const schemaDict = {'device_sensor_schema': device_sensor_schema, 
                        'sensor_inference_schema': sensor_inference_schema, 
                        'inference_description_schema': inference_description_schema,
                        'app_sensor_schema': app_sensor_schema,
                        'software_sensor_schema': software_sensor_schema
                      }

    return(
        <div style={styles.schemaform.form}>
          {this.state.switchToReview ?
            <Review formData={this.state.formData} collection={this.props.collection}/>
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







