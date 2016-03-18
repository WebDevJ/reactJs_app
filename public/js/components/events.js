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
const SingleEvent     = require('./singleevent');

const Events = React.createClass({

  componentDidMount(){
    $.get('/events').done( (data) => {
      data.forEach(el => {
        this.state.
      })
    })
  },

  render() {
    return (
      <div>
        <ul><SingleEvent /></ul>
      </div>
    )
  }
})

module.exports = Events;
