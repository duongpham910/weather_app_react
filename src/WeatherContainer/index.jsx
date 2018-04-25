import React from 'react';
import BaseComponent from '../BaseComponent';
import './index.css';
import $ from 'jquery';
import WeatherItem from './weatherItem';
import Header from '../Header/index';

class WeatherContainer extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      arrWeather: [],
    };
  }

  loadCurrentWeather = () => {
    let appId = process.env.REACT_APP_OPEN_WEATHER_KEY;
    let location = 'Hanoi';
    let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + location + '&APPID=' + appId + '&units=metric';
    let url2 = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/353412?apikey=AAb0wDrjc39jsyMYR0w3t2kYglFlK0UZ&language=vi&details=true&metric=true'
    $.ajax({
      url: url2,
      method: 'GET',
      success: (response) => {
        this.setState({
          arrWeather: response.DailyForecasts
        });
      },
      error: (xhr, status, err) => {
        console.log('false');
      }
    });
  }

  render(){
    return(
      <div className="site-content">
        <Header />
        <div className="hero" data-bg-image="images/banner.png">
          <div className="container">
            <div className="find-location">
              <input type="text" placeholder="Find your location..."/>
              <button className="load-weather" onClick={this.loadCurrentWeather}>
                Get weather
              </button>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="forecast-container">
            {
              this.state.arrWeather.map((weather, index) => {
                return (<WeatherItem weather={weather} key={index}/>)
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default WeatherContainer
