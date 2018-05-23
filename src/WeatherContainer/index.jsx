import React from 'react';
import BaseComponent from '../BaseComponent';
import './index.css';
import $ from 'jquery';
import WeatherItem from './weatherItem';
import Header from '../Header/index';
import Autosuggest from 'react-autosuggest';

class WeatherContainer extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      arrWeather: [],
      location: '',
      value: '',
      suggestions: [],
      cities: [],
    };
  }

  loadCurrentWeather = () => {
    let key = process.env.REACT_APP_ACCUWEATHER_KEY;
    let locationId = '353412';
    let url = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/'
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

  handleChange = (event) => {
    this.setState({
      location: event.target.value
    });
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  componentDidMount() {
    let key = process.env.REACT_APP_ACCUWEATHER_KEY;
    let url = 'https://dataservice.accuweather.com/locations/v1/topcities/150'
      + '?apikey=' + key;
    $.ajax({
      url: url,
      method: 'GET',
      success: (response) => {
        this.setState({
          cities: response
        });

      },
      error: (xhr, status, err) => {
        console.log('false');
      }
    });
  }

  render(){
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Type 'c'",
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

const languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'C#',
    year: 2000
  },
  {
    name: 'C++',
    year: 1983
  },
  {
    name: 'Clojure',
    year: 2007
  },
  {
    name: 'Elm',
    year: 2012
  },
  {
    name: 'Go',
    year: 2009
  },
  {
    name: 'Haskell',
    year: 1990
  },
  {
    name: 'Java',
    year: 1995
  },
  {
    name: 'Javascript',
    year: 1995
  },
  {
    name: 'Perl',
    year: 1987
  },
  {
    name: 'PHP',
    year: 1995
  },
  {
    name: 'Python',
    year: 1991
  },
  {
    name: 'Ruby',
    year: 1995
  },
  {
    name: 'Scala',
    year: 2003
  }
];


function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return languages.filter(language => regex.test(language.name));
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}
