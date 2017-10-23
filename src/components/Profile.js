import React, { Component } from 'react'
import styles from './styles'
import superagent from 'superagent'

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userProfile: JSON.parse(localStorage.getItem('profile')),
      consentFormList: []
    }
  }

  componentDidMount() {
    superagent
      .get('/api/consentform')
      .query({authorID: this.state.userProfile.id})
      .set('Accept', 'application/json')
      .end((err, response) => {
        if(err){
          console.log("ERROR: " + err);
          return
        }

        this.setState({
          consentFormList: response.body.results
        })
      })

  }

  render() {
		const formStyle = styles.form;
    console.log(this.state.userProfile);

    const formList = this.state.consentFormList.map((form, i) => {
      return (
        <tr key={i}>
          <td>{ form["title"]} </td>
          <td>{ form["timeCreated"].split('T')[0] }</td>
          <td>{ form["lastUpdated"].split('T')[0] }</td>
          <td>
            <a className="btn btn-primary" style={{width:80, background:'white', color:'steelblue', borderColor:'steelblue'}}>
              <span className="glyphicon glyphicon-edit" style={{fontWeight:'bold'}}>&nbsp;Edit</span>
            </a>
          </td>
          <td>
            <a className="btn btn-primary" style={{background:'white', color:'steelblue', borderColor:'steelblue'}}>
              <span className="glyphicon glyphicon-download-alt" style={{fontWeight:'bold'}}>&nbsp;Download</span>
            </a>
          </td>
        </tr>
      )
    })

    return(
      <div className="container" style={formStyle.container}>
        <div className="userProfile" style={{width:30+'%', float: 'left', paddingLeft: 50+'px',
          paddingTop: 10+'px', paddingButtom: 10+'px', marginTop: 70+'px',
          borderRight: 'solid', borderWidth:1+'px', borderColor:'lightgrey', textAlign:"center",}}>
          <img src={this.state.userProfile.picture}
            style={{width: 200+'px', border: 'solid', borderColor:'#E8E4D9',
                      borderRadius:0.5, margin:'auto'}}>
          </img>
          <br />
          <br />
          <p><span style={{color:"grey"}}>Name: </span><span style={{fontWeight:"bold", color:"steelblue"}}>{this.state.userProfile.name}</span></p>
          <p><span style={{color:"grey"}}>Email: </span><span style={{fontWeight:"bold", color:"steelblue"}}>{this.state.userProfile.email}</span></p>
          <p><span style={{color:"grey"}}>Consent Forms: </span><span style={{fontWeight:"bold", color:"steelblue"}}>1</span></p>
        </div>

        <div className="myConsents" style={{width:68+'%', float: "right", marginTop: 70+'px', paddingLeft: 25+'px'}}>
          <h4>Your Consent Forms</h4>
          <br/>

          <table className="table table-hover" style={{width:85+'%', float:'left', textAlign:'center'}}>
            <thead>
              <tr>
                <th style={{textAlign: 'center'}}>Name</th>
                <th style={{textAlign: 'center'}}>Time Created</th>
                <th style={{textAlign: 'center'}}>Last Updated Time</th>
                <th style={{textAlign: 'center'}}>Edit</th>
                <th style={{textAlign: 'center'}}>Download</th>
              </tr>
            </thead>
            <tbody>
              { formList }
            </tbody>
          </table>
        </div>
      </div>
    )
  }

}

export default Profile
