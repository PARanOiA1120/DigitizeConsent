import React, { Component } from 'react'
import styles from './styles'
import { Link } from 'react-router-dom'


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
		// const url = location.href.substr(location.href.lastIndexOf('/') + 1)
		// if (url == "#consentForm"){
		// 	this.toggleConsentForm();
		// } else if(url == "#addData"){
		// 	this.toggleAddData();
		// } else if (url == "#searchDB"){
		// 	this.toggleSearchDB();
		// } else {
		// 	this.toggleProfile();
		// }
	}

	// toggleProfile() {
	// 	document.getElementById('profile').className = "active";
	// 	document.getElementById('consentForm').className = "consentForm";
	// 	document.getElementById('searchDB').className = "searchDB";
	// 	document.getElementById('addData').className = "addData";
	//
	// 	this.updateTab("profile")
	// }
	//
	// toggleConsentForm(){
	// 	document.getElementById('profile').className = "profile";
	// 	document.getElementById('consentForm').className = "active";
	// 	document.getElementById('searchDB').className = "searchDB";
	// 	document.getElementById('addData').className = "addData";
	//
	// 	this.updateTab("consentForm")
	// }
	//
	// toggleSearchDB(){
	// 	document.getElementById('profile').className = "profile";
	// 	document.getElementById('consentForm').className = "consentForm";
	// 	document.getElementById('searchDB').className = "active";
	// 	document.getElementById('addData').className = "addData";
	//
	// 	this.updateTab("searchDB")
	// }
	//
	// toggleAddData(){
	// 	document.getElementById('profile').className = "profile";
	// 	document.getElementById('consentForm').className = "consentForm";
	// 	document.getElementById('searchDB').className = "searchDB";
	// 	document.getElementById('addData').className = "active";
	//
	// 	this.updateTab("addData")
	// }
	//
	// updateTab(tab){
	// 	let updatedTab = Object.assign("", this.state.currentTab)
	// 	updatedTab = tab
	//
	// 	this.props.onChange(updatedTab)
	//
	// 	this.setState ({
	// 		currentTab: updatedTab
	// 	})
	// }

	logout() {
		this.props.logout();
	}

	render(){
		const profile = JSON.parse(localStorage.getItem('profile'));

		return(
			<nav className="navbar navbar-default" style={styles.navBar}>
				<div className="container-fluid">
					<div className="navbar-header">
  					<Link to="/"><span className="navbar-brand">mProv</span></Link>
    			</div>

			    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			      <ul className="nav navbar-nav">
							<li id="profile"><Link to="/profile" activeClassName="active">&nbsp;Profile&nbsp;</Link></li>
			        <li id="consentForm"><Link to="/consentForm" activeClassName="active">Consent Form Generator</Link></li>
			        <li id="addData"><Link to="/addData" activeClassName="active">Create Data Record</Link></li>
			        <li id="searchDB"><Link to="/searchDB" activeClassName="active">Search Database</Link></li>
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
