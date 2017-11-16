import React, { Component } from 'react'
import ReactQuill from 'react-quill'
import styles from './styles'
import superagent from 'superagent'

class FormSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      section: {},
      text: '',

      appList: [], //appsensor objects
      apps: [], //app name list
      selectedApp:'',

      swsensorListforSelectedApp: [],
      supportedDevices: [],
      selectedSWSeneors:[],
      selectedDeviceforApp: [],

      addAdditionalSensor: false,
      deviceList: [], // a list of all devices
      deviceSensorList: [], // a list of all sensors of the selected device
      selectedDevice: '',

      selectedSensor: '',
      sensorList: [], // sensor list to query for risks, include device
      sensorRisks: [],
      currentSensor: {},

      currentAttributes: {}, //all attributes

      attrForSearch: {}, // attributes that have a match in the db
      attrName: "",
      attrValue: "",
      knownAttriList: [],
      attrType: '',
      attrUnit: '',

      trustedAppList: [],
      trustedDeviceList: [],
      queryData: {},
      queryResults: []
    }

    // must write in this way bc quill doesn't support handler for text change
    // https://github.com/quilljs/quill/issues/1134
    this.onChange = (text) => {
      this.setState({
        text: text
      })
      this.updateSection(text)
    }
  }

  componentDidMount(){
    let content = ""
    let title = "<p><strong>" + this.props.currentSection.title + "</strong></p>"
    if(this.props.currentSection["content"].indexOf(title) == -1){
      content += title
    }
    content += this.props.currentSection.content
    this.props.currentSection["content"] = content

    this.setState({
      section: this.props.currentSection,
      text: content
    })

    //get application list
    superagent
    .get('/api/appsensor')
    .query(null)
    .set('Accept', 'application/json')
    .end((err, response) => {
      if(err){
        alert('ERROR: '+err)
        return
      }

      let results = response.body.results
      let apps = Object.assign([], this.state.apps)
      results.forEach((app) => {
          apps.push(app.application)
      })

      this.setState({
        appList: results,
        apps: apps
      })
    })

    superagent
    .get('/api/devicesensor')
    .query(null)
    .set('Accept', 'application/json')
    .end((err, response) => {
      if(err){
        alert('ERROR: '+err)
        return
      }

      let results = response.body.results
      let devices = Object.assign([], this.state.deviceList)
      results.forEach((devicesensor) => {
        if(devices.indexOf(devicesensor.device) == -1)
          devices.push(devicesensor.device)
      })

      this.setState({
        deviceList: devices
      })
    })

    // get attribute List
    superagent
    .get('/api/sensorattribute')
    .set('Accept', 'application/json')
    .end((err, response) => {
      if(err){
        alert('ERROR: '+err)
        return
      }

      this.setState({
        knownAttriList: response.body.results
      })
    })
  }


  updateSection(content){
    let updatedSection = Object.assign({}, this.state.section)
    updatedSection["content"] = content

    // send content updates back to the ConsentForm.js
    this.props.onChange(updatedSection)

    this.setState({
      section: updatedSection
    })
  }

  updateSensorSelection(event){
    let updatedSensor = Object.assign("", this.state.selectedSensor)
    updatedSensor = event.target.value

    this.setState({
      selectedSensor: updatedSensor
    })
  }

  updateAttrName(event) {
    var attrName = event.target.value
    var attribute = this.state.knownAttriList.filter(function(attr) {
      return attr["attributeName"] == attrName
    })
    // console.log(attribute)

    this.setState({
      attrName: attrName,
      attrType: attribute[0]["valueType"],
      attrUnit: attribute[0]["unit"],
    })
  }

  updateAttrValue(event) {
    this.setState({
      attrValue: event.target.value
    })
  }

  // add attribute to both currentAttributes and attrForSearch
  addAttr(event){
    let updatedCurrentAttr = Object.assign({}, this.state. currentAttributes)
    updatedCurrentAttr[this.state.attrName] = this.state.attrValue

    let updatedAttrForSearch = Object.assign({}, this.state.attrForSearch)
    updatedAttrForSearch[this.state.attrName] = this.state.attrValue

    this.setState({
      currentAttributes: updatedCurrentAttr,
      attrForSearch: updatedAttrForSearch,
      attrName: "",
      attrValue: ""
    })
  }

  updateAppSelection(event){
    this.setState({
      selectedApp: event.target.value
    }, () => {
      // get software sensor list
      if(this.state.selectedApp != "" && this.state.selectedApp != "none"){
        this.state.appList.forEach((app) => {
          if(app.application == this.state.selectedApp){
            this.setState({
              swsensorListforSelectedApp: app.softwareSensor,
              supportedDevices: app.supportedDevices
            })
          }
        })
      }
    })
  }

  updateSoftwareSensor(event){
    var options = event.target.options
    var sensors = []
    for(var i=0; i<options.length; i++){
      if(options[i].selected){
        sensors.push(options[i].value)
      }
    }

    this.setState({
      selectedSWSeneors: sensors
    })
  }


  updateSelectedDevicesforApp(event){
    var options = event.target.options
    var devices = []
    for(var i=0; i<options.length; i++){
      if(options[i].selected){
        devices.push(options[i].value)
      }
    }

    this.setState({
      selectedDeviceforApp: devices
    })
  }

  addAnotherApp(event){
    var queryData = this.state.queryData
    // add app-sensor info to query data
    this.state.selectedDeviceforApp.forEach((device) => {
      this.state.selectedSWSeneors.forEach((sensor) => {
        var sensorObj = {}
        sensorObj["sensorName"] = sensor

        var trustedApps = this.state.trustedAppList
        if(trustedApps.indexOf(this.state.selectedApp) == -1){
          trustedApps.push(this.state.selectedApp)
        }

        var trustedDevices = this.state.trustedDeviceList
        this.state.selectedDeviceforApp.forEach((device) => {
          if(trustedDevices.indexOf(device) == -1){
            trustedDevices.push(device)
          }
        })

        this.setState({
          trustedAppList: trustedApps,
          trustedDeviceList: trustedDevices
        })

        if(queryData[device]){
          if(queryData[device].map((sensor) => sensor.sensorName).indexOf(sensor) == -1)
            queryData[device].push(sensorObj)
        }
        else{
          queryData[device] = []
          queryData[device].push(sensorObj)
        }
      })
    })

    this.setState({
      queryData: queryData
    }, () => {
      console.log("queryData: " + JSON.stringify(this.state.queryData))
    })

    // update context in the editor
    var context = this.state.text
    if(context == "<p><strong>Data Collection</strong></p>")
      context += "This study uses " + this.state.selectedApp + " on "
    else
      context += "This study also uses " + this.state.selectedApp + " on "
    var devices = this.state.selectedDeviceforApp
    var sensors = this.state.selectedSWSeneors

    if(devices.length == 1)
      context += devices[0]
    else{
      for(var i=0; i<devices.length-1; i++){
        context += devices[i] + ", "
      }
      context += "and " + devices[devices.length-1]
    }

    context += " to collect "
    if(sensors.length == 1)
      context += sensors[0] + " data."
    else{
      for(var i=0; i<sensors.length-1; i++){
        context += sensors[i] + ", "
      }
      context += "and " + sensors[sensors.length-1] + " data."
    }

    this.setState({
      text: context,
      selectedSWSeneors: [],
      selectedDeviceforApp:[],
      selectedApp: ""
    })
  }

  addAdditionalSensors(event){
    this.setState({
      addAdditionalSensor: true
    })

  }


  addSensor(event){
    // generate context to display in the section
    let updatedSectionContent = this.state.section.content
    updatedSectionContent += "This study uses " + this.state.selectedSensor + " on " + this.state.selectedDevice

    //update trusted devices
    let trustedDevices = this.state.trustedDeviceList
    if(trustedDevices.indexOf(this.state.selectedDevice) == -1){
      trustedDevices.push(this.state.selectedDevice)

      this.setState({
        trustedDeviceList: trustedDevices
      })
    }

    let attributes = this.state.currentAttributes
    if(attributes.length > 0){
      updatedSectionContent += " with attribute "
      let i = 1
      Object.keys(attributes).map(function(key){
        if(i == 1)
          updatedSectionContent += key + " set to " + attributes[key]
        else
          updatedSectionContent += ", " + key + " set to " + attributes[key];
        i += 1
      })
    }

    updatedSectionContent += "."
    this.updateSection(updatedSectionContent)

    // add sensor along with its attribute list to sensorList
    let updatedSensor = Object.assign({}, this.state.currentSensor)
    updatedSensor["device"] = this.state.selectedDevice
    updatedSensor["sensor"] = this.state.selectedSensor
    updatedSensor["attributes"] = this.state.attrForSearch

    let updatedSensorList = Object.assign([], this.state.sensorList)
    updatedSensorList.push(updatedSensor)

    this.setState({
      text: updatedSectionContent, //update section text display
      sensorList: updatedSensorList,
      // clear selectedDevice, selectedSensor, currentAttributes, and currentSensor
      selectedDevice: "",
      selectedSensor: "",
      currentAttributes: {},
      attrForSearch: {},
    }, () => {
      // console.log("sensor list for query: " + JSON.stringify(this.state.sensorList))
    })
  }

  generateRisks(event) {
    // specify trusted entities
    let context = this.state.text

    let trustedApps = this.state.trustedAppList
    let trustedDevices = this.state.trustedDeviceList

    console.log("trustedDevices: " + trustedDevices)

    if(trustedApps.length != 0 || trustedDevices.length != 0){
      if(trustedApps.length > 0){
        context += "<br/><p><strong>Trusted Entities</p></strong>"
        context += "This study uses services from "
        trustedApps.forEach((app) => {
          context += app + ", "
        })

        if(trustedDevices.length > 0){
          context += "and the "
          trustedDevices.forEach((device) => {
            context += device + ", "
          })
          context = context.slice(0, -2) + ' manufacturer.'
        } else {
          context = context.slice(0, -2) + '.'
        }
      } else {
        if(trustedDevices.length > 0){
          context += "<br/><p><strong>Trusted Entities</p></strong>"
          context += "This study uses the "
          trustedDevices.forEach((device) => {
            context += device + ", "
          })
          context = context.slice(0, -2) + ' manufacturer.'
        }
      }

      context += ' We trust that they will not collect any private information and misuse it.'

      this.setState({
        text: context
      })
    }

    // generate query data
    var sensorList = this.state.sensorList
    var queryData = this.state.queryData
    sensorList.forEach((devicesensor) => {
      var device = devicesensor["device"]
      var sensor = devicesensor["sensor"]
      var attributes = devicesensor["attributes"]
      var sensorObj = {}
      sensorObj["sensorName"] = sensor
      sensorObj["attributes"] = attributes
      if(queryData[device]){
        if(queryData[device].map((s) => s.sensorName).indexOf(sensor) == -1){
          queryData[device].push(sensorObj)
        }
        else{
          var index = queryData[device].map((s) => s.sensorName).indexOf(sensor)
          var attriList = queryData[device][index]["attributes"]
          for(var attr in attributes){
              attriList[attr] = attributes[attr]
          }
        }
      }
      else{
        queryData[device] = []
        queryData[device].push(sensorObj)
      }
    })

    this.setState({
      queryData: queryData
    }, () => {
      console.log("queryData: " + JSON.stringify(queryData))
      //query DB
      var numDevices = Object.keys(queryData).length + 1

      superagent
      .get('/api/sensorinference')
      .set('Accept', 'application/json')
      .end((err, response) => {
        if(err){
          alert('ERROR: '+err)
          return
        }

        // find match from results
        var inferences = response.body.results.filter(function(res) {
          return (res["deviceList"].length <= numDevices);
        })
        // console.log(inferences);

        var validInferences = []
        // level 1: check if every device in the results is in queryData
        inferences.forEach((inference) => {
          var add = true
          inference["deviceList"].forEach((device) => {
            var deviceType = device["deviceType"]
            if(Object.keys(queryData).indexOf(deviceType) == -1)
              add = false
          })
          if(add == true)
            validInferences.push(inference)
        })
        console.log("valid inference after device check: " + JSON.stringify(validInferences))

        //level 2: check if sensors in validInferences appear under device in queryData
        var validInferences2 = []
        validInferences.forEach((inference) => {
          var add = true
          inference["deviceList"].forEach((device) => {
            // get device sensor object from queryData
            var deviceType = device["deviceType"]
            var sensorList = queryData[deviceType]
            for(var i in device["sensorList"]){
              var sensorObj = device["sensorList"][i]
              var sensorName = sensorObj.sensorName.split('(')[0]
              if(sensorList.map((s) => s.sensorName).indexOf(sensorName) == -1){
                console.log("sensor does not found in queryData: " + sensorName)
                add = false
                break
              }
            }
          })
          if(add == true)
            validInferences2.push(inference)
        })
        console.log("valid inference after sensor check: " + JSON.stringify(validInferences2))

        // level 3: check if attributes match
        var validInferences3 = []
        for(var i in validInferences2){
          var inference = validInferences2[i]
          var add = true
          for(var j in inference["deviceList"]){
            var device = inference["deviceList"][j]
            var sensorListQD = queryData[device["deviceType"]]
            for(var k in device["sensorList"]){
              var sensor = device["sensorList"][k]
              var sensorName = sensor["sensorName"].split('(')[0]
              var attributes = sensor["attributes"]

              var index = sensorListQD.map((s) => s.sensorName).indexOf(sensorName)
              var sensorQD = sensorListQD[index]
              var attributesQD = sensorQD["attributes"]

              for(var a in attributes){
                var attrName = attributes[a]["attriName"].split('(')[0]
                var attrType = attributes[a]["attriName"].split('(')[1].split(',')[1].split(':')[1].slice(1,-1)
                var attrValue = attributes[a]["value"]

                // if the attribute is of boolean type, check if the value match
                // if the attribute is of number type, return all with value less than or equal the value in the query
                if(!attributesQD[attrName] ||
                  (attrType == "boolean" && attrValue != attributesQD[attrName]) ||
                  (attrType == "number" && (!parseInt(attrValue)||
                                            !parseInt(attributesQD[attrName]) ||
                                            parseInt(attrValue) > parseInt(attributesQD[attrName])))
                ){
                  add = false
                  break
                }
              }
              if(add == false)
                break
            }
            if(add == false)
              break
          }
          if(add == true)
            validInferences3.push(inference)
        }
        console.log("valid inference after attributes check: " + JSON.stringify(validInferences3))
        this.setState({
          queryResults: validInferences3
        }, () => {
          this.props.addRiskSection("Risk and Protection", this.state.queryResults)
        })
      })
    })
  }

  updateDeviceSelection(event) {
    let updatedSelectedDevice = Object.assign('', this.state.selectedDevice)
    updatedSelectedDevice = event.target.value

    this.setState({
      deviceSensorList: []
    })

    superagent
    .get('/api/devicesensor')
    .query({device: updatedSelectedDevice})
    .set('Accept', 'application/json')
    .end((err, response) => {
      if(err){
        alert('ERROR: '+err)
        return
      }

      // console.log(JSON.stringify(response.body.results))
      let results = response.body.results
      let sensors = Object.assign([], this.state.deviceSensorList)

      results.forEach((devicesensor) => {
        if(sensors.indexOf(devicesensor.sensorName))
          sensors.push(devicesensor.sensorName)
      })

      this.setState({
        deviceSensorList: sensors,
        selectedDevice: updatedSelectedDevice
      })

    })
  }

  deleteSection() {
    this.props.deleteSection();
  }

  moveSectionUp() {
    this.props.moveSectionUp();
  }

  moveSectionDown() {
    this.props.moveSectionDown();
  }


  render() {
    const modules = {
      toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
      ],
    }

    const formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image'
    ]

    const formStyle = styles.form
    const sensors = this.state.deviceSensorList
    const section = this.props.currentSection.title

    const appOptions = this.state.apps.map((app, i) => {
      return (
        <option value={app} key={i}>{app}</option>
        )
    })

    const swsensorOptions = this.state.swsensorListforSelectedApp.map((sensor, i) => {
      return (
        <option value={sensor} key={i}>{sensor}</option>
      )
    })

    const supportedDevicesOptions = this.state.supportedDevices.map((device, i) => {
      return (
        <option value={device} key={i}>{device}</option>
      )
    })

    const deviceOptions = this.state.deviceList.map((device, i) => {
      return (
          <option value={device} key={i}>{device}</option>
        )
    })

    const sensorOptions = this.state.deviceSensorList.map((sensor, i) => {
      return (
        <option value={sensor} key={i}>{sensor}</option>
      )
    })

    const attributeOptions = this.state.knownAttriList.map((attr, i) => {
      return (
        <option value={ attr["attributeName"] } key={ attr["attributeName"] }>{ attr["attributeName"] }</option>
      )
    })

    // TODO: make this part dynamic
    const attributeList = Object.keys(this.state.currentAttributes).map((attr) => {
      return (
        <li key={attr} style={{fontSize: 14 + 'px'}}>
          <b>{attr}</b>: {this.state.currentAttributes[attr]}
        </li>
      )
    })

    return (
      <div>
        <div className="form-group" style={formStyle.formgroup}>
          <label style={formStyle.label}>{ this.state.section.category }</label>
          <div className="btn-group"  style={{float:'right'}}>
            { this.props.idx > 0 &&
              <button className="btn btn-default" onClick={ this.moveSectionUp.bind(this) }>
                <span className="fa fa-arrow-up"></span>
              </button>
            }
            { this.props.idx < this.props.numSections-1 &&
              <button className="btn btn-default" onClick={ this.moveSectionDown.bind(this) }>
                <span className="fa fa-arrow-down"></span>
              </button>
            }
            <button className="btn btn-danger"
                  onClick={ this.deleteSection.bind(this) }>
              <span className="glyphicon glyphicon-remove"></span>
            </button>
          </div>
          <br/>
          <br/>

          {section == "Data Collection" &&
            <div className="form-group" style={formStyle.formgroup}>
              <label htmlFor="app" style={{float:'left', marginRight:5+'px'}}>Select application:</label>
              <select className="form-control" id="app" style={formStyle.selectionBox}
                onChange={this.updateAppSelection.bind(this)} value={this.state.selectedApp}>
                <option value="" key="">--- Select an application ---</option>
                <option value="none" key="none">No application</option>
                {appOptions}
              </select>
              <br/>
              <br/>
              <hr style={styles.universal.hr} />

              {this.state.selectedApp != "" && this.state.selectedApp != "none" &&
                <div className="form-group" style={formStyle.formgroup}>
                  <label htmlFor="swsensor">Data collected from application (select all that apply):</label>
                  <br/>
                  <select multiple className="form-control" id="swsensor" style={formStyle.selectionBox}
                    onChange={this.updateSoftwareSensor.bind(this)} value={this.state.selectedSWSeneors}>
                    {swsensorOptions}
                  </select>
                  <br/><br/><br/><br/><br/>

                  <label htmlFor="appdevice">Device running the application (select all that apply):</label>
                  <select multiple className="form-control" id="supportedDevice" style={formStyle.selectionBox}
                    onChange={this.updateSelectedDevicesforApp.bind(this)} value={this.state.selectedDeviceforApp}>
                    {supportedDevicesOptions}
                  </select>

                  <br/><br/><br/><br/><br/><br/>
                  <button className="btn btn-primary" onClick={this.addAnotherApp.bind(this)}>Add another application</button>
                  <button className="btn btn-primary" style={{marginLeft:10+'px'}}
                    onClick={this.addAdditionalSensors.bind(this)}>Add additional sensors</button>
                  <hr style={styles.universal.hr} />
                </div>
              }


              {(this.state.selectedApp == "none" || this.state.addAdditionalSensor == true) &&
                <div className="form-group">

                  <label htmlFor="device" style={{float:'left', marginRight:5+'px'}}>Select device:</label>
                  <select className="form-control" id="device" style={formStyle.selectionBox}
                    onChange={this.updateDeviceSelection.bind(this)} value={this.state.selectedDevice}>
                    <option value="" key="">--- Select a device ---</option>
                    {deviceOptions}
                  </select>
                  <br/>
                  <br/>

                  <label htmlFor="sensor" style={{float:'left', marginRight:5+'px'}}>Select sensor to add:</label>
                  <select className="form-control" id="sensor" style={formStyle.selectionBox}
                    onChange={this.updateSensorSelection.bind(this)} value={this.state.selectedSensor}>
                    <option value="" key="">--- Select a sensor ---</option>
                    {sensorOptions}
                  </select>
                  <br/>
                  <hr style={styles.universal.hr} />

                  {this.state.selectedSensor != "" &&
                    <div className="attriList" style={{marginLeft: 20 + 'px'}}>
                      {this.state.currentAttributes != {} &&
                        <div className="finalizedAttrList">
                          <ul style={formStyle.list}>
                            {attributeList}
                          </ul>
                        </div>
                      }
                      <br/>

                      <div className="knownAttr">
                        <select className="form-control" style={formStyle.attribute}
                          value={this.state.attrName} onChange={this.updateAttrName.bind(this)}>
                          <option value="" key="">---Select an attribute---</option>
                          { attributeOptions }
                        </select>
                        { this.state.attrType == 'boolean' ?
                          <select className="form-control" placeholder="attribute value" style={formStyle.attribute}
                            value={this.state.attrValue} onChange={this.updateAttrValue.bind(this)}>
                            <option value="" key=""></option>
                            <option value="Y" key="Y">Y</option>
                            <option value="N" key="N">N</option>
                          </select>
                            :
                          <input className="form-control" placeholder={this.state.attrUnit} style={formStyle.attribute} min="1"
                            value={this.state.attrValue} onChange={this.updateAttrValue.bind(this)} type={this.state.attrType}/>
                          }

                        <button className="btn btn-primary" onClick={this.addAttr.bind(this)}>Add attribute</button>
                        <br/>
                        <br/>
                      </div>
                    </div>
                  }
                  <br/>
                  <button className="btn btn-primary" onClick={this.addSensor.bind(this)}>Add Sensor</button>
                </div>
              }
            </div>
          }


          <ReactQuill theme="snow"
                  value={this.state.text}
                  onChange={this.onChange}
                  modules={modules}
                  formats={formats}
                  rows='100'
                  style={{width:100+'%', background:'white', marginLeft:'auto', marginRight:'auto'}}>
            <div className="my-editing-area" style={{height: 200 + 'px'}}></div>
          </ReactQuill>
          <br/>

          {section == "Data Collection" &&
            <button className="btn btn-primary" onClick={this.generateRisks.bind(this)}>Generate Risk&Protection</button>
          }
        </div>
        <hr style={styles.universal.hr} />
      </div>
    )
  }
}

export default FormSection
