'use strict'
const React           = require('react');
const ReactDOM        = require('react-dom');

// react routing and links
const ReactRouter     = require('react-router');
const Router          = ReactRouter.Router;
const browserHistory  = ReactRouter.browserHistory;
const Route           = ReactRouter.Route;
const Link            = ReactRouter.Link;

const $               = require('jquery');

// routes to helpers go here
const auth       = require('../helpers/auth');
const Register   = require('./register');
const Footer   = require('./footer');

const HomePage = React.createClass({
  render() {
    return (
    <div>
    <header>
      <div className="logo"><h1>Meet My NYC</h1></div>
      <nav>
      <p><Link to="/dashboard">Login</Link></p>
      </nav>
    </header>
      <div className="hp-background">
        <div className="content">
          <div className="hp-content">
          <h1 id="register">Heading About the App</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.</p>
            <Register />
            </div>
          </div>
        </div>

          <div>
            <div className="hp-col red"><h2 className="red-text">Some text describing our awesome app. This rocks. You should use this cause it is literally the best thing. EVER.</h2></div>
            <div className="hp-col"><img src="../images/screenprinting.png" /></div>
          </div>

          <div>
            <div className="hp-col"><img src="../images/lego.png" /></div>
            <div className="hp-col green"><h2 className="green-text">Some text describing our awesome app. This rocks. You should use this cause it is literally the best thing. EVER.</h2></div>
          </div>

          <div className="content">
            <div className="hp-content">
              <h1 className="blue-text">Another Heading</h1>
              <button><a href="#register">Sign Up Today</a></button>
            </div>
          </div>

      </div>
    )
  }
})

module.exports = HomePage;
