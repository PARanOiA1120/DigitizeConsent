import React, { Component } from "react"
import { render } from "react-dom"
import ReactTable from "react-table"
import matchSorter from 'match-sorter'
import superagent from 'superagent'

import styles from './styles'
require("react-table/react-table.css")

class DBSearch extends Component {

  constructor() {
    super()
    this.state = {
      tableList: [
        {
          title: 'Device List',
          action: '/api/device',
          columns: [
            {
              Header: "Device Type",
              accessor: "device",
              id: "device",
              filterMethod: (filter, row) =>  String(row[filter.id]).startsWith(filter.value)
            }
          ],
          pivot: []
        },
        {
          title: 'Device Sensor List',
          action: '/api/devicesensor',
          columns: [
            {
              Header: "Device Type",
              accessor: "device",
              filterable: false
            },
            {
              Header: "Sensor Name",
              accessor: "sensorName",
              filterable: false
            },
          ],
          pivot: ["device"]
        },
        {
          title: 'Software Sensor List',
          action: '/api/swsensor',
          columns: [
            {
              Header: "Sensor Name",
              accessor: "sensor"
            }
          ],
          pivot: []
        },
        {
          title: 'Application Sensor List',
          action: '/api/appsensor',
          columns: [
            {
              Header: "Application",
              accessor: "application"
            },
            {
              Header: "Supported Devices",
              accessor: "supportedDevices"
            },
            {
              Header: "Software Sensor",
              accessor: "softwareSensor"
            }
          ],
          pivot: []
        },
        {
          title: 'Sensor Inference List',
          action: '/api/sensorinference',
          columns: [
            {
              Header: "Reference",
              accessor: "reference"
            },
            {
              Header: "Inference",
              columns: [
                {
                  Header: "Inference Name",
                  accessor:"inference.inferenceName"
                },
                {
                  Header: "Description",
                  accessor: "inference.description"
                }
              ]
            },
            {
              Header: "Device List",
              accessor: "deviceList",
              width:300
            }
          ],
          pivot: [],
        },
        {
          title: 'Inference Description',
          action: '/api/inferencedescription',
          columns: [
            {
              Header: "Inference Name",
              accessor: "inferenceName"
            },
            {
              Header: "Description",
              accessor: "description"
            }
          ],
          pivot: []
        },
      ],
      selectedTable: {},
      data: {}
    }
  }

  updateTable(event){
    let table = this.state.tableList[event.target.value]

    superagent
      .get(table.action)
      .set('Accept', 'application/json')
      .end((err, response) => {
        if(err) {
          alert('ERROR: ' + err)
          return
        }

        let inferences = response.body.results
        if(table.action == '/api/sensorinference'){
          inferences.forEach((inference) => {
            inference["deviceList"] = JSON.stringify(inference["deviceList"], null, 2)
          })
        }
        this.setState({
          selectedTable: table,
          data: inferences
        })
      })
	}

  render() {
    const formStyle = styles.schemaform
    const options = this.state.tableList.map((table, i) => {
      return (
        <option value={i} key={i}>{table["title"]}</option>
      )
    })

    return (
       <div>
         <select className="form-control" id="db" style={formStyle.selectionBox}
           onChange={this.updateTable.bind(this)}>
           <option>-------------- Select a Table --------------</option>
           { options }
         </select>

         { this.state.selectedTable.columns &&
           <ReactTable
             data={ this.state.data }
             filterable
             defaultFilterMethod={ (filter, row) =>  String(row[filter.id]).startsWith(filter.value) }
             pivotBy={ this.state.selectedTable.pivot }
             columns={ this.state.selectedTable.columns }
             SubComponent={ this.state.selectedTable.subComponent }
             defaultPageSize={5}
             style={{width:60+'%', marginLeft:'auto', marginRight:'auto', backgroundColor:'lightsteelblue', marginTop: 50+'px'}}
             className="-striped -highlight"
           />
         }
         <br />
       </div>
     );
  }
}

export default DBSearch
