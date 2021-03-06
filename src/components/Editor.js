import React, { Component } from 'react'
import ReactQuill, { Quill } from 'react-quill'


class FormSection extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      section: {}
      text: '' 
    }
  }

  componentDidMount(){
    this.setState({
      section: this.props.currentSection
    })
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

  updateSection(event){
    let updatedText = Object.assign("", this.state.text)
    updatedText = event

    this.props.onChange(updatedText)

    this.setState({
      text: updatedText
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

    return (
      <ReactQuill theme="snow" 
                  value={this.state.text}
                  onChange={this.updateSection.bind(this)}
                  modules={modules}
                  formats={formats}
                  rows='100'
                  style={{width:96+'%', background:'white', marginLeft:'auto', marginRight:'auto'}}>
        <div className="my-editing-area" style={{height: 'calc(100vh - 52px - 25vh)'}}></div>
      </ReactQuill>
    )
  }
}

export default MyEditor