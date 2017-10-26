import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {Switch, Route } from 'react-router-dom'

import ConsentForm from './ConsentForm'
import CreateDBEntry from './CreateDBEntry'
import Profile from './Profile'

class Homepage extends Component {
  constructor(){
		super()
		this.state = {
		}
	}

	componentDidMount() {
	}

  render(){
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Profile} />
          <Route path='/profile' component={Profile} />
          <Route exact path='/consentForm' component={ConsentForm} />
          <Route path='/consentForm/:formid' component={ConsentForm} />
          <Route path='/addData' component={CreateDBEntry} />
          <Route path='/searchDB' component={CreateDBEntry} />
        </Switch>
      </div>
    );
  }
}

export default Homepage;
