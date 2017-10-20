import React, { Component } from 'react'
import ReactDOM from 'react-dom'
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
		if (url == "consentForm") {
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
        <NavBar currentTab={this.state.tab} onChange={this.updateTab.bind(this)} isSignedIn={this.props.isSignedIn}
          logout={ this.logout.bind(this) }/>

        {this.state.tab == "profile" &&
          <Profile />
        }
        {this.state.tab == "consentForm" &&
          <ConsentForm />
        }
        {this.state.tab == "addData" &&
          <CreateDBEntry />
        }
        {this.state.tab == "searchDB" &&
          <br />
        }
      </div>
    );
  }
}

export default Homepage;
