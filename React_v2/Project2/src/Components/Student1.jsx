import React from 'react' // react arrow function component with export

const Student1 = () => {
  return (
    <div style={{margin: '100px', textAlign: 'center', border : '2px solid red', width : '300px', height : '450px'}}>
      <h1>Mohan Ji</h1>
      <img src="https://platform.vox.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/8689467/gatsby.gif?quality=90&strip=all&crop=18.78125,0,62.4375,100" alt="" height={'200px'} width={'200px'} />
      <h3>CLASS : B.Tech</h3>
      <h3>ROLL NUMBER : 101</h3>
      <h3>Address : Delhi</h3>
    </div>
  )
}

export default Student1
