import React, { Component } from 'react'

class Comment extends Component {
	render(){
		return(
			<div style={{marginBottom:16}}>
				<p style={{fontSize:22, fontWeight:400}}>
					{this.props.currentComment.body}
				</p>

				<span style={{fontWeight:300}}>{this.props.currentComment.username}</span>
				<span style={{fontWeight:300, marginLeft:8, marginRight:8}}>|</span>
				<span style={{fontWeight:300}}>{this.props.currentComment.timestamp}</span>
				<hr/>
			</div>
		)
	}
}

export default Comment