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
    let key = process.env.REACT_APP_ACCUWEATHER_KEY;
    let locationId = '353412';
    let url = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/'
      + locationId + '?apikey=' + key + '&language=vi&details=true&metric=true';
    $.ajax({
      url: url,
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
        <div className="hero">
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
