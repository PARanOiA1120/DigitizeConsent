import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ConsentForm from './components/ConsentForm'
import NavBar from './components/NavBar'
import JSONSchemaForm from './components/JSONSchemaForm'

class App extends Component {

	constructor(){
		super()
		this.state = {
			tab: "consentForm"
		}
	}

	updateTab(tab){
		console.log("tab: " + tab)
		let updatedTab = Object.assign("", this.state.tab)
		updatedTab = tab

		this.setState({
			tab: updatedTab
		})
	}
	
	render(){
		return (
			<div>
				<NavBar currentTab={this.state.tab} onChange={this.updateTab.bind(this)}/>

				{this.state.tab == "consentForm" &&
					<ConsentForm/>	
				}
				{this.state.tab == "addData" &&
					<JSONSchemaForm />

				}		
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root')) 
