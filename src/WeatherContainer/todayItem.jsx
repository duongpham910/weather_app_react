import React from 'react'
import BaseComponent from '../BaseComponent';
import moment from "moment";
import compass from './compassPoint.json';

class TodayItem extends BaseComponent {
  constructor(props) {
    super(props);
    this.location = props.location
  }

  loadImage = (icon) => {
    let imgNum = (icon < 10 ? '0' : '') + icon;
    return 'https://developer.accuweather.com/sites/default/files/' + imgNum + '-s.png'
  }

  loadCompassDirection = (directAbb) => {
    return compass.find(com => com.abbreviation === directAbb).direction
  }

  render() {
    let weather = this.props.weather
    let imgSrc = this.loadImage(weather.Day.Icon);
    let compassUrl = "http://res.cloudinary.com/duongph/image/upload/v1527525276/icon-compass_qofhlv.png";
    let windUrl = "http://res.cloudinary.com/duongph/image/upload/v1527525242/icon-wind_c9axdn.png";
    let umberellaUrl = "http://res.cloudinary.com/duongph/image/upload/v1527525239/icon-umberella_ewdep8.png";
    return (
      <div className="today forecast">
        <div className="forecast-header">
          <div className="day">{moment(weather.Date).format("dddd")}</div>
          <div className="date">{moment(weather.Date).format("MMM DD")}</div>
        </div>
        <div className="forecast-content">
          <div className="location">{this.location}</div>
          <div className="degree">
            <div className="num">{weather.Temperature.Maximum.Value}<sup>o</sup>C</div>
            <div className="forecast-icon">
              <img src={imgSrc} alt={"logo"}/>
            </div>
          </div>
          <span><img src={umberellaUrl} alt=""/>{weather.Day.RainProbability}%</span>
          <span><img src={windUrl} alt=""/>{weather.Day.Wind.Speed.Value}km/h</span>
          <span><img src={compassUrl} alt=""/>{this.loadCompassDirection(weather.Day.Wind.Direction.English)}</span>
        </div>
      </div>
    );
  }
}

export default TodayItem
