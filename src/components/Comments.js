import React, { Component } from 'react'
import Comment from './Comment'
import styles from './styles'

class Comments extends Component {
	constructor(){
		super()
		this.state = {
			comment: {
				username: '',
				body: ''
			},
			list: [
				{body: 'comment 1', username:'dtrump', timestamp: '10:30'},
				{body: 'comment 2', username:'hclinton', timestamp: '10:40'},
				{body: 'comment 3', username:'gjohnson', timestamp: '11:00'},
			]
		}
	}

	submitComment(){
		console.log("submitComment: "+JSON.stringify(this.state.comment))
	}

	updateUsername(event){
		console.log('updateUsername: ' + event.target.value)

		let updatedUsername = Object.assign({}, this.state.comment)
		updatedUsername['username'] = event.target.value
		
		this.setState({
			comment: updatedUsername
		})
	}

	updateComment(event){
		console.log('updateComment: ' + event.target.value)
	}


	render(){
		const commentList = this.state.list.map((comment, i) => {
			return(
				<li key={i}><Comment currentComment={comment}/></li>
			)
		})
		return (
			<div>
				<h2>Comments: Zone 1</h2>
				<div style={styles.comment.commentsBox}>
					<ul style={styles.comment.commentsList}>
						{commentList}
					</ul>

					<input onChange={this.updateUsername.bind(this)} className="form-control" type="text" placeholder="Username" /><br />
					<input onChange={this.updateComment.bind(this)} className="form-control" type="text" placeholder="Comment" /><br />
					<button onClick={this.submitComment.bind(this)} className="btn btn-info">Submit Comment</button>
				</div>
			</div>

		)
	}
}

export default Comments