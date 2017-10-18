import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Homepage from './components/Homepage'
import Login from './components/Login'
import axios from 'axios'

class App extends Component {

	constructor(){
		super()
		this.state = {
			isSignedIn: false,
			userProfile: {}
		}
		this.isLoggedIn();
	}

	componentDidMount() {

	}

	setSingnInStatus(status) {
		this.setState({
			isSignedIn: true
		}, () => {
			console.log("sign in status: " + this.state.isSignedIn);
		})
	}

	getUserProfile(){
		this.setState({
			userProfile: JSON.parse(localStorage.getItem('profile') || '{}')
		}, () => {
			console.log(this.state.userProfile);
		})
	}

	getIdToken(){
		return localStorage.getItem('id_token');
	}

	isLoggedIn() {
		var id_token = this.getIdToken();
		console.log("id token: " + id_token);

		if(id_token == null) {
			this.setSingnInStatus(false);
		} else {
			axios
				.get("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + id_token)
				.then((result) => {
					console.log(result);
					if(result.status == 200 ){
						this.setSingnInStatus(true);
						this.getUserProfile();
					} else {
						this.setSingnInStatus(false);
					}
				})
				.catch((error) => {
					this.setSingnInStatus(false);
					console.log(error);
					return;
				})
		}
	}

	logout() {
		localStorage.removeItem('profile');
		localStorage.removeItem('id_token');
	}


	render(){
		return (
			<div>
  			{this.state.isSignedIn == false &&
					<Login setSingnInStatus={this.setSingnInStatus.bind(this)}/>
				}
				{this.state.isSignedIn == true &&
					<Homepage isSignedIn={this.state.isSignedIn}/>
				}
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'))
