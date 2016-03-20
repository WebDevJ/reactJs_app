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

const HomePage = React.createClass({
  render() {
    return (
    <div>
      <div className="hp-background">
        <div className="content">
          <div className="hp-content">
            <h1>Meet My NYC</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et   dolore  magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo  consequat.</p>
            <Register />
            <Link to="/dashboard">Already have an account? Sign in here.</Link>
            </div>
          </div>
        </div>

        <div>
          <div className="hp-col"><h2>Some text describing our awesome app. This rocks. You should use this cause it is literally the best thing. EVER.</h2></div>
          <div className="hp-col"><img src="../images/hp-col-img.png" /></div>
        </div>

        <div>
        <div className="hp-col"><img src="../images/hp-col-img-two.png" /></div>
          <div className="hp-col"><h2>Some text describing our awesome app. This rocks. You should use this cause it is literally the best thing. EVER.</h2></div>
        </div>
      </div>
    )
  }
})

module.exports = HomePage;
