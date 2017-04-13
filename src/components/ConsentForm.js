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
					<hr style={{borderColor: 'lightgrey', width:95+'%'}}/>
					<div className="form-group" style={{width:95+'%', marginLeft:'auto', marginRight:'auto'}}>
						<label for="section" style={{float:'left', marginRight:2+'%'}}>Select section to add:</label>
						<select className="form-control" id="section" style={{width:70+'%'}}>

						</select>
					</div>
					<hr style={{borderColor: 'lightgrey', width:95+'%'}}/>
				</div>
				
				<div className="rightpanel" style={formStyle.rightpanel}>
					<h4 style={formStyle.header}>Formatting Consent Form</h4>
					<MyEditor />
					<button className="btn btn-primary" style={formStyle.button}> Generate PDF </button>
				</div>
			
			</div>
		);
	}
}

export default ConsentForm