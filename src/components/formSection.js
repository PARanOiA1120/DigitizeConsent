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
      deviceList: [], // a list of all devices
      deviceSensorList: [], // a list of all sensors of the selected device
      selectedDevice: '',
      selectedSensor: '',
      sensorList: [], // sensor list to query for risks, include device
      sensorRisks: [],
      currentSensor: {},
      currentAttributes: {},
      attrName: "",
      attrValue: ""
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
    this.setState({
      section: this.props.currentSection,
      text: this.props.currentSection.content
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

    console.log("current section: " + JSON.stringify(this.props.currentSection))
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
    console.log('update sensor selection: ' + event.target.value)
    let updatedSensor = Object.assign("", this.state.selectedSensor)
    updatedSensor = event.target.value

    this.setState({
      selectedSensor: updatedSensor
    })
  }

  updateAttrName(event) {
    this.setState({
      attrName: event.target.value
    })

  }

  updateAttrValue(event) {
    this.setState({
      attrValue: event.target.value
    })
  }

  addAttr(event){
    let updatedCurrentAttr = Object.assign({}, this.state. currentAttributes)
    updatedCurrentAttr[this.state.attrName] = this.state.attrValue

    this.setState({
      currentAttributes: updatedCurrentAttr,
      attrName: "",
      attrValue: ""
    })

  }

  addSensor(event){
    console.log('add sensor: ' + this.state.selectedSensor)
    let updatedSensor = Object.assign({}, this.state.currentSensor)


    let updatedSensorList = Object.assign([], this.state.sensorList)
    updatedSensorList.push(this.state.selectedSensor)

    this.setState({
      sensorList: updatedSensorList
    })

    // needs to clear currentAttributes and currentSensor
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
              <label htmlFor="device" style={{float:'left', marginRight:5+'px'}}>Select device:</label>
              <select className="form-control" id="device" style={formStyle.selectionBox}
                onChange={this.updateDeviceSelection.bind(this)}>
                <option>--- Select a device ---</option>
                {deviceOptions}
              </select>
              <br/>
              <br/>
              <label htmlFor="sensor" style={{float:'left', marginRight:5+'px'}}>Select sensor to add:</label>
              <select className="form-control" id="sensor" style={formStyle.selectionBox}
                onChange={this.updateSensorSelection.bind(this)}>
                <option>--- Select a sensor ---</option>
                {sensorOptions}
              </select>
              <br/>
              <hr style={styles.universal.hr} />

              { this.state.selectedSensor != "" &&
                <div className="attriList" style={{marginLeft: 20 + 'px'}}>
                  {this.state.currentAttributes != {} && 
                    <div className="finalizedAttrList">
                      <ul style={formStyle.list}>
                        {attributeList}
                      </ul>

                    </div>
                  }
                  <br/>
                  <input className="form-control" placeholder="attribute name" style={formStyle.attribute}
                    value={this.state.attrName} onChange={this.updateAttrName.bind(this)}/>
                  <input className="form-control" placeholder="attribute value" style={formStyle.attribute}
                    value={this.state.attrValue} onChange={this.updateAttrValue.bind(this)}/>
                  <button className="btn btn-primary" onClick={this.addAttr.bind(this)}>Add attribute</button>
                  <br/>
                  <hr style={styles.universal.hr} />
                </div>
              }
              <button className="btn btn-primary" onClick={this.addSensor.bind(this)}>Add Sensor</button>
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