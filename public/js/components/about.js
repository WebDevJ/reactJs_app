'use strict'
const React          = require('react');
const ReactDOM       = require('react-dom');
const $              = require('jquery');

const auth           = require('../auth.js');

const ReactRouter    = require('react-router');
const Router         = ReactRouter.Router;
const Route          = ReactRouter.Route;
const Link           = ReactRouter.Link;
const browserHistory = ReactRouter.browserHistory;

const About = React.createClass({
  render() {
    return <h1>About</h1>
  }
})

module.exports = About;
