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

  approveRequest(review) {
    // Update user contribution:
    //  1. change status to approved
    //  2. update review time to current datetime
    review["status"] = "Approved"
    review["timeReviewed"] = new Date()
    var id = review["_id"]
    var url = '/api/usercontribution/' + id
    superagent
      .put(url)
      .send(review)
      .set('Accept', 'application/json')
      .end((err, response) => {
        if(err){
          console.log(err)
          console.log(response)
          return
        }

        alert("You approved user contribution " + id + "!")
      })

    // Send content to corresponding data schema
    superagent
      .post(review["action"])
      .send(JSON.parse(review["content"]))
      .set('Accept', 'application/json')
      .end((err, response) => {
        if(err){
          console.log("ERROR: " + err);
          return
        }

        alert("Data has been posted!")
      })
  }

  rejectRequest(review) {
    // Update user contribution:
    //  1. change status to rejected
    //  2. update review time to current datetime
    review["status"] = "Rejected"
    review["timeReviewed"] = new Date()
    var id = review["_id"]
    var url = '/api/usercontribution/' + id
    
    superagent
      .put(url)
      .send(review)
      .set('Accept', 'application/json')
      .end((err, response) => {
        if(err){
          console.log(err)
          console.log(response)
          return
        }

        alert("You have rejected user contribution " + id + "!")
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
            <a className="btn btn-primary" style={{background:'white', color:'green', borderColor:'green'}}
              onClick={ this.approveRequest.bind(this, review) }>
              <span className="glyphicon glyphicon-ok" style={{fontWeight:'bold'}}>&nbsp;Approve</span>
            </a>
          </td>
          <td>
            <a className="btn btn-primary" style={{background:'white', color:'darkred', borderColor:'darkred'}}
              onClick={ this.rejectRequest.bind(this, review) } >
              <span className="glyphicon glyphicon-remove" style={{fontWeight:'bold'}}>&nbsp;Reject</span>
            </a>
          </td>
        </tr>
      )
    })

    const reviewHistory = this.state.reviewHistory.map((history, i) => {
      return (
        <tr key={i}>
          <td> { history["authorID"] } </td>
          <td> { history["tableName"] } </td>
          <td> { history["timeSubmitted"] } </td>
          <td> { history["status"] } </td>
          <td>
            <a className="btn btn-primary" style={{background:'white', color:'steelblue', borderColor:'steelblue'}}>
              <span className="glyphicon glyphicon-search" style={{fontWeight:'bold'}}>&nbsp;View</span>
            </a>
          </td>
          <td> { history["timeReviewed"] } </td>
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
