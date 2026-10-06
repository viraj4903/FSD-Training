import react from 'react';

const book = (props) => {
    return (
        <div style={{border:'2px solid red',height:'200px',width:'200px'}}>
            <h3 style={{color:'red'}}>book shop</h3>
            <img src="https://cdn.britannica.com/04/126004-004-510371DE.jpg" alt="" />
            <h3>{props.name}</h3>
            <h3>{props.price}</h3>
        </div>
    )
}

export default book;