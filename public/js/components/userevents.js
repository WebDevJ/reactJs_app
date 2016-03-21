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
const Events   = require('./events');
const PastEvents = require('./pastevents');


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


module.exports = UserEvents;
