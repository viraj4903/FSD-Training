import React, { useState } from 'react';

const CounterApp = () => {

    const [height, setHeight] = useState(300);
    const [width, setWidth] = useState(300);

    function rowInc() {
        setHeight(height + 20);
    }

    function rowDec() {
        setHeight(height - 20);
    }

    function colInc() {
        setWidth(width + 20);
    }

    function colDec() {
        setWidth(width - 20);
    }

    return (
        <div style={{ border: "2px solid red", height: "600px", width: "600px"}}>

            <img
                src="src\assets\cat.jpg"
                alt="cat"
                style={{
                    height: `${height}px`,
                    width: `${width}px`
                }}
            />

            <br />

            <button onClick={rowInc}>Row +</button>
            <button onClick={rowDec}>Row -</button>

            <br />

            <button onClick={colInc}>Col +</button>
            <button onClick={colDec}>Col -</button>

        </div>
    );
};

export default CounterApp;