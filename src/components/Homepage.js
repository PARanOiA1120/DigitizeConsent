import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ConsentForm from './ConsentForm'
import NavBar from './NavBar'
import CreateDBEntry from './CreateDBEntry'
import Login from './Login'

class Homepage extends Component {
  constructor(){
		super()
		this.state = {
			tab: ""
		}
	}

	updateTab(tab){
		let updatedTab = Object.assign("", this.state.tab)
		updatedTab = tab

		this.setState({
			tab: updatedTab
		})
	}

	componentDidMount() {
		const url = location.href.substr(location.href.lastIndexOf('/') + 1)
		if (url == "#addData"){
			this.updateTab("addData")
		} else if (url == "#searchDB"){
			this.updateTab("searchDB")
		} else {
			this.updateTab("consentForm")
		}
	}

  render(){
    return (
      <div>
        <NavBar currentTab={this.state.tab} onChange={this.updateTab.bind(this)}/>

        {this.state.tab == "consentForm" &&
          <ConsentForm/>
        }
        {this.state.tab == "addData" &&
          <CreateDBEntry />
        }
        {this.state.tab == "searchDB" &&
          <Login />
        }
      </div>
    );
  }
}

export default Homepage;
