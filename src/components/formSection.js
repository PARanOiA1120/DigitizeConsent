import React, { Component } from 'react'
import styles from './styles'


class Section extends Component {
	constructor(){
		super()
		this.state = {
			section: {}
		}
	}

	componentDidMount(){
		this.setState({
			section: this.props.currentSection
		})
	}

	updateSection(event) {
		let updatedSection = Object.assign({}, this.state.section)
		updatedSection["content"] = event.target.value

		this.props.onChange(updatedSection)
		
		this.setState({
			section: updatedSection
		})
	}

	render(){
		const formStyle = styles.form
		const section = this.state.section
		
		return (
			<div>
				<div className="form-group" style={formStyle.formgroup}>
					<label style={formStyle.label}>{section.title}</label><br/>
					<textarea rows="7" style={formStyle.textarea} value={section.content}
						onChange={this.updateSection.bind(this)}></textarea>
				</div>
				<hr style={styles.universal.hr} />
			</div>
		)
	}
}

export default Section

