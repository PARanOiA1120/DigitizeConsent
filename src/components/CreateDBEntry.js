import React, { Component } from 'react'
import styles from './styles'
import JSONSchemaForm from './JSONSchemaForm'

class CreateDBEntry extends Component{
	constructor(){
		super()
		this.state = {
			collectionList: [
				{title: 'Device (add a new device)', action: '/api/device', schema: 'device_schema'},
				{title: 'Device Sensor (add a raw sensor to a specific device)', action: '/api/devicesensor', schema: 'device_sensor_schema'},
				{title: 'Software Sensor (add a new type of data that can be collected from software applications)', action: '/api/swsensor', schema: 'software_sensor_schema'},
				{title: 'Application (add a new application along with the types of data collected and devices supported)', action: '/api/appsensor', schema: 'app_sensor_schema'},
				{title: 'Sensor Attribute (specify attribute type that might be used in study configuration)', action: '/api/sensorattribute', schema: 'sensor_attribute_schema'},
				{title: 'Inference Description (add keyword and inference description mapping)', action: '/api/inferencedescription', schema: 'inference_description_schema'},
				{title: 'Sensor Inference (add a new inference with the devices and sensors produce that inference)', action: '/api/sensorinference', schema: 'sensor_inference_schema'},
			],
			selectedCollection: {},
			switchToReview: false
		}
	}

	componentDidMount(){
		console.log(this.props);
	}

	updateSelection(event){
		console.log(event.target.value)
		console.log(this.state.selectedCollection)

		let updatedCollection = Object.assign({}, this.state.selectedCollection)
		updatedCollection = this.state.collectionList[event.target.value]

		this.setState({
			selectedCollection: updatedCollection
		})
	}

	updateSwitchToReview(event){
		this.setState({
			switchToReview: !this.state.switchToReview
		})
	}

	render() {
		const formStyle = styles.schemaform
		const options = this.state.collectionList.map((collection, i) => {
			return (
				<option value={i} key={i}>{collection["title"]}</option>
			)
		})

		return (
			<div>
				{ this.state.switchToReview ?
					null
					:
					<select className="form-control" id="db" style={formStyle.selectionBox}
						onChange={this.updateSelection.bind(this)}>
						<option>-------------- Select a Form --------------</option>
						{options}
					</select>
				}

				{ this.state.selectedCollection.title &&
					<JSONSchemaForm collection={this.state.selectedCollection} switchToReview={this.state.switchToReview}
					onChange={this.updateSwitchToReview.bind(this)}/>
				}

			</div>
		)
	}


}


export default CreateDBEntry
