import React from 'react'
import BaseComponent from '../BaseComponent';
import moment from "moment";

class WeatherItem extends BaseComponent {

  render() {
    let weather = this.props.weather
    return (
      <div className="forecast">
        <div className="forecast-header">
          <div className="day">{moment(weather.Date).format("MMM DD YYYY")}</div>
        </div>
        <div className="forecast-content">
          <div className="forecast-icon">
            icon
          </div>
          <div className="degree">{weather.Temperature.Maximum.Value}<sup>o</sup>C</div>
          <small>{weather.Temperature.Minimum.Value}<sup>o</sup></small>
          <div className="comment">{weather.Day.IconPhrase}</div>
        </div>
      </div>
    );
  }
}

export default WeatherItem
