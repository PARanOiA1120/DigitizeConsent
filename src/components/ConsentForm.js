import React, { Component } from 'react'
import styles from './styles'
import MyEditor from './Editor'
import superagent from 'superagent'
import Section from './formSection'
var _ = require('lodash')

class ConsentForm extends Component {
	constructor(){
		super()
		this.state = {
			sectionList: [],
			selectedSectionList: [],
			selected: ''
		}
	}

	componentDidMount(){
		console.log('componentDidMount')

		superagent
		.get('/api/formsection')
		.query(null)
		.set('Accept', 'application/json')
		.end((err, response) => {
			if(err){
				alert('ERROR: '+err)
				return
			}

			console.log(JSON.stringify(response.body.results))
			let results = response.body.results

			this.setState({ 
				sectionList: results
			})
		})
	}

	updateSelection(event){
		console.log('Section selected: ' + event.target.value)

		let updatedSelection = Object.assign('', this.state.selected)
		updatedSelection = event.target.value

		this.setState({
			selected: updatedSelection
		})
	}

	addSection(event){
		console.log('add section: ' + this.state.selected)

		const index = _.findIndex(this.state.sectionList, ['title', this.state.selected])
		const selectedSection = this.state.sectionList[index]
		console.log('selected section: ' + JSON.stringify(selectedSection))
		
		let updatedSections = Object.assign([], this.state.selectedSectionList)
		updatedSections.push(selectedSection)

		this.setState({
			selectedSectionList: updatedSections
		})
		
	}


	render(){
		const formStyle = styles.form
		const universalStyle = styles.universal

		const options = this.state.sectionList.map((section, i) => {
			return (
				<option value={section["title"]} key={i}>{section["title"]}</option>
			)
		})

		const sectionList = this.state.selectedSectionList.map((section, i) => {
			return (
				<li key={i}><Section currentSection={section}></Section></li>
			)
		})


		return(
			<div className="container" style={formStyle.container}>
				<div className="leftpanel" style={formStyle.leftpanel}>
					<h4 style={formStyle.header}>Managing Form Sections</h4>
					<hr style={universalStyle.hr}/>
					<div className="form-group" style={formStyle.formgroup}>
						<label htmlFor="section" style={formStyle.label}>Select section to add:</label>
						<select className="form-control" id="section" style={formStyle.selectionBox}
							onChange={this.updateSelection.bind(this)}>
							<option>--- Select a section ---</option>
							{options}
						</select>
						<button className="btn btn-primary" onClick={this.addSection.bind(this)}>Add Section</button>
					</div>
					<hr style={universalStyle.hr}/>

					<div className="sectionList">
						<ul style={formStyle.list}>
							{sectionList}
						</ul>
					</div>

				</div>
				
				<div className="rightpanel" style={formStyle.rightpanel}>
					<h4 style={formStyle.header}>Formatting Consent Form</h4>
					<MyEditor />
					<button className="btn btn-primary" style={formStyle.centerButton}> Generate PDF </button>
				</div>
			</div>
		);
	}
}

export default ConsentForm