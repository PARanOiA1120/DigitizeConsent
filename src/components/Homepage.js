import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {Switch, Route } from 'react-router-dom'


import ConsentForm from './ConsentForm'
import NavBar from './NavBar'
import CreateDBEntry from './CreateDBEntry'
import Profile from './Profile'

class Homepage extends Component {
  constructor(){
		super()
		this.state = {
			tab: ""
		}
	}

	componentDidMount() {
		const url = location.href.substr(location.href.lastIndexOf('/') + 1)
		if (url == "#consentForm") {
      this.updateTab("consentForm");
    } else if(url == "#addData"){
			this.updateTab("addData");
		} else if (url == "#searchDB"){
			this.updateTab("searchDB");
		} else {
			this.updateTab("profile");
		}
	}

  updateTab(tab){
    let updatedTab = Object.assign("", this.state.tab)
    updatedTab = tab

    this.setState({
      tab: updatedTab
    })
  }

  logout() {
    this.props.logout();
  }

  render(){
    return (
      <div>
        <Switch>
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/consentForm' component={ConsentForm} />
          <Route exact path='/addData' component={CreateDBEntry} />
          <Route exact path='/searchDB' component={CreateDBEntry} />
        </Switch>
      </div>
    );
  }
}

export default Homepage;
