import React, { Component } from 'react'
import styles from './styles'
import MyEditor from './Editor'

class ConsentForm extends Component {
	render(){
		const formStyle = styles.form
		return(
			<div className="container" style={formStyle.container}>
				<div className="leftpanel" style={formStyle.leftpanel}>
					<h4 style={formStyle.header}>Managing Form Sections</h4>
				</div>
				
				<div className="rightpanel" style={formStyle.rightpanel}>
					<h4 style={formStyle.header}>Formatting Consent Form</h4>
					<MyEditor />
				</div>
			
			</div>
		);
	}
}

export default ConsentForm