import React, { Component } from "react";
import { render } from "react-dom";
import superagent from 'superagent'
import Form from "react-jsonschema-form";
import styles from './styles'

class JSONSchemaForm extends Component {
  constructor() {
    super()
  }

  submit(formData){
    console.log("submit: " + JSON.stringify(formData.formData))

    if(this.props.collection.action == '/api/sensorinference'){
      //get sensorID from device sensor table
      superagent   
      .get('/api/devicesensor')
      .query(null)
      .set('Accept', 'application/json')
      .end((err, response) => {
        if(err){
          alert('ERROR: '+err)
          return
        }
        console.log(JSON.stringify(response.body.results))
        let results = response.body.results

        this.setState({ 
          sectionList: results
        })
      })
    }


    fetch(this.props.collection.action, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData.formData)
    })

  }

  render (){
    const device_sensor_schema = {
      title: "Device Sensor Form",
      type: "object",
      required: ["device"],
      properties: {
        device: {
            type: "string",
            title: "Device"
        },
        sensorList: {
          type: "array",
          items: {
              type: "object",
              properties: {
                  sensorID: {
                      type: "string",
                      title: "Sensor ID"
                  },
                  sensorName: {
                      type: "string",
                      title: "Sensor Name"
                  }
              }  
          }   
        }
      }
    }

    const sensor_inference_schema = {
      title: "Sensor Inference Form",
      type: "object",
      properties: {
        sensorList: {
          type: "array",
          title: "Sensor List",
          items: {
            type: "object",
            properties: {              
              device: {
                type: "string",
                title: "Device"
              },
              name: {
                type: "string",
                title: "Sensor Name"
              },
              attributes: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    attribute: {
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
        },
        inferenceList: {
          type: "array",
          title: "Inference List", 
          items: {
            type: "object",
            properties: {
              inference: {
                  type: "string",
                  title: "Inference"
              },
              inferenceDescription: {
                  type: "string",
                  title: "Description"
              }
            }
          }
        },
        reference: {
          type: "string",
          title: "Reference"
        },

      }
    }


    const log = (type) => console.log.bind(console, type);
    const onSubmit = ({formData}) => this.submit({formData})
    const schema = this.props.collection.schema
    const schemaDict = {'device_sensor_schema': device_sensor_schema, 'sensor_inference_schema': sensor_inference_schema}

    return(
      <div style={styles.schemaform.form}>
        <Form schema={schemaDict[schema]}
              onChange={log("changed")}
              onSubmit={onSubmit}
              onError={log("errors")} />
      </div>
    )
  }
}

export default JSONSchemaForm







