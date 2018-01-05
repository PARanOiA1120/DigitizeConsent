import React, { Component } from 'react'
import superagent from 'superagent'
import { Link } from 'react-router-dom'
import styles from './styles'


class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userProfile: JSON.parse(localStorage.getItem('profile')),
      consentFormList: [],
      numForms: 0,
      contributionList: []
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
          consentFormList: response.body.results,
          numForms: response.body.results.length
        })
      })

      superagent
        .get('/api/usercontribution')
        .query({authorID: this.state.userProfile.id})
        .set('Accept', 'application/json')
        .end((err, response) => {
          if(err){
            console.log("ERROR: " + err);
            return
          }
          this.setState({
            contributionList: response.body.results
          })
        })
  }

  deleteForm(formid){
    var url = '/api/consentform/' + formid;

    superagent
      .delete(url)
      .query(null)
      .set('Accept', 'application/json')
      .end((err, response) => {
        if(err){
          console.log("ERROR: " + err);
          return
        }
        window.location.reload();
      })
  }


  render() {
		const formStyle = styles.form;

    const formList = this.state.consentFormList.map((form, i) => {
      return (
        <tr key={i}>
          <td>{ form["title"]} </td>
          <td>{ form["timeCreated"].split('T')[0] }</td>
          <td>{ form["lastUpdated"].split('T')[0] }</td>
          <td>
            <Link to={'/consentForm/'+ form["_id"]}>
              <button className="btn btn-primary" style={{width:80, background:'white', color:'steelblue', borderColor:'steelblue'}}>
                <span className="glyphicon glyphicon-edit" style={{fontWeight:'bold'}}>&nbsp;Edit</span>
              </button>
            </Link>
          </td>
          <td>
            <a className="btn btn-primary" style={{background:'white', color:'steelblue', borderColor:'steelblue'}}>
              <span className="glyphicon glyphicon-download-alt" style={{fontWeight:'bold'}}>&nbsp;Download</span>
            </a>
          </td>
          <td>
            <a className="btn btn-primary" onClick={ this.deleteForm.bind(this, form["_id"]) }
              style={{background:'white', color:'darkred', borderColor:'darkred'}}>
              <span className="glyphicon glyphicon-remove" style={{fontWeight:'bold'}}>&nbsp;Delete</span>
            </a>
          </td>
        </tr>
      )
    })

    const contributionList = this.state.contributionList.map((contribution, i) => {
      return (
        <tr key={i}>
          <td>{ contribution["tableName"]} </td>
          <td>{ contribution["timeSubmitted"] }</td>
          <td>{ contribution["status"] }</td>
          <td>
            <a className="btn btn-primary" style={{background:'white', color:'steelblue', borderColor:'steelblue'}}>
              <span className="glyphicon glyphicon-search" style={{fontWeight:'bold'}}>&nbsp;View</span>
            </a>
          </td>
          <td>
            <a className="btn btn-primary" 
              style={{background:'white', color:'darkred', borderColor:'darkred'}}>
              <span className="glyphicon glyphicon-remove" style={{fontWeight:'bold'}}>&nbsp;Delete</span>
            </a>
          </td>
        </tr>
      )
    })

    return(
      <div className="container" style={formStyle.container}>
        <div className="userProfile" style={{width:25+'%', float: 'left', paddingLeft: 20+'px',
          paddingTop: 10+'px', paddingButtom: 10+'px', marginTop: 70+'px', height: 80+'%',
          borderRight: 'solid', borderWidth:1+'px', borderColor:'lightgrey', textAlign:"center",}}>
          <img src={this.state.userProfile.picture}
            style={{width: 200+'px', border: 'solid', borderColor:'#E8E4D9',
                      borderRadius:0.5, margin:'auto'}}>
          </img>
          <br />
          <br />
          <p><span style={{color:"grey"}}>Name: </span><span style={{fontWeight:"bold", color:"steelblue"}}>{ this.state.userProfile.name }</span></p>
          <p><span style={{color:"grey"}}>Email: </span><span style={{fontWeight:"bold", color:"steelblue"}}>{ this.state.userProfile.email }</span></p>
          <p><span style={{color:"grey"}}>Consent Forms: </span><span style={{fontWeight:"bold", color:"steelblue"}}>{ this.state.numForms }</span></p>
        </div>

        <div className="myConsents" style={{width:73+'%', float: "right", marginTop: 70+'px', paddingLeft: 20+'px'}}>
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
                <th style={{textAlign: 'center'}}>Delete</th>
              </tr>
            </thead>
            <tbody>
              { formList }
            </tbody>
          </table>
          <hr/>
        </div>

        <div className="myContributions" style={{width:73+'%', float: "right", marginTop: 70+'px', paddingLeft: 20+'px'}}>
          <h4>Your Contributions</h4>
          <br/>

          <table className="table table-hover" style={{width:85+'%', float:'left', textAlign:'center'}}>
            <thead>
              <tr>
                <th style={{textAlign: 'center'}}>Data Category</th>
                <th style={{textAlign: 'center'}}>Submitted Time</th>
                <th style={{textAlign: 'center'}}>Status</th>
                <th style={{textAlign: 'center'}}>View</th>
                <th style={{textAlign: 'center'}}>Delete</th>
              </tr>
            </thead>
            <tbody>
              { contributionList }
            </tbody>
          </table>

        </div>
      </div>
    )
  }

}

export default Profile
