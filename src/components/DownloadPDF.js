import React, { Component } from 'react'
import styles from './styles'

class DownloadPDF extends Component {
  constructor(props){
    super(props);
    this.pdfToHTML=this.pdfToHTML.bind(this);
  }

// http://www.techumber.com/html-to-pdf-conversion-using-javascript/
// https://codepen.io/akfish/pen/LNWXrM --> pdf loader

  pdfToHTML(){
    var pdf = new jsPDF('p', 'pt', 'letter');
    var source = this.props.content;
    // console.log("source: " + source)
    var specialElementHandlers = {
      '#bypassme': function(element, renderer) {
        return true
      }
    };

    var margins = {
        top: 80,
        bottom: 60,
        left: 40,
        width: 500
    };

    pdf.fromHTML (
      source // HTML string or DOM elem ref.
      , margins.left // x coord
      , margins.top // y coord
      , {
          'width': margins.width // max width of content on PDF
          , 'elementHandlers': specialElementHandlers
        },
      function (dispose) {
        // dispose: object with X, Y of the last line add to the PDF
        // this allow the insertion of new lines after html
        pdf.save('consent_form.pdf');
      }
    )
  }

  render() {
    return (
      <div>
        <button className="btn btn-primary" style={{float:'right'}}
        onClick={this.pdfToHTML}>Generate PDF</button>
      </div>
    );
  }
}

export default DownloadPDF;
