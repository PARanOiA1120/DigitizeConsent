import React, { Component } from "react"
import { render } from "react-dom"
// Import React Table
import ReactTable from "react-table"
require("react-table/react-table.css")

class DBSearch extends Component {

  render() {
    const data = [{
      name: 'Tanner Linsley',
      age: 26,
      friend: {
        name: 'Jason Maurer',
        age: 23,
      }
    },{
      name: 'Ariel Xin',
      age: 23,
      friend: {
        name: 'ZZM',
        age: 24,
      }
    }]

    const columns = [{
      Header: 'Name',
      accessor: 'name' // String-based value accessors!
    }, {
      Header: 'Age',
      accessor: 'age',
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
      id: 'friendName', // Required because our accessor is not a string
      Header: 'Friend Name',
      accessor: d => d.friend.name // Custom value accessors!
    }, {
      Header: props => <span>Friend Age</span>, // Custom header components!
      accessor: 'friend.age'
    }]

    return (
       <div>
         <ReactTable
           data={data}
           filterable
           defaultFilterMethod={(filter, row) =>
             String(row[filter.id]) === filter.value}
           columns={[
             {
               Header: "Name",
               columns: [
                 {
                   Header: "First Name",
                   accessor: "firstName",
                   filterMethod: (filter, row) =>
                     row[filter.id].startsWith(filter.value) &&
                     row[filter.id].endsWith(filter.value)
                 },
                 {
                   Header: "Last Name",
                   id: "lastName",
                   accessor: d => d.lastName,
                   filterMethod: (filter, rows) =>
                     matchSorter(rows, filter.value, { keys: ["lastName"] }),
                   filterAll: true
                 }
               ]
             },
             {
               Header: "Info",
               columns: [
                 {
                   Header: "Age",
                   accessor: "age"
                 },
                 {
                   Header: "Over 21",
                   accessor: "age",
                   id: "over",
                   Cell: ({ value }) => (value >= 21 ? "Yes" : "No"),
                   filterMethod: (filter, row) => {
                     if (filter.value === "all") {
                       return true;
                     }
                     if (filter.value === "true") {
                       return row[filter.id] >= 21;
                     }
                     return row[filter.id] < 21;
                   },
                   Filter: ({ filter, onChange }) =>
                     <select
                       onChange={event => onChange(event.target.value)}
                       style={{ width: "100%" }}
                       value={filter ? filter.value : "all"}>
                       <option value="all">Show All</option>
                       <option value="true">Can Drink</option>
                       <option value="false">Cant Drink</option>
                     </select>
                 }
               ]
             }
           ]}
           defaultPageSize={10}
           className="-striped -highlight"
         />
         <br />
       </div>
     );
  }
}

export default DBSearch
