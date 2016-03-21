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
          <h1 id="register">Enjoy The Best that NYC has to offer!</h1>
            <p>With just one app you and your friends can join a community of like minded individuals that LOVE NYC events.</p>
            <Register />
            </div>
          </div>
        </div>

          <div>
            <div className="hp-col red"><h2 className="red-text">We curate your experience by tapping into the world of MeetUp.com. In this way we are able to set up a community of events that are fun, active & engaging.</h2></div>
            <div className="hp-col"><img src="../images/screenprinting.png" /></div>
          </div>

          <div>
            <div className="hp-col"><img src="../images/lego.png" /></div>
            <div className="hp-col green"><h2 className="green-text">The best part is you can see if your friends are going and if any one in the Community has already gone. No need to research & plan for weeks ahead for great actives.</h2></div>
          </div>

          <div className="content">
            <div className="hp-content">
              <h1 className="blue-text">Share a Great MeetUp with the Community</h1>
              <button><a href="#register">Sign Up Today</a></button>
            </div>
          </div>

      </div>
    )
  }
})

module.exports = HomePage;
