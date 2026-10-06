import React, { useState } from 'react'

const CounterApp = () => {
  function inc(){
    setcount(count+1);
  }
  
  function dec(){
    setcount(count-1);
  }
 
  const[count,setcount]= useState(0);

  return (
    <div style={{ border: '2px solid red', height: '300px' , width: '400px', margin: 'auto'}}>
      <h1>CounterApp</h1>
      <button onClick={inc}>ADD +</button>
      <br/>
      <span>{count}</span>
      <br/>
      <button onClick={dec}>SUB -</button>
    </div>

  )
}

export default CounterApp
