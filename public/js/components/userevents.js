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
const Footer   = require('./footer');

const moment = require('moment');


const UserEvents = React.createClass({
  getInitialState() {
    return {
      me: '',
      myevents: {}
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
    })

    $.ajax({
      url: '/events/me',
      beforeSend: function( xhr ) {
        xhr.setRequestHeader("Authorization", "Bearer " + auth.getToken() );
      }
    }).done( (data) => {
      console.log(data);
      data.forEach(el => {
        this.state.myevents[el.event_id] = el;
      })
      this.setState({myevents: this.state.myevents})
    })
  },

  render() {

    return (
      <div>
      <header>
        <Nav me={this.state.me} />
      </header>

      <div className="content">
        <div>
        <h1>My Events</h1>
        </div>

        <div><MyEvents myevents={this.state.myevents} /></div>
      </div>
      </div>
    )
  }
})
//

const MyEvents = React.createClass({

  showMyEvents(key) {
    return (
      <MySingleEvent key={key} index={key} details={this.props.myevents[key]}/>
    )
  },

  render() {
    return (
      <div>
        <ul className="event-list">
          <li>{Object.keys(this.props.myevents)
          .map(this.showMyEvents)}</li>
          </ul>
      </div>
    )
  }
})

const MySingleEvent = React.createClass({
  //
  // handleDeleteClick(event) {
  //   event.preventDefault();
  //   this.props.deleteEvent(this.props.index)
  // },
  render() {
    // format the serial date into date format
    const time = this.props.details.event_time;
    // time to be presented in the display
    const formatted = moment(time).format('dddd, MMMM Do YYYY, h:mm:ss A');

    return (
      <div className="events">
        <h3>{this.props.details.event_name}</h3>
        <p>{formatted}</p>
        <p>{this.props.details.address}</p>
        <p>{this.props.details.city}</p>
        <p><a href={this.props.details.event_url}>Check it out on Meetup!</a></p>
        <p>People Attending: {this.props.details.attendees}</p>
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


module.exports = UserEvents;
