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
const auth     = require('../helpers/auth');


const Events    = require('./events');
const Search   = require('./search');


const CommEvents = React.createClass({

    addCommEvent: function(newEvent) {
      // add the new event to the community event state
      console.log(newEvent);

      },


    addMyEvent(newEvent) {
      $.ajax({
        url:'/events/' + this.state.events.event_id,
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
        <SingleEvent key={key} index={key} details={this.props.events[key]} addMyEvent={this.addMyEvent} deleteEvent={this.deleteEvent} />
      )
    },

  render() {
    const token = auth.getToken()

    return (
      <div className="dashboard">

        <div className="content">
          <h1>Community Events</h1>
        </div>

        <div><Events events={this.props.events}/></div>
        <div><Search addCommEvent={this.addCommEvent}/></div>
      </div>
    )
  }
})

module.exports = CommEvents;
