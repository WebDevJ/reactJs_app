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
const Nav      = require('./nav');
const CommEvents    = require('./commevents');
const UserEvents    = require('./userevents');
const Footer   = require('./footer');


const Dashboard = React.createClass({
  getInitialState() {
    return {
      me: '',
      events: {}
    }
  },

  componentDidMount(){
    $.ajax({
      url: 'users/me',
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", "Bearer " + auth.getToken() );
      }
    }).done((data) => {
      this.setState({me: [data.user_id, data.first]})
    }),

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

  addCommEvent: function(newEvent) {
    // ajax post and set state go here
    let addEvent = (data) => {
      let newID = data.event_id;
      // add new task to state
      this.state.events[newID] = newEvent;
      this.setState({ events: this.state.events });
    }
    $.ajax({
      url: '/events',
      method: 'POST',
      data: newEvent,
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", "Bearer " + auth.getToken() );
      }
    }).done(addEvent);

  },

  addMyEvent(newEvent) {
    console.log(newEvent);
    $.ajax({
      url:'/events/' + newEvent,
      method: 'POST',
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", "Bearer " + auth.getToken() );
      }
    }).done( (data) => {
      console.log(data);
      let eventID = data.event_id;
      this.state.events[eventID] = newEvent;
      this.setState({events: this.state.events})
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
    })
  },

  render() {
    const token = auth.getToken()

    return (
      <div>
        <header>
          <Nav me={this.state.me} />
        </header>

          <div><CommEvents me={this.state.me} events={this.state.events} addMyEvent={this.addMyEvent} addCommEvent={this.addCommEvent}/></div>

        <div><Footer /></div>
      </div>
    )
  }
})

module.exports = Dashboard;
