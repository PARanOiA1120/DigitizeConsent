import React, { Component } from 'react'
import styles from './styles'


class NavBar extends Component {
	constructor(){
		super()
		this.state = {
			currentTab: "",
			isSignedIn: false,
		}
	}

	componentDidMount() {
		this.setState({
			isSignedIn: this.props.isSignedIn
		})
		// this.getUserProfile();
		const url = location.href.substr(location.href.lastIndexOf('/') + 1)
		if (url == "#addData"){
			this.toggleAddData()
		} else if (url == "#searchDB"){
			this.toggleSearchDB()
		} else {
			this.updateTab("consentForm")
		}
	}
	//
	// getUserProfile(){
	// 	this.setState({
	// 		userProfile: JSON.parse(localStorage.getItem('profile') || '{}')
	// 	}, () => {
	// 		console.log("current user: " + JSON.stringify(this.state.userProfile));
	// 	})
	// }

	toggleConsentForm(){
		document.getElementById('consentForm').className = "active";
		document.getElementById('searchDB').className = "searchDB";
		document.getElementById('addData').className = "addData";

		this.updateTab("consentForm")
	}

	toggleSearchDB(){
		document.getElementById('consentForm').className = "consentForm";
		document.getElementById('searchDB').className = "active";
		document.getElementById('addData').className = "addData";

		this.updateTab("searchDB")
	}

	toggleAddData(){
		document.getElementById('consentForm').className = "consentForm";
		document.getElementById('searchDB').className = "searchDB";
		document.getElementById('addData').className = "active";

		this.updateTab("addData")
	}

	updateTab(tab){
		let updatedTab = Object.assign("", this.state.currentTab)
		updatedTab = tab

		this.props.onChange(updatedTab)

		this.setState ({
			currentTab: updatedTab
		})
	}

	logout() {
		this.props.logout();
	}

	render(){
		const profile = JSON.parse(localStorage.getItem('profile'));
		console.log(profile);
		return(
			<nav className="navbar navbar-default" style={styles.navBar}>
				<div className="container-fluid">
					<div className="navbar-header">
  					<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
    					<span className="sr-only">Toggle navigation</span>
    					<span className="icon-bar"></span>
    					<span className="icon-bar"></span>
    					<span className="icon-bar"></span>
  					</button>
  					<a className="navbar-brand" href="#">mProv</a>
    			</div>

			    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			      <ul className="nav navbar-nav">
			        <li onClick={ this.toggleConsentForm.bind(this)} className="active" id="consentForm"><a href="">Consent Form Generator</a></li>
			        <li onClick={ this.toggleAddData.bind(this)} id="addData"><a href="#addData">Create Data Record</a></li>
			        <li onClick={ this.toggleSearchDB.bind(this)} id="searchDB"><a href="#searchDB">Search Database</a></li>
						</ul>
						<ul className="nav navbar-nav navbar-right">
							<li className="dropdown" style={{float: 'right'}}>
								<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> { profile.name } <span className="caret"></span></a>
								<ul className="dropdown-menu">
									<li>&nbsp; { profile.email }</li>
									<li role="separator" className="divider"></li>
									<li onClick={ this.logout.bind(this) }>&nbsp; Sign Out</li>
								</ul>
							</li>
						</ul>
			    </div>
				</div>
			</nav>
		)
	}
}

export default NavBar
