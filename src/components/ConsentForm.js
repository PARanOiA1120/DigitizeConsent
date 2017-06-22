import React, { Component } from 'react'
import styles from './styles'
import superagent from 'superagent'
import Section from './FormSection'
import ContentPreview from './ContentPreview'
import DownloadPDF from './DownloadPDF'
var _ = require('lodash')

class ConsentForm extends Component {
	constructor(){
		super()
		this.state = {
			sectionList: [],
			selectedSectionList: [],
			selected: '',
			title: '',
			context: '',
			full_text:''
		}
	}

	componentDidMount(){
		// console.log('componentDidMount')

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
		// console.log('added section: ' + JSON.stringify(selectedSection))
		
		let updatedSections = Object.assign([], this.state.selectedSectionList)
		updatedSections.push(selectedSection)

		this.setState({
			selectedSectionList: updatedSections
		}, () => {
			this.updateFullText()
		})

		
	}

	addRiskSection(title, inferences){
		const index = _.findIndex(this.state.sectionList, ['title', title])
		const selectedSection = this.state.sectionList[index]
		var content = ""
		// console.log('added section: ' + JSON.stringify(selectedSection))
		inferences.forEach((inference) => {
			// console.log("inference: " + JSON.stringify(inference))
			content += inference["inference"]["description"] + '<br/>'
		})

		selectedSection["content"] = content

		let updatedSections = Object.assign([], this.state.selectedSectionList)
		updatedSections.push(selectedSection)

		this.setState({
			selectedSectionList: updatedSections
		}, () => {
			this.updateFullText()
		})
	}


	updateSection(i, section){
		let updatedSectionList = Object.assign([], this.state.selectedSectionList)
		updatedSectionList[i] = section

		this.setState({
			selectedSectionList: updatedSectionList
		}, () => {
			this.updateFullText()
		})
	}

	updateTitle(event) {
		let title = ""

		this.setState({
			title: event.target.value
		}, () => {
			this.updateFormViewer()
		})
	}


	// the text to display on the right panel
	updateFullText(){
		let text = ""
		for(let section of this.state.selectedSectionList){
			// text += (section["title"] + '</br>')
			text += (section["content"] + '<br/>')
		}

		let updatedFullText = Object.assign("", this.state.full_text)
		updatedFullText = text

		this.setState({
			full_text: updatedFullText
		}, () => {
			this.updateFormViewer()
		})
	}

	updateFormViewer() {
		let content = ""
		if(this.state.title != ""){
			// content += "<p style='text-align: center'>"
			// content += "<h3><center><strong>"
			content += "<h4>" + this.state.title + "</h4>"
			// content += "</strong></center></h3>"
			// content += "</p>"
			content += '<br/>'
		}
	
		content += this.state.full_text

		let updatedFormContent = Object.assign("", this.state.context)
		updatedFormContent = content

		this.setState({
			context: updatedFormContent
		}, () => {
			// console.log("preview: " + this.state.context)
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
				<li key={i}><Section currentSection={section} addRiskSection={this.addRiskSection.bind(this)} onChange={this.updateSection.bind(this, i)}></Section></li>
			)
		})


		return(
			<div className="container" style={formStyle.container}>
				<div className="leftpanel" style={formStyle.leftpanel}>
					<h4 style={formStyle.header}>Managing Form Sections</h4>
					<hr style={universalStyle.hr}/>

					<div className="form-group" style={formStyle.formgroup}>
						<label style={formStyle.label}>Title: </label>
						<input className="form-control" style={{width: 40+'%'}} 
							onChange={this.updateTitle.bind(this)}
							value={this.state.title}
							/>
						
						<hr style={universalStyle.hr}/>

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
					<h4 style={formStyle.header}>Consent Form Viewer</h4>
					<div style={formStyle.preview}>
						<ContentPreview content={this.state.context} />
					</div>
					
					<DownloadPDF content={this.state.context} />
				</div>
			</div>
		);
	}
}

export default ConsentForm