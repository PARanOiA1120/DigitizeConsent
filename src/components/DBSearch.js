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
              filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["device"] }),
              filterAll: true
            }
          ],
          pivot: [],
          subComponent: null
        },
        {
          title: 'Device Sensor List',
          action: '/api/devicesensor',
          columns: [
            {
              Header: "Device Type",
              accessor: "device",
              filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["device"] }),
              filterAll: true
            },
            {
              Header: "Sensor Name",
              accessor: "sensorName",
              filterable: false
            },
          ],
          pivot: ["device"],
          subComponent: null
        },
        {
          title: 'Software Sensor List',
          action: '/api/swsensor',
          columns: [
            {
              Header: "Sensor Name",
              accessor: "sensor",
              filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["sensor"] }),
              filterAll: true
            }
          ],
          pivot: [],
          subComponent: null
        },
        {
          title: 'Application Sensor List',
          action: '/api/appsensor',
          columns: [
            {
              Header: "Application",
              accessor: "application",
              filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["application"] }),
              filterAll: true
            },
            {
              Header: "Supported Devices",
              accessor: "supportedDevices",
              filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["supportedDevices"] }),
              filterAll: true
            },
            {
              Header: "Software Sensor",
              accessor: "softwareSensor",
              filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["softwareSensor"] }),
              filterAll: true
            }
          ],
          pivot: [],
          subComponent: null
        },
        {
          title: 'Attribute List',
          action: '/api/sensorattribute',
          columns: [
            {
              Header: "Attribute Name",
              accessor: "attributeName",
              filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["attributeName"] }),
              filterAll: true
            },
            {
              Header: "Unit",
              accessor: "unit",
              filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["unit"] }),
              filterAll: true
            },
            {
              Header: "Value Type",
              accessor: "valueType",
              filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["valueType"] }),
              filterAll: true
            }
          ]
        },
        {
          title: 'Sensor Inference List',
          action: '/api/sensorinference',
          columns: [
            {
              Header: "Reference",
              accessor: "reference",
              filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["reference"] }),
              filterAll: true
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
              width:300,
            },
            {
              Header: "Detail",
              width: 65,
              expander: true,
              Expander: ({ isExpanded, rest }) =>
                <div>
                  {isExpanded
                    ? <span>&#x2299;</span>
                    : <span>&#x2295;</span>}
                </div>,
              style: {
                cursor: "pointer",
                fontSize: 25,
                padding: "0",
                textAlign: "center",
                userSelect: "none"
              },
            }
          ],
          pivot: [],
          subComponent: (row) => <div style={{padding: '10px'}}>{row.original.deviceList}</div>
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
          pivot: [],
          subComponent: null
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
             defaultFilterMethod={(filter, row) => String(row[filter.id]).startsWith(filter.value) ||
              String(row[filter.pivotId]).startsWith(filter.value) }
             resizable
             pivotBy={ this.state.selectedTable.pivot }
             columns={ this.state.selectedTable.columns }
             SubComponent={ this.state.selectedTable.subComponent }
             defaultPageSize={5}
             style={{width:60+'%', marginLeft:'auto', marginRight:'auto', backgroundColor:'lightsteelblue',
              marginTop: 50+'px', overflow:"visible"}}
             className="-striped -highlight"
           />
         }
         <br />
       </div>
     );
  }
}

export default DBSearch
