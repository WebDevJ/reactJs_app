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
      this.state.myevents[eventID] = event_id;
      this.setState({myevents: this.state.myevents})
      $.ajax({
        url: '/events',
        beforeSend: function( xhr ) {
          xhr.setRequestHeader("Authorization", "Bearer " + auth.getToken() );
        }
      }).done( (data) => {
        data.forEach(el => {
          this.state.myevents[el.event_id] = el;
        })
        this.setState({myevents: this.state.myevents})
      })
    })
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

        <div><MyEvents myevents={this.state.myevents} deleteMyEvent={this.deleteMyEvent} /></div>
      </div>
      </div>
    )
  }
})
//

const MyEvents = React.createClass({
  handleAdd(index) {
    // console.log(index);
    this.props.addMyEvent(index);
  },

  handleDelete(index) {
    this.props.deleteMyEvent(index);
  },

  showMyEvents(key) {
    return (
      <MySingleEvent key={key} index={key} details={this.props.myevents[key]} handleAdd={this.handleAdd} handleDelete={this.handleDelete}/>
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
  getInitialState() {
    return {attending: true};
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
        <p>Event Added By: {this.props.details.first}</p>
        <p>People Attending: {this.props.details.attendees}</p>
        <p>{actionButton}</p>
      </div>
    )
  }
})


module.exports = UserEvents;
