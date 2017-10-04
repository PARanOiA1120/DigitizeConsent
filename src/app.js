import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Homepage from './components/Homepage'
import Login from './components/Login'

class App extends Component {

	constructor(){
		super()
	}


	componentDidMount() {
	}


	render(){
		return (
			<div>

				<Login />

			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'))
