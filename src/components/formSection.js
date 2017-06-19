import React, { Component } from 'react'
import ReactQuill, { Quill } from 'react-quill'
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
      attrNameC: "", // attribute name and value for customized attributes
      attrValueC: ""
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
    content += "<strong>" + this.props.currentSection.title + "</strong>"
    content += "<br/>"
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

      console.log(JSON.stringify(response.body.results))
      let results = response.body.results
      let apps = Object.assign([], this.state.apps)
      results.forEach((app) => {
          apps.push(app.application)
      })

      console.log("apps: " + apps)

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

      // console.log(JSON.stringify(response.body.results))
      let results = response.body.results
      let devices = Object.assign([], this.state.deviceList)
      results.forEach((devicesensor) => {
        if(devices.indexOf(devicesensor.device))
          devices.push(devicesensor.device)
      })

      this.setState({ 
        deviceList: devices
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
    }, () => {
      console.log("updated section: " + JSON.stringify(this.state.section))
    })
  }

  updateSensorSelection(event){
    console.log('update sensor selection: ' + event.target.value)
    let updatedSensor = Object.assign("", this.state.selectedSensor)
    updatedSensor = event.target.value

    this.setState({
      selectedSensor: updatedSensor
    })
  }

  updateAttrName(event) {
    console.log("update arrtibute name: " + event.target)
    this.setState({
      attrName: event.target.value,
      attrNameC: "",
      attrValueC: ""
    })
  }

  updateAttrValue(event) {
    this.setState({
      attrValue: event.target.value,
      attrNameC: "",
      attrValueC: ""
    })
  }

  updateAttrNameC(event) {
    this.setState({
      attrNameC: event.target.value,
      attrName: "",
      attrValue: ""
    })
  }

  updateAttrValueC(event) {
    this.setState({
      attrValueC: event.target.value,
      attrName: "",
      attrValue: ""
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
      attrName: "",
      attrValue: ""
    })
  }

  // add attribute to currentAttributes but not to attrForSearch
  addCustomizedAttr(event){
    let updatedCurrentAttr = Object.assign({}, this.state. currentAttributes)
    updatedCurrentAttr[this.state.attrNameC] = this.state.attrValueC

    this.setState({
      currentAttributes: updatedCurrentAttr,
      attrNameC: "",
      attrValueC: ""
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
    console.log(sensors)

    this.setState({
      selectedSWSeneors: sensors
    }, () => {
      console.log("selected sw sensors: " + this.state.selectedSWSeneors)
    })
  }

  updateDevicesforApp(event){

  }

  addAnotherApp(event){

  }

  addAdditionalSensors(event){

  }


  addSensor(event){
    // generate context to display in the section
    let updatedSectionContent = this.state.section.content
    updatedSectionContent += "The study uses " + this.state.selectedSensor + " on " + this.state.selectedDevice + " with attribute "

    let attributes = this.state.currentAttributes
    let i = 1
    Object.keys(attributes).map(function(key){
      if(i == 1)
        updatedSectionContent += key + " set to " + attributes[key]
      else
        updatedSectionContent += ", " + key + " set to " + attributes[key];
      i += 1
    })

    updatedSectionContent += "."
    this.updateSection(updatedSectionContent)

    // add sensor along with its attribute list to sensorList
    let updatedSensor = Object.assign({}, this.state.currentSensor)
    updatedSensor["device"] = this.state.selectedDevice
    updatedSensor["sensor"] = this.state.selectedSensor
    updatedSensor["attributes"] = this.state.attrForSearch
    console.log('add sensor: ' + JSON.stringify(updatedSensor))

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
    })
  }

  generateRisks(event) {
    this.props.addSection("Risk&Protection")
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


    // TODO: make this part dynamic 
    const attributeList = Object.keys(this.state.currentAttributes).map((attr) => {
      return (
        <li key={attr} style={{fontSize: 17 + 'px'}}>
          <b>{attr}</b>: {this.state.currentAttributes[attr]}
        </li>
      )
    })
    

    return (
      <div>
        <div className="form-group" style={formStyle.formgroup}>
          <label style={formStyle.label}>{this.state.section.title}</label>
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

              {this.state.selectedApp != "" && this.state.selectedApp != "none" &&
                <div className="form-group" style={formStyle.formgroup}>
                  <label htmlFor="swsensor">Data collected from application (select all that applied):</label>
                  <br/>
                  <select multiple className="form-control" id="swsensor" style={formStyle.selectionBox}
                    onChange={this.updateSoftwareSensor.bind(this)} value={this.state.selectedSWSeneors}>
                    {swsensorOptions}
                  </select>
                  <br/><br/><br/><br/><br/>
                  
                  <label htmlFor="appdevice">Device running the application (select all that applied):</label>
                  <select multiple className="form-control" id="supportedDevice" style={formStyle.selectionBox}
                    onChange={this.updateDevicesforApp.bind(this)} value="this.state.supportedDevices">
                    {supportedDevicesOptions}
                  </select>

                  <br/><br/><br/><br/><br/><br/>
                  <button className="btn btn-primary" onClick={this.addAnotherApp.bind(this)}>Add another application</button>
                  <button className="btn btn-primary" style={{marginLeft:10+'px'}} 
                    onClick={this.addAdditionalSensors.bind(this)}>Add additional sensors</button>
                  <hr style={styles.universal.hr} />
                </div>
              }


              {this.state.selectedApp == "none" &&              
                <div className="form-group">
                  <hr style={styles.universal.hr}/>
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
                          <option value="sampling rate" key="sampling rate">sampling rate</option>
                          <option value="continuous" key="continuous">continuous</option>
                        </select>
                        <input className="form-control" placeholder="attribute value" style={formStyle.attribute}
                          value={this.state.attrValue} onChange={this.updateAttrValue.bind(this)}/>
                        <button className="btn btn-primary" onClick={this.addAttr.bind(this)}>Add attribute</button>
                        <br/>
                        <br/>
                      </div>

                      <div className="customizedAttr">
                        <input className="form-control" placeholder="attribute name" style={formStyle.attribute}
                          value={this.state.attrNameC} onChange={this.updateAttrNameC.bind(this)}/>
                        <input className="form-control" placeholder="attribute value" style={formStyle.attribute}
                          value={this.state.attrValueC} onChange={this.updateAttrValueC.bind(this)}/>
                        <button className="btn btn-primary" onClick={this.addCustomizedAttr.bind(this)}>Add attribute</button>
                        <br/>
                      </div>
                    </div>
                  } 
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