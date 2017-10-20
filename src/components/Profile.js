import React, { Component } from 'react'
import styles from './styles'
import superagent from 'superagent'

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userProfile: JSON.parse(localStorage.getItem('profile'))
    }
  }

  render() {
		const formStyle = styles.form;
    console.log(this.state.userProfile);

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

          <table className="table table-hover" style={{width:85+'%', float:'left'}}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Time Created</th>
                <th>Last Updated Time</th>
                <th>Edit</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>test1</td>
                <td>YYYY-MM-DD hh:mm</td>
                <td>YYYY-MM-DD hh:mm</td>
                <td>edit</td>
                <td>download</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

}

export default Profile
