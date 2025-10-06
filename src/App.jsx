import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Current from './Components/Current';
import Forecast from './Components/Forecast';
import '../node_modules/bootstrap/dist/js/bootstrap';

const App = () => {



  //(use state propose =1.state store,2.value initial,3.update the state)
  const [city, setCity] = useState();
  // 
  const [citysuggestion, setCitysug] = useState([]);
  const [currentWeather, setCurrent] = useState();
  const [forecast, setForecast] = useState();
  const [location, setLocation] = useState();
  const [clickedCity, setClickedCity] = useState();


  //-------------------------------------------------------------------------------------------------------------------------------------

  //useEffect onload 
  useEffect(() => {
    if (city && city.length > 3) {
      FetchAutocompleteURL();
    }
  },
    [city]
  );
  const FetchAutocompleteURL = async () => {
    try {
      const response = await axios.get(autocomplete + city)
      const resp = response.data;
      const cityData = resp.map((data) => {
        return `${data.name},${data.region},${data.country}`;
      })
      setCitysug(cityData);
    } catch (e) {
      console.log('Error=', e);
    }
  }
  //---------------------------------------------------------------------------------------------------



  //API
  const autocomplete = "https://api.weatherapi.com/v1/search.json?key=83c0b17cb2774eac95723527231501&q=";
  //Weather API
  const weatherURL = (city) => `http://api.weatherapi.com/v1/forecast.json?key=83c0b17cb2774eac95723527231501&q=${city}&days=7&api=no&alerts=no`

  //-----------------------------------------------------------------------------------------------------
  //userWhenClick
  const handleSelectedCity = (city) => {
    console.log("clicked city", city);
    setClickedCity(city);//1
    fetchWeatherApi(city);
    setCitysug([]);

  }
  //when user click data fetch Api call
  const fetchWeatherApi = async (city) => {
    try {
      const response = await axios.get(weatherURL(city));
      const resp = response.data;
      console.log(resp);
      setCurrent(resp.current);
      setForecast(resp.forecast);
      setLocation(resp.location);

    } catch (e) {
      console.log("Error Warning", e);
    }
  }



  //onchange
  return (

    <div
      className='container bg-warning p-5 rounded mt-5'>
              <h2 className="text-center text-secondary mb-4">🌤️ Weather App</h2>

      <input type="text" value={clickedCity} className='form-control bg-light text-dark' placeholder='Enter City Name....' style={{fontWeight:"500"}}
        onChange={(e) => {
          setCity(e.target.value)
          if (e.target.value === "") {
            setCurrent();
            setForecast();
            setLocation();
            setClickedCity();
          };
        }} />







      {citysuggestion && citysuggestion.map((city, index) => {
        return (
          <div
            key={index}
            className="text-center bg-info rounded p-1 bg-opacity-25 border border-secondary border-opacity-24 text-dark"
            style={{ cursor: 'pointer' }}
            onClick={() => handleSelectedCity(city)}
          >
            {city}
          </div>
        );
      })}




      {currentWeather && <Current currentWeather={currentWeather} location={location} />}
      {forecast && <Forecast forecast={forecast} location={location} />}
    </div>
  );
}

export default App

