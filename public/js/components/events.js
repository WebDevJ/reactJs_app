'use strict'
const React          = require('react');
const ReactDOM       = require('react-dom');

// react routing and links
const ReactRouter    = require('react-router');
const Router         = ReactRouter.Router;
const browserHistory = ReactRouter.browserHistory;
const Route          = ReactRouter.Route;
const Link           = ReactRouter.Link;

const $              = require('jquery');
const _              = require('lodash');

// routes to helpers go here
const auth           = require('../helpers/auth');
const SingleEvent    = require('./singleevent');

const Events = React.createClass({

  handleAdd(index) {
    // console.log(index);
    this.props.addMyEvent(index);

  },

  showCommEvents(key) {
    return (
      <SingleEvent key={key} index={key} details={this.props.events[key]} handleAdd={this.handleAdd} addMyEvent={this.props.addMyEvent} deleteEvent={this.deleteEvent} />
    )
  },

  render() {
    return (
      <div>
        <ul className="event-list">
          <li>{Object.keys(this.props.events)
          .map(this.showCommEvents)}</li>
          </ul>
      </div>
    )
  }
})

module.exports = Events;
