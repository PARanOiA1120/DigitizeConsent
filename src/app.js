import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Home from './components/Home'
import ConsentForm from './components/ConsentForm'
import NavBar from './components/NavBar'

class App extends Component {
	
	render(){
		return (
			<div>
				<NavBar />
				<ConsentForm />				
				{/*<Home />*/}
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root')) 
