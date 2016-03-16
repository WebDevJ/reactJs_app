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


const CommEvents = React.createClass({
  render() {
    const token = auth.getToken()

    return (
      <div>
        <div>
          <h1>Dashboard</h1>
          <p>You made it!</p>
          <p>{token}</p>
        </div>

        <div><Nav /></div>

        <div><p>Homepage</p></div>

        <div><Events /></div>

        <div><Footer /></div>

      </div>
    )
  }
})

module.exports = CommEvents;
