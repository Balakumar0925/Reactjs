import axios from 'axios';
import React, {useState} from 'react';
import {useTable} from 'react-table';

function CreateTable(){
    const [responsedata , modifydata] = useState([]);

    const columns =[
        {
            Header:'Flight Number',
            accessor:'flight_number'
        },
        {
            Header:'Mission Name',
            accessor:'mission_name'
        },
        {
            Header:'Launch year',
            accessor:'launch_year'
        },
        {
            id:'launch',
            Header:'Launch Success',
            accessor: function(launch){ return JSON.stringify(launch.launch_success)}
        },
        {
            id:'land',
            Header:'Land Success',
            accessor: function(land){return JSON.stringify(land.rocket.first_stage.cores[0].land_success)}
        },
        {
            Header:'Details',
            accessor:'details'
        }
    ];

    return (
        <div className='ab'>
            
            <button className='button1'  onClick={function(){
                axios.get("https://api.spaceXdata.com/v3/launches?limit=100").then((res) => {
                    console.log(res.data);
                    let data = res.data;
                    modifydata(data);
                });          
             }}>fetch the data</button>
             <div className='table'>
             <Table  columns={columns} data={responsedata} />  
             </div>
        </div>
    )

}

/*function Table( {columns , data} ) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    }= useTable({
        columns,data
    })
    return  (
        <table {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>{
                    headerGroup.headers.map(column =>(
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                    </tr>

            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
               {rows.map((row,i) => {
                   prepareRow(row)
                   return (
                       <tr {...row.getRowProps()}>
                           {row.cells.map(cell =>{
                               console.log(cell);
                               return <td {...cell.getCellProps(i)}>{cell.render('cell')}</td>
                           })}
                           </tr>
                    )}
               )}

            </tbody>
        </table>
    )

}*/


function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({
      columns,
      data,
    })
  
    // Render the UI for your table
    return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  console.log(cell);
                  return <td {...cell.getCellProps(i)}>{cell.render('Cell')}</td>
                  
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }


export default CreateTable;