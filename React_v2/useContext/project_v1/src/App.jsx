import React from 'react'
import {useContext, createContext} from 'react'

function mycontext() {
  const myname = createContext('viraj');
  const value = useContext(myname);

  return(
    <div>
      <h1>value from context is : {value} </h1>
    </div>
  )
}

const App = () => {
  return (
    <div>App</div>
  )
}

export default mycontext