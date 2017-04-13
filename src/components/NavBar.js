import React, { Component } from 'react'
import styles from './styles'


class NavBar extends Component {

	toggleConsentForm(event){
		document.getElementById('consentForm').className = "active";
		document.getElementById('riskReport').className = "riskReport"; 
	}

	toggleRiskReport(){
		document.getElementById('consentForm').className = "consentForm";
		document.getElementById('riskReport').className = "active"; 
	}

	render(){
		return(
			<nav className="navbar navbar-default" style={{width:100+'%', background:'#f9f9f9', fontSize:14, fontWeight:500}}>
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
				        <li className="active" onClick={ this.toggleConsentForm.bind(this)} id="consentForm"><a>Consent Form Generator</a></li>
				        <li onClick={ this.toggleRiskReport.bind(this)} id="riskReport"><a>Sensor Risk Report</a></li>
				      </ul>
				    </div>
				</div>
			</nav>
		)
	}
}

export default NavBar