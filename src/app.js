import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Homepage from './components/Homepage'
import Login from './components/Login'

class App extends Component {

	constructor(){
		super()
		this.state = {
			isSignedIn: false,
			user_email: ''
		}
	}


	componentDidMount() {
	}

	updateSingnInStatus(status) {
		this.setState({
			isSignedIn: true
		}, () => {
			console.log("sign in status: " + this.state.isSignedIn);
		})
	}


	render(){
		return (
			<div>
  			{this.state.isSignedIn == false &&
					<Login updateSingnInStatus={this.updateSingnInStatus.bind(this)}/>
				}
				{this.state.isSignedIn == true &&
					<Homepage />
				}
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'))
