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
      sensorList: [], // sensor list to query for risks
      sensorRisks: [],
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

  addSensor(event){
    console.log('add sensor: ' + this.state.selectedSensor)
    let updatedSensorList = Object.assign([], this.state.sensorList)
    updatedSensorList.push(this.state.selectedSensor)

    this.setState({
      sensorList: updatedSensorList
    })

    // TODO: fetch attribute list from db
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
    const sensorList = this.state.sensorList.map((sensor, i) => {
      return (
        <li key={i}>
          <label style={{marginRight: 5+'px', float: 'left'}}>Sampling Rate: </label>
          <input className="form-control" style={{width:50+'%'}}></input>
        </li>
      )
    })
    

    return (
      <div>
        <div className="form-group" style={formStyle.formgroup}>
          <label style={formStyle.label}>{this.state.section.title}</label>
          <br/>
          <br/>
          
          
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
            <button className="btn btn-primary" onClick={this.addSensor.bind(this)}>Add Sensor</button><br/>
            <hr style={styles.universal.hr} />

            <ul style={formStyle.list}>
              {sensorList}
            </ul>
            {sensorList.length > 0 && <hr style={styles.universal.hr} />}
          </div>
          

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
          
          {sensors && sensors.length >= 1 && sensors[0] != "" &&
            <button className="btn btn-primary" onClick={this.generateRisks.bind(this)}>Generate Risk&Protection</button>
          }
        </div>
        <hr style={styles.universal.hr} />
      </div>
    )
  }
}

export default FormSection