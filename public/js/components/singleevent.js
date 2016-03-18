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
const auth            = require('../helpers/auth');

const SingleEvent = React.createClass({

  render() {
    return (
      <div>
      <p>{this.props.details.event_name}</p> 
      <p>{this.props.details.event_time}</p>
      </div>
    )
  }
})

module.exports = SingleEvent;
