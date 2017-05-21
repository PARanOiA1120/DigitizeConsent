import React, { Component } from 'react'
import styles from './styles'


class NavBar extends Component {
	constructor(){
		super()
		this.state = {
			currentTab: ""
		}
	}

	toggleConsentForm(event){
		document.getElementById('consentForm').className = "active";
		document.getElementById('riskReport').className = "riskReport"; 
		document.getElementById('addData').className = "addData";

		this.updateTab("consentForm")
	}

	toggleRiskReport(){
		document.getElementById('consentForm').className = "consentForm";
		document.getElementById('riskReport').className = "active"; 
		document.getElementById('addData').className = "addData";

		this.updateTab("riskReport")
	}

	toggleAddData(){
		document.getElementById('consentForm').className = "consentForm";
		document.getElementById('riskReport').className = "riskReport"; 
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

	render(){
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
				        <li className="active" onClick={ this.toggleConsentForm.bind(this)} id="consentForm"><a href="/">Consent Form Generator</a></li>
				        <li onClick={ this.toggleAddData.bind(this)} id="addData"><a href="#addData">Create Data Record</a></li>
				        <li onClick={ this.toggleRiskReport.bind(this)} id="riskReport"><a href="#searchDB">Search Database</a></li>
				      </ul>
				    </div>
				</div>
			</nav>
		)
	}
}

export default NavBar