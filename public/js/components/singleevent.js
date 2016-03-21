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

const moment = require('moment');

const SingleEvent = React.createClass({
  getInitialState() {
    return {attending: false};
  },

  handleClick(event) {
    event.preventDefault();
    this.setState({attending: true})
    this.props.handleAdd(this.props.index)
  },

  handleDeleteClick(event) {
    event.preventDefault();
    this.setState({attending: false})
    this.props.handleDelete(this.props.index)
  },
  render() {
    // format the serial date into date format
    const time = this.props.details.event_time;
    // time to be presented in the display
    const formatted = moment(time).format('dddd, MMMM Do YYYY, h:mm:ss A');

    let actionButton;
    if (!this.state.attending) {
      actionButton = <button onClick={this.handleClick}>Add Event</button>
    } else {
      actionButton = <button onClick={this.handleDeleteClick}>Remove Event</button>;
    }
    return (
      <div className="events">
        <h3>{this.props.details.event_name}</h3>
        <p>{formatted}</p>
        <p>{this.props.details.address}</p>
        <p>{this.props.details.city}</p>
        <p><a href={this.props.details.event_url}>Check it out on Meetup!</a></p>
        <p className="attendees">Event Added By: {this.props.details.first}</p>
        <p>People Attending: {this.props.details.attendees}</p>
        <p>{actionButton}</p>
      </div>
    )
  }
})


module.exports = SingleEvent;
