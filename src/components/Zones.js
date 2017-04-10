import React, { Component } from 'react'
import Zone from './Zone'

class Zones extends Component {
	constructor(){
		super()
		this.state ={
			list: [
				{name:"Zone 1", zipCode:"10012", numComments:10},
				{name:"Zone 2", zipCode:"10013", numComments:12},
				{name:"Zone 3", zipCode:"10014", numComments:7},
				{name:"Zone 4", zipCode:"10015", numComments:20}
			]
		}
	}

	render(){
		const listItems = this.state.list.map((zone) => {
			return (
				<li><Zone currentZone={zone} /></li>
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
			</div>
		)
	}
}

export default Zones