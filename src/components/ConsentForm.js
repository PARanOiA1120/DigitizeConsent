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
			formId: '',
			sectionList: [],
			selectedSectionList: [],
			selected: '',
			title: '',
			context: '',
			full_text:''
		}
	}

	componentDidMount(){
		if(this.props.match.params.formid){
			var formid = this.props.match.params.formid
			var url = '/api/consentform/' + formid
			superagent
				.get(url)
				.set('Accept', 'application/json')
				.end((err, response) => {
					if(err) {
						alert('ERROR: ' + err)
						this.props.history.push('/consentForm')
						return
					}

					if(response.body.result){
						var form = response.body.result

						this.setState({
							formId: formid,
							title: form.title,
							selectedSectionList: form.sections
						})
					} else {
						alert("Alert: Form not found.")
						this.props.history.push('/consentForm')
					}
				})
		} else {
			this.setState({
				formId: ''
			})
		}

		superagent
		.get('/api/formsection')
		.query(null)
		.set('Accept', 'application/json')
		.end((err, response) => {
			if(err){
				alert('ERROR: '+err)
				return
			}

			this.setState({
				sectionList: response.body.results
			})
		})
	}

	updateSelection(event){
		let updatedSelection = Object.assign('', this.state.selected)
		updatedSelection = event.target.value
		// console.log(updatedSelection)

		this.setState({
			selected: updatedSelection
		})
	}

	addSection(event){
		// console.log('add section: ' + this.state.selected)
		const index = _.findIndex(this.state.sectionList, ['category', this.state.selected])
		const selectedSection = this.state.sectionList[index]

		let updatedSections = Object.assign([], this.state.selectedSectionList)
		updatedSections.push(selectedSection)

		this.setState({
			selectedSectionList: updatedSections
		}, () => {
			this.updateFullText()
		})
	}

	addRiskSection(title, inferences){
		const index = _.findIndex(this.state.sectionList, ['category', title])
		const selectedSection = this.state.sectionList[index]
		var content = ""

		if(inferences.length == 0){
			content += "There are no known privacy risks for the data being collected in this study."
			selectedSection["content"] = content
			let updatedSections = Object.assign([], this.state.selectedSectionList)
			updatedSections.push(selectedSection)

			this.setState({
				selectedSectionList: updatedSections
			}, () => {
				this.updateFullText()
			})
		} else {
			inferences.forEach((inference) => {
				var inferenceID = inference["inference"]["inferenceID"]
				var url = '/api/inferencedescription/' + inferenceID
        // query db to get inference description
				superagent
				.get(url)
				.set('Accept', 'application/json')
				.end((err, response) => {
					if(err){
						alert('ERROR: '+err)
						return
					}
					content += response.body.result["description"] + '<br/>'
					selectedSection["content"] = content

					let updatedSections = Object.assign([], this.state.selectedSectionList)
					updatedSections.push(selectedSection)

					this.setState({
						selectedSectionList: updatedSections
					}, () => {
						this.updateFullText()
					})
				})
			})
		}
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
			content += "<h4>" + this.state.title + "</h4>"
			content += '<br/>'
		}

		content += this.state.full_text

		let updatedFormContent = Object.assign("", this.state.context)
		updatedFormContent = content

		this.setState({
			context: updatedFormContent
		})
	}

	saveForm(){
		var sectionList = this.state.selectedSectionList

		sectionList.forEach((section) => {
			var separator = "</strong></p>"
			var idx = section["content"].indexOf(separator)

			if(idx >= 0) {
				section["title"] = section["content"].substring(11, idx)
				section["content"] = section["content"].substring(idx+separator.length)
			}
		})

		var data = {
			authorID: JSON.parse(localStorage.getItem('profile')).id,
			title: this.state.title,
			sections: sectionList
		}

		if(this.state.formId != ''){
			// update form
			var url = '/api/consentform/' + this.state.formId
			superagent
				.put(url)
				.send(data)
				.set('Accept', 'application/json')
				.end((err, response) => {
					if(err){
						console.log(err)
						return
					}

					alert("Your update is saved!")
					this.props.history.push('/profile')
				})

		} else {
			// create a new form
			superagent
				.post('/api/consentform')
				.send(data)
				.set('Accept', 'application/json')
				.end((err, response) => {
					if(err){
						alert('ERROR: '+err)
						return
					}

					alert("Your consent form is saved!")
					this.props.history.push('/profile')
				})
		}
	}

	removeSection(sectionid) {
		this.setState({
			selectedSectionList: this.state.selectedSectionList.filter(function(section){
				return section["_id"] != sectionid;
			})
		}, () => {
			this.updateFullText();
		});
	}

	moveSectionUp(idx) {
		var sectionList = this.state.selectedSectionList;
		var section = sectionList[idx];
		sectionList[idx] = sectionList[idx-1];
		sectionList[idx-1] = section;

		this.setState({
			selectedSectionList: sectionList
		}, () => {
			this.updateFullText();
		})
	}

	moveSectionDown(idx) {
		var sectionList = this.state.selectedSectionList;
		var section = sectionList[idx];
		sectionList[idx] = sectionList[idx+1];
		sectionList[idx+1] = section;

		this.setState({
			selectedSectionList: sectionList
		}, () => {
			this.updateFullText();
		})
	}


	render(){
		const formStyle = styles.form;
		const universalStyle = styles.universal;

		const options = this.state.sectionList.map((section, i) => {
			return (
				<option value={section["category"]} key={i}>{section["category"]}</option>
			)
		})

		const sectionList = this.state.selectedSectionList.map((section, i) => {
			return (
				<li key={ section["_id"] }>
					<Section currentSection={ section }
										addRiskSection={ this.addRiskSection.bind(this) }
										onChange={ this.updateSection.bind(this, i) }
										deleteSection={ this.removeSection.bind(this, section["_id"]) }
									 	idx = { i }
										numSections = { this.state.selectedSectionList.length }
										moveSectionUp = { this.moveSectionUp.bind(this,i) }
										moveSectionDown = {this.moveSectionDown.bind(this,i) }
									>
					</Section>
				</li>
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
							<option value=''>--- Select a section ---</option>
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

					<div style={{width: 40+'%', margin:'auto', marginTop: 35+'px'}}>
						<button className="btn btn-primary" onClick={ this.saveForm.bind(this) } style={{float:'left', width: 80}}>Save</button>
						<DownloadPDF content={this.state.context} />
					</div>
				</div>
			</div>
		);
	}
}

export default ConsentForm
