import React from 'react'
import BaseComponent from '../BaseComponent';
import './index.css';

class Header extends BaseComponent {

  render() {
    return (
      <div className="site-header">
        <div className="container">
          <a href="index.html" className="branding">
            <img src="images/logo.png" alt="" className="logo" />
            <div className="logo-type">
              <h1 className="site-title">Weather app</h1>
              <small className="site-description">Viet Nam weather</small>
            </div>
          </a>

          <div className="main-navigation">
            <button type="button" className="menu-toggle"><i className="fa fa-bars"></i></button>
            <ul className="menu">
              <li className="menu-item current-menu-item"><a href="index.html">Forecast</a></li>
              <li className="menu-item"><a href="news.html">Current Conditions</a></li>
              <li className="menu-item"><a href="live-cameras.html">Indices</a></li>
              <li className="menu-item"><a href="photos.html">About</a></li>
              <li className="menu-item"><a href="contact.html">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Header
