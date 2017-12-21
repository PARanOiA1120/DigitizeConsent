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
		var formData = this.props.formData

		if(formData.inference){
			var inferenceObj = {}
			var inference = formData.inference

			inferenceObj["inferenceName"] = inference.split(':')[0]
			inferenceObj["inferenceID"] = inference.split('(').slice(-1)[0].slice(0, -1)

			var url = '/api/inferencedescription/' + inferenceObj["inferenceID"]
			superagent
			.get(url)
			.set('Accept', 'application/json')
			.end((err, response) => {
				if(err){
					alert('ERROR: '+err)
					return
				}

				inferenceObj["description"] = response.body.result["description"]
				formData["inference"] = inferenceObj

				this.setState({
					formData: formData
				})
			})
		}

		this.setState({
			formData: formData
		}, () => {
			console.log(this.state.formData)
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

	}

	submitForReview() {
		var data = {
			"authorID": JSON.parse(localStorage.getItem('profile')).id,
			"action": this.props.collection.action,
			"content": JSON.stringify(this.state.formData),
			"tableName": this.props.collection.schema,
			"status": "Pending"
		}

		superagent
		.post('/api/usercontribution')
		.send(data)
		.set('Accept', 'application/json')
		.end((err, response) => {
			if(err){
				alert('ERROR: '+err)
				return
			}

			console.log(response)
			alert("Data submitted. Thanks for your contribution!")
			// window.location.reload()
		})
	}



	render() {
		return(
			<div>
				<h4>Review New Data Entry</h4>
				<hr />
				<textarea readOnly className="form-control" value={JSON.stringify(this.state.formData, undefined, 4)} rows="17"
				onChange={this.updateData.bind(this)}></textarea>
				<hr />
				<button className="btn btn-primary" onClick={this.submitForReview.bind(this)}>Submit</button>
			</div>
		)
	}

}


export default Review
