import React, { Component } from "react";
import { render } from "react-dom";
import superagent from 'superagent';

class Review extends Component {
	constructor() {
		super()

		this.state = {
			formData: ""
		}
	}

	componentDidMount(){
		this.setState({
			formData: JSON.stringify(this.props.formData, undefined, 4)
		})


	}

	submit() {
		    // if(this.props.collection.action == '/api/sensorinference'){
    //   //get sensorID from device sensor table
    //   superagent   
    //   .get('/api/devicesensor')
    //   .query(null)
    //   .set('Accept', 'application/json')
    //   .end((err, response) => {
    //     if(err){
    //       alert('ERROR: '+err)
    //       return
    //     }
    //     console.log(JSON.stringify(response.body.results))
    //     let results = response.body.results

    //     this.setState({ 
    //       sectionList: results
    //     })
    //   })
    // }

    	console.log(this.state.formData)
	    fetch(this.props.collection.action, {
	      method: 'POST',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	      },
	      body: this.state.formData
	    })

	}

	render() {
		return(
			<div>
				<h4>Review New Data Entry</h4>
				<hr />
				<textarea className="form-control" value={this.state.formData} rows="17"></textarea>
				<hr />
				<button className="btn btn-primary" onClick={this.submit.bind(this)}>Submit</button>
			</div>
		)
	}

}


export default Review

