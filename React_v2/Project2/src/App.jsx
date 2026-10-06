import React from 'react'
import Student1 from './Components/Student1'


const App = () => {
  return (
    <div>
      <h1 style ={{textAlign: 'center'}}>MY STUDENT RECORDS</h1>
      <div style={{display : 'flex'}}>
          
          <Student1 />
     
          <Student1 />

          <Student1 />
      </div>
    </div>
  )
}

export default App
