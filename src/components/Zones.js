import React, { Component } from 'react'
import Zone from './Zone'
import superagent from 'superagent'

class Zones extends Component {
	constructor(){
		super()
		this.state ={
			zone: {
				name: '',
				zipCode: ''
			},
			list: []
		}
	}

	componentDidMount(){
		console.log('componentDidMount')
		
		superagent
		.get('/api/zone')
		.query(null)
		.set('Accept', 'application/json')
		.end((err, response) => {
			if(err){
				alert('ERROR: '+err)
				return
			}

			console.log(JSON.stringify(response.body))
			let results = response.body.results

			this.setState({
				list: results
			})
		})
	}

	updateZone(event){
		console.log('updateZone: ' + event.target.id + ' == ' + event.target.value)

		let updatedZone = Object.assign({}, this.state.zone)
		updatedZone[event.target.id] = event.target.value

		this.setState({
			zone: updatedZone
		})
	}

	addZone(event){
		console.log('ADD ZONE: ' + JSON.stringify(this.state.zone))
		let updatedList = Object.assign([], this.state.list)
		updatedList.push(this.state.zone)

		this.setState({
			list: updatedList
		})
	}


	render(){
		const listItems = this.state.list.map((zone, i) => {
			return (
				<li key={i}><Zone currentZone={zone} /></li>
			)
		}) //function callback in ES6

		return (
			// jsx: javascript extensitions
			// write html inside javascript
			// in jsx every tag must be closed
			<div>
				<ol>
					{listItems}
				</ol>

				<input id="name" onChange={this.updateZone.bind(this)} className="form-control" type="text" placeholder="Name" /><br />
				<input id="zipCode" onChange={this.updateZone.bind(this)} className="form-control" type="text" placeholder="Zip Code" /><br/>
				<button onClick={this.addZone.bind(this)} className="btn btn-danger">Add Zone</button>
			</div>
		)
	}
}

export default Zones