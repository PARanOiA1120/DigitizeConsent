import React, { Component } from "react";
import { render } from "react-dom";

import Form from "react-jsonschema-form";
import styles from './styles'

class JSONSchemaForm extends Component {

  render (){
    const schema = {
    title: "Todo",
    type: "object",
    required: ["title"],
    properties: {
      title: {type: "string", title: "Title", default: "A new task"},
      done: {type: "boolean", title: "Done?", default: false}
    }
    };


    const device_sensor_schema = {
      title: "Device Sensor Form",
      type: "object",
      required: ["device", "sensors"],
      properties: {
        device: {
            type: "string",
            title: "Device"
        },
        sensors: {
          type: "array",
          items: {
              type: "object",
              properties: {
                  id: {
                      type: "integer",
                      title: "Sensor ID"
                  },
                  name: {
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
        sensors: {
          id: "/properties/sensors",
          type: "array",
          title: "Sensor List",
          items: {
            id: "/properties/sensors/items",
            type: "object",
            properties: {              
              device: {
                type: "string",
                title: "Device"
              },
              name: {
                id: "/properties/sensors/items/properties/sensorInfo/properties/name",
                type: "string",
                title: "Sensor Name"
              },
              attributes: {
                id: "/properties/sensors/items/properties/attributes",
                type: "array",
                items: {
                  id: "/properties/sensors/items/properties/attributes/items",
                  type: "object",
                  properties: {
                    attribute: {
                      id: "/properties/sensors/items/properties/attributes/items/properties/attribute",
                      type: "string",
                      title: "Attribute"
                    },
                    value: {
                      id: "/properties/sensors/items/properties/attributes/items/properties/value",
                      type: "string",
                      title: "Value"
                    }
                  }
                }
              } 
            }
          }
        },
        inferences: {
          type: "array",
          title: "Inference List", 
          items: {
            type: "object",
            properties: {
              inference: {
                  id: "/properties/inferences/items/properties/inference",
                  type: "string",
                  title: "Inference"
              },
              inferenceID: {
                  id: "/properties/inferences/items/properties/inferenceID",
                  type: "integer",
                  title: "Inference ID"
              }
            }
          }
        },
        reference: {
          id: "/properties/reference",
          type: "string",
          title: "Reference"
        },

      }
    }


    const log = (type) => console.log.bind(console, type);
    const onSubmit = ({formData}) => console.log({formData})

    return(
      <div style={styles.schemaform.form}>
        <Form schema={sensor_inference_schema}
              onChange={log("changed")}
              onSubmit={onSubmit}
              onError={log("errors")} />
      </div>
    )
  }
}

export default JSONSchemaForm







