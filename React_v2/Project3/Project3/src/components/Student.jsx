import React from 'react'


const Student = (props) => {
  return (
    <div>
      <div style={{border: '2px solid black', width:'400px', height:'400px', alignItems:'center', textAlign:'center'}}>
        <h3>Student</h3>
        <img style ={{width:'300px', height:'200px'}} src={props.img}/>
        <h3>{props.class}</h3>
      </div>
    </div>
  )
}



export default Student