import React, { Component } from 'react'
import ReactQuill, { Quill } from 'react-quill'

class MyEditor extends Component {
  constructor(props) {
    super(props)
    this.state = { text: '' }
    this.onChange = (text) => this.setState({text})
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
                  onChange={this.onChange}
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