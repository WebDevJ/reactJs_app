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
        <div className="content">
          <div className="hp-content">
            <h1>My NYC</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et   dolore  magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo  consequat.</p>
            <Register />
            <Link to="/communityevents">Sign in</Link>
            </div>
          </div>
    )
  }
})

module.exports = HomePage;
