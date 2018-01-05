import React, { Component } from 'react'
import styles from './styles'
import { Link, NavLink } from 'react-router-dom'


class NavBar extends Component {
	constructor(){
		super()
		this.state = {
		}
	}

	logout() {
		this.props.logout();
	}

	render(){
		const profile = JSON.parse(localStorage.getItem('profile'));

		return(
			<nav className="navbar navbar-default" style={styles.navBar}>
				<div className="container-fluid">
					<div className="navbar-header">
  					<span className="navbar-brand">mProv</span>
    			</div>

			    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			      <ul className="nav navbar-nav">
							<li id="profile">
								<NavLink to="/profile" activeClassName="active"
									activeStyle={{fontWeight:'bold', fontSize: 15+'px', color:'steelblue'}}>&nbsp;Profile&nbsp;</NavLink>
							</li>
			        <li id="consentForm">
								<NavLink to="/consentForm" activeClassName="active"
									activeStyle={{fontWeight:'bold', fontSize: 15+'px', color:'steelblue'}}>Consent Form Generator</NavLink>
							</li>
			        <li id="addData">
								<NavLink to="/addData" activeClassName="active"
									activeStyle={{fontWeight:'bold', fontSize: 15+'px', color:'steelblue'}}>Create Data Record</NavLink>
							</li>
			        <li id="searchDB">
								<NavLink to="/searchDB" activeClassName="active"
									activeStyle={{fontWeight:'bold', fontSize: 15+'px', color:'steelblue'}}>Search Database</NavLink>
							</li>
							{ profile.email == "formmulaa@gmail.com" &&
								<li id="adminPortal">
									<NavLink to="/adminPortal" activeClassName="active"
										activeStyle={{fontWeight:'bold', fontSize: 15+'px', color:'steelblue'}}>Admin Portal</NavLink>
								</li>
							}
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
