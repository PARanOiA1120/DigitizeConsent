import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ConsentForm from './components/ConsentForm'
import NavBar from './components/NavBar'

class App extends Component {
	
	render(){
		return (
			<div>
				<NavBar />
				<ConsentForm />				
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root')) 
