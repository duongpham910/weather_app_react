import React from 'react';
import BaseComponent from '../BaseComponent';
import update from 'immutability-helper';
import './index.css';
import $ from 'jquery';
import WeatherItem from './weatherItem'

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
    let url2 = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/353412?apikey=AAb0wDrjc39jsyMYR0w3t2kYglFlK0UZ&language=vi&metric=true'
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
      <div className="container">
        <button className="loadWeather" onClick={this.loadCurrentWeather} >
          Get weather
        </button>
        <div className="forecast-container">
          {
            this.state.arrWeather.map((weather, index) => {
              return (<WeatherItem weather={weather} key={index}/>)
            })
          }
        </div>
      </div>
    )
  }
}

export default WeatherContainer
