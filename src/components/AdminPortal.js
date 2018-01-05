import React, { Component } from 'react'
import superagent from 'superagent'

class AdminPortal extends Component {
  constructor() {
    super()
    this.state = {
      pendingReviews: [],
      reviewHistory: []
    }
  }

  componentDidMount() {
    superagent
      .get('/api/usercontribution')
      .set('Accept', 'application/json')
      .end((err, response) => {
        if(err){
          console.log("ERROR: " + err);
          return
        }

        var contributions = JSON.parse(response.text).results
        var pending = []
        var history = []
        contributions.forEach(function(contribution){
    			if(contribution["status"] == "Pending"){
            pending.push(contribution)
          } else {
            history.push(contribution)
          }
    		})

        this.setState({
          pendingReviews: pending,
          reviewHistory: history
        })
      })
  }

  render() {
    return (
      <div style={{width: 85+'%', marginLeft:'auto', marginRight:'auto', marginTop: 40}}>
        <h3>User Contributions</h3>
        <hr style={{width:40+'%', float:'left'}}/>
        <br />
        <br />

        <div className="pending" style={{float: 'left', width: 100+'%'}}>
          <h4>Pending for Review</h4>
          <hr style={{width:90+'%', float:'left'}} />
          <table className="table table-striped table-hover table-sm" style={{width:90+'%', float:'left', textAlign:'center'}}>
            <thead className="thead-default">
              <tr>
                <th style={{textAlign: 'center'}}>Author</th>
                <th style={{textAlign: 'center'}}>Data Category</th>
                <th style={{textAlign: 'center'}}>Submitted Time</th>
                <th style={{textAlign: 'center'}}>Status</th>
                <th style={{textAlign: 'center'}}>View</th>
                <th style={{textAlign: 'center'}}>Approve</th>
                <th style={{textAlign: 'center'}}>Reject</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>


        <div className="history" style={{float:'left', width:100+'%', marginTop: 45}}>
          <h4>Review History</h4>
          <hr style={{width:90+'%', float:'left'}} />
          <table className="table table-striped table-hover table-sm" style={{width:90+'%', float:'left', textAlign:'center'}}>
            <thead className="thead-default">
              <tr>
                <th style={{textAlign: 'center'}}>Author</th>
                <th style={{textAlign: 'center'}}>Data Category</th>
                <th style={{textAlign: 'center'}}>Submitted Time</th>
                <th style={{textAlign: 'center'}}>Status</th>
                <th style={{textAlign: 'center'}}>View</th>
                <th style={{textAlign: 'center'}}>Review Time</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>


      </div>
    )
  }

}

export default AdminPortal
