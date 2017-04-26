import React, { Component } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import styles from './styles'

class FormSection extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      section: {},
      text: ''
    }
    
    this.onChange = (text) => {
      this.setState({
        text: text
      })
      this.updateSection(text)
    }
  }

  componentDidMount(){
    this.setState({
      section: this.props.currentSection,
      text: this.props.currentSection.content
    })

    console.log('section' + this.state.text)
  }



  // componentWillReceiveProps(nextProps){
  //   console.log('nextProps: ' + JSON.stringify(nextProps))

  //   let updatedText = Object.assign("", this.state.text)
  //   updatedText = nextProps.content

  //   this.setState({
  //     text: updatedText
  //   })


    // let sectionList = nextProps.selectedSectionList
    // let full_text = ""
    // for(let section of sectionList){
    //   full_text += (section["title"] + '</br>')
    //   full_text += (section["content"] + '<br/><br/>')
    // }

    // let updatedText = Object.assign("", this.state.text)
    // updatedText = full_text

    // console.log('full_text: ' + updatedText)

    // this.setState({
    //   text: updatedText
    // })
  // }

  updateSection(content){
    let updatedSection = Object.assign({}, this.state.section)
    updatedSection["content"] = content

    this.props.onChange(updatedSection)
    
    this.setState({
      section: updatedSection
    })
  }
 
  render() {
    const modules = {
      toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
      ],
    }

    const formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image'
    ]

    const formStyle = styles.form

    return (
      <div>
        <div className="form-group" style={formStyle.formgroup}>
          <label style={formStyle.label}>{this.state.section.title}</label>
          <br/>
          <br/>
          <ReactQuill theme="snow" 
                  value={this.state.text}
                  onChange={this.onChange}
                  modules={modules}
                  formats={formats}
                  rows='100'
                  style={{width:100+'%', background:'white', marginLeft:'auto', marginRight:'auto'}}>
            <div className="my-editing-area" style={{height: 'calc(100vh - 52px - 25vh)'}}></div>
          </ReactQuill>
        </div>
        <hr style={styles.universal.hr} />
      </div>
    )
  }
}

export default FormSection