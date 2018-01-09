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
        }, () => {
          console.log(this.state.pendingReviews);
          console.log(this.state.reviewHistory);
        })
      })
  }

  render() {
    const pendingReviews = this.state.pendingReviews.map((review, i) => {
      return (
        <tr key={i}>
          <td> { review["authorID"] } </td>
          <td> { review["tableName"] } </td>
          <td> { review["timeSubmitted"] } </td>
          <td> { review["status"] } </td>
          <td>
            <a className="btn btn-primary" style={{background:'white', color:'steelblue', borderColor:'steelblue'}}>
              <span className="glyphicon glyphicon-search" style={{fontWeight:'bold'}}>&nbsp;View</span>
            </a>
          </td>
          <td>
            <a className="btn btn-primary" style={{background:'white', color:'green', borderColor:'green'}}>
              <span className="glyphicon glyphicon-ok" style={{fontWeight:'bold'}}>&nbsp;Approve</span>
            </a>
          </td>
          <td>
            <a className="btn btn-primary" style={{background:'white', color:'darkred', borderColor:'darkred'}}>
              <span className="glyphicon glyphicon-remove" style={{fontWeight:'bold'}}>&nbsp;Reject</span>
            </a>
          </td>
        </tr>
      )
    })

    const reviewHistory = this.state.reviewHistory.map((history, i) => {
      return (
        <tr key={i}>
          <td> { review["authorID"] } </td>
          <td> { review["tableName"] } </td>
          <td> { review["timeSubmitted"] } </td>
          <td> { review["status"] } </td>
          <td>
            <a className="btn btn-primary" style={{background:'white', color:'steelblue', borderColor:'steelblue'}}>
              <span className="glyphicon glyphicon-search" style={{fontWeight:'bold'}}>&nbsp;View</span>
            </a>
          </td>
          <td> { review["timeReviewed"] } </td>
        </tr>
      )
    })


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
              { pendingReviews }
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
              { reviewHistory }
            </tbody>
          </table>
        </div>


      </div>
    )
  }

}

export default AdminPortal
