import React, { useState } from 'react'

const App = () => {
  const [formData, setformData] = useState({
    name: '',
    email: '',
    password: '',
  })

  useEffect(()=>{
    console.log("form data update", formData);
  }, [formData])

  const handleChanges = (e)=>{
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handlesubmit=()=>{
    e.preventDefault();
    alert('Form submitted successfully');
    console.log(formData);
  }

  return (
    <div>
      <form action="">
        <input type="text" name ="name" placeholder="Enter your name" value={formData.name}></input>
        <br/>
        <input type="email" name ="email" placeholder="Enter your email" value={formData.email}></input>
        <br/>
        <input type="password" name ="password" placeholder="Enter your password" value={formData.password}></input>
        <br/>
        <button type="submit">Register</button>

      </form>
    </div>
  )
}

export default App