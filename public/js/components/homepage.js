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
        <Register />
        <Link to="/communityevents">Sign in</Link>
      </div>
    )
  }
})

module.exports = HomePage;
