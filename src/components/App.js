import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { BrowserRouter as Router } from 'react-router-dom';

import Homepage from './Homepage'
import Login from './Login'
import NavBar from './NavBar'


class App extends Component {

	constructor(){
		super()
		this.state = {
			isSignedIn: false
		}
	}

	componentDidMount() {
		this.isLoggedIn();
	}

	setSingnInStatus(status) {
		this.setState({
			isSignedIn: status
		}, () => {
			console.log("sign in status: " + this.state.isSignedIn);
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
					} else {
						this.setSingnInStatus(false);
					}
				})
				.catch((error) => {
					this.setSingnInStatus(false);
					this.logout();
					console.log(error);
				})
		}
	}

	logout() {
		console.log("logging out...");
		localStorage.removeItem('profile');
		localStorage.removeItem('id_token');
		window.location.reload();
	}


	render(){
		return (
			<div>
  			{this.state.isSignedIn == false &&
					<Login setSingnInStatus={ this.setSingnInStatus.bind(this) }/>
				}
				{this.state.isSignedIn == true &&
          <div className="main">
            <NavBar logout={ this.logout.bind(this) }/>

  					<Homepage isSignedIn={ this.state.isSignedIn } logout={ this.logout.bind(this)} />
          </div>
				}
			</div>
		);
	}
}

export default App
