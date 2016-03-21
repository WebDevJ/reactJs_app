'use strict'
const React           = require('react');

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

  addCommEvent: function(event_id) {
    // ajax post and set state go here
    let addEvent = (data) => {
      let newID = data.event_id;
      // add new task to state
      this.state.events[newID] = event_id;
      this.setState({ events: this.state.events });
    }
    $.ajax({
      url: '/events',
      method: 'POST',
      data: event_id,
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", "Bearer " + auth.getToken() );
      }
    }).done(addEvent);

  },

  addMyEvent(event_id) {
    $.ajax({
      url:`/events/${event_id}`,
      method: 'POST',
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", "Bearer " + auth.getToken() );
      }
    }).done( (data) => {
      console.log(data);
      let eventID = data.event_id;
      this.state.events[eventID] = event_id;
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

  deleteMyEvent(event_id) {
    $.ajax({
      url:`/events/${event_id}`,
      method: 'DELETE',
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", "Bearer " + auth.getToken() );
      }
    }).done( (data) => {
      console.log(data);
      let eventID = data.event_id;
      this.state.events[eventID] = event_id;
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
          <Nav me={this.state.me} />


          <div className="dashboard-bg">
            <div className="content">
              <div className="hp-content">
              <h1 id="register">Community Events</h1>
                <p>Welcome to your community Events page. It's simple to get started. Here you can search and add events. If you are not sure were to start, feel free to look at the events already approved by other members below.</p>
                </div>
              </div>
            </div>

          <div><CommEvents me={this.state.me} events={this.state.events} addMyEvent={this.addMyEvent} deleteMyEvent={this.deleteMyEvent} addCommEvent={this.addCommEvent}/></div>

      </div>
    )
  }
})

module.exports = Dashboard;
