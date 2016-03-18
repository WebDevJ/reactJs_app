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
const Events   = require('./events');
const PastEvents = require('./pastevents');
const Footer   = require('./footer');


const UserEvents = React.createClass({
  render() {
    const token = auth.getToken()

    return (
      <div>

        <div><Nav /></div>


        <div><Events /></div>

        <div><PastEvents /></div>

        <div><Footer /></div>

      </div>
    )
  }
})

module.exports = UserEvents;
