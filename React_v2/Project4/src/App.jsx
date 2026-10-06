import React from 'react'

import {BrowserRouter, Link, Routes, Route} from 'react-router-dom';
function home(){
  return(<h1>home page</h1>)
}
function about(){
  return(<h1>about page</h1>)
}
function phone(){
  return(<h1>phone page</h1>)
}


const App = () => {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">HOME</Link>
        <Link to="/about">ABOUT US</Link>
        <Link to="/phone">PHONE</Link>  
      </nav>

      <Routes>
        <Route path="/" element={<home/>}/>
        <Route path="/about" element={<about/>}/>
        <Route path="/about" element={<about/>}/>
        <Route path="/phone" element={<phone/>}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App