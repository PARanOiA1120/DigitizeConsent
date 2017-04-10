import React, { Component } from 'react'
import styles from './styles'
import MyEditor from './Editor'

class ConsentForm extends Component {
	render(){
		const formStyle = styles.form
		return(
			<div className="container" style={formStyle.container}>
				<h3 style={formStyle.header}>Consent Form Generator</h3>
				<br/>
							
				<div className="row">
					<div className="col-md-6" style={formStyle.leftpanel}>

					</div>
					

					<div className="col-md-6" style={formStyle.editor}>
						<h4 style={formStyle.header}>Formatting Consent Form</h4>
						<MyEditor />
					</div>
				</div>
			</div>
		);
	}
}

export default ConsentForm