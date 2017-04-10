import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Home from './components/Home'
import ConsentForm from './components/ConsentForm'

class App extends Component {
	
	render(){
		return (
			<div>
				<ConsentForm />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root')) 
