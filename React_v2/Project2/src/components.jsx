import react from 'react'

const Components = () => {
    return (
        <div className='weather-card'>
            <h2>New Delhi</h2>
            <div className = "weather-icon">
                <h1>32 Degree</h1>
                <p>Sunny</p>
                <div className="weather-details">
                    <span>Humidity: 60%</span>
                    <span>Wind: 10 km/h</span>
                </div>
            </div>
        </div>
    )
}

export default Components;