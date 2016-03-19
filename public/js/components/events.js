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
  getInitialState() {
    return {
      events: {}
    }
  },

  componentDidMount() {
    $.ajax({
      url: '/events',
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", "Bearer " + auth.getToken() );
      }
    }).done( (data) => {
      data.forEach(el => {
        this.state.events[el.event_id] = el;
      })
      this.setState({events: this.state.events})
    })
  },

  addMyEvent(newEvent) {
    $.ajax({
      url:'/events/' + this.props.me[0],
      method: 'POST',
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", "Bearer " + auth.getToken() );
      }
    }).done( (data) => {
      let eventID = data.event_id;
      this.state.events[eventID] = newEvent;
      this.setState({events: this.state.events})
    })
  },

  deleteEvent(removeEvent) {
    $.ajax({
      url:'/events/' + this.props.me[0],
      method: 'DELETE',
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", "Bearer " + auth.getToken() );
      }
    }).done( (data) => {
      let eventID = data.event_id;
      this.state.events[eventID] = removeEvent;
      this.setState({events: this.state.events})
    })
  },

  showCommEvents(key) {
    return (
      <SingleEvent key={key} index={key} details={this.state.events[key]} addMyEvent={this.addMyEvent} deleteEvent={this.deleteEvent} />
    )
  },

  render() {
    return (
      <div>
        <ul className="event-list">
          <li>{Object.keys(this.state.events)
          .map(this.showCommEvents)}</li>
          </ul>
      </div>
    )
  }
})

module.exports = Events;
