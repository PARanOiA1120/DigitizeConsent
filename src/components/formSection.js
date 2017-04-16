import React, { Component } from 'react'
import styles from './styles'


class Section extends Component {
	constructor(){
		super()

		this.state = {
			content: ''
		}
	}

	componentWillReceiveProps(newProps) {
		console.log('componentWillReceiveProps')
		this.setState({
			
		})
	}

	updateContent(event){
		console.log('updateContent: ' + event.target.value)

	}

	render(){
		const formStyle = styles.form
		const section = this.props.currentSection
		
		return (
			<div>
				<div className="form-group" style={formStyle.formgroup}>
					<label style={formStyle.label}>{section.title}</label><br/>
					<textarea rows="7" style={formStyle.textarea} value={section.content}
						onChange={this.componentWillReceiveProps.bind(this)}></textarea>
				</div>
				<hr style={styles.universal.hr} />
			</div>
		)
	}
}

export default Section

