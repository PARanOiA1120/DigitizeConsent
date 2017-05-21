import React, { Component } from 'react'
import styles from './styles'
import JSONSchemaForm from './JSONSchemaForm'

class CreateDBEntry extends Component{
	constructor(){
		super()
		this.state = {
			collectionList: [
				{title: 'Device-Sensor', action: '/api/devicesensor', schema: 'device_sensor_schema'},
				{title: 'Sensor-Inference', action: '/api/sensorinference', schema: 'sensor_inference_schema'}
			],
			selectedCollection: {}
		}
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

	render() {
		const formStyle = styles.schemaform
		const options = this.state.collectionList.map((collection, i) => {
			return (
				<option value={i} key={i}>{collection["title"]}</option>
			)
		})


		return (
			<div>
				<select className="form-control" id="db" style={formStyle.selectionBox}
					onChange={this.updateSelection.bind(this)}>
					<option>-------------- Select a Table --------------</option>
					{options}
				</select>

				{ this.state.selectedCollection.title &&
					<JSONSchemaForm collection={this.state.selectedCollection}/>
				}
			</div>
		)
	}


}


export default CreateDBEntry