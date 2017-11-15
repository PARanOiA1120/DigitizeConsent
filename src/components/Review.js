import React, { Component } from "react";
import { render } from "react-dom";
import superagent from 'superagent';

class Review extends Component {
	constructor() {
		super()

		this.state = {
			formData: {}
		}
	}

	componentDidMount(){
		console.log(this.props)
		this.setState({
			formData: this.props.formData
		})
	}

	updateData(event){
		// console.log("updateData: " + event.target.value)
		let updatedFormData = Object.assign({}, this.state.formData)
		updatedFormData = JSON.parse(event.target.value)

		this.setState({
			formData: updatedFormData
		})
	}

	submit() {
		// if(this.props.collection.action == '/api/sensorinference'){
		// 	// console.log(JSON.stringify(this.state.formData))
		// 	let updatedFormData = Object.assign({}, this.state.formData)

		// 	// console.log("sensorList: " + JSON.stringify(updatedFormData.sensorList))
		// 	updatedFormData.sensorList.forEach((sensor) => {
		// 		// console.log("sensor: " + sensor)
		// 		let device = sensor["device"]
		// 		let sensorName = sensor["name"]
		// 		// console.log("device: " + device)
		// 		// console.log("sensor: " + sensorName)

		// 		//get sensorID from device sensor table
		// 		superagent
		// 		.get('/api/devicesensor')
		// 		.query({device: device, sensorName: sensorName})
		// 		.set('Accept', 'application/json')
		// 		.end((err, response) => {
		// 			if(err){
		// 			  alert('ERROR: '+err)
		// 			  return
		// 			}
		// 			// console.log("result: " + JSON.stringify(response.body.results))
		// 			let sensorID = response.body.results[0]["_id"]
		// 			// console.log("sensorID: " + sensorID)

		// 			sensor["sensorID"] = sensorID
		// 			delete sensor.device
		// 			delete sensor.name

		// 			this.setState({
		// 				formData: updatedFormData
		// 			})

		// 			console.log("data submitted: " + JSON.stringify(this.state.formData))
		// 			fetch(this.props.collection.action, {
		// 		      method: 'POST',
		// 		      headers: {
		// 		        'Accept': 'application/json',
		// 		        'Content-Type': 'application/json'
		// 		      },
		// 		      body: JSON.stringify(this.state.formData)
		// 		    })
		// 		})
		// 	})
		// }
		// else {

			superagent
			.post(this.props.collection.action)
			.send(this.state.formData)
			.set('Accept', 'application/json')
			.end((err, response) => {
				if(err){
					alert('ERROR: '+err)
					return
				}

				alert("Data submitted. Thanks for your contribution!")
				window.location.reload()
			})
		// }
	}



	render() {
		return(
			<div>
				<h4>Review New Data Entry</h4>
				<hr />
				<textarea className="form-control" value={JSON.stringify(this.state.formData, undefined, 4)} rows="17"
				onChange={this.updateData.bind(this)}></textarea>
				<hr />
				<button className="btn btn-primary" onClick={this.submit.bind(this)}>Submit</button>
			</div>
		)
	}

}


export default Review
