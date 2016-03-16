'use strict'
const React          = require('react');
const ReactDOM       = require('react-dom');
const $              = require('jquery');

const auth           = require('../auth.js');
const Dashboard      = require('./dashboard.js');

const ReactRouter    = require('react-router');

const Router         = ReactRouter.Router;
const Route          = ReactRouter.Route;
const Link           = ReactRouter.Link;
const browserHistory = ReactRouter.browserHistory;

const Logout = React.createClass({
  componentDidMount() {
    auth.logout()
  },

  render() {
    return <p>You are now logged out</p>
  }
})

module.exports = Logout;
