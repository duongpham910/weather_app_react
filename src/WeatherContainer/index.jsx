import React from 'react';
import BaseComponent from '../BaseComponent';
import './index.css';
import axios from 'axios';
import WeatherItem from './weatherItem';
import TodayItem from './todayItem';
import Header from '../Header/index';
import Autosuggest from 'react-autosuggest';
import cities from './cities.json';

class WeatherContainer extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      arrWeather: [],
      value: '',
      suggestions: [],
    };
  }

  loadCurrentWeather = () => {
    this.state.value === '' ? this.loadLocation() : this.requestAPI(this.state.value)
  }

  loadLocation = () => {
    let url = 'https://ipinfo.io/geo';
    axios.get(url)
    .then(response => {
      this.setState({
        value: response.data.city
      });
      this.requestAPI(response.city);
    })
    .catch(error => {
      console.error(error);
    })
  }

  requestAPI = (cityName) => {
    if (cities.find(city => city.name === cityName) !== undefined ) {
      let key = process.env.REACT_APP_ACCUWEATHER_KEY;
      let locationId = cities.find(city => city.name === cityName).locationId;
      let url = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/'
        + locationId + '?apikey=' + key + '&language=vi&details=true&metric=true';
      axios.get(url)
      .then(response => {
        this.setState({
          arrWeather: response.data.DailyForecasts
        });
      })
      .catch(error => {
        console.error(error);
      })
    }
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  getSuggestions = (value) => {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return cities.filter(city => regex.test(city.name));
  }


  // componentDidMount() {
  //   let key = process.env.REACT_APP_ACCUWEATHER_KEY;
  //   let url = 'https://dataservice.accuweather.com/locations/v1/topcities/150'
  //     + '?apikey=' + key;
  //   $.ajax({
  //     url: url,
  //     method: 'GET',
  //     success: (response) => {
  //       let cities = response.map(city => new Object({locationId: city.Key, name: city.EnglishName}));
  //       console.log(JSON.stringify(cities));
  //       this.setState({
  //         cities: cities
  //       });

  //     },
  //     error: (xhr, status, err) => {
  //       console.log('false');
  //     }
  //   });
  // }

  render(){
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Find your location...",
      value,
      onChange: this.onChange
    };
    return(
      <div className="site-content">
        <Header />
        <div className="hero">
          <div className="container">
            <div className="find-location">
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
              />
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
                if (index === 0) {
                  return (<TodayItem weather={weather} key={index} location={this.state.value}/>)
                } else {
                  return (<WeatherItem weather={weather} key={index}/>)
                }
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default WeatherContainer

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}
