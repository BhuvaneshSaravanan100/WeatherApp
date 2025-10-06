import React from 'react'

const Forecast = ({ forecast, location }) => {
    return (
        <div className='container mt-5'>
            <h4 className='text-dark text-center'>Forecast of {location.name},{location.region}</h4>
            {forecast.forecastday.map((data, index) => {
                return (
                    <div className="accordion accordion-flush mt-3" id="accordionFlushExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${index}`} aria-expanded="false" aria-controls="flush-collapseOne">
                                    <div class="d-flex flex-row align-items-center mb-3">
                                        <div class="p-2">{data.date}</div>
                                        <div class="p-2"><img src={data.day.condition.icon} /></div>
                                        <div class="p-2">{data.day.condition.text}</div>
                                        <div class="p-2">Max Temp:{data.day.maxtemp_c}</div>
                                    </div>
                                </button>
                            </h2>
                            <div id={`${index}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">{data.hour.map((data) => {
                                    return (
                                        <>

                                            <h2>{data.time}
                                                Max temp{data.temp_c}
                                            </h2>
                                            <div className="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                                <div className="progress-bar progress-bar-striped progress-bar-animated" 
                                                style={{
                                                    width: `${data.temp_c}%`
                                                }}
                                                ></div>
                                            </div >
                                        </>
                                    )
                                })} </div>
                            </div>
                        </div>

                    </div>

                )
            })}
        </div >
    );
};

export default Forecast;
