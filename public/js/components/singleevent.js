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
  // getInitialState() {
  //
  // },

  handleClick(event) {
    event.preventDefault();
    this.props.handleAdd(this.props.index)
  },

  handleDeleteClick(event) {
    event.preventDefault();
    this.props.deleteEvent(this.props.index)
  },
//add a hidden form field to grab event id; using the form to render hidden info, see the single search form
  render() {
    return (
      <div className="events">
        <h3>{this.props.details.event_name}</h3>
        <p>{this.props.details.event_time}</p>
        <p>{this.props.details.address}</p>
        <p>{this.props.details.city}</p>
        <p><a href="{this.props.details.added_by}">{this.props.details.event_url}</a></p>
        <p>{this.props.details.attendees}</p>
        <p><button onClick={this.handleClick}>Add Event</button> </p>
        <p><DeleteButton /></p>
      </div>
    )
  }
})

const DeleteButton = React.createClass({
  render() {
    return (
      <button onClick={this.handleDeleteClick}>Remove Event</button>
    )
  }
})

module.exports = SingleEvent;
