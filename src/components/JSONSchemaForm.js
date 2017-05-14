import React, { Component } from "react";
import { render } from "react-dom";

import Form from "react-jsonschema-form";

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

    const log = (type) => console.log.bind(console, type);


    return(
      <Form schema={schema}
            onChange={log("changed")}
            onSubmit={log("submitted")}
            onError={log("errors")} />
    )
  }
}

export default JSONSchemaForm







