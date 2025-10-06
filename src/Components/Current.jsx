import React from 'react'

const Current = ({ currentWeather, location }) => {
    return (

        <div className='container mt-5'>
            <h4 className='text-dark text-center'>Current Weather of {location.name},{location.region}</h4>
            <div className='row'>
                <div className='col-3'>
                    <div className="card" >
                        <div className="card-body">
                            <h5 className="card-title"><img src={currentWeather.condition.icon} className="card-img-top" alt="..." />{currentWeather.condition.text}</h5>

                        </div>
                    </div>


                </div>
                <div className='col-3'>

                    <div className="card" >
                        <div className="card-body">
                            <h5 className="card-title">Temp in C {currentWeather.temp_c}</h5>

                        </div>
                    </div>
                </div>

                <div className='col-3'>
                    <div className="card" >
                        <div className="card-body">
                            <h5 className="card-title">Temp in f {currentWeather.temp_f}</h5>

                        </div>
                    </div>
                </div>

                <div className='col-3'>
                    <div className="card" >
                        <div className="card-body">
                            <h5 className="card-title">Humadity{currentWeather.humidity}</h5>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
    );
};

export default Current
