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
      console.log(data);
      data.forEach(el => {
        this.state.events[el.event_id] = el;
        this.setState({events: this.state.events})
      })
    })
  },

  showCommEvents(key) {
    <SingleEvent key={key} details={this.state.events[key]} />
  },

  render() {
    return (
      <div>
        <ul><li></li></ul>
      </div>
    )
  }
})
// {
//   Object.keys(this.state.events)
//   .map(this.showCommEvents)
// }
module.exports = Events;
