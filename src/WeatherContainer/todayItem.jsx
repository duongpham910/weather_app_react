import React from 'react'
import BaseComponent from '../BaseComponent';
import moment from "moment";

class TodayItem extends BaseComponent {

  loadImage = (icon) => {
    let imgNum = (icon < 10 ? '0' : '') + icon;
    return 'https://developer.accuweather.com/sites/default/files/' + imgNum + '-s.png'
  }

  render() {
    let weather = this.props.weather
    let imgSrc = this.loadImage(weather.Day.Icon);
    let umberellaUrl = "http://res.cloudinary.com/duongph/image/upload/v1527525276/icon-compass_qofhlv.png";
    let windUrl = "http://res.cloudinary.com/duongph/image/upload/v1527525242/icon-wind_c9axdn.png";
    let compassUrl = "http://res.cloudinary.com/duongph/image/upload/v1527525239/icon-umberella_ewdep8.png";
    return (
      <div className="today forecast">
        <div className="forecast-header">
          <div className="day">Monday</div>
          <div className="date">6 Oct</div>
        </div>
        <div className="forecast-content">
          <div className="location">New York</div>
          <div className="degree">
            <div className="num">23<sup>o</sup>C</div>
            <div className="forecast-icon">
              <img src={imgSrc} alt={"logo"}/>
            </div>
          </div>
          <span><img src={umberellaUrl} alt=""/>20%</span>
          <span><img src={windUrl} alt=""/>18km/h</span>
          <span><img src={compassUrl} alt=""/>East</span>
        </div>
      </div>
    );
  }
}

export default TodayItem
